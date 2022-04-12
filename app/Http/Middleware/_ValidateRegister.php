<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class _ValidateRegister
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\JsonResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:3|max:12|alpha_num',
            'email' => 'required|string|email',
            'password' => 'required|string|min:8|regex:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/',
            'confirmPassword' => 'required|same:password'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Wrong input data!',
                'errors' => $validator->errors()
            ], 400);
        }

        if (User::query()->where('email', $request->email)->orWhere('name', $request->name)->first()) {
            return response()->json([
                'success' => false,
                'message' => 'Wrong input data!',
                'errors' => ['repeatedField' => ['User with that name or email already exists!']]
            ], 400);
        }

        return $next($request);
    }
}
