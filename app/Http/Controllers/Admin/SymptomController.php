<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Symptom;

class SymptomController extends Controller
{
    public function index()
    {
        return response()->json(Symptom::pluck('name'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:symptoms,name',
        ]);
        $symptom = Symptom::create(['name' => $request->name]);
        //return response()->json($symptom);
        return back()->with([
            'symptom' => $symptom,
        ]);
    }
}
