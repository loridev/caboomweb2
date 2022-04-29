<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    public function getGoggleUrl()
    {
        return Socialite::driver('google')->stateless()->redirect();
    }

    public function googleLoginCallback()
    {
        $googleUser = Socialite::with('google')->stateless()->with(['access_type' => 'offline'])->user();
        $user = User::query()->where('social_id', $googleUser->getId())->first();

        if (!is_null($user)) {
            $token = $user->createToken('passport_token')->accessToken;

            return view('google', compact('token'));
        } else {
            return view('google', compact('googleUser'));
        }

    }
}
