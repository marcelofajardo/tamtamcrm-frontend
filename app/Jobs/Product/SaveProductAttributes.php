<?php
namespace App\Jobs\Product;

use App\Product;
use App\Repositories\ProductRepository;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\ProductAttribute;

class SaveProductAttributes
{
    use Dispatchable;
    protected $data;
    protected $product;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Product $product)
    {

        $this->product = $product;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(ProductRepository $product_repo, $fields) : ?ProductAttribute {
        $range_from = $fields['range_from'];
        $range_to = $fields['range_to'];
        $payable_months = $fields['payable_months'];
        $number_of_years = $fields['number_of_years'];
        $minimum_downpayment = $fields['minimum_downpayment'];
        $interest_rate = $fields['interest_rate'];
        $productAttributes = new ProductAttribute(compact('range_from', 'range_to', 'payable_months', 'number_of_years', 'minimum_downpayment', 'interest_rate'));
        $product_repo->removeProductAttribute($productAttributes, $this->product);
        $productAttribute = $product_repo->saveProductAttributes($productAttributes, $this->product);

return $productAttribute;
}
}
