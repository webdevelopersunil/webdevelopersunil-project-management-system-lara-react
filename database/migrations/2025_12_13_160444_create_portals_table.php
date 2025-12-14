<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {

        Schema::create('portals', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->foreignId('owner_id')->nullable()->constrained('users')->nullOnDelete();

            $table->string('url');
            $table->string('domain')->nullable();
            $table->boolean('active')->default(true);
            $table->string('ip_address')->nullable();
            $table->enum('status', ['completed', 'pending', 'in-progress'])->default('pending');
            $table->boolean('server_backup')->default(false);
            $table->boolean('db_backup')->default(false);
            $table->boolean('migrate_to_new_server')->default(false);
            $table->string('vm_name')->nullable();
            $table->string('framework')->nullable();
            $table->double('framework_version', 8, 2)->nullable();
            $table->string('database')->nullable();
            $table->double('database_version', 8, 2)->nullable();
            $table->boolean('is_public')->default(false);
            $table->enum('machine_type', ['Windows', 'RHEL', 'Ubuntu', 'CentOS', 'Other','Not-Defined'])->default('Not-Defined');
            
            $table->timestamps();
            $table->softDeletesTz();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('portals');
    }
};
