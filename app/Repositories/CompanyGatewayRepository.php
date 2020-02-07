<?php
namespace App\Repositories;

use App\CompanyGateway;
use App\Repositories\Base\BaseRepository;
use Illuminate\Http\Request;

/**
 * Class CompanyGatewayRepository
 * @package App\Repositories
 */
class CompanyGatewayRepository extends BaseRepository
{
    /**
     * AccountRepository constructor.
     * @param CompanyGateway $company_gateway
     */
    public function __construct(CompanyGateway $company_gateway)
    {
        parent::__construct($company_gateway);
        $this->model = $company_gateway;
    }

    /**
     * @param int $id
     * @return CompanyGateway
     */
    public function findCompanyGatewayById(int $id): CompanyGateway
    {
        return $this->findOneOrFail($id);
    }

    /**
     * @param $gateway_key
     * @return mixed
     */
    public function getCompanyGatewayByGatewayKey(string $gateway_key) : ?CompanyGateway {
        return $this->model->where('gateway_key', '=', $gateway_key)->first();
    }
}
