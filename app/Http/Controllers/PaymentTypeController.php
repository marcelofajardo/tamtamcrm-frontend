<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Repositories\Interfaces\PaymentMethodRepositoryInterface;
use App\Department;
use App\Transformations\DepartmentTransformable;
use App\Requests\SearchRequest;

class PaymentTypeController extends Controller
{

    use DepartmentTransformable;

    /**
     * @var DepartmentRepositoryInterface
     */
    private $paymentMethodRepo;

    /**
     * DepartmentController constructor.
     *
     * @param PaymentMethodRepositoryInterface $paymentMethodRepo
     */
    public function __construct(PaymentMethodRepositoryInterface $paymentMethodRepo)
    {
        $this->paymentMethodRepo = $paymentMethodRepo;
    }

    /**
     * @return mixed
     */
    public function index()
    {
        $list = $this->paymentMethodRepo->listPaymentMethods();
        return response()->json($list);
    }

}
