<?php

namespace App\Services;

class LevelingService
{
    /**
     * Level thresholds based on documentation:
     * - Level 1-10: 500 XP per level (Total 5,000 XP)
     * - Level 11-30: 1,000 XP per level (Total 25,000 XP)
     * - Level 31-60: 2,500 XP per level (Total 100,000 XP)
     * - Level 61-100: 5,000 XP per level (Total 300,000 XP)
     */
    
    /**
     * Calculate the user's current level based on total XP.
     * 
     * @param int $xp
     * @return int Level (1-100)
     */
    public static function calculateLevel(int $xp): int
    {
        if ($xp < 5000) {
            // Level 1-10: 500 XP per level
            return min(10, 1 + intval($xp / 500));
        } elseif ($xp < 25000) {
            // Level 11-30: 1,000 XP per level
            $xpAbove10 = $xp - 5000;
            return 10 + min(20, intval($xpAbove10 / 1000));
        } elseif ($xp < 100000) {
            // Level 31-60: 2,500 XP per level
            $xpAbove30 = $xp - 25000;
            return 30 + min(30, intval($xpAbove30 / 2500));
        } elseif ($xp < 300000) {
            // Level 61-100: 5,000 XP per level
            $xpAbove60 = $xp - 100000;
            return 60 + min(40, intval($xpAbove60 / 5000));
        }
        
        // Maximum level is 100
        return 100;
    }

    /**
     * Calculate XP required for the next level.
     * 
     * @param int $currentLevel
     * @return int|null XP needed, or null if max level
     */
    public static function xpForNextLevel(int $currentLevel): ?int
    {
        if ($currentLevel >= 100) {
            return null; // Max level reached
        }

        if ($currentLevel < 10) {
            return 500;
        } elseif ($currentLevel < 30) {
            return 1000;
        } elseif ($currentLevel < 60) {
            return 2500;
        } else {
            return 5000;
        }
    }

    /**
     * Calculate total XP required to reach a specific level.
     * 
     * @param int $level
     * @return int
     */
    public static function totalXpForLevel(int $level): int
    {
        if ($level <= 1) return 0;
        if ($level <= 10) return ($level - 1) * 500;
        if ($level <= 30) return 5000 + ($level - 10) * 1000;
        if ($level <= 60) return 25000 + ($level - 30) * 2500;
        if ($level <= 100) return 100000 + ($level - 60) * 5000;
        
        return 300000; // Max XP for level 100
    }

    /**
     * Calculate rank tier based on total stars.
     * 
     * Rank Tiers (per documentation):
     * 1. Tunas Pemula I-IV: 0-60 Bintang
     * 2. Perintis Muda I-IV: 80-170 Bintang
     * 3. Bintang Kelas I-IV: 200-320 Bintang
     * 4. Siswa Teladan I-IV: 360-510 Bintang
     * 5. Cendekiawan I-IV: 560-740 Bintang
     * 6. Generasi Emas (Legend): 800+ Bintang
     * 
     * @param int $stars
     * @return array ['tier' => string, 'division' => int|null]
     */
    public static function calculateRank(int $stars): array
    {
        if ($stars >= 800) {
            return ['tier' => 'Generasi Emas', 'division' => null]; // Legend
        } elseif ($stars >= 560) {
            // Cendekiawan I-IV (560-740)
            $division = min(4, 1 + intval(($stars - 560) / 45));
            return ['tier' => 'Cendekiawan', 'division' => $division];
        } elseif ($stars >= 360) {
            // Siswa Teladan I-IV (360-510)
            $division = min(4, 1 + intval(($stars - 360) / 38));
            return ['tier' => 'Siswa Teladan', 'division' => $division];
        } elseif ($stars >= 200) {
            // Bintang Kelas I-IV (200-320)
            $division = min(4, 1 + intval(($stars - 200) / 30));
            return ['tier' => 'Bintang Kelas', 'division' => $division];
        } elseif ($stars >= 80) {
            // Perintis Muda I-IV (80-170)
            $division = min(4, 1 + intval(($stars - 80) / 23));
            return ['tier' => 'Perintis Muda', 'division' => $division];
        } else {
            // Tunas Pemula I-IV (0-60)
            $division = min(4, 1 + intval($stars / 15));
            return ['tier' => 'Tunas Pemula', 'division' => $division];
        }
    }

    /**
     * Format rank as human-readable string.
     * 
     * @param array $rank
     * @return string
     */
    public static function formatRank(array $rank): string
    {
        if ($rank['division'] === null) {
            return $rank['tier']; // Legend tier
        }
        
        $romanNumerals = ['I', 'II', 'III', 'IV'];
        $division = $romanNumerals[$rank['division'] - 1] ?? 'I';
        
        return "{$rank['tier']} {$division}";
    }
}
