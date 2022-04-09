<?php

use App\Http\Controllers\RankingController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\_ValidateRegister;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('/v1')->group(function () {
    Route::prefix('/auth')->group(function () {
        Route::post('/register', [UserController::class, 'register'])
            ->middleware(_ValidateRegister::class);
        Route::post('/login', [UserController::class, 'login']);

        Route::middleware('auth:api')->group(function () {
            Route::post('current', [UserController::class, 'currentUser']);
            Route::post('logout', [UserController::class, 'logout']);
        });
    });

    Route::prefix('/rankings')->group(function () {
        Route::post('/', [RankingController::class, 'store']);

        Route::prefix('/single')->group(function () {
            Route::get('/', [RankingController::class, 'getIndiv']);
            Route::get('/current', [RankingController::class, 'getIndiv'])->middleware('auth:api');
        });
        Route::prefix('/multi')->group(function () {
            Route::get('/', [RankingController::class, 'getMulti']);
            Route::get('/current', [RankingController::class, 'getMulti'])->middleware('auth:api');
        });
    });

    Route::apiResource('/users', UserController::class);
});



