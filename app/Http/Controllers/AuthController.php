<?php

namespace App\Http\Controllers;

use Auth;
use App\Models\User;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    use ApiResponser;

    public function register(Request $request){



            $validator = Validator::make($request->all(),[
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|unique:users,email',
                'password' => 'required|string|min:6'
            ]);

            if ($validator->fails()) {
                $errors = $validator->errors();
                return $this->error($errors, 400);
            }

            $user = User::create([
                'name' => $request->name,
                'password' => bcrypt($request->password),
                'email' => $request->email
            ]);

            return $this->success([
                'token' => $user->createToken('API Token')->plainTextToken
            ]);


    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'email' => 'required|string|email|',
            'password' => 'required|string|min:6'
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            return $this->error($errors, 401);
        }

        if (!Auth::attempt($request->all())) {
            return $this->error('Credentials not match', 401);
        }

        return $this->success([
            'token' => auth()->user()->createToken('API Token')->plainTextToken,
            'user' => auth()->user()
        ]);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();

        return [
            'message' => 'Tokens Revoked'
        ];
    }

    public function me(){
        return Auth::user();
    }
}
