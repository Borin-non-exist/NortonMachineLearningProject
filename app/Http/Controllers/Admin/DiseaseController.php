<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Disease;
use App\Models\Symptom;
use Illuminate\Http\Request;

class DiseaseController extends Controller
{
    /**
     * Show the list of diseases.
     */
    public function index() {
        return Inertia::render('ListDisease/ListDisease', [
            'diseases' => Disease::with('symptoms')->get(),
            'symptoms' => Symptom::all(),
        ]);
    }
    
    public function store(Request $request) {
        $data = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'confidenceScore' => 'required|numeric',
            'treatment' => 'nullable|string',
            'type' => 'nullable|string',
            'symptom_ids' => 'nullable|array', // <-- Accept array of symptom IDs
            'symptom_ids.*' => 'exists:symptoms,id',
        ]);

        // Create the disease
        $disease = Disease::create([
            'name' => $data['name'],
            'description' => $data['description'] ?? null,
            'confidenceScore' => $data['confidenceScore'],
            'treatment' => $data['treatment'] ?? null,
            'type' => $data['type'] ?? null,
        ]);

        // Attach symptoms via pivot table
        if (!empty($data['symptom_ids'])) {
            $disease->symptoms()->sync($data['symptom_ids']);
        }

        return redirect()->route('diseases.index');
    }
}