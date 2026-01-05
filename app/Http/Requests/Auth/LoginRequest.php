<?php

namespace App\Http\Requests\Auth;

use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * PERBAIKAN 1: Sesuaikan rules dengan field 'identity' dari JSX
     */
    public function rules(): array
    {
        return [
            'identity' => ['required', 'string'], // Ganti 'email' menjadi 'identity' dan hapus rule 'email'
            'password' => ['required', 'string'],
            'role'     => ['required', 'string'], // Pastikan role juga terkirim
        ];
    }

    public function authenticate(): void
{
    $this->ensureIsNotRateLimited();

    $user = \App\Models\User::where('nis', $this->email)
        ->orWhere('email', $this->email)
        ->orWhere('phone_number', $this->email)
        ->first();
    if (! $user || ! \Illuminate\Support\Facades\Hash::check($this->password, $user->password)) {
        throw \Illuminate\Validation\ValidationException::withMessages([
            'email' => __('auth.failed'),
        ]);
    }

    \Illuminate\Support\Facades\Auth::login($user, $this->boolean('remember'));
    \Illuminate\Support\Facades\RateLimiter::clear($this->throttleKey());
}

    public function ensureIsNotRateLimited(): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'identity' => trans('auth.throttle', [ // Ganti 'email' menjadi 'identity'
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * PERBAIKAN 3: Gunakan identity untuk kunci throttle
     */
    public function throttleKey(): string
    {
        return Str::transliterate(Str::lower($this->input('identity')).'|'.$this->ip());
    }
}