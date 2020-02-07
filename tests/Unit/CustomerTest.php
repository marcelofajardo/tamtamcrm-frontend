<?php

namespace Tests\Unit;

use App\Company;
use App\Customer;
use App\Filters\CustomerFilter;
use App\Repositories\CustomerRepository;
use App\Requests\SearchRequest;
use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Transformations\CustomerTransformable;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Collection;
use App\Brand;
use App\Factory\CustomerFactory;

class CustomerTest extends TestCase
{

    use DatabaseTransactions,
        CustomerTransformable,
        WithFaker;

    private $account_id = 1;

    private $user;

    private $company;

    public function setUp(): void
    {
        parent::setUp();
        $this->beginDatabaseTransaction();

        $this->company = factory(Company::class)->create();
        $this->user = factory(User::class)->create();
    }

    /** @test */
    public function it_can_transform_the_customer()
    {
        $customer = factory(Customer::class)->create();
        $repo = new CustomerRepository($customer);
        $customerFromDb = $repo->findCustomerById($customer->id);
        $cust = $this->transformCustomer($customer);
        //$this->assertInternalType('string', $customerFromDb->status);
        $this->assertInternalType('string', $cust->name);
    }

    /** @test */
    public function it_can_delete_a_customer()
    {
        $customer = factory(Customer::class)->create();

        $customerRepo = new CustomerRepository($customer);
        $delete = $customerRepo->deleteCustomer();
        $this->assertTrue($delete);
        //$this->assertDatabaseHas('customers', $customer->toArray());
    }

    /** @test */
    public function it_fails_when_the_customer_is_not_found()
    {
        $this->expectException(\Illuminate\Database\Eloquent\ModelNotFoundException::class);
        $customer = new CustomerRepository(new Customer);
        $customer->findCustomerById(999);
    }

    /** @test */
    public function it_can_find_a_customer()
    {
        $data = [
            'account_id' => $this->account_id,
            'first_name' => $this->faker->firstName,
            'email' => $this->faker->email,
        ];
        $customer = new CustomerRepository(new Customer);
        $factory = (new CustomerFactory())->create($this->account_id, $this->user->id, $this->company->id);
        $created = $customer->save($data, $factory);
        $found = $customer->findCustomerById($created->id);
        $this->assertInstanceOf(Customer::class, $found);
        $this->assertEquals($data['first_name'], $found->first_name);
        $this->assertEquals($data['email'], $found->email);
    }

    /** @test */
    public function it_can_update_the_customer()
    {
        $cust = factory(Customer::class)->create();
        $customer = new CustomerRepository($cust);
        $update = [
            'first_name' => $this->faker->firstName,
        ];
        $updated = $customer->save($update, $cust);
        $this->assertInstanceOf(Customer::class, $updated);
        //$this->assertEquals($update['first_name'], $cust->first_name);
        $this->assertDatabaseHas('customers', $update);
    }

    /** @test */
    public function it_can_create_a_customer()
    {
        $data = [
            'account_id' => $this->account_id,
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'email' => $this->faker->email,
            'company_id' => $this->company->id,
            'job_title' => $this->faker->jobTitle,
            'phone' => $this->faker->phoneNumber,
            'customer_type' => 1
        ];

        $data['contacts'][0]['first_name'] = $this->faker->firstName;
        $data['contacts'][0]['last_name'] = $this->faker->lastName;
        $data['contacts'][0]['phone'] = $this->faker->phoneNumber;
        $data['contacts'][0]['email'] = $this->faker->safeEmail;

        $factory = (new CustomerFactory())->create($this->account_id, $this->user->id, $this->company->id);
        $customer = new CustomerRepository(new Customer);
        $created = $customer->save($data, $factory);
        $this->assertInstanceOf(Customer::class, $created);
        $this->assertEquals($data['first_name'], $created->first_name);
        $this->assertEquals($data['email'], $created->email);
        $collection = collect($data)->except('password');
        $this->assertDatabaseHas('customers', $collection->all());
    }

    public function it_errors_creating_the_customer_when_required_fields_are_not_passed()
    {
        $this->expectException(\Illuminate\Database\QueryException::class);
        $task = new CustomerRepository(new Customer);
        $task->createCustomer([]);
    }

    /** @test */
    public function it_can_list_all_customers()
    {
        factory(Customer::class, 5)->create();
        $list = (new CustomerFilter(new CustomerRepository(new Customer)))->filter(new SearchRequest(),
            $this->account_id);
        $this->assertNotEmpty($list);
        $this->assertInstanceOf(Customer::class, $list[0]);
    }

    public function tearDown(): void
    {
        parent::tearDown();
    }

}
