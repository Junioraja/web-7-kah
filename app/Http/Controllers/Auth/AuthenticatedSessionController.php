<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(Request $request): RedirectResponse
{
    // 1. Validasi Input
    $request->validate([
        'identifier' => 'required|string',
        'password' => 'required|string',
        'role' => 'required|string',
        'guru_type' => 'nullable|string',
    ]);

    // 2. TENTUKAN NAMA KOLOM (Logic Penentu Field)
    $role = $request->input('role');
    $guruType = $request->input('guru_type');
    
    // Default-nya kita set null dulu biar ketahuan kalau logic error
    $field = null; 

    if ($role === 'siswa') {
        $field = 'nis';
    } elseif ($role === 'guru') {
        $field = ($guruType === 'pns') ? 'nip' : 'name'; // Pastikan kolom 'name' atau 'nama_honorer' ada di DB
    } elseif ($role === 'orangtua') {
        $field = 'email';
    } elseif ($role === 'rt') {
        $field = 'username'; // Sesuaikan jika RT login pakai username/email
    } else {
        $field = 'email'; // Fallback terakhir
    }

    // 3. DEBUGGING (Opsional: Cek apa isi $field jika masih error)
    // dd($field); // Uncomment baris ini jika ingin melihat isi variable $field di layar

    // 4. Eksekusi Login
    // Perhatikan: kuncinya adalah variabel $field, BUKAN string 'identifier'
    if (Auth::attempt([$field => $request->input('identifier'), 'password' => $request->input('password'), 'role' => $role])) {
        
        $request->session()->regenerate();
        $user = auth()->user();

        // Redirect sesuai role
        if ($user->role === 'siswa') return redirect()->intended(route('student.dashboard'));
        if ($user->role === 'guru') return redirect()->intended(route('teacher.dashboard'));
        if ($user->role === 'orangtua') return redirect()->intended(route('parent.dashboard'));
        if ($user->role === 'rt') return redirect()->intended(route('rt.dashboard'));

        return redirect()->intended(RouteServiceProvider::HOME);
    }

    // 5. Jika Gagal
    throw ValidationException::withMessages([
        'identifier' => __('Login gagal. Periksa kembali data Anda.'),
    ]);
}

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }
}