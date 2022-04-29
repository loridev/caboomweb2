<?php

use App\Http\Controllers\SocialiteController;
use Illuminate\Support\Facades\Route;

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

Route::get('/redirect/google', [SocialiteController::class, 'getGoggleUrl']);
Route::get('/callback/google', [SocialiteController::class, 'googleLoginCallback']);

Route::get('/{path?}/{params?}/{params2?}', function () {
    return view('home');
});
