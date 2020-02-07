<?php

namespace App\Repositories;

use App\ClientContact;
use App\Repositories\Interfaces\CustomerRepositoryInterface;
use App\Repositories\Base\BaseRepository;
use App\Customer;
use Illuminate\Support\Collection as Support;
use Illuminate\Database\Eloquent\Collection;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Factory\CustomerFactory;

/**
 * Description of CustomerRepository
 *
 * @author michael.hampton
 */
class CustomerRepository extends BaseRepository implements CustomerRepositoryInterface
{

    /**
     * CustomerRepository constructor.
     * @param Customer $customer
     */
    public function __construct(Customer $customer)
    {
        parent::__construct($customer);
        $this->model = $customer;
    }

    /**
     * List all the employees
     *
     * @param string $order
     * @param string $sort
     * @param array $columns
     * @return \Illuminate\Support\Collection
     */
    public function listCustomers(string $order = 'id', string $sort = 'desc', array $columns = ['*']): Support
    {
        return $this->all($columns, $order, $sort);
    }

    /**
     * Find the customer or fail
     *
     * @param int $id
     *
     * @return Customer
     * @throws CustomerNotFoundException
     */
    public function findCustomerById(int $id): Customer
    {
        return $this->findOneOrFail($id);
    }

    /**
     * Store clients in bulk.
     * @param array $customer
     */
    public function create($customer): ?Customer
    {
        return $this->save(
            $client, CustomerFactory::create(auth()->user()->account_user()->account_id, auth()->user()->id)
        );
    }

/**
 * Delete a customer
 *
 * @return bool
 * @throws \Exception
 */
public
function deleteCustomer(): bool
{
    return $this->delete();
}

/**
 * @param string $text
 * @return mixed
 */
public
function searchCustomer(string $text = null): Collection
{
    if (is_null($text)) {
        return $this->all();
    }
    return $this->model->searchCustomer($text)->get();
}

public function getModel() {
    return $this->model;
}

/**
 *
 * @param int $number_of_days
 * @return type
 */
public
function getRecentCustomers(int $number_of_days, int $account_id)
{

    $date = Carbon::today()->subDays($number_of_days);
    $result = $this->model->select(DB::raw('count(*) as total'))
        ->where('created_at', '>=', $date)
        ->where('account_id', '=', $account_id)
        ->get();

    return !empty($result[0]) ? $result[0]['total'] : 0;
}

public
function addAddressForCustomer(array $arrData)
{
    $this->model->addresses()->updateOrCreate(
        ['customer_id' => $this->model->id], $arrData
    );
}

/**
 * Find the address attached to the customer
 *
 * @return mixed
 */
public
function findAddresses(): Support
{
    return $this->model->addresses;
}

/**
 * Saves the client and its contacts
 *
 * @param      array $data The data
 * @param      \App\Models\Client $client The client
 *
 * @return     Client|\App\Models\Client|null  Client Object
 */
public
function save(array $data, Customer $customer) : ?Customer
	{
        $customer->fill($data);

        if (isset($data['password'])) {
            $customer->password = bcrypt($data['password']);
        }

        $customer->save();

        if (isset($data['contacts'])) {
            $contacts = (new ClientContactRepository(new ClientContact))->save($data['contacts'], $customer);
        }

        return $customer->fresh();

    }

}
