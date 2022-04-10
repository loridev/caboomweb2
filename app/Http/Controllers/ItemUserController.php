<?php

namespace App\Http\Controllers;

use App\Models\ItemUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ItemUserController extends Controller
{
    public function addItemToUser(Request $request)
    {
        $itemuser = ItemUser::create([
            'item_id' => $request->item_id,
            'user_id' => Auth::id()
        ]);

        return response()->json([
            'message' => 'Item added to user!',
            'relationship' => $itemuser
        ]);
    }

    public function show() {
        return response()->json(
            ItemUser::all()
        );
    }

    public function showAuth() {
        $itemUsers = ItemUser::all();

        foreach ($itemUsers as $itemUser) {
            if ($itemUser->user_id === Auth::id()) {
                $itemUser['current'] = true;
            }
        }

        return response()->json($itemUsers);
    }
}
