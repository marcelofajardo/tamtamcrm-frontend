<?php

namespace App\Filters;

use App\Customer;
use App\Repositories\CustomerRepository;
use App\Requests\SearchRequest;
use App\Transformations\CustomerTransformable;

class CustomerFilter extends QueryFilter
{
    use CustomerTransformable;

    private $customerRepository;

    private $model;

    /**
     * CustomerFilter constructor.
     * @param CustomerRepository $customerRepository
     */
    public function __construct(CustomerRepository $customerRepository)
    {
        $this->customerRepository = $customerRepository;
        $this->model = $customerRepository->getModel();
    }

    /**
     * @param SearchRequest $request
     * @param int $account_id
     * @return \Illuminate\Pagination\LengthAwarePaginator|mixed
     */
    public function filter(SearchRequest $request, int $account_id)
    {
        $recordsPerPage = !$request->per_page ? 0 : $request->per_page;
        $orderBy = !$request->column || $request->column === 'name' ? 'first_name' : $request->column;
        $orderDir = !$request->order ? 'asc' : $request->order;

        $this->query = $this->model->select('*');

        if ($request->has('status')) {
            $this->status($request->status);
        }

        if ($request->filled('company_id')) {
            $this->query->whereCompanyId($request->company_id);
        }

        if ($request->filled('group_settings_id')) {
            $this->query->whereGroupSettingsId($request->group_settings_id);
        }

        if ($request->filled('customer_type')) {
            $this->query->whereCustomerType($request->customer_type);
        }

          if ($request->has('search_term') && !empty($request->search_term)) {
                    $this->query = $this->searchFilter($request->search_term);
                }

        $this->addAccount($account_id);

        $this->orderBy($orderBy, $orderDir);

        $customers = $this->transformList();

        if ($recordsPerPage > 0) {
            $paginatedResults = $this->customerRepository->paginateArrayResults($customers, $recordsPerPage);
            return $paginatedResults;
        }

        return $customers;
    }

    public function searchFilter(string $filter = '')
    {
        if (strlen($filter) == 0) {
            return $this->query;
        }
        return $this->query->where(function ($query) use ($filter) {
            $query->where('first_name', 'like', '%' . $filter . '%')
                ->orWhere('last_name', 'like', '%' . $filter . '%')
                ->orWhere('email', 'like', '%' . $filter . '%')
                ->orWhere('custom_value1', 'like', '%' . $filter . '%')
                ->orWhere('custom_value2', 'like', '%' . $filter . '%')
                ->orWhere('custom_value3', 'like', '%' . $filter . '%')
                ->orWhere('custom_value4', 'like', '%' . $filter . '%');
        });
    }

    private function orderBy($orderBy, $orderDir)
    {
        $this->query->orderBy($orderBy, $orderDir);
    }

    private function addAccount(int $account_id)
    {
        $this->query->where('account_id', '=', $account_id);
    }

    /**
     * @param $list
     * @return mixed
     */
    private function transformList()
    {
        $list = $this->query->get();

        $customers = $list->map(function (Customer $customer) {
            return $this->transformCustomer($customer);
        })->all();

        return $customers;
    }

    /**
     * Filter by balance
     *
     * @param string $balance
     * @return Illuminate\Database\Query\Builder
     */
    public function balance($query, string $balance): Builder
    {
        $parts = $this->split($balance);
        return $query->where('balance', $parts->operator, $parts->value);
    }

    /**
     * Filter between balances
     *
     * @param string balance
     * @return Illuminate\Database\Query\Builder
     */
    public function between_balance($query, string $balance): Builder
    {
        $parts = explode(":", $balance);
        return $query->whereBetween('balance', [$parts[0], $parts[1]]);
    }

    /**
     * Filters the list based on the status
     * archived, active, deleted
     *
     * @param string filter
     * @return Illuminate\Database\Query\Builder
     */
    public function status(string $filter = '')
    {
        if (strlen($filter) == 0) {
            return $this->query;
        }

        $table = 'customers';
        $filters = explode(',', $filter);

        $this->query->whereNull($table . '.id');
        if (in_array(parent::STATUS_ACTIVE, $filters)) {
            $this->query->orWhereNull($table . '.deleted_at');
        }

        if (in_array(parent::STATUS_ARCHIVED, $filters)) {

            $this->query->orWhere(function ($query) use ($table) {
                $query->whereNotNull($table . '.deleted_at');
                if (!in_array($table, ['users'])) {
                    $query->where($table . '.is_deleted', '=', 0);
                }
            });

            $this->query->withTrashed();
        }
        if (in_array(parent::STATUS_DELETED, $filters)) {
            $this->query->orWhere($table . '.is_deleted', '=', 1)->withTrashed();
        }
    }

}