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
        Schema::create('portal_request_documents', function (Blueprint $table) {
            $table->id();
            
            // Foreign key to portal_requests table
            $table->foreignId('portal_request_id')
                  ->constrained('portal_requests')
                  ->onDelete('cascade');
            
            // Document name
            $table->string('name');
            
            // Document path (storage path)
            $table->string('path');
            
            // Additional document metadata
            $table->string('original_name')->nullable();
            $table->string('mime_type')->nullable();
            $table->integer('size')->nullable(); // in bytes
            $table->string('extension')->nullable();
            
            // Timestamps
            $table->timestamps();
            $table->softDeletes();
            
            // Indexes for better performance
            $table->index('portal_request_id');
            $table->index('name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('portal_request_documents');
    }
};