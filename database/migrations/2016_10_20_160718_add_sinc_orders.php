<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSincOrders extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->timestamp('sinc_at')->nullable()->default('0000-00-00 00:00:00');
            $table->timestamp('ini_at')->nullable()->default('0000-00-00 00:00:00');
            $table->timestamp('close_at')->nullable()->default('0000-00-00 00:00:00');
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
            $table->dropColumn('sinc_at');
            $table->dropColumn('ini_at');
            $table->dropColumn('close_at');
        });
    }
}
