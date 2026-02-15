<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Services\LevelingService;

class ProfileController extends Controller
{
    /**
     * Display the student's profile page.
     */
    public function index()
    {
        $user = Auth::user();
        
        // Calculate rank information
        $rank = LevelingService::calculateRank($user->bintang);
        $formattedRank = LevelingService::formatRank($rank);
        
        // Calculate XP needed for next level
        $xpForNext = LevelingService::xpForNextLevel($user->level);
        $totalXpForCurrentLevel = LevelingService::totalXpForLevel($user->level);
        $totalXpForNextLevel = LevelingService::totalXpForLevel($user->level + 1);
        
        $xpProgress = 0;
        if ($xpForNext !== null && $xpForNext > 0) {
            $xpInCurrentLevel = $user->xp - $totalXpForCurrentLevel;
            $xpProgress = ($xpInCurrentLevel / $xpForNext) * 100;
        }
        
        return Inertia::render('Student/Profile', [
            'user' => $user,
            'rank' => $formattedRank,
            'xpForNext' => $xpForNext,
            'xpProgress' => round($xpProgress, 1),
        ]);
    }

    /**
     * Update the student's profile information.
     */
    public function update(Request $request)
    {
        $user = Auth::user();
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255|unique:users,email,' . $user->id,
            'phone_number' => 'nullable|string|max:20',
            'agama' => 'nullable|string',
            'nama_orang_tua' => 'nullable|string|max:255',
            'nama_guru_wali' => 'nullable|string|max:255',
            'nama_rt_murid' => 'nullable|string|max:255',
        ]);
        
        $user->update($validated);
        
        return redirect()->route('student.profile')->with('success', 'Profil berhasil diperbarui!');
    }
}
