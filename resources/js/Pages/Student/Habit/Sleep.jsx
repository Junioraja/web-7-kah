import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, MoonStars, SunHorizon, 
  WarningCircle, Camera, ShootingStar 
} from '@phosphor-icons/react';
import confetti from 'canvas-confetti';

const HabitSleep = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLate, setIsLate] = useState(false);
  const [isTooEarly, setIsTooEarly] = useState(false);
  const [note, setNote] = useState('');
  const [lateReason, setLateReason] = useState('');
  const [fileName, setFileName] = useState('Klik untuk upload bukti');
  const [simulationTime, setSimulationTime] = useState('');

  // Update Jam & Cek Status Waktu
  useEffect(() => {
    const timer = setInterval(() => {
      const now = simulationTime 
        ? new Date(`${new Date().toDateString()} ${simulationTime}`) 
        : new Date();
      
      setCurrentTime(now);
      const hours = now.getHours();

      // Logika Waktu
      setIsTooEarly(hours < 19);
      setIsLate(hours >= 22 || (hours >= 0 && hours < 5));
    }, 1000);

    return () => clearInterval(timer);
  }, [simulationTime]);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const checkInSleep = () => {
    // Pesan Pengingat Doa & Selamat Tidur
    const prayerReminder = "Jangan lupa berdoa ya sebelum tidur. Semoga mimpi indah!";

    if (isLate) {
      if (!lateReason || fileName === 'Klik untuk upload bukti') {
        alert("Karena begadang, mohon isi alasan dan bukti foto kegiatan ya!");
        return;
      }
      alert(`${prayerReminder}\n\nLaporan begadang dicatat. Poin dikurangi sedikit.`);
    } else {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#a855f7', '#ffffff']
      });
      alert(`${prayerReminder}\n\nSelamat istirahat! Poin ketepatan waktu +50.`);
    }
    
    // Logika redirect atau reset bisa ditaruh di sini
    // window.location.href = '/dashboard';
  };

  return (
    <div className={`min-h-screen relative overflow-x-hidden font-sans text-white transition-colors duration-700 bg-gradient-to-b ${isLate ? 'from-[#1a0c29] via-[#240b36] to-[#000000]' : 'from-[#0f0c29] via-[#302b63] to-[#24243e]'}`}>
      
      {/* DEKORASI BINTANG */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random()
            }}
          />
        ))}
      </div>

      {/* NAVBAR */}
      <nav className="p-6 flex items-center gap-4 relative z-20">
        <button className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition border border-white/20">
          <ArrowLeft size={20} weight="bold" />
        </button>
        <div>
          <h1 className="font-bold text-lg">Jurnal Tidur</h1>
          <p className="text-indigo-200 text-xs">Istirahat cukup untuk esok yang cerah</p>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="px-4 pb-24 relative z-20 w-full max-w-lg mx-auto mt-4">
        
        {/* Digital Clock */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 px-8 py-6 rounded-3xl shadow-2xl">
            <div className={`absolute top-3 right-3 flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${isLate ? 'bg-red-900/50 text-red-200 border border-red-500' : 'bg-black/30 text-indigo-300'}`}>
              <MoonStars weight="fill" /> <span>{isLate ? 'Terlambat' : 'Malam'}</span>
            </div>
            <div className="text-6xl font-mono font-bold tracking-widest text-indigo-100 drop-shadow-[0_0_10px_rgba(165,180,252,0.8)]">
              {currentTime.toLocaleTimeString('id-ID', { hour12: false, hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-indigo-300 text-sm font-medium mt-1 uppercase">
              {currentTime.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short' })}
            </div>
          </div>
        </div>

        {/* CARD UTAMA */}
        <div className={`backdrop-blur-xl border rounded-[2.5rem] p-8 shadow-2xl transition-all duration-500 ${isLate ? 'bg-red-950/40 border-red-500/30' : 'bg-white/10 border-white/20'}`}>
          
          <div className="text-center mb-6">
            <h2 className={`text-2xl font-bold mb-2 ${isLate ? 'text-red-500 animate-pulse' : 'text-white'}`}>
              {isLate ? 'JANGAN BEGADANG!' : 'Selamat Malam'}
            </h2>
            <p className="text-indigo-200 text-sm">
              {isLate ? 'Sudah lewat jam 22:00. Segera tidur!' : <>Target tidur: <strong>19:00 - 22:00</strong> WIB</>}
            </p>
          </div>

          <div className="space-y-5">
            {!isLate ? (
              <div>
                <label className="block text-sm font-bold text-indigo-100 mb-2">Catatan Mimpi (Opsional)</label>
                <textarea 
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Apa yang kamu syukuri hari ini?" 
                  className="w-full px-4 py-3 rounded-xl bg-black/20 border border-indigo-500/30 text-white placeholder-indigo-400/50 focus:border-indigo-400 outline-none resize-none"
                />
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in">
                <div className="bg-red-500/20 border border-red-500/50 p-4 rounded-xl flex items-start gap-3">
                  <WarningCircle weight="fill" className="text-red-400 text-xl mt-0.5" />
                  <div>
                    <h4 className="font-bold text-red-100 text-sm">Kamu Begadang!</h4>
                    <p className="text-xs text-red-200/80">Tidur larut menurunkan daya ingat & fokus.</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-red-200 mb-2">Alasan Begadang *</label>
                  <select 
                    value={lateReason}
                    onChange={(e) => setLateReason(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/30 border border-red-500/30 text-white focus:border-red-500 outline-none"
                  >
                    <option value="">Pilih Alasan...</option>
                    <option value="tugas">Mengerjakan Tugas Sekolah</option>
                    <option value="belajar">Belajar untuk Ujian</option>
                    <option value="main">Main Game / Sosmed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-red-200 mb-2">Foto Bukti Kegiatan *</label>
                  <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-red-500/30 border-dashed rounded-xl cursor-pointer hover:bg-red-500/10 transition group">
                    <Camera className="text-2xl text-red-400 group-hover:text-red-200 mb-1" />
                    <p className="text-[10px] text-red-300">{fileName}</p>
                    <input type="file" className="hidden" onChange={handleFileChange} />
                  </label>
                </div>
              </div>
            )}

            <button 
              onClick={checkInSleep}
              className={`w-full py-4 font-bold rounded-2xl shadow-lg transition transform active:scale-95 flex items-center justify-center gap-2 text-lg ${isLate ? 'bg-red-600 hover:bg-red-700' : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500'}`}
            >
              <MoonStars size={24} />
              <span>{isLate ? 'Lapor & Tidur' : 'Selamat Tidur'}</span>
            </button>
          </div>
        </div>

        {/* DEV MODE */}
        <div className="mt-8 opacity-20 hover:opacity-100 transition text-center">
          <input 
            type="time" 
            onChange={(e) => setSimulationTime(e.target.value)}
            className="bg-black/50 text-white border border-white/20 rounded px-2 py-1 text-xs" 
          />
          <span className="text-xs text-white ml-2">Simulasi Waktu</span>
        </div>
      </main>

      {/* POPUP BLOCKED (TOO EARLY) */}
      {isTooEarly && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
          <div className="bg-[#1e1b4b] border border-indigo-500/30 rounded-[2rem] p-8 max-w-sm w-full mx-4 text-center">
            <div className="w-20 h-20 bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-indigo-700">
              <SunHorizon size={40} className="text-yellow-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Belum Waktunya!</h3>
            <p className="text-indigo-200 mb-6 text-sm">Jurnal tidur malam hanya bisa diisi mulai pukul <strong>19:00 WIB</strong>.</p>
            <button className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl">Kembali ke Dashboard</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitSleep;