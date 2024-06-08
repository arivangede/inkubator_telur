<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\IotController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware('auth')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Beranda');
    })->name('beranda');

    Route::get('/monitoring', function () {
        return Inertia::render('Monitoring');
    })->name('monitoring');

    Route::get('/pengontrolan', function () {
        return Inertia::render('Pengontrolan');
    })->name('pengontrolan');
});

// rute login
Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');
Route::post('/login', [AuthController::class, 'login']);

// rute register
Route::get('/register', function () {
    return Inertia::render('Auth/Register');
})->name('register');
Route::post('/register', [AuthController::class, 'register']);

// rute logout
Route::post('/logout', [AuthController::class, 'logout']);

// rute sensor
Route::post('/post-data', [IotController::class, 'receiveData']);
Route::get('/data-sensor', [IotController::class, 'displayData']);
Route::get('/sensor-history', [IotController::class, 'getSensorsHistory']);

// rute mode
Route::post('/mode', [IotController::class, 'writeCommandMode']);
Route::get('/mode', [IotController::class, 'getMode']);

// rute control jarak jauh
Route::post('/control', [IotController::class, 'writeControl']);
Route::get('/control', [IotController::class, 'getControl']);
