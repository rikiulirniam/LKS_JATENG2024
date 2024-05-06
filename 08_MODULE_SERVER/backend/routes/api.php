<?php

use App\Http\Controllers\AdministratorController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\GameController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Auth\Middleware\Authenticate;
use Illuminate\Support\Facades\Auth;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {

    Route::post('auth/signup', [AuthController::class, 'signup']);
    Route::post('auth/signin', [AuthController::class, 'signin']);

    Route::middleware('auth:user,admin')->group(function () {
        Route::post('auth/signout', [AuthController::class, 'signout']);
        Route::get('users/{name}', [UserController::class, 'show']);
        Route::apiResource('games', GameController::class);
        Route::get('auth/me', [AuthController::class, 'index']);
    });

    Route::middleware(Admin::class)->group(function () {
        Route::apiResource('admins', AdministratorController::class);
        Route::get('users', [UserController::class, 'index']);
        Route::post('users', [UserController::class, 'store']);
        Route::put('users/{id}', [UserController::class, 'update']);
        Route::delete('users/{id}', [UserController::class, 'destroy']);
    });

    Route::middleware('auth:user')->group(function () {
    });
    Route::get('{wrong}', function () {
        return response()->json([
            'status' => 'not found',
            'message' => 'Not Found'
        ], 404);
    });
});
