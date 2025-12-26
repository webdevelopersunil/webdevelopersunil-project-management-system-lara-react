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
        Schema::create('portal_requests', function (Blueprint $table) {
            $table->id();
            
            // Foreign key to portals table
            $table->foreignId('portal_id')
                  ->constrained('portals')
                  ->onDelete('cascade');
            
            // Foreign key to users table (submitted_by)
            $table->foreignId('submitted_by')
                  ->constrained('users')
                  ->onDelete('cascade');
            
            // Priority: Low, Medium, High
            $table->enum('priority', ['Low', 'Medium', 'High'])
                  ->default('Medium');
            
            // Status: Approved, Rejected, Pending, Under Review, etc.
            $table->enum('status', [
                'Pending',
                'Under Review',
                'Approved',
                'Rejected',
                'Cancelled',
                'Completed'
            ])->default('Pending');
            
            // Request UUID for unique identification/reference
            $table->uuid('request_uuid')->unique();
            
            // Comments field - where all roles/notes/feedback will be stored
            $table->text('comments')->nullable();
            
            // Additional metadata
            $table->text('reason')->nullable(); // Reason for approval/rejection
            $table->timestamp('reviewed_at')->nullable();
            $table->foreignId('reviewed_by')->nullable()->constrained('users');
            
            // Timestamps
            $table->timestamps();
            $table->softDeletes();
            
            // Indexes for better performance
            $table->index('portal_id');
            $table->index('submitted_by');
            $table->index('status');
            $table->index('priority');
            $table->index('request_uuid');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('portal_requests');
    }
};