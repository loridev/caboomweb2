<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\ItemUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Passport\TokenRepository;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();

        foreach ($users as $user) {
            $user['rankings'] = $user->rankings;
            $user['items'] = $user->items;
        }

        return response()->json(
            $users
        );
    }

    public function show(User $user)
    {
        $user->rankings;
        $user->items;

        return response()->json([
            $user
        ]);
    }

    public function update(Request $request, User $user) {
        $user->fill($request->all())->save();

        return response()->json([
            'message' => 'User updated successfully!',
            'user' => $user
        ]);
    }

    public function destroy(User $user) {
        $user->delete();

        return response()->noContent();
    }

    public function register(Request $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'is_admin' => $request->is_admin ? $request->is_admin : false,
            'money' => $request->money ? $request->money : 0,
            'indiv_level' => $request->indiv_level ? $request->indiv_level : '1-1',
            'multi_wins' => $request->multi_wins ? $request->multi_wins : 0,
            'social_id' => $request->social_id ? $request->social_id : null,
            'character' => $request->character ? $request->character : 'CARLOS'
        ]);

        $token = $user->createToken('passport_token')->accessToken;

        return response()->json([
                'success' => true,
                'message' => 'User registered successfully!',
                'user' => $user,
                'token' => $token
            ], 201
        );
    }

    public function login(Request $request)
    {
        if (auth()->attempt($request->all())) {
            $user = auth()->user();
            $token = $user->createToken('passport_token')->accessToken;
            $user->items;

            return response()->json([
                'success' => true,
                'message' => 'Login successful!',
                'token' => $token,
                'user' => $user
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Username or password not found!'
        ], 401);
    }

    public function currentUser()
    {
        auth()->user()->items;
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

    public function getEquipped()
    {
        $items = Auth::user()->items()->where('equipped', 1)->get();

        return response()->json($items);
    }

    public function toogleEquipped(Request $request)
    {
        $itemUser = ItemUser::query()->where('item_id', $request->item_id)
            ->where('user_id', Auth::id());

        $equipped = $itemUser->first()->equipped;

        $item = Item::find($request->item_id);

        $itemsType = Auth::user()->items()->where('equipped', 1)
            ->where('type', $item->type);

        $edit = ['equipped' => 0];

        if (!is_null($itemsType->first())) {
            $itemsType->update($edit);
        }

        $edit['equipped'] = $equipped === 0 ? 1 : 0;

        $itemUser->update($edit);

        return response()->json($itemUser->first());
    }

    public function setCharacter(Request $request) {
        User::query()->where('id', Auth::id())->update($request->all());

        return response()->json(Auth::user());
    }
}
