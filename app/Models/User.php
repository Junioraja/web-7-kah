<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',           //
        'nis',            //
        'nip',            //
        'nama_honorer',   //
        'xp',             //
        'koin',           //
        'child_nis',      //
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Relationship: User has many Habit Logs
     */
    public function habitLogs()
    {
        return $this->hasMany(HabitLog::class);
    }

    /**
     * Add XP to user and auto-level up if threshold is reached.
     * 
     * @param int $amount
     * @return void
     */
    public function addXp(int $amount): void
    {
        $this->xp += $amount;

        // Auto-update level based on new XP
        $newLevel = \App\Services\LevelingService::calculateLevel($this->xp);
        $this->level = $newLevel;

        $this->save();
    }

    /**
     * Add Koin (coins) to user.
     * 
     * @param int $amount
     * @return void
     */
    public function addKoin(int $amount): void
    {
        $this->koin += $amount;
        $this->save();
    }

    /**
     * Add Bintang (stars) to user and recalculate rank.
     * 
     * @param int $amount
     * @return void
     */
    public function addBintang(int $amount): void
    {
        $this->bintang += $amount;
        $this->save();
    }

    /**
     * Increment streak counter.
     * 
     * @return void
     */
    public function incrementStreak(): void
    {
        $this->streak_count++;
        $this->save();
    }

    /**
     * Reset streak counter (when user breaks the chain).
     * 
     * @return void
     */
    public function resetStreak(): void
    {
        $this->streak_count = 0;
        $this->save();
    }

    /**
     * Get current rank based on Bintang (stars).
     * 
     * @return string
     */
    public function getRankAttribute(): string
    {
        $rank = \App\Services\LevelingService::calculateRank($this->bintang);
        return \App\Services\LevelingService::formatRank($rank);
    }
}