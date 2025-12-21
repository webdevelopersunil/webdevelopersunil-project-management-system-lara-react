<?php

use App\Http\Controllers\PortalController;
use App\Http\Controllers\Settings\TwoFactorAuthenticationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    
    Route::get('portals', [PortalController::class, 'index'])->name('portal.index');

    Route::get('portals/create', [PortalController::class, 'create'])->name('portal.create');

    Route::post('portals/', [PortalController::class, 'store'])->name('portal.store');

    Route::delete('/portals/{portal}', [PortalController::class, 'destroy'])->name('portal.destroy');

    Route::get('/portals/{portal}/edit', [PortalController::class, 'edit'])->name('portal.edit');

    Route::put('/portals/{portal}', [PortalController::class, 'update'])->name('portal.update');

    Route::get('/portals/{portal}', [PortalController::class, 'show'])->name('portal.show');
});