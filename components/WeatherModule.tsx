import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

export const WeatherModule: React.FC = () => {
  return (
    <div className="mt-4 flex items-center gap-6 bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/5 w-fit hover:bg-white/10 transition-colors duration-500 group cursor-default">
      {/* Custom Animated Premium Weather Icon */}
      <div className="relative w-14 h-14 flex items-center justify-center filter drop-shadow-[0_0_15px_rgba(251,191,36,0.4)]">
        <svg viewBox="0 0 64 64" className="w-full h-full overflow-visible">
            <defs>
                <linearGradient id="weatherSunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FBBF24" /> {/* Amber 400 */}
                    <stop offset="100%" stopColor="#F59E0B" /> {/* Amber 500 */}
                </linearGradient>
                <linearGradient id="weatherCloudGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#E2E8F0" />
                </linearGradient>
            </defs>
            
            {/* Sun Rays - Animates: Slow Rotate */}
            <g className="animate-[spin_20s_linear_infinite] origin-center">
                <circle cx="32" cy="32" r="14" stroke="url(#weatherSunGradient)" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
                <circle cx="32" cy="32" r="18" stroke="url(#weatherSunGradient)" strokeWidth="1" strokeDasharray="2 6" opacity="0.4" />
            </g>

             {/* Sun Core - Static (Pulse only) */}
             <circle cx="32" cy="32" r="9" fill="url(#weatherSunGradient)" className="animate-pulse" />

            {/* Cloud (Front) - Animates: Subtle Float */}
            <g className="animate-[bounce_4s_infinite]" style={{ animationTimingFunction: 'ease-in-out' }}>
                <path 
                    d="M46 42C46 47.5228 41.5228 52 36 52H22C15.3726 52 10 46.6274 10 40C10 33.3726 15.3726 28 22 28C22.61 28 23.20 28.06 23.77 28.17C25.17 23.46 29.49 20 34.5 20C40.3 20 45 24.7 45 30.5C45 30.9 44.97 31.3 44.92 31.69C45.27 31.6 45.63 31.6 46 31.6C51.52 31.6 56 36.08 56 41.6" 
                    fill="url(#weatherCloudGradient)" 
                    stroke="white" 
                    strokeWidth="1.5"
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="drop-shadow-lg"
                    transform="translate(-4, 0)" 
                />
            </g>
        </svg>
      </div>
      
      <div className="flex flex-col">
        <div className="text-5xl font-light text-white font-display tracking-tight flex items-start">
          72
          <span className="text-2xl mt-1 text-amber-400">&deg;</span>
        </div>
        <div className="text-xs text-white/60 tracking-wider uppercase mt-0 font-medium pl-1">
          Partly Cloudy
        </div>
      </div>

      <div className="h-10 w-[1px] bg-white/10 mx-2"></div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2 text-sm text-white/90">
          <ArrowUp size={14} className="text-amber-400" />
          <span className="font-semibold">78&deg;</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-white/60">
          <ArrowDown size={14} className="text-blue-400" />
          <span>65&deg;</span>
        </div>
      </div>
    </div>
  );
};