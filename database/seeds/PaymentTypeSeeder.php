<?php
use Illuminate\Database\Seeder;
use App\PaymentMethod;

class PaymentTypeSeeder extends Seeder
{
    public function run()
    {
        Eloquent::unguard();
        $paymentTypes = [
            ['name' => 'Apply Credit'],
            ['name' => 'Bank Transfer', 'gateway_type_id' => 2],
            ['name' => 'Cash'],
            ['name' => 'Debit', 'gateway_type_id' => 1],
            ['name' => 'ACH', 'gateway_type_id' => 2],
            ['name' => 'Visa Card', 'gateway_type_id' => 1],
            ['name' => 'MasterCard', 'gateway_type_id' => 1],
            ['name' => 'American Express', 'gateway_type_id' => 1],
            ['name' => 'Discover Card', 'gateway_type_id' => 1],
            ['name' => 'Diners Card', 'gateway_type_id' => 1],
            ['name' => 'EuroCard', 'gateway_type_id' => 1],
            ['name' => 'Nova', 'gateway_type_id' => 1],
            ['name' => 'Credit Card Other', 'gateway_type_id' => 1],
            ['name' => 'PayPal', 'gateway_type_id' => 3],
            ['name' => 'Google Wallet'],
            ['name' => 'Check'],
            ['name' => 'Carte Blanche', 'gateway_type_id' => 1],
            ['name' => 'UnionPay', 'gateway_type_id' => 1],
            ['name' => 'JCB', 'gateway_type_id' => 1],
            ['name' => 'Laser', 'gateway_type_id' => 1],
            ['name' => 'Maestro', 'gateway_type_id' => 1],
            ['name' => 'Solo', 'gateway_type_id' => 1],
            ['name' => 'Switch', 'gateway_type_id' => 1],
            ['name' => 'iZettle', 'gateway_type_id' => 1],
            ['name' => 'Swish', 'gateway_type_id' => 2],
            ['name' => 'Venmo'],
            ['name' => 'Money Order'],
            ['name' => 'Alipay', 'gateway_type_id' => 4],
            ['name' => 'Sofort', 'gateway_type_id' => 5],
            ['name' => 'SEPA', 'gateway_type_id' => 6],
            ['name' => 'GoCardless', 'gateway_type_id' => 7],
            ['name' => 'Crypto', 'gateway_type_id' => 8],
        ];
        foreach ($paymentTypes as $paymentType) {
            $record = \App\PaymentMethod::where('name', '=', $paymentType['name'])->first();
            if ($record) {
                $record->name = $paymentType['name'];
                $record->gateway_type_id = !empty($paymentType['gateway_type_id']) ? $paymentType['gateway_type_id'] : null;
                $record->save();
            } else {
                \App\PaymentMethod::create($paymentType);
            }
        }
    }
}
