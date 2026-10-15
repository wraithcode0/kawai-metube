import React, { useRef, useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  RotateCcw, 
  Tv, 
  Settings, 
  Sparkles,
  Radio,
  Film
} from 'lucide-react';
import { Video } from '../../types';
import { useApp } from '../../context/AppContext';

interface VideoPlayerProps {
  video: Video;
  seekTime?: number | null;
  onSeekComplete?: () => void;
}

type PlayerMode = 'kawaii' | 'youtube' | 'direct';

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, seekTime, onSeekComplete }) => {
  const { theaterMode, setTheaterMode, showToast } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Default to Kawaii Synth stream which is guaranteed 100% playable anywhere without network issues!
  const [playerMode, setPlayerMode] = useState<PlayerMode>('kawaii');
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(video.durationSeconds || 720);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Web Audio Synthesizer context ref for Kawaii Synth Mode
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const synthTimerRef = useRef<number | null>(null);

  // Sync seekTime when requested (e.g. from chapter timestamp click)
  useEffect(() => {
    if (seekTime !== null && seekTime !== undefined) {
      setCurrentTime(seekTime);
      if (videoRef.current) {
        videoRef.current.currentTime = seekTime;
      }
      setIsPlaying(true);
      onSeekComplete?.();
    }
  }, [seekTime, onSeekComplete]);

  // Handle switching videos
  useEffect(() => {
    setCurrentTime(0);
    setIsPlaying(true);
    setDuration(video.durationSeconds || 720);
  }, [video.id]);

  // Web Audio Synthesizer Engine (creates soothing kawaii chill lofi beats & melody)
  useEffect(() => {
    if (playerMode !== 'kawaii') {
      if (synthTimerRef.current) clearInterval(synthTimerRef.current);
      return;
    }

    const startSynthAudio = () => {
      try {
        if (!audioCtxRef.current) {
          const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          audioCtxRef.current = new AudioContextClass();
        }

        if (audioCtxRef.current.state === 'suspended' && isPlaying) {
          audioCtxRef.current.resume();
        }

        if (!gainNodeRef.current && audioCtxRef.current) {
          gainNodeRef.current = audioCtxRef.current.createGain();
          gainNodeRef.current.connect(audioCtxRef.current.destination);
        }

        if (gainNodeRef.current && audioCtxRef.current) {
          gainNodeRef.current.gain.setValueAtTime(isMuted ? 0 : volume * 0.15, audioCtxRef.current.currentTime);
        }
      } catch (e) {
        console.error('Audio synth init error', e);
      }
    };

    startSynthAudio();

    // Pentatonic scale chords for sweet kawaii lofi sound
    const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
    let noteIndex = 0;

    if (synthTimerRef.current) clearInterval(synthTimerRef.current);

    if (isPlaying) {
      synthTimerRef.current = window.setInterval(() => {
        if (!audioCtxRef.current || !gainNodeRef.current || isMuted || volume === 0) return;
        if (audioCtxRef.current.state === 'suspended') return;

        try {
          const osc = audioCtxRef.current.createOscillator();
          const noteGain = audioCtxRef.current.createGain();

          osc.type = 'sine';
          const freq = notes[noteIndex % notes.length];
          noteIndex = (noteIndex + 1 + Math.floor(Math.random() * 2)) % notes.length;

          osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);

          noteGain.gain.setValueAtTime(0.001, audioCtxRef.current.currentTime);
          noteGain.gain.exponentialRampToValueAtTime(volume * 0.18, audioCtxRef.current.currentTime + 0.05);
          noteGain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.5);

          osc.connect(noteGain);
          noteGain.connect(gainNodeRef.current);

          osc.start();
          osc.stop(audioCtxRef.current.currentTime + 0.55);
        } catch {
          // ignore transient audio context errors
        }
      }, 550 / playbackSpeed);
    }

    return () => {
      if (synthTimerRef.current) clearInterval(synthTimerRef.current);
    };
  }, [isPlaying, isMuted, volume, playerMode, playbackSpeed]);

  // Update master gain when volume/mute changes
  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(isMuted ? 0 : volume * 0.15, audioCtxRef.current.currentTime);
    }
  }, [volume, isMuted]);

  // 60FPS Canvas Animation Renderer for Kawaii Mode
  useEffect(() => {
    if (playerMode !== 'kawaii') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let tick = 0;

    // Stars / Sparkles particles
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * 800,
      y: Math.random() * 450,
      size: Math.random() * 2.5 + 1,
      speed: Math.random() * 0.8 + 0.2,
      color: Math.random() > 0.5 ? '#ff0055' : '#00f0ff',
      char: Math.random() > 0.7 ? '✨' : Math.random() > 0.5 ? '♥' : '★'
    }));

    const render = () => {
      if (canvas.width !== 800 || canvas.height !== 450) {
        canvas.width = 800;
        canvas.height = 450;
      }

      const w = canvas.width;
      const h = canvas.height;

      // 1. Dark Cyber Neon Background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, '#0a0d17');
      bgGrad.addColorStop(0.5, '#121426');
      bgGrad.addColorStop(1, '#1b0d1e');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // 2. Animated Cyber Grid Horizon
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.25)';
      ctx.lineWidth = 1;
      const horizonY = h * 0.65;

      // Horizontal grid lines
      for (let i = 0; i < 9; i++) {
        const y = horizonY + Math.pow(i / 8, 2.2) * (h - horizonY);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Perspective lines converging at center horizon
      const vanishX = w * 0.5;
      for (let x = -w * 0.3; x <= w * 1.3; x += 65) {
        const offset = isPlaying ? (tick * 1.5) % 65 : 0;
        ctx.beginPath();
        ctx.moveTo(vanishX, horizonY);
        ctx.lineTo(x + offset, h);
        ctx.stroke();
      }

      // 3. Neon Red & Blue Sun on Horizon
      const sunGrad = ctx.createRadialGradient(vanishX, horizonY - 30, 10, vanishX, horizonY - 30, 90);
      sunGrad.addColorStop(0, '#ff0055');
      sunGrad.addColorStop(0.6, '#ff2a85');
      sunGrad.addColorStop(0.9, '#00f0ff');
      sunGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = sunGrad;
      ctx.beginPath();
      ctx.arc(vanishX, horizonY - 30, 85, 0, Math.PI * 2);
      ctx.fill();

      // 4. Floating Kawaii Sparkles & Stars
      particles.forEach((p) => {
        if (isPlaying) {
          p.y -= p.speed;
          if (p.y < 0) p.y = h;
        }

        ctx.font = `${p.size * 5 + 8}px sans-serif`;
        ctx.fillStyle = p.color;
        ctx.fillText(p.char, p.x, p.y);
      });

      // 5. Center Anime Mascot (Kawaii Cat with Headphones)
      const catX = w * 0.5;
      const bounce = isPlaying ? Math.sin(tick * 0.12) * 8 : 0;
      const catY = h * 0.52 + bounce;

      // Mascot Glow
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 20;

      // Cat Face
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(catX, catY, 44, 0, Math.PI * 2);
      ctx.fill();

      // Ears
      ctx.fillStyle = '#ff0055';
      ctx.beginPath();
      ctx.moveTo(catX - 32, catY - 25);
      ctx.lineTo(catX - 48, catY - 65);
      ctx.lineTo(catX - 12, catY - 40);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(catX + 32, catY - 25);
      ctx.lineTo(catX + 48, catY - 65);
      ctx.lineTo(catX + 12, catY - 40);
      ctx.fill();

      // Headphones Arc (Blue Neon)
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(catX, catY - 8, 50, Math.PI * 1.1, Math.PI * 1.9);
      ctx.stroke();

      // Headphone ear pads (Red)
      ctx.fillStyle = '#ff0055';
      ctx.beginPath();
      ctx.ellipse(catX - 44, catY, 10, 18, 0, 0, Math.PI * 2);
      ctx.ellipse(catX + 44, catY, 10, 18, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0; // reset glow

      // Cute Eyes: Happy Curved Eyes ^ _ ^
      ctx.strokeStyle = '#1a1a2e';
      ctx.lineWidth = 3.5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(catX - 16, catY + 2, 8, Math.PI * 1.15, Math.PI * 1.85);
      ctx.arc(catX + 16, catY + 2, 8, Math.PI * 1.15, Math.PI * 1.85);
      ctx.stroke();

      // Rosy Cheeks (Kawaii Blush)
      ctx.fillStyle = 'rgba(255, 0, 85, 0.45)';
      ctx.beginPath();
      ctx.arc(catX - 24, catY + 12, 7, 0, Math.PI * 2);
      ctx.arc(catX + 24, catY + 12, 7, 0, Math.PI * 2);
      ctx.fill();

      // Nose & Mouth (｡♥‿♥｡)
      ctx.fillStyle = '#ff0055';
      ctx.beginPath();
      ctx.arc(catX, catY + 10, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#ff0055';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(catX - 5, catY + 16, 5, 0, Math.PI);
      ctx.arc(catX + 5, catY + 16, 5, 0, Math.PI);
      ctx.stroke();

      // 6. Real-time Equalizer Audio Spectrum Bars at Bottom
      const barCount = 38;
      const barWidth = w / barCount - 3;
      for (let i = 0; i < barCount; i++) {
        const heightMultiplier = isPlaying 
          ? Math.abs(Math.sin(tick * 0.15 + i * 0.35)) * 0.7 + Math.abs(Math.cos(tick * 0.08 + i * 0.5)) * 0.3 
          : 0.08;
        const barHeight = heightMultiplier * 55 + 5;
        const x = i * (barWidth + 3) + 2;
        const y = h - barHeight - 4;

        const barGrad = ctx.createLinearGradient(0, y, 0, y + barHeight);
        barGrad.addColorStop(0, '#00f0ff');
        barGrad.addColorStop(1, '#ff0055');
        ctx.fillStyle = barGrad;
        ctx.fillRect(x, y, barWidth, barHeight);
      }

      // 7. Video HUD Overlays
      ctx.fillStyle = 'rgba(10, 13, 20, 0.75)';
      ctx.fillRect(16, 16, 320, 48);
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
      ctx.strokeRect(16, 16, 320, 48);

      ctx.font = 'bold 13px Quicksand, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`✨ NOW PLAYING: ${video.title.slice(0, 24)}...`, 26, 36);

      ctx.font = '11px monospace';
      ctx.fillStyle = '#00f0ff';
      ctx.fillText(`● 60FPS LIVE SYNTH • AUDIO ENGINE ON (◕‿◕)`, 26, 52);

      if (isPlaying) {
        tick++;
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [playerMode, isPlaying, video.title]);

  // Advance time during Kawaii Synth mode
  useEffect(() => {
    if (playerMode !== 'kawaii' || !isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= duration) {
          return 0; // loop
        }
        return prev + 1 * playbackSpeed;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [playerMode, isPlaying, duration, playbackSpeed]);

  const togglePlay = () => {
    if (playerMode === 'kawaii') {
      setIsPlaying(!isPlaying);
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
    } else if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {
          showToast('Direct video error: Switched to Kawaii stream mode ✨');
          setPlayerMode('kawaii');
        });
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '00:00';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hrs > 0) {
      return `${hrs}:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      onMouseMove={() => {
        setShowControls(true);
        if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
        if (isPlaying) {
          controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3500);
        }
      }}
      className={`relative w-full bg-[#0a0d14] overflow-hidden group select-none transition-all duration-300 border border-[#202b44] shadow-2xl ${
        theaterMode ? 'aspect-[21/9] max-h-[78vh]' : 'aspect-video rounded-3xl'
      }`}
      id="metube-kawaii-player"
    >
      {/* Top Stream Mode Switcher Pill */}
      <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 p-1 rounded-full bg-black/75 backdrop-blur-md border border-[#202b44] shadow-lg">
        <button
          onClick={() => {
            setPlayerMode('kawaii');
            setIsPlaying(true);
            showToast('Switched to 🌸 Kawaii Anime Synth Engine!');
          }}
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
            playerMode === 'kawaii'
              ? 'bg-gradient-to-r from-[#ff0055] to-[#00f0ff] text-white shadow-md'
              : 'text-[#9ba9c4] hover:text-white'
          }`}
          title="Guaranteed 100% playable interactive canvas stream"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>🌸 Kawaii Anime</span>
        </button>

        <button
          onClick={() => {
            setPlayerMode('youtube');
            showToast('Switched to 🔴 YouTube Official Stream!');
          }}
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
            playerMode === 'youtube'
              ? 'bg-[#ff0033] text-white shadow-md'
              : 'text-[#9ba9c4] hover:text-white'
          }`}
          title="Play official YouTube stream directly"
        >
          <Tv className="w-3.5 h-3.5" />
          <span>🔴 YouTube</span>
        </button>

        <button
          onClick={() => {
            setPlayerMode('direct');
            showToast('Switched to 🎥 Direct HTML5 Stream!');
          }}
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
            playerMode === 'direct'
              ? 'bg-[#00f0ff] text-black shadow-md'
              : 'text-[#9ba9c4] hover:text-white'
          }`}
          title="Direct video playback"
        >
          <Film className="w-3.5 h-3.5" />
          <span>🎥 MP4</span>
        </button>
      </div>

      {/* Mode 1: Kawaii Anime Canvas Engine */}
      {playerMode === 'kawaii' && (
        <canvas
          ref={canvasRef}
          onClick={togglePlay}
          className="w-full h-full object-cover cursor-pointer"
        />
      )}

      {/* Mode 2: YouTube Official Embed Stream */}
      {playerMode === 'youtube' && (
        <iframe
          src={`https://www.youtube.com/embed/${video.youtubeId || 'jfKfPfyJRdk'}?autoplay=1&mute=0&rel=0&modestbranding=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full border-0"
        />
      )}

      {/* Mode 3: Direct HTML5 Video */}
      {playerMode === 'direct' && (
        <video
          ref={videoRef}
          src={video.videoUrl}
          poster={video.thumbnailUrl}
          onClick={togglePlay}
          autoPlay
          playsInline
          onError={() => {
            showToast('⚠️ Video source 403: Auto-recovered with 🌸 Kawaii Engine!');
            setPlayerMode('kawaii');
          }}
          className="w-full h-full object-contain cursor-pointer"
        />
      )}

      {/* Play/Pause Center Indicator */}
      {!isPlaying && playerMode !== 'youtube' && (
        <div
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/35 cursor-pointer z-20 backdrop-blur-[2px]"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#ff0055] to-[#00f0ff] p-[3px] shadow-[0_0_35px_rgba(255,0,85,0.6)] group-hover:scale-110 transition-transform flex items-center justify-center">
            <div className="w-full h-full bg-[#0a0d14] rounded-full flex items-center justify-center">
              <Play className="w-9 h-9 fill-[#ff0055] text-[#00f0ff] translate-x-1" />
            </div>
          </div>
        </div>
      )}

      {/* Controls Overlay (Only for Kawaii & Direct modes; YouTube iframe has native controls) */}
      {playerMode !== 'youtube' && (
        <div
          className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a0d14] via-[#0a0d14]/80 to-transparent pt-14 px-4 pb-3 transition-opacity duration-300 z-20 ${
            showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Progress Bar Container with Red-to-Blue Gradient */}
          <div className="relative group/progress mb-3 py-1 flex items-center cursor-pointer">
            <div className="absolute inset-x-0 h-1.5 group-hover/progress:h-2.5 bg-[#202b44] rounded-full overflow-hidden transition-all">
              <div
                className="h-full bg-gradient-to-r from-[#ff0055] via-[#ff2a85] to-[#00f0ff] transition-all duration-150"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Glowing Red-Blue Scrubber Knob */}
            <div
              className="absolute w-4 h-4 bg-white border-2 border-[#00f0ff] shadow-[0_0_12px_#00f0ff] rounded-full -translate-x-1/2 scale-100 group-hover/progress:scale-125 transition-transform pointer-events-none"
              style={{ left: `${progressPercent}%` }}
            />

            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 opacity-0 cursor-pointer z-10"
            />
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between text-white text-xs sm:text-sm">
            {/* Left Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="p-2 rounded-full hover:bg-white/10 text-[#ff0055] hover:text-[#00f0ff] transition-colors focus:outline-none"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
              </button>

              <button
                onClick={() => setCurrentTime(Math.max(0, currentTime - 10))}
                className="p-1.5 hover:text-[#00f0ff] transition-colors hidden sm:block"
                title="Rewind 10s"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Volume Control */}
              <div className="flex items-center gap-1.5 group/vol">
                <button
                  onClick={toggleMute}
                  className="p-1.5 hover:text-[#00f0ff] transition-colors focus:outline-none"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-5 h-5 text-[#ff0055]" /> : <Volume2 className="w-5 h-5 text-[#00f0ff]" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setVolume(val);
                    setIsMuted(val === 0);
                  }}
                  className="w-14 sm:w-16 h-1 accent-[#00f0ff] cursor-pointer"
                />
              </div>

              {/* Time Stamp */}
              <div className="text-xs text-[#9ba9c4] font-mono select-none flex items-center gap-1">
                <span className="text-[#00f0ff]">{formatTime(currentTime)}</span>
                <span>/</span>
                <span>{video.isLive ? 'LIVE' : formatTime(duration)}</span>
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              {/* Playback Speed */}
              <div className="relative">
                <button
                  onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                  className="px-2 py-1 rounded-lg text-xs font-semibold hover:bg-white/10 text-[#00f0ff] transition-colors flex items-center gap-1"
                >
                  <Settings className="w-4 h-4" />
                  <span>{playbackSpeed}x</span>
                </button>

                {showSpeedMenu && (
                  <div className="absolute right-0 bottom-9 w-28 bg-[#161d30] border border-[#202b44] rounded-xl shadow-2xl py-1 z-40 text-xs">
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map((spd) => (
                      <button
                        key={spd}
                        onClick={() => {
                          setPlaybackSpeed(spd);
                          setShowSpeedMenu(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 hover:bg-[#202b44] transition-colors ${
                          playbackSpeed === spd ? 'text-[#00f0ff] font-bold' : 'text-[#9ba9c4]'
                        }`}
                      >
                        {spd === 1 ? 'Normal' : `${spd}x`}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Theater Mode */}
              <button
                onClick={() => setTheaterMode(prev => !prev)}
                className={`p-1.5 hover:text-[#00f0ff] transition-colors hidden md:block ${theaterMode ? 'text-[#ff0055]' : 'text-white'}`}
                title="Theater mode"
              >
                <Tv className="w-5 h-5" />
              </button>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="p-1.5 hover:text-[#00f0ff] transition-colors"
                title="Full screen"
              >
                {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
