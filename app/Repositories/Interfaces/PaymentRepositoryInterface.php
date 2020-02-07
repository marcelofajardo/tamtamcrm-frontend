<?php
namespace App\Repositories\Interfaces;

use App\Repositories\Base\BaseRepositoryInterface;
use App\Payment;
use Illuminate\Support\Collection;

interface PaymentRepositoryInterface extends BaseRepositoryInterface
{

    public function findPaymentById(int $id) : Payment;

    public function listPayments(array $columns = ['*'], string $order = 'id', string $sort = 'desc') : Collection;

    public function deletePayment();

    /**
     * @param array $request
     * @param Payment $payment
     * @return Payment|null
     */
    public function save(array $request, Payment $payment) : ?Payment;
}
