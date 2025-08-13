<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Knowledgebase;
use App\Models\Disease;
use App\Models\Symptom;
use App\Models\Treatment;
use App\Models\Priorillness;

class KnowledgebaseController extends Controller
{
    /**
     * Display a listing of the knowledgebases with related data.
     */
    public function index()
    {
        $knowledgebases = Knowledgebase::with([
            'disease',
            'symptom',
            'treatment',
            'priorillness'
        ])->get();

        $diseases = Disease::all();
        $symptoms = Symptom::all();
        $treatments = Treatment::all();
        $priorillnesses = Priorillness::all();

        return inertia('ListDisease/ListDisease', [
            'knowledgebases' => $knowledgebases,
            'diseases' => $diseases,
            'symptoms' => $symptoms,
            'treatments' => $treatments,
            'priorillnesses' => $priorillnesses,
        ]);
    }

    /**
     * Store a newly created knowledgebase in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            // Disease
            'disease_name' => 'required|string',
            'disease_type' => 'required|string',
            // Symptom(s)
            'symptom_ids' => 'required|array',
            'symptom_ids.*' => 'exists:symptoms,symptom_id',
            // Treatment
            'treatment_description' => 'required|string',
            // Priorillness
            'priorillness_id' => 'required|exists:priorillnesses,id',
        ]);

        // Create or get Disease
        $disease = Disease::firstOrCreate(
            ['diseases_name' => $data['disease_name']],
            ['type' => $data['disease_type'], 'description' => '']
        );

        // Create or get Treatment
        $treatment = Treatment::firstOrCreate(
            ['description' => $data['treatment_description']]
        );

        // For each symptom, create a knowledgebase entry
        foreach ($data['symptom_ids'] as $symptom_id) {
            Knowledgebase::create([
                'disease_id' => $disease->id,
                'symptom_id' => $symptom_id,
                'treatment_id' => $treatment->id,
                'priorillness_id' => $data['priorillness_id'],
            ]);
        }

        return redirect()->route('knowledgebases.index')->with('success', 'Knowledgebase created successfully');
    }
}