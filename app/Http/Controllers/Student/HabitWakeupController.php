<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\HabitLog;
use App\Models\HabitDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

class HabitWakeupController extends Controller
{

    public function index()
    {
        return Inertia::render('Student/Habit/WakeUp', [
            'serverTime' => Carbon::now()->toDateTimeString(), 
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'check_in_time' => 'required',
            'activities'    => 'array',
            'total_xp'      => 'required|integer',
            'total_koin'    => 'required|integer',
        ]);

        $user = Auth::user();

        $log = HabitLog::create([
            'user_id'        => $user->id,
            'habit_type'     => 'wakeup',
            'status'         => 'pending', 
            'points_claimed' => $request->total_xp,
            'date'           => Carbon::today(),
        ]);

        if ($request->has('activities')) {
            foreach ($request->activities as $activityName) {
                if (!empty($activityName)) {
                    HabitDetail::create([
                        'habit_log_id' => $log->id,
                        'category'     => 'morning_activity',
                        'item_name'    => $activityName,
                        'is_done'      => true,
                    ]);
                }
            }
        }
        return redirect()->route('student.dashboard')->with('message', 'Waktu bangun berhasil dicatat! Menunggu verifikasi poin.');
    }
}