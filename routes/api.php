<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\DiagnosisController;

Route::post('/diagnose', [DiagnosisController::class, 'store'])->name('diagnose.store');
Route::get('/results', [DiagnosisController::class, 'showResults'])->name('diagnose.results');