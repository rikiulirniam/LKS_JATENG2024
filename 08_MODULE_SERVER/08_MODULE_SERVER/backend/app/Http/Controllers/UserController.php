<?php

namespace App\Http\Controllers;

use App\Http\Resources\getUsers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::all();
        return new getUsers($user);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validUser = Validator::make($request->all(), [
            'username' => 'required|unique:users|min:4|max:60',
        ]);
        $validPass = Validator::make($request->all(), [
            'password' => 'required|min:5|max:20'
        ]);
        if ($validUser->fails()) {
            return response()->json([
                'status' => 'invalid',
                'message' => $validUser->errors()->first()
            ], 422);
        }
        if ($validPass->fails()) {
            return response()->json([
                'status' => 'invalid',
                'message' => $validPass->errors()->first()
            ], 422);
        }


        $userCreated = User::create([
            'username' => $request->username,
            'password' => Hash::make($request->password)
        ]);

        return response()->json([
            'status' => 'success',
            'username' => $userCreated->username
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $name)
    {
        $user = User::where('username', $name)->first();

        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validUser = Validator::make($request->all(), [
            'username' => 'min:4|max:60',
        ]);
        $validPass = Validator::make($request->all(), [
            'password' => 'min:5|max:20'
        ]);
        if ($validUser->fails()) {
            return response()->json([
                'status' => 'invalid',
                'message' => $validUser->errors()->first()
            ], 422);
        }
        if ($validPass->fails()) {
            return response()->json([
                'status' => 'invalid',
                'message' => $validPass->errors()->first()
            ], 422);
        }

        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status' => 'not found',
                'message' => 'User not found'
            ], 404);
        }
        $user->update([
            'username' => $request->username ?? $user->username,
            'password' => Hash::make($request->password) ?? $user->password,
        ]);

        return response()->json([
            'status' => 'success',
            'username' => $user->username
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'status' => 'not found',
                'message' => 'User not found'
            ], 404);
        }
        $user->update([
            'deleted_at' => date(now())
        ]);
        return response()->json([
            'status' => 'success',
        ], 204);
    }
}
