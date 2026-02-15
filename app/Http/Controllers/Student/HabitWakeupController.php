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
            'activities' => 'array',
        ]);

        $user = Auth::user();
        
        // ANTI-CHEAT: Use server time, not client time
        $now = Carbon::now();
        $hour = $now->hour;
        $minute = $now->minute;
        $timeValue = $hour + ($minute / 60);
        
        // Calculate points based on server time (per documentation)
        $xpEarned = 0;
        $koinEarned = 0;
        
        if ($timeValue >= 3 && $timeValue < 5) {
            // 03:00 - 05:00
            $xpEarned = 50;
            $koinEarned = 50;
        } elseif ($timeValue >= 5 && $timeValue < 5.5) {
            // 05:00 - 05:30
            $xpEarned = 40;
            $koinEarned = 40;
        } elseif ($timeValue >= 5.5 && $timeValue < 6) {
            // 05:30 - 06:00
            $xpEarned = 30;
            $koinEarned = 30;
        } elseif ($timeValue >= 6 && $timeValue < 7) {
            // 06:00 - 07:00
            $xpEarned = 20;
            $koinEarned = 20;
        } elseif ($timeValue >= 7 && $timeValue < 8) {
            // 07:00 - 08:00 (Late)
            $xpEarned = 10;
            $koinEarned = 10;
        } elseif ($timeValue >= 8 && $timeValue < 9) {
            // 08:00 - 09:00 (Very Late)
            $xpEarned = 5;
            $koinEarned = 5;
        } else {
            // Outside valid hours (after 09:00 or before 03:00)
            $xpEarned = 0;
            $koinEarned = 0;
        }

        // Create habit log
        $log = HabitLog::create([
            'user_id' => $user->id,
            'habit_type' => 'wakeup',
            'status' => 'pending', 
            'points_claimed' => $xpEarned,
            'date' => Carbon::today(),
        ]);

        // Save activities as habit details
        if ($request->has('activities')) {
            foreach ($request->activities as $activityName) {
                if (!empty($activityName)) {
                    HabitDetail::create([
                        'habit_log_id' => $log->id,
                        'category' => 'morning_activity',
                        'item_name' => $activityName,
                        'is_done' => true,
                    ]);
                    
                    // Bonus XP for each activity (per documentation: +10 XP)
                    $xpEarned += 10;
                }
            }
        }

        // CRITICAL FIX: Persist XP and Koin to user
        $user->addXp($xpEarned);
        $user->addKoin($koinEarned);

        // Return earned points to frontend for display
        return redirect()->route('student.dashboard')->with([
            'message' => 'Waktu bangun berhasil dicatat!',
            'xp_earned' => $xpEarned,
            'koin_earned' => $koinEarned,
            'check_in_time' => $now->format('H:i'),
        ]);
    }
}