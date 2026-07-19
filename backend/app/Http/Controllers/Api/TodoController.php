<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TodoRequest;
use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Get all todos of authenticated user.
     */
    public function index()
    {
        $todos = auth()->user()
            ->todos()
            ->latest()
            ->get();

        return response()->json([
            'todos' => $todos
        ]);
    }


    /**
     * Create a new todo.
     */
    public function store(TodoRequest $request)
    {
        $todo = auth()->user()
            ->todos()
            ->create([
                'title' => $request->title,
                'description' => $request->description,
                'status' => $request->status ?? 'pending',
            ]);

        return response()->json([
            'message' => 'Todo created successfully.',
            'todo' => $todo
        ], 201);
    }
}