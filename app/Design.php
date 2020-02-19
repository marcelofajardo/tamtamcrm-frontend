<?php
namespace App;

 use Illuminate\Database\Eloquent\Model;
 use Illuminate\Database\Eloquent\SoftDeletes;

 class Design extends Model
 {
     protected $casts = [
         'design' => 'object'
     ];


     public function account()
     {
         return $this->belongsTo(Account::class);
     }

 } 
