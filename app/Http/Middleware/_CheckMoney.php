<?php

namespace App\Http\Middleware;

use App\Models\Item;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class _CheckMoney
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
        if (User::find(Auth::id())->money < Item::find($request->item_id)->price) {
            return response()->json([
                'error' => "You don't have enough money to buy this item!"
            ], 400);
        }
        return $next($request);
    }
}
