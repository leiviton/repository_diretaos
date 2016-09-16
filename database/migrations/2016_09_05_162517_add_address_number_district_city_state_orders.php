<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddAddressNumberDistrictCityStateOrders extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->string('address_number')->nullable();
            $table->string('destrict')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->string('address_number')->nullable();
            $table->string('destrict')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->timestamp('start time')->nullable();
        });
    }
}
