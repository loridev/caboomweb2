<?php

namespace App\Http\Controllers;

use http\Client\Curl\User;
use Illuminate\Http\Request;
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
        $user = User::where('social_id', $googleUser->getId());

        if ($user) {
            $token = $user->createToken('passport_token')->accessToken;

            return response()->json([
                'message' => 'User logged in successfully!',
                'token' => $token
            ]);
        } else {
            return response()->json([
                'message' => 'User has to fill username and password',
                'googleData' => [
                    'social_id' => $googleUser->id,
                    'email' => $googleUser->getEmail,
                ]
            ]);
        }

    }
}
