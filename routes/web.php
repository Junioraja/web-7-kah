<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\Student\HabitWakeupController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::get('/force-logout', function () {
    auth()->logout();
    return redirect('/login');
});

/*
|--------------------------------------------------------------------------
| Authenticated Routes (Protected by Auth)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {

    // 1. DASHBOARD MURID (TunasHebat)
    // Menyertakan data XP dan Koin agar dashboard tidak blank/putih
    Route::get('/murid/dashboard', function () {
        return Inertia::render('Student/Dashboard', [
            'auth' => [
                'user' => [
                    'id'   => Auth::user()->id,
                    'name' => Auth::user()->name,
                    'xp'   => 1250,  // Data dummy XP
                    'koin' => 5000,  // Data dummy Koin
                ]
            ]
        ]);
    })->name('student.dashboard');

    // 2. HABIT TRACKER (Sub-Menu Murid)
    Route::prefix('student/habit')->name('student.habit.')->group(function () {
        // Bangun Pagi
        Route::get('/wakeup', [HabitWakeupController::class, 'index'])->name('wakeup');
        Route::post('/wakeup', [HabitWakeupController::class, 'store'])->name('wakeup.store');
        //...
        Route::get('/exercise', fn() => Inertia::render('Student/Habit/Exercise'))->name('exercise');
        Route::get('/food',     fn() => Inertia::render('Student/Habit/HealthyFood'))->name('healthyfood');
        Route::get('/study',    fn() => Inertia::render('Student/Habit/Learn'))->name('learn');
        Route::get('/social',   fn() => Inertia::render('Student/Habit/Social'))->name('social');
        Route::get('/sleep',    fn() => Inertia::render('Student/Habit/Sleep'))->name('sleep');

        // Menu Beribadah & Sub-Agama
        Route::prefix('worship')->name('worship.')->group(function () {
            Route::get('/',           fn() => Inertia::render('Student/Habit/Worship/Index'))->name('index');
            Route::get('/islam',      fn() => Inertia::render('Student/Habit/Worship/Islam'))->name('islam');
            Route::get('/protestan',  fn() => Inertia::render('Student/Habit/Worship/Protestant'))->name('protestant');
            Route::get('/katolik',    fn() => Inertia::render('Student/Habit/Worship/Catholic'))->name('catholic');
            Route::get('/hindu',      fn() => Inertia::render('Student/Habit/Worship/Hindu'))->name('hindu');
            Route::get('/buddha', fn() => Inertia::render('Student/Habit/Worship/Buddhist'))->name('buddhist');
            Route::get('/khonghucu', fn() => Inertia::render('Student/Habit/Worship/Khonghucu'))->name('khonghucu');
        });
    });

    // 3. DASHBOARD GURU
    Route::get('/guru/dashboard', function () {
        return Inertia::render('Teacher/Dashboard');
    })->name('teacher.dashboard');

    // 4. DASHBOARD ORANG TUA
    Route::get('/ortu/dashboard', function () {
        return Inertia::render('Parent/Dashboard');
    })->name('parent.dashboard');

    Route::get('/rt/dashboard', function () {
        return Inertia::render('RT/Dashboard');
    })->name('rt.dashboard');

});

require __DIR__.'/auth.php';