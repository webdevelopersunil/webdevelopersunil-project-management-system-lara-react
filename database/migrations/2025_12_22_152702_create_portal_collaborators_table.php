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
        Schema::create('portal_collaborators', function (Blueprint $table) {
            
            $table->id();
            
            // Portal reference
            $table->foreignId('portal_id')->constrained()->onDelete('cascade');
            
            // Collaborator (developer/user)
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // Permissions as JSON - can restrict actions like view, edit, delete, etc.
            $table->json('permissions')->nullable();
            
            // Status of collaboration
            $table->enum('status', ['active', 'inactive', 'pending', 'revoked'])->default('active');
            
            // Collaboration details
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->text('notes')->nullable();
            
            // Timestamps
            $table->timestamps();
            
            // Ensure unique collaboration per portal-user
            $table->unique(['portal_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('portal_collaborators');
    }
};
