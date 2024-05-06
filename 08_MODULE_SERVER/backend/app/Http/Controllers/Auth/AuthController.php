<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Administrator;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function index()
    {
        $user = Auth::guard('user');
        if ($user->check()) {
            return response()->json(['user' => $user->user()]);
        }
        $admin = Auth::guard('admin');
        if ($admin->check()) {
            return response()->json(['user' => $admin->user()]);
        }
    }
    public function signup(Request $request)
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

        $user = User::where('username', $userCreated->username)->first();
        if ($user && Hash::check($request->password, $user->password)) {
            $token = $user->createToken(Str::random(100))->plainTextToken;
            return response()->json([
                'status' => 'Success',
                'token' => $token,
            ], 201);
        }
    }

    public function signin(Request $request)
    {
        $validUser = Validator::make($request->all(), [
            'username' => 'required|min:4|max:60',
        ]);
        if ($validUser->fails()) {
            return response()->json([
                'status' => 'invalid',
                'message' => $validUser->errors()->first()
            ], 422);
        }

        $validPass = Validator::make($request->all(), [
            'password' => 'required|min:5|max:20'
        ]);
        if ($validPass->fails()) {
            return response()->json([
                'status' => 'invalid',
                'message' => $validPass->errors()->first()
            ], 422);
        }


        $admin = Administrator::where('username', $request->username)->first();
        if ($admin && Hash::check($request->password, $admin->password)) {
            $token = $admin->createToken(Str::random(100))->plainTextToken;
            return response()->json([
                'status' => 'Success',
                'token' => $token,
            ], 201);
        }

        $user = User::where('username', $request->username)->first();
        if ($user && Hash::check($request->password, $user->password)) {
            $token = $user->createToken(Str::random(100))->plainTextToken;
            return response()->json([
                'status' => 'Success',
                'token' => $token,
            ], 201);
        }

        return response()->json(['status' => 'invalid', 'message' => 'Wrong username or password'], 401);
    }

    public function signout(Request $request)
    {
        $user = Auth::guard('user');
        $admin = Auth::guard('admin');
        if ($user->check()) {
            $user->user()->tokens()->delete();
            return response()->json([
                'status' => 'success'
            ]);
        }
        if ($admin->check()) {
            $admin->user()->tokens()->delete();
            return response()->json([
                'status' => 'success'
            ]);
        }
        return response()->json(['status' => 'invalid'], 400);
    }
}
