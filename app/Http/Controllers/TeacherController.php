namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class TeacherController extends Controller
{
    public function monitorSiswa()
    {
        $guru = Auth::user();

        // Pastikan yang mengakses adalah guru
        if ($guru->role !== 'guru') {
            return redirect()->route('dashboard');
        }

        // Ambil murid yang sesuai dengan kelas, jurusan, dan rentang absen guru
        $daftarMurid = User::where('role', 'siswa')
            ->where('kelas', $guru->kelas)
            ->where('jurusan', $guru->jurusan)
            ->whereBetween('no_absen', [$guru->absen_awal, $guru->absen_akhir])
            ->orderBy('no_absen', 'asc')
            ->get();

        return Inertia::render('Teacher/MonitorSiswa', [
            'daftarMurid' => $daftarMurid,
            'guru' => $guru
        ]);
    }
}