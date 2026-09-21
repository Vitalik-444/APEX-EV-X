import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Shield, 
  Gauge, 
  Battery, 
  Wind, 
  X, 
  ChevronRight, 
  Check, 
  Sparkles, 
  Menu, 
  Volume2, 
  VolumeX
} from 'lucide-react';

const COLOR_OPTIONS = [
  { id: 'stealth', name: 'Stealth Carbon Black', hex: '#09090b', bgClass: 'bg-zinc-950', img: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop' },
  { id: 'cyber', name: 'Cyber Neon Emerald', hex: '#10b981', bgClass: 'bg-emerald-500', img: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop' },
  { id: 'crimson', name: 'Velocity Crimson Red', hex: '#dc2626', bgClass: 'bg-red-600', img: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1200&auto=format&fit=crop' },
  { id: 'glacier', name: 'Glacier Metallic White', hex: '#f8fafc', bgClass: 'bg-slate-100', img: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1200&auto=format&fit=crop' }
];

const GALLERY_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop', title: 'Aerodynamic Profile' },
  { url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop', title: 'Cyber Emerald Aero' },
  { url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1200&auto=format&fit=crop', title: 'Crimson Edition Performance' },
  { url: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1200&auto=format&fit=crop', title: 'Glacier Metallic White Trim' },
  { url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1200&auto=format&fit=crop', title: 'Quad-Motor Drivetrain' },
  { url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200&auto=format&fit=crop', title: 'Futuristic HUD Cockpit' }
];

export default function App() {
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
  const [selectedTrim, setSelectedTrim] = useState('track');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isTestDriveOpen, setIsTestDriveOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [testDriveSubmitted, setTestDriveSubmitted] = useState(false);

  useEffect(() => {
    let audioCtx;
    let mainGain, filter, lfo, lfoGain;
    let osc1, osc2, osc3;

    if (isPlayingAudio) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioCtx();

        mainGain = audioCtx.createGain();
        mainGain.gain.setValueAtTime(0.01, audioCtx.currentTime);
        mainGain.gain.exponentialRampToValueAtTime(0.22, audioCtx.currentTime + 0.4);

        filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(140, audioCtx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(1600, audioCtx.currentTime + 3.2);
        filter.Q.setValueAtTime(3.5, audioCtx.currentTime);

        lfo = audioCtx.createOscillator();
        lfo.type = 'sawtooth';
        lfo.frequency.setValueAtTime(14, audioCtx.currentTime);
        lfo.frequency.exponentialRampToValueAtTime(45, audioCtx.currentTime + 3.2);

        lfoGain = audioCtx.createGain();
        lfoGain.gain.setValueAtTime(25, audioCtx.currentTime);

        osc1 = audioCtx.createOscillator();
        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(42, audioCtx.currentTime);
        osc1.frequency.exponentialRampToValueAtTime(280, audioCtx.currentTime + 3.2);

        osc2 = audioCtx.createOscillator();
        osc2.type = 'square';
        osc2.frequency.setValueAtTime(21, audioCtx.currentTime);
        osc2.frequency.exponentialRampToValueAtTime(140, audioCtx.currentTime + 3.2);

        osc3 = audioCtx.createOscillator();
        osc3.type = 'triangle';
        osc3.frequency.setValueAtTime(84, audioCtx.currentTime);
        osc3.frequency.exponentialRampToValueAtTime(560, audioCtx.currentTime + 3.2);

        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        osc1.connect(filter);
        osc2.connect(filter);
        osc3.connect(filter);

        filter.connect(mainGain);
        mainGain.connect(audioCtx.destination);

        lfo.start();
        osc1.start();
        osc2.start();
        osc3.start();
      } catch (e) {
        console.error(e);
      }
    }

    return () => {
      if (lfo) lfo.stop();
      if (osc1) osc1.stop();
      if (osc2) osc2.stop();
      if (osc3) osc3.stop();
      if (audioCtx) audioCtx.close();
    };
  }, [isPlayingAudio]);

  const handleTestDriveSubmit = (e) => {
    e.preventDefault();
    setTestDriveSubmitted(true);
    setTimeout(() => {
      setTestDriveSubmitted(false);
      setIsTestDriveOpen(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-slate-100 overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <Zap className="w-6 h-6 text-emerald-400" />
            </div>
            <span className="text-xl font-bold tracking-widest text-white uppercase">APEX <span className="text-emerald-400">EV-X</span></span>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-zinc-400">
            <a href="#overview" className="hover:text-emerald-400 transition-colors">Overview</a>
            <a href="#specs" className="hover:text-emerald-400 transition-colors">Performance</a>
            <a href="#configurator" className="hover:text-emerald-400 transition-colors">Configurator</a>
            <a href="#gallery" className="hover:text-emerald-400 transition-colors">Gallery</a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => setIsTestDriveOpen(true)}
              className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
            >
              Book Test Drive
            </button>
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-zinc-400 hover:text-white"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-zinc-900 border-b border-zinc-800 px-6 py-4 space-y-4">
            <a href="#overview" onClick={() => setIsMenuOpen(false)} className="block text-zinc-300 hover:text-emerald-400">Overview</a>
            <a href="#specs" onClick={() => setIsMenuOpen(false)} className="block text-zinc-300 hover:text-emerald-400">Performance</a>
            <a href="#configurator" onClick={() => setIsMenuOpen(false)} className="block text-zinc-300 hover:text-emerald-400">Configurator</a>
            <a href="#gallery" onClick={() => setIsMenuOpen(false)} className="block text-zinc-300 hover:text-emerald-400">Gallery</a>
            <button 
              onClick={() => { setIsMenuOpen(false); setIsTestDriveOpen(true); }}
              className="w-full py-3 rounded-xl bg-emerald-500 text-zinc-950 font-bold text-center"
            >
              Book Test Drive
            </button>
          </div>
        )}
      </nav>

      <section id="overview" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center items-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-zinc-950 pointer-events-none" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next Generation Electric Hypercar</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-none">
            REDEFINING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              PURE VELOCITY
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-zinc-400 text-base md:text-lg">
            Experience 1,900 HP of raw electric power. Crafted with aerospace-grade carbon fiber and equipped with active aerodynamics.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button 
              onClick={() => setIsTestDriveOpen(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold flex items-center justify-center space-x-2 transition-all shadow-xl shadow-emerald-500/25"
            >
              <span>Reserve Yours Now</span>
              <ChevronRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 font-semibold flex items-center justify-center space-x-2 transition-all"
            >
              {isPlayingAudio ? <VolumeX className="w-5 h-5 text-emerald-400" /> : <Volume2 className="w-5 h-5 text-emerald-400" />}
              <span>{isPlayingAudio ? 'Stop Engine Sound' : 'Simulate Engine Sound'}</span>
            </button>
          </div>
        </div>

        <div className="relative w-full max-w-6xl mt-12 z-10">
          <div className="relative rounded-2xl overflow-hidden border border-zinc-800/80 shadow-2xl bg-zinc-900">
            <img 
              src={selectedColor.img} 
              alt="APEX EV-X Hero Car" 
              className="w-full h-[350px] sm:h-[480px] lg:h-[580px] object-cover object-center transition-all duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
            
            <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 md:p-6 bg-zinc-900/90 backdrop-blur-md rounded-xl border border-zinc-800">
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider">0-60 MPH</p>
                <p className="text-2xl md:text-3xl font-extrabold text-white">1.85s</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider">Top Speed</p>
                <p className="text-2xl md:text-3xl font-extrabold text-white">258 MPH</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider">Peak Power</p>
                <p className="text-2xl md:text-3xl font-extrabold text-emerald-400">1,900 HP</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider">EPA Range</p>
                <p className="text-2xl md:text-3xl font-extrabold text-white">420 Mi</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="specs" className="py-24 px-6 bg-zinc-900/50 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">ENGINEERED WITHOUT COMPROMISE</h2>
            <p className="text-zinc-400">Pushing the boundaries of physics with quad independent torque vectoring electric motors.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4 hover:border-emerald-500/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <Gauge className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Quad-Motor AWD</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Four independent electric motors deliver instant precision torque vectoring to each wheel 1,000 times per second.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4 hover:border-emerald-500/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <Battery className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white">120 kWh Solid-State</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Next-generation solid-state battery architecture supporting 800V ultra-fast charging from 10% to 80% in 12 minutes.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4 hover:border-emerald-500/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <Wind className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Active Aero Dynamics</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Automated rear wing and front diffusers adjust dynamically in real time, generating up to 850kg of downforce at speed.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="configurator" className="py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">BUILD YOUR APEX EV-X</h2>
            <p className="text-zinc-400">Personalize exterior finish and aerodynamic packages.</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 relative">
              <img 
                src={selectedColor.img} 
                alt={selectedColor.name} 
                className="w-full h-[400px] md:h-[500px] object-cover transition-all duration-500"
              />
              <div className="absolute top-4 left-4 bg-zinc-950/80 backdrop-blur-md px-4 py-2 rounded-lg border border-zinc-800 text-xs text-zinc-300 font-semibold">
                Finish: <span className="text-emerald-400">{selectedColor.name}</span>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-8 bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
              <div className="space-y-4">
                <label className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Exterior Color</label>
                <div className="grid grid-cols-2 gap-3">
                  {COLOR_OPTIONS.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color)}
                      className={`flex items-center space-x-3 p-3 rounded-xl border text-left transition-all ${
                        selectedColor.id === color.id 
                          ? 'border-emerald-500 bg-emerald-500/10 text-white' 
                          : 'border-zinc-800 hover:border-zinc-700 text-zinc-400'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full ${color.bgClass} border border-zinc-700 shrink-0`} />
                      <span className="text-xs font-medium truncate">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Trim Package</label>
                <div className="space-y-3">
                  <button 
                    onClick={() => setSelectedTrim('track')}
                    className={`w-full p-4 rounded-xl border text-left flex justify-between items-center transition-all ${
                      selectedTrim === 'track' ? 'border-emerald-500 bg-emerald-500/10' : 'border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-white text-sm">Track Edition</p>
                      <p className="text-xs text-zinc-400">Active wing, carbon ceramic brakes</p>
                    </div>
                    <span className="text-sm font-bold text-emerald-400">+$25,000</span>
                  </button>

                  <button 
                    onClick={() => setSelectedTrim('gt')}
                    className={`w-full p-4 rounded-xl border text-left flex justify-between items-center transition-all ${
                      selectedTrim === 'gt' ? 'border-emerald-500 bg-emerald-500/10' : 'border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-white text-sm">Grand Touring</p>
                      <p className="text-xs text-zinc-400">Luxury interior, soft air suspension</p>
                    </div>
                    <span className="text-sm font-bold text-zinc-400">Included</span>
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                <div>
                  <p className="text-xs text-zinc-500">Estimated Total</p>
                  <p className="text-2xl font-extrabold text-white">
                    ${(245000 + (selectedTrim === 'track' ? 25000 : 0)).toLocaleString()}
                  </p>
                </div>
                <button 
                  onClick={() => setIsTestDriveOpen(true)}
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm transition-all"
                >
                  Reserve
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="py-24 px-6 bg-zinc-900/30 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">GALLERY</h2>
            <p className="text-zinc-400">Click any image to view in high resolution.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_IMAGES.map((img, index) => (
              <div 
                key={index}
                onClick={() => setSelectedImage(img)}
                className="group relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 cursor-pointer aspect-video"
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <p className="text-white font-semibold text-sm">{img.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {isTestDriveOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 space-y-6">
            <button 
              onClick={() => setIsTestDriveOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            {testDriveSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Booking Confirmed!</h3>
                <p className="text-zinc-400 text-sm">
                  Our APEX concierge representative will contact you within 24 hours to finalize your track session.
                </p>
              </div>
            ) : (
              <>
                <div>
                  <h3 className="text-2xl font-bold text-white">Schedule VIP Test Drive</h3>
                  <p className="text-xs text-zinc-400">Experience APEX EV-X on an exclusive private circuit.</p>
                </div>

                <form onSubmit={handleTestDriveSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-zinc-400 mb-1">Full Name</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="Vitalii Pidhaietskyi"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-zinc-400 mb-1">Email Address</label>
                    <input 
                      required 
                      type="email" 
                      placeholder="vitalii@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-zinc-400 mb-1">Preferred Date</label>
                      <input 
                        required 
                        type="date" 
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-zinc-400 mb-1">Preferred Track</label>
                      <select className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-emerald-500">
                        <option>Nürburgring Nordschleife</option>
                        <option>Laguna Seca Raceway</option>
                        <option>Silverstone Circuit</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold transition-all shadow-lg shadow-emerald-500/20"
                  >
                    Confirm Booking
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-lg"
        >
          <div className="relative max-w-4xl w-full">
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-emerald-400"
            >
              <X className="w-8 h-8" />
            </button>
            <img 
              src={selectedImage.url} 
              alt={selectedImage.title} 
              className="w-full rounded-2xl border border-zinc-800 max-h-[80vh] object-contain"
            />
            <p className="text-center text-zinc-300 mt-4 text-sm font-medium">{selectedImage.title}</p>
          </div>
        </div>
      )}

      <footer className="border-t border-zinc-800 py-12 px-6 bg-zinc-950 text-zinc-500 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-emerald-400" />
            <span className="text-white font-bold tracking-widest uppercase">APEX AUTOMOTIVE</span>
          </div>
          <p>© {new Date().getFullYear()} APEX EV-X. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
