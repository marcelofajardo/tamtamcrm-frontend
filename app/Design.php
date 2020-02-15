<?php
namespace App;

 use Illuminate\Database\Eloquent\Model;
 use Illuminate\Database\Eloquent\SoftDeletes;

 class Design extends Model
 {

     public function account()
     {
         return $this->belongsTo(Account::class);
     }

 } 
