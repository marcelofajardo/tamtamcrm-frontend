<!doctype html>
<html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta charset="UTF-8">
        <meta name="viewport"
              content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Order Invoice</title>
        <link rel="stylesheet" href="{{asset('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css')}}">
        <style type="text/css">
            table { border-collapse: collapse;}
        </style>
    </head>
    <body>
        <section class="container">
            <div class="col-md-12">
                <h2>Hello {{$customer->first_name}} {{$customer->last_name}} !</h2>
                
                <table class="table table-striped" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <thead>
                        <tr>
                            <td>
                                Title
                            </td>
                            
                            <td>
                                Content
                            </td>
                            
                            <td>
                                Due Date
                            </td>
                        </tr>
                    </thead>
                    
                    <tbody>
                        <tr>
                            <td>{{ $task->title }}</td>
                            <td>{{ $task->content }}</td>
                            <td>{{ $task->due_date }}</td>
                        </tr>
                    </tbody>
                </table>

                <p>This order is for deliver to your: <strong>{{ ucfirst($address->alias) }} <br /></strong></p>
                <p>Address: {{$address->address_1}} {{$address->address_2}} {{$address->city}} {{$address->state_code}}, UK</p>
                <table class="table table-striped" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <thead>
                        <tr>
                            <th class="col-md-2">SKU</th>
                            <th class="col-md-2">Name</th>
                            <th class="col-md-3">Description</th>
                            <th class="col-md-4 text-right">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($products as $product)
                        <tr>
                            <td>{{$product->sku}}</td>
                            <td>{{$product->name}}</td>
                            <td>
                                {{$product->description}}
                                @php($pattr = \App\Shop\ProductAttributes\ProductAttribute::find($product->pivot->product_attribute_id))
                                @if(!is_null($pattr))<br>
                                @foreach($pattr->attributesValues as $it)
                                <p class="label label-primary">{{ $it->attribute->name }} : {{ $it->value }}</p>
                                @endforeach
                                @endif
                            </td>
                            <td class="text-right">{{config('cart.currency')}} {{number_format($product->price * $product->pivot->quantity, 2)}}</td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </section>
    </body>
</html>
