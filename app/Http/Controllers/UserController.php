<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Laravel\Passport\TokenRepository;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        return response()->json([
                'success' => true,
                'message' => 'User registered successfully!',
                'user' => $user
            ], 201
        );
    }

    public function login(Request $request)
    {
        if (auth()->attempt($request->all())) {
            $token = auth()->user()->createToken('passport_token')->accessToken;

            return response()->json([
                'success' => true,
                'message' => 'Login successful!',
                'token' => $token,
                'user' => auth()->user()
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Username or password not found!'
        ], 401);
    }

    public function currentUser()
    {
        return response()->json([
            'success' => true,
            'message' => 'Data fetched successfully.',
            'data' => auth()->user()
        ]);
    }

    public function logout()
    {
        $access_token = auth()->user()->token();

        $tokenRepository = app(TokenRepository::class);
        $tokenRepository->revokeAccessToken($access_token->id);

        return response()->json([
            'success' => true,
            'message' => 'User logout successfully.'
        ]);
    }
}
