<?php

namespace App\Http\Controllers;

use App\Models\Level;

class LevelController extends Controller
{
    public function show($altId)
    {
        $level = Level::query()->where('altId', $altId)->first();

        return response()->json(
            $level,
            200
        );
    }
}
