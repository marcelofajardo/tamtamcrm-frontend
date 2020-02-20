<?php

namespace App\Http\Controllers;

use App\Factory\ProductFactory;
use App\Filters\OrderFilter;
use App\Jobs\Customer\StoreProductAttributes;
use App\Jobs\Product\SaveProductAttributes;
use App\Order;
use App\Product;
use App\Repositories\Interfaces\ProductRepositoryInterface;
use App\Repositories\Interfaces\CategoryRepositoryInterface;
use App\Repositories\CategoryRepository;
use App\Repositories\OrderRepository;
use App\Repositories\ProductRepository;
use App\Requests\Product\CreateProductRequest;
use App\Requests\Product\UpdateProductRequest;
use App\Shop\Products\Exceptions\ProductUpdateErrorException;
use App\Transformations\ProductTransformable;
use App\Transformations\LoanProductTransformable;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Repositories\TaskRepository;
use App\Task;
use App\Requests\SearchRequest;
use App\Filters\ProductFilter;
use App\Traits\CheckEntityStatus;
use Illuminate\Http\Response;

class ProductController extends Controller
{

    use ProductTransformable, LoanProductTransformable, CheckEntityStatus;

    /**
     * @var ProductRepositoryInterface
     */
    private $product_repo;

    /**
     * @var CategoryRepositoryInterface
     */
    private $category_repo;

    /**
     * ProductController constructor.
     * @param ProductRepositoryInterface $product_repo
     * @param CategoryRepositoryInterface $category_repo
     */
    public function __construct(ProductRepositoryInterface $product_repo, CategoryRepositoryInterface $category_repo)
    {
        $this->product_repo = $product_repo;
        $this->category_repo = $category_repo;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(SearchRequest $request)
    {
        $products =
            (new ProductFilter($this->product_repo))->filter($request, auth()->user()->account_user()->account_id);
        return response()->json($products);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CreateProductRequest $request
     *
     * @return Response
     */
    public function store(CreateProductRequest $request)
    {
        $product = $this->product_repo->save($request->all(),
            ProductFactory::create(auth()->user()->id, auth()->user()->account_user()->account_id));

        return $this->transformProduct($product);
    }

    public function show(int $id)
    {
        $product = $this->product_repo->findProductById($id);
        return response()->json($this->transformProduct($product));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateProductRequest $request
     * @param int $id
     *
     * @return Response
     * @throws ProductUpdateErrorException
     */
    public function update(UpdateProductRequest $request, int $id)
    {
        $product = $this->product_repo->findProductById($id);

        if ($this->entityIsDeleted($product)) {
            return $this->disallowUpdate();
        }

        $product = $this->product_repo->save($request->all(), $product);

        $fields = $request->only('range_from', 'range_to', 'payable_months', 'number_of_years', 'minimum_downpayment',
            'interest_rate');

        (new SaveProductAttributes($product))->handle($this->product_repo, $fields);

        return response()->json($product);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     *
     * @return Response
     * @throws Exception
     */
    public function archive($id)
    {
        $product = $this->product_repo->findProductById($id);
        $productRepo = new ProductRepository($product);
        $productRepo->deleteProduct();
    }

    /**
     * @param int $id
     * @return mixed
     */
    public function destroy(int $id)
    {
        $company = Product::withTrashed()->where('id', '=', $id)->first();
        $this->product_repo->newDelete($company);
        return response()->json([], 200);
    }

    /**
     *
     * @param int $task_id
     * @return type
     */
    public function getProductsForTask(int $task_id, string $status)
    {
        $orderRepository = new OrderRepository(new Order);
        $products =
            (new OrderFilter($orderRepository))->getProductsForTask((new TaskRepository(new Task))->findTaskById($task_id),
                $status);
        return response()->json($products);
    }

    /**
     *
     * @param string $slug
     * @return type
     */
    public function getProduct(string $slug)
    {
        $product = $this->product_repo->findProductBySlug(['slug' => $slug]);
        return response()->json($product);
    }

    /**
     *
     * @param int $id
     */
    public function getProductsForCategory(int $id, Request $request)
    {

        $category = $this->category_repo->findCategoryById($id);

        $repo = new CategoryRepository($category);
        $parentCategory = $repo->findParentCategory();

        $list = $request->has('valued_at') ? $this->product_repo->getProductsByDealValueAndCategory($category,
            $request) : $repo->findProducts()->where('status', 1);

        $products = $list->map(function (Product $product) use ($request, $parentCategory) {
            return $this->transformLoanProduct($product, $parentCategory, $request);
        })->all();

        return response()->json([
            'products' => $products,
            'parent_category' => $parentCategory
        ]);
    }

    /**
     * @param Request $request
     *
     * @return RedirectResponse
     */
    public function removeImage(Request $request)
    {
        $this->product_repo->deleteFile($request->only('product', 'image'), 'uploads');
        return response()->json('Image deleted successfully');
    }

    /**
     * @param Request $request
     *
     * @return RedirectResponse
     */
    public function removeThumbnail(Request $request)
    {
        $this->product_repo->deleteThumb($request->input('image'));
        return response()->json('Image deleted successfully');
    }

    public function bulk()
    {
        $action = request()->input('action');

        $ids = request()->input('ids');
        $products = Product::withTrashed()->find($this->transformKeys($ids));
        $products->each(function ($product, $key) use ($action) {
            if (auth()->user()->can('edit', $product)) {
                $this->product_repo->{$action}($product);
            }
        });
        return response()->json(Product::withTrashed()->whereIn('id', $ids));
    }

    /**
     * @param int $id
     * @return mixed
     */
    public function restore(int $id)
    {
        $group = Product::withTrashed()->where('id', '=', $id)->first();
        $this->product_repo->restore($group);
        return response()->json([], 200);
    }
}
