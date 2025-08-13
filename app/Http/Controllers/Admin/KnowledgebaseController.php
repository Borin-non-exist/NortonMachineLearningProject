<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Knowledgebase;
use App\Models\Disease;
use App\Models\Symptom;
use App\Models\Treatment;
use App\Models\Priorillness;
use Illuminate\Support\Facades\Log;

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

        Log::info('DEBUG priorillnesses count: ' . $priorillnesses->count());
        Log::info('DEBUG inertia props:', [
            'knowledgebases' => $knowledgebases->count(),
            'diseases' => $diseases->count(),
            'symptoms' => $symptoms->count(),
            'treatments' => $treatments->count(),
            'priorillnesses' => $priorillnesses->count(),
        ]);

        return inertia('KnowledgeBase/KnowledgeBasePage', [
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
            'disease_description' => 'required|string',
            // Symptom(s)
            'symptom_ids' => 'required|array',
            'symptom_ids.*' => 'exists:symptoms,id',
            // Treatment
            'treatment_description' => 'required|string',
            // Priorillness
            'priorillness_ids' => 'required|array',
            'priorillness_ids.*' => 'exists:priorillnesses,id',
        ]);

        // Create or get Disease
        $disease = Disease::firstOrCreate(
            ['diseases_name' => $data['disease_name']],
            ['type' => $data['disease_type'], 'description' => $data['disease_description']]
        );

        // Create or get Treatment
        $treatment = Treatment::firstOrCreate(
            ['description' => $data['treatment_description']]
        );

        // For each combination of symptom and priorillness, create a knowledgebase entry
        foreach ($data['symptom_ids'] as $symptom_id) {
            foreach ($data['priorillness_ids'] as $priorillness_id) {
                Knowledgebase::create([
                    'disease_id' => $disease->id,
                    'symptom_id' => $symptom_id,
                    'treatment_id' => $treatment->id,
                    'priorillness_id' => $priorillness_id,
                ]);
            }
        }

        return redirect()->route('knowledgebases.index')->with('success', 'Knowledgebase created successfully');
    }
}