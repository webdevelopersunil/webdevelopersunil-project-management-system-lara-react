<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\UserController;

use App\Http\Controllers\PortalRequestController;


Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});


Route::middleware(['auth'])->group(function () {
    Route::resource('users', UserController::class)->only(['index']);
    Route::get('/users/{user}', [UserController::class, 'show'])->name('users.show');
    Route::put('/users/{user}/roles', [UserController::class, 'updateRoles'])->name('users.roles.update');
    Route::put('/users/{user}/status', [UserController::class, 'updateStatus'])->name('users.status.update');
});


// Users Module Routes
Route::get('users', [ UserController::class, 'index' ] )->name('users.index');














// Portal Requests Routes
Route::middleware(['auth'])->group(function () {
    Route::prefix('portal-requests')->name('portal-requests.')->group(function () {
        // Index page
        Route::get('/', [PortalRequestController::class, 'index'])->name('index');
        
        // Create page
        Route::get('/create', [PortalRequestController::class, 'create'])->name('create');
        
        // Store new request
        Route::post('/', [PortalRequestController::class, 'store'])->name('store');
        
        // Show single request
        Route::get('/{uuid}', [PortalRequestController::class, 'show'])->name('show');
        
        // Edit page
        Route::get('/{uuid}/edit', [PortalRequestController::class, 'edit'])->name('edit');
        
        // Update request
        Route::put('/{uuid}', [PortalRequestController::class, 'update'])->name('update');
        
        // Update status
        Route::put('/{uuid}/status', [PortalRequestController::class, 'updateStatus'])->name('update-status');
        
        // My requests
        Route::get('/my/requests', [PortalRequestController::class, 'myRequests'])->name('my-requests');
        
        // API-like endpoints for React components
        Route::prefix('api')->name('api.')->group(function () {
            // Get documents for a request
            Route::get('/{uuid}/documents', [PortalRequestController::class, 'getDocuments'])->name('documents');
            
            // Add document
            Route::post('/{uuid}/documents', [PortalRequestController::class, 'addDocument'])->name('add-document');
            
            // Delete document
            Route::delete('/{uuid}/documents/{documentId}', [PortalRequestController::class, 'deleteDocument'])->name('delete-document');
            
            // Get statistics
            Route::get('/statistics', [PortalRequestController::class, 'getStatistics'])->name('statistics');
        });
    });
});





require __DIR__.'/settings.php';
require __DIR__.'/portals.php';