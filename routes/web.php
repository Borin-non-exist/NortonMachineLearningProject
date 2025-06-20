<?php

// use Illuminate\Support\Facades\Route;
//use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

// require __DIR__.'/settings.php';
// require __DIR__.'/auth.php';






// use App\Http\Controllers\HomeController;
// Route::get('/', [HomeController::class, 'index']);

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/* Route::get('/', fn () => Inertia::render('HomePage/HomePage'))
    ->name('home');
Route::get('/about', fn () => Inertia::render('AboutUs/AboutUsPage'))
    ->name('about');
Route::get('/privacy', fn () => Inertia::render('PrivacyPage/PrivacyPage'))
    ->name('privacy');
Route::get('/signup', fn () => Inertia::render('Auth/SignUpPage'))
    ->name('signup');
Route::get('/login', fn () => Inertia::render('Auth/Login'))
    ->name('login');
Route::get('/chat', fn () => Inertia::render('ChatPage/ChatPage'))
    ->name('chat'); */


Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/login', function () {
    return Inertia::render('Auth/login');
})->name('login');

Route::get('/signup', function () {
    return Inertia::render('Auth/SignUpPage');
})->name('signup');
Route::get('/about', function () {
    return Inertia::render('AboutAI/AboutAIPage');
})->name('about');

Route::get('/privacy', function () {
    return Inertia::render('PrivacyPage/PrivacyPage');
})->name('privacy');

Route::get('/chat', function () {
    return Inertia::render('ChatPage/ChatPage');
})->name('chat');

Route::get('/welcome', function () {
    return Inertia::render('WelcomePage/WelcomePage');
})->name('welcome');


Route::get('/setting', function () {
    return Inertia::render('SettingPage/SettingPage');
})->name('setting');

Route::get('/terms-policy', function () {
    return Inertia::render('TermsPolicyPage/TermsPolicyPage');
})->name('terms-policy');

Route::get('/how-to-use', function () {
    return Inertia::render('how-to-use/how-to-use');
})->name('how-to-use');

Route::get('/disease', function () {
    return Inertia::render('AdminPage/KnowledgePage/DiseaseKnowledgePage');
})->name('disease');

Route::get('/doctorlogin', function () {
    return Inertia::render('Auth/login_doctor');
})->name('doctorlogin');

Route::get('/adminlogin', function () {
    return Inertia::render('Auth/login_admin');
})->name('adminlogin');

Route::get('/settingdoctor', function () {
    return Inertia::render('SettingPage/SettingdoctorPage');
})->name('settingdoctor');

Route::get('/settingadmin', function () {
    return Inertia::render('SettingPage/SettingAdminPage');
})->name('settingadmin');

Route::get('/dashboard', function () {
    return Inertia::render('AdminPage/Dashboarddoctor/DashboardAdmin');
})->name('dashboard');

Route::get('/doctorprofile', function () {
    return Inertia::render('AdminPage/DoctorPage/ListDoctor');
})->name('doctorprofile');