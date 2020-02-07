# TamTam CRM

TamTam CRM is an all in one invoicing, accounting and crm system. It was built to prevent the need for multiple subscriptions with data spread across multiple systems. As well as giving you full control over customers, vendors, products, events, tasks and many other features. It also includes financial management including invoices, quotes, expenses, credits and payments.

## Getting Started

git clone https://github.com/michael-hampton/taskmanager.git
composer update
npm i
npm run production
php artisan migrate:fresh --seed && php artisan db:seed --class=DatabaseSeeder

## Running the tests

Tests can be found in the tests folder 
To run then php ./vendor/phpunit/phpunit/phpunit

## Built With

* Laravel 5.8 - The backend web framework used
* React - Frontend JavaScript framework

## Contributing

We welcome all contributions. Please create a branch from master and create a pull request to master on completion. 
Please ensure that all tests work prior to creating the pull request and that there are migrations for any database changes. 
All code must follow PSR-2 guidelines.

## Versioning

All pull requests made from and to master. 

## Authors

* Michael Hampton
## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Special thanks to the invoice ninja team 
