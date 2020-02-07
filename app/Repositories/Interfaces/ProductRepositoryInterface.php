<?php

namespace App\Repositories\Interfaces;

use App\Invoice;
use App\Repositories\Base\BaseRepositoryInterface;
use App\Product;
use Illuminate\Support\Collection as Support;
use Illuminate\Database\Eloquent\Collection;
use App\Task;
use App\Brand;
use App\Category;
use App\ProductAttribute;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;

interface ProductRepositoryInterface extends BaseRepositoryInterface
{

    /**
     *
     * @param string $order
     * @param string $sort
     * @param array $columns
     */
    public function listProducts(string $order = 'id', string $sort = 'desc', array $columns = ['*']): Support;

    /**
     *
     * @param array $data
     */
    //public function createProduct(array $data): Product;

    /**
     *
     * @param array $params
     * @param int $id
     */
    //public function updateProduct(array $params): bool;

    public function save($data, Product $product) : ?Product;

    /**
     *
     * @param int $id
     */
    public function findProductById(int $id): Product;

    /**
     *
     */
    public function deleteProduct(): bool;

    /**
     *
     * @param array $slug
     */
    public function findProductBySlug(array $slug): Product;

    /**
     *
     */
    public function getCategories(): Collection;

    /**
     *
     */
    public function findBrand();

    /**
     *
     * @param Brand $objBrand
     */
    public function filterProductsByBrand(Brand $objBrand): Support;

    /**
     *
     * @param \App\Repositories\Interfaces\Category $objCategory
     */
    public function filterProductsByCategory(Category $objCategory): Support;

    /**
     * @param ProductAttribute $productAttribute
     * @param Product $product
     * @return ProductAttribute
     */
    public function saveProductAttributes(ProductAttribute $productAttribute, Product $product): ProductAttribute;

    /**
     *
     */
    public function listProductAttributes(): Collection;

    /**
     *
     * @param ProductAttribute $productAttribute
     */
    public function removeProductAttribute(ProductAttribute $productAttribute, Product $product): ?bool;
    
    /**
     *
     * @param Category $category
     * @param type $value
     */
    public function getProductsByDealValueAndCategory(Category $category, Request $request);
}
