<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Inertia\Inertia;

class DiagnosisController extends Controller
{
    public function store(Request $req)
    {
        $data = $req->validate([
            'symptoms'        => 'required|array|min:1',
            'symptoms.*'      => 'string',
            'priorIllnesses'  => 'nullable|array',
            'priorIllnesses.*'=> 'string'
        ]);

        $client  = new Client(['timeout' => 8]);
        $headers = [];
        if (config('services.ml.key')) {
            $headers['X-API-KEY'] = config('services.ml.key');
        }

        try {
            $res = $client->post(config('services.ml.url').'/api/v1/predict_by_names', [
                'headers' => $headers,
                'json'    => [
                    'symptoms' => $data['symptoms'],
                    'prior_illnesses' => $data['priorIllnesses'] ?? []
                ],
            ]);
            $body = json_decode((string) $res->getBody(), true);

            // Store form + result in session
            session([
                'formData'  => [
                    'ageRange'      => $req->input('ageRange'),
                    'weight'        => $req->input('weight'),
                    'mainSymptom'   => $data['symptoms'],
                    'priorIllnesses'=> $data['priorIllnesses'] ?? [],
                ],
                'diagnosis' => $body
            ]);

            return redirect()->route('diagnose.results');

        } catch (\Throwable $e) {
            return back()->withErrors(['diagnose' => 'ML service error: '.$e->getMessage()]);
        }
    }

    public function showResults()
    {
        return Inertia::render('WelcomePage/resultspage', [
            'formData'  => session('formData'),
            'diagnosis' => session('diagnosis')
        ]);
    }
}
