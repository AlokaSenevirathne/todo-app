<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TodoRequest;
use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Display all todos with optional search and filter.
     */
    public function index(Request $request)
    {
        $query = auth()->user()->todos();

        // Search by title
        if ($request->filled('search')) {
            $query->where('title', 'ILIKE', '%' . $request->search . '%');
        }

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $todos = $query->latest()->get();

        return response()->json([
            'todos' => $todos
        ]);
    }

    /**
     * Store a newly created todo.
     */
    public function store(TodoRequest $request)
    {
        $todo = auth()->user()->todos()->create([
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status ?? 'pending',
        ]);

        return response()->json([
            'message' => 'Todo created successfully.',
            'todo' => $todo
        ], 201);
    }

    /**
     * Update the specified todo.
     */
    public function update(TodoRequest $request, Todo $todo)
    {
        if ($todo->user_id !== auth()->id()) {
            return response()->json([
                'message' => 'Unauthorized.'
            ], 403);
        }

        $todo->update([
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status,
        ]);

        return response()->json([
            'message' => 'Todo updated successfully.',
            'todo' => $todo
        ]);
    }

    /**
     * Delete the specified todo.
     */
    public function destroy(Todo $todo)
    {
        if ($todo->user_id !== auth()->id()) {
            return response()->json([
                'message' => 'Unauthorized.'
            ], 403);
        }

        $todo->delete();

        return response()->json([
            'message' => 'Todo deleted successfully.'
        ]);
    }

    /**
     * Mark todo as completed.
     */
    public function markCompleted(Todo $todo)
    {
        if ($todo->user_id !== auth()->id()) {
            return response()->json([
                'message' => 'Unauthorized.'
            ], 403);
        }

        $todo->update([
            'status' => 'completed'
        ]);

        return response()->json([
            'message' => 'Todo marked as completed.',
            'todo' => $todo
        ]);
    }

    /**
     * Mark todo as pending.
     */
    public function markPending(Todo $todo)
    {
        if ($todo->user_id !== auth()->id()) {
            return response()->json([
                'message' => 'Unauthorized.'
            ], 403);
        }

        $todo->update([
            'status' => 'pending'
        ]);

        return response()->json([
            'message' => 'Todo marked as pending.',
            'todo' => $todo
        ]);
    }
}