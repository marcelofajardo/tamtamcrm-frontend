<?php

namespace App\Repositories;

use App\Address;
use Illuminate\Support\Collection;
use App\Repositories\Base\BaseRepository;
use App\Repositories\Interfaces\AddressRepositoryInterface;
use App\Customer;

class AddressRepository extends BaseRepository implements AddressRepositoryInterface
{

    /**
     * AddressRepository constructor.
     * @param Address $address
     */
    public function __construct(Address $address)
    {
        parent::__construct($address);
        $this->model = $address;
    }

    /**
     * List all the address
     *
     * @param string $order
     * @param string $sort
     * @param array $columns
     * @return array|Collection
     */
    public function listAddress(string $order = 'id', string $sort = 'desc', array $columns = ['*']): Collection
    {
        return $this->all($columns, $order, $sort);
    }

    /**
     * @param array $data
     * @return bool
     */
    public function updateAddress(array $data): bool
    {
        return $this->update($data);
    }

    /**
     * Delete the address
     *
     */
    public function deleteAddress()
    {
        $this->model->customer()->dissociate();
        return $this->model->delete();
    }

    /**
     * Return the address
     *
     * @param int $id
     *
     * @return Address
     * @throws AddressNotFoundException
     */
    public function findAddressById(int $id): Address
    {
        return $this->findOneOrFail($id);
    }

    /**
     * Return the customer owner of the address
     *
     * @return Customer
     */
    public function findCustomer(): Customer
    {
        return $this->model->customer;
    }

    /**
     * Return the address
     *
     * @param int $id
     *
     * @return Address
     * @throws AddressNotFoundException
     */
    public function findCustomerAddressById(int $id, Customer $customer): Address
    {
        return $customer
            ->addresses()
            ->whereId($id)
            ->firstOrFail();
    }

    /**
     * Attach the customer to the address
     *
     * @param Address $address
     * @param Customer $customer
     */
    public function attachToCustomer(Address $address, Customer $customer)
    {
        $customer->addresses()->save($address);
    }

    /**
     * @param string $text
     * @return mixed
     */
    public function searchAddress(string $text = null): Collection
    {
        if (is_null($text)) {
            return $this->all(['*'], 'address_1', 'asc');
        }
        return $this->model->searchAddress($text)->get();
    }

}
