<?php

namespace App\Http\Controllers;

use App\Models\Transcation;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TranscationController extends Controller
{
    use ApiResponser;

    public function index()
    {
        $categories = Transcation::with('category')->get();
        return $this->success($categories,'Records Fetched Successfully');
    }


    public function rules()
    {
        return [
            'category_id' => 'required',
            'amount' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'category_id.required' => 'Category is required',
        ];
    }


    public function store(Request $request)
    {
        $validatar = Validator::make($request->all(),$this->rules(),$this->messages());

        if ($validatar->fails()) {
            $errors = $validatar->errors();
            return $this->error($errors, 400);
        }

        $data = $request->all();
        $data['user_id'] = 0;
        $transcation = Transcation::create($data);
        return $this->success($transcation,'Transcation Addedd Successfully');
    }


    public function show(Transcation $transcation)
    {
        $transcation->category = $transcation->category;
        return $this->success($transcation,'Transcation fetch Successfully');
    }


    public function update(Request $request, Transcation $transcation)
    {
        $validatar = Validator::make($request->all(),$this->rules());

        if ($validatar->fails()) {
            $errors = $validatar->errors();
            return $this->error($errors, 400);
        }

        $data = $request->all();
        $data['user_id'] = 0;
        $transcation->update($data);
        return $this->success($transcation,'Transcation Updated Successfully');

    }


    public function destroy(Transcation $transcation)
    {
        $transcation->delete();
        return $this->success(null,'Transcation Remove Successfully');
    }
}
