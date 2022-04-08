<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    use ApiResponser;

    public function index()
    {
        $categories = Category::paginate(4);
        return $this->success($categories,'Categories Fetched Successfully');
    }


    public function rules()
    {
        return [
            'category' => 'required|string|max:100',
            'type' => 'required|string|max:10'
        ];
    }


    public function store(Request $request)
    {
        $validatar = Validator::make($request->all(),$this->rules());

        if ($validatar->fails()) {
            $errors = $validatar->errors();
            return $this->error($errors, 400);
        }

        $data = $request->all();
        $data['user_id'] = 0;
        $category = Category::create($data);
        return $this->success($category,'Category Addedd Successfully');
    }


    public function show(Category $category)
    {
        return $this->success($category,'Category fetch Successfully');
    }


    public function update(Request $request, Category $category)
    {
        $validatar = Validator::make($request->all(),$this->rules());

        if ($validatar->fails()) {
            $errors = $validatar->errors();
            return $this->error($errors, 400);
        }

        $data = $request->all();
        $data['user_id'] = 0;
        $category->update($data);
        return $this->success($category,'Category Updated Successfully');

    }


    public function destroy(Category $category)
    {
        $category->delete();
        return $this->success(null,'Category Remove Successfully');
    }
}
