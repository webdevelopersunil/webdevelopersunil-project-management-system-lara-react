<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;



Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard',[DashboardController::class, 'index'])->name('dashboard');
    Route::get('dashboard/2',[DashboardController::class, 'index2'])->name('dashboard-2');
    Route::get('dashboard/3',[DashboardController::class, 'index3'])->name('dashboard-3');
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