<?php
/**
 * Created by PhpStorm.
 * User: michael.hampton
 * Date: 23/11/2019
 * Time: 13:46
 */

namespace App\Http\Controllers;

use App\Repositories\Interfaces\CountryRepositoryInterface;


class CountryController extends Controller
{

    private $countryRepo;


    public function __construct(CountryRepositoryInterface $countryRepository)
    {
        $this->countryRepo = $countryRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $list = $this->countryRepo->listCountries('created_at', 'desc');

        return response()->json($list);
    }
}