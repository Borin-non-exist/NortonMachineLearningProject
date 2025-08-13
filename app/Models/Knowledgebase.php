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
        return $this->belongsTo(Disease::class, 'disease_id');
    }

    public function symptom()
    {
        return $this->belongsTo(Symptom::class, 'symptom_id');
    }

    public function treatment()
    {
        return $this->belongsTo(Treatment::class, 'treatment_id');
    }

    public function priorillness()
    {
        return $this->belongsTo(Priorillness::class, 'priorillness_id');
    }
}