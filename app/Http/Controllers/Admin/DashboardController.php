<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Disease; // Adjust this if your disease table/model has a different name
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Total counts (dynamic)
        $totalPatients = User::where('role', 'patient')->count();
        $totalDoctors = User::where('role', 'doctor')->count();
        $totalDiseases = Disease::count();

        // Weekly Patient Trend (example: patients registered per day, last 7 days)
        $weeklyPatientTrend = collect(range(6, 0))->map(function ($daysAgo) {
            $date = now()->subDays($daysAgo)->toDateString();
            return [
                'name' => \Carbon\Carbon::parse($date)->format('D'),
                'value' => User::whereDate('created_at', $date)
                    ->where('role', 'patient')
                    ->count(),
            ];
        });

        // Disease Types breakdown (pie chart)
        $diseaseTypes = Disease::select('type', DB::raw('count(*) as total'))
            ->groupBy('type')
            ->get();

        // Choose your own color scheme
        $colors = ['#3182ce', '#68d391', '#ed8936', '#f56565', '#ecc94b', '#38b2ac'];
        $pieData = $diseaseTypes->map(function ($item, $i) use ($diseaseTypes, $colors) {
            $total = $diseaseTypes->sum('total');
            return [
                'name' => $item->type,
                'percentage' => round(($item->total / $total) * 100, 1),
                'color' => $colors[$i % count($colors)],
            ];
        });

        return Inertia::render('AdminPage/DashboardAdmin', [
            'stats' => [
                'totalPatients' => $totalPatients,
                'totalDoctors' => $totalDoctors,
                'totalDiseases' => $totalDiseases,
            ],
            'weeklyPatientTrend' => $weeklyPatientTrend,
            'diseaseTypes' => $pieData,
        ]);
    }
}
