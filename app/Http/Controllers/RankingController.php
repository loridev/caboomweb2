<?php

namespace App\Http\Controllers;

use App\Models\Ranking;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class RankingController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make(
            $request->all(),
            [
                'world_num' => 'required|integer|min:1|max:3',
                'level_num' => 'required|integer|min:1|max:4',
                'time' => 'required|integer|min:0',
                'user_id' => 'required|integer|min:0'
            ]
        );

        if ($validator->fails()) {
            return response()->json(
                [
                    'message' => 'Wrong input data!',
                    'errors' => $validator->errors()
                ], 400
            );
        }

        if (!User::find($request->user_id)) {
            return response()->json(
                [
                    'error' => 'Ranking user not found!'
                ], 404
            );
        }

        $ranking = Ranking::create($request->all());
        $ranking->user;

        return response()->json(
            [
                'message' => 'Ranking added successfully!',
                'ranking' => $ranking
            ]
        );
    }

    public function getIndiv(Request $request)
    {
        $validator = Validator::make(
            $request->query(),
            [
                'world_num' => 'required|integer|min:1|max:3',
                'level_num' => 'required|integer|min:1|max:4',
                'page' => 'nullable|integer|min:1'
            ]
        );

        if ($validator->fails()) {
            return response()->json(
                [
                    'message' => 'Wrong input data!',
                    'errors' => $validator->errors()
                ] , 400
            );
        }

        $rankings = [];

        if (!$request->query('page')) {
            $rankings = Ranking::query()->where('world_num', $request->query('world_num'))
                ->where('level_num', $request->query('level_num'))
                ->orderBy('time')->orderBy('id')
                ->get();
        } else {
            $rankings = Ranking::query()->where('world_num', intval($request->query('world_num')))
                ->where('level_num', intval($request->query('level_num')))
                ->orderBy('time')->orderBy('id')
                ->skip($request->query('page') * 5 - 5)->take(5)
                ->get();
        }

        return $this->processRanking($rankings, $request, 'indiv');
    }

    public function getMulti(Request $request) {
        $validator = Validator::make(
            $request->query(),
            [
                'page' => 'nullable|integer|min:1'
            ]
        );

        if ($validator->fails()) {
            return response()->json(
                [
                    'message' => 'Wrong input data!',
                    'errors' => $validator->errors()
                ] , 400
            );
        }

        $rankings = [];

        if (!$request->query('page')) {
            $rankings = User::query()->orderByDesc('multi_wins')->orderBy('id')->get();
        } else {
            $rankings = User::query()->orderByDesc('multi_wins')->orderBy('id')
                ->skip($request->query('page') * 5 - 5)->take(5)
                ->get();
        }

        return $this->processRanking($rankings, $request, 'multi');


    }

    /**
     * @param array $rankings
     * @param Request $request
     * @return JsonResponse
     */
    private function processRanking($rankings, Request $request, string $mode): JsonResponse
    {
        if (count($rankings) === 0) {
            return response()->json(
                [
                    'error' => 'No rankings found!'
                ], 404
            );
        }

        foreach ($rankings as $ranking) {
            $ranking->user;
        }

        if ($userId = Auth::id()) {
            foreach ($rankings as $ranking) {
                if (($ranking->user_id === $userId && $mode === 'indiv') || ($ranking->id === $userId && $mode === 'multi')) {
                    $ranking['current'] = true;
                }
            }
        }

        $returnObj = [
            'message' => 'Rankings found',
            'rankings' => $rankings
        ];

        if (!$request->query('page')) {
            if (count($rankings) % 5 === 0) {
                $returnObj['numPages'] = count($rankings) / 5;
            } else {
                $returnObj['numPages'] = floor(count($rankings) / 5) + 1;
            }
        }

        return response()->json(
            $returnObj
        );
    }
}
