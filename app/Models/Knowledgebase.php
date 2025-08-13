<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Knowledgebase extends Model
{
    protected $fillable = [
        'disease_id',
        'symptom_id',
        'treatment_id',
        'priorillness_id',
    ];

    public function disease()
    {
        return $this->belongsTo(Disease::class, 'disease_id', 'disease_id');
    }

    public function symptom()
    {
        return $this->belongsToMany(Symptom::class, 'knowledgebase_symptom');
    }

    public function treatment()
    {
        return $this->belongsToMany(Treatment::class, 'knowledgebase_treatment');
    }

    public function priorillness()
    {
        return $this->belongsToMany(Priorillness::class, 'knowledgebase_priorillness');
    }
}
