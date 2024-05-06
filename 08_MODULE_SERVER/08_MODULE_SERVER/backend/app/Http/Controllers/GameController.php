<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Http\Requests\StoreGameRequest;
use App\Http\Requests\UpdateGameRequest;
use App\Models\GameVersion;
use App\Models\Score;
use Illuminate\Http\Request;

class GameController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $page = $request->query('page', 0);
        $size = $request->query('size', 10);
        $games = Game::all();
        // $games =
        return response()->json([
            'content' => $games
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGameRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($slug)
    {
        $game = Game::query()->with('versions')->with('author')->where('slug', $slug)->first();
        $version = GameVersion::where('game_id', $game->id)->first();
        $score = Score::where('game_version_id', $version->id)->get();
        $game_demo = [
            'slug' => $game->slug,
            'title' => $game->title,
            'description' => $game->description,
            'thumbnail' => "/games/$game->slug/{$version->version}/thumbnail.png",
            'uploadTimestamp' => $game->create_at,
            'author' => $game->author->username,
            'scoreCount' => count($score),
            'gamePath' => $version->storage_path

        ];
        return response()->json($game_demo);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Game $game)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGameRequest $request, Game $game)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Game $game)
    {
        //
    }
}
