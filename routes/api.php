<?php

use App\Http\Controllers\ItemController;
use App\Http\Controllers\ItemUserController;
use App\Http\Controllers\RankingController;
use App\Http\Controllers\SocialiteController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\_CheckMoney;
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

        Route::prefix('/google')->group(function () {
            Route::get('/url', [SocialiteController::class, 'getGoggleUrl']);
            Route::get('/callback', [SocialiteController::class, 'googleLoginCallback']);
        });
    });

    Route::prefix('/rankings')->group(function () {
        Route::post('/', [RankingController::class, 'store']);

        Route::prefix('/single')->group(function () {
            Route::get('/', [RankingController::class, 'getIndiv']);
            Route::get('/all', [RankingController::class, 'index']);
            Route::get('/current', [RankingController::class, 'getIndiv'])->middleware('auth:api');
        });
        Route::prefix('/multi')->group(function () {
            Route::get('/', [RankingController::class, 'getMulti']);
            Route::get('/current', [RankingController::class, 'getMulti'])->middleware('auth:api');
        });
    });

    Route::prefix('/users')->group(function () {
        Route::post('/additem', [ItemUserController::class, 'addItemToUser'])
            ->middleware('auth:api')->middleware(_CheckMoney::class);
        Route::get('/equipped', [UserController::class, 'getEquipped'])->middleware('auth:api');
        Route::post('/toggle_equipped', [UserController::class, 'toogleEquipped'])->middleware('auth:api');
        Route::post('/set_character', [UserController::class, 'setCharacter'])->middleware('auth:api');
    });

    Route::prefix('/itemusers')->group(function () {
        Route::get('/', [ItemUserController::class, 'show']);
        Route::get('/current', [ItemUserController::class, 'showAuth'])->middleware('auth:api');
    });


    Route::apiResource('/users', UserController::class);
    Route::apiResource('/items', ItemController::class);
});



