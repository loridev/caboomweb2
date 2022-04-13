<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\ItemUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ItemUserController extends Controller
{
    public function addItemToUser(Request $request)
    {
        $itemuser = ItemUser::create([
            'item_id' => $request->item_id,
            'user_id' => Auth::id(),
            'equipped' => $request->equipped ?? false,
        ]);

        $user = User::find(Auth::id());
        $user->update(array('money' => $user->money - Item::find($request->item_id)->price));

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
