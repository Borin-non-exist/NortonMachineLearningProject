<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Intervention\Image\Laravel\Facades\Image;

class RegisteredDoctorController extends Controller
{
    // List doctors
    public function index()
    {
        $doctors = User::where('role', 'doctor')->get();
        return Inertia::render('ListDoctor/ListDoctor', [
            'doctors' => $doctors,
        ]);
    }

    // Register new doctor
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_name'      => 'required|string|max:255',
            'date_of_birth'  => 'required|date|before:today',
            'gender'         => 'required|in:male,female,other',
            // If image is a base64 string, validate as string; for file uploads, use 'image'
            'image'          => 'nullable|image|max:2048',
            'weight'         => 'nullable|numeric|min:0',
            'height'         => 'nullable|numeric|min:0',
            'email'          => 'required|string|lowercase|email|max:255|unique:users',
            'password'       => [
                'required',
                'confirmed',
                Password::min(8)->letters()->numbers(),
            ],
        ]);

        // Handle file upload
        if ($request->hasFile('image')) {
            $imageFile = $request->file('image');
            $filename = 'user_' . Str::random(12) . '.jpg';
            $img = Image::make($imageFile)
                ->fit(300, 300) // Resize and crop to 300x300 px
                ->encode('jpg', 80); // Compress to 80% quality

            // Store to public disk (storage/app/public/users)
            Storage::disk('public')->put('users/' . $filename, $img);

            $validated['image'] = 'users/' . $filename;
        } else {
            $validated['image'] = 'doctor.png';
        }

        $validated['role'] = 'doctor';
        $validated['password'] = Hash::make($validated['password']);

        User::create($validated);

        return redirect()->route('listdoctor.index')
            ->with('success', 'Doctor account created successfully!');
    }

    // Delete doctor
    // public function destroy($id)
    // {
    //     User::where('role', 'doctor')->where('id', $id)->delete();
    //     return redirect()->route('listdoctor.index');
    // }
}
