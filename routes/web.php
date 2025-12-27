<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\UserController;


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




















require __DIR__.'/settings.php';
require __DIR__.'/portals.php';
require __DIR__.'/portal-requests.php';