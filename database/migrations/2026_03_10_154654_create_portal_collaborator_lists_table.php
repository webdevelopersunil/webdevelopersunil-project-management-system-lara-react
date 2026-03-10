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
        Schema::create('portal_collaborator_lists', function (Blueprint $table) {
            $table->id();
            $table->foreignId('portal_request_id')->constrained('portal_requests')->cascadeOnDelete();
            $table->text('text');
            $table->foreignId('document_id')->nullable()->constrained('portal_request_documents')->cascadeOnDelete();
            $table->foreignId('submitted_by')->constrained('users')->cascadeOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('portal_collaborator_lists');
    }
};
