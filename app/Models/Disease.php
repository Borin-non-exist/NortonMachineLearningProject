<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Symptom;

class Disease extends Model
{
    protected $table = 'diseases';

    protected $fillable = [
        'disease_name',
        'type',
        'description',
    ];

    public function symptoms()
    {
        return $this->belongsToMany(
            Symptom::class,
            'diagnosis_symptoms',
            'diagnosis_id', // Foreign key on the pivot table for Disease
            'symptom_id'    // Foreign key on the pivot table for Symptom
        );
    }
}
