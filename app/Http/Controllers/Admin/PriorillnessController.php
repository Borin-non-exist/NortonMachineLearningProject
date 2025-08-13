<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Priorillness;

class PriorillnessController extends Controller
{
    /**
     * Store a newly created priorillness in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'priorillness_name' => 'required|string|unique:priorillnesses,priorillness_name',
        ]);
        $priorillness = Priorillness::create($data);

        // Return the new priorillness for frontend update
        return back()->with([
            'priorillness' => $priorillness,
        ]);
    }
}