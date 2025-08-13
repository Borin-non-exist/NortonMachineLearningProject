<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredDoctorController;
use App\Http\Middleware\RoleMiddleware;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\DiseaseController;
use App\Http\Controllers\Admin\SymptomController;
use App\Http\Controllers\Admin\KnowledgebaseController;

// Public routes

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin'      => Route::has('login'),
        'canRegister'   => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion'    => PHP_VERSION,
    ]);
})->name('home');

Route::get('/welcome', fn() => Inertia::render('WelcomePage/WelcomePage'))->name('welcome');

// If you want to enable About/Privacy/AboutUs, uncomment and point to your React pages
/*
Route::get('/about', fn() => Inertia::render('AboutAI/AboutAIPage'))->name('about');
Route::get('/privacy', fn() => Inertia::render('PrivacyPage/PrivacyPage'))->name('privacy');
Route::get('/aboutus', fn() => Inertia::render('AboutUs/AboutUsPage'))->name('aboutus');
*/

// Auth routes (from Breeze)
require __DIR__ . '/auth.php';

// Profile routes (standard user profile edit/update/delete)
/* Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
}); */

// Settings routes (for profile and password update, using ProfileController)

Route::middleware('auth')->group(function () {
    Route::get('/settings/profile', [ProfileController::class, 'edit'])->name('settings.profile.edit');
    Route::post('/settings/profile', [ProfileController::class, 'update'])->name('settings.profile.update');
    
    // Password update route
    Route::post('/settings/password', [ProfileController::class, 'updatePassword'])->name('settings.password.update');
});

// Redirect user by role after login
Route::middleware('auth')->get('/redirect-by-role', function () {
    $role = Auth::user()?->role;
    return match ($role) {
        'admin'  => redirect('/dashboard'),
        'doctor' => redirect('/dashboarddoctor'),
        default  => redirect('/'),
    };
})->name('redirect.by.role');



//    ROLE-BASED ROUTES

// Admin-only routes
Route::middleware(['auth', RoleMiddleware::class . ':admin'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/listdoctor', [RegisteredDoctorController::class, 'index'])->name('listdoctor.index');
    Route::post('/listdoctor', [RegisteredDoctorController::class, 'store'])->name('listdoctor.store');
    // Fixed: use 'edit' method so React page receives user info!
    Route::get('/settingadmin', [ProfileController::class, 'edit'])->name('settingadmin');
});

// Doctor-only routes
Route::middleware(['auth', RoleMiddleware::class . ':doctor'])->group(function () {
    Route::get('/dashboarddoctor', fn() => Inertia::render('DoctorPage/DashboardDoctor'))->name('dashboarddoctor');
    Route::get('/settingdoctor', fn() => Inertia::render('SettingPage/SettingDoctorPage'))->name('settingdoctor');
});

// Admin & Doctor shared routes
Route::middleware(['auth', RoleMiddleware::class . ':admin,doctor'])->group(function () {
    Route::get('/diseases', [DiseaseController::class, 'index'])->name('diseases.index');
    Route::post('/diseases', [DiseaseController::class, 'store']);
    Route::post('/symptoms', [SymptomController::class, 'store']);
    Route::get('/symptoms', [SymptomController::class, 'index'])->name('symptoms.index');
    Route::post('/priorillnesses', [\App\Http\Controllers\Admin\PriorillnessController::class, 'store'])->name('priorillnesses.store');

    // Knowledgebase routes
    Route::get('/knowledgebases', [KnowledgebaseController::class, 'index'])->name('knowledgebases.index');
    Route::post('/knowledgebases', [KnowledgebaseController::class, 'store'])->name('knowledgebases.store');
});
