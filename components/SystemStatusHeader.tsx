import React, { useState, useEffect } from 'react';
import { Wifi, Signal, BatteryCharging, Clock, ShieldCheck } from 'lucide-react';
import { format } from 'date-fns';

export const SystemStatusHeader: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full flex justify-between items-start h-12 pt-1">
      {/* Left: Mini Status */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-white/60 bg-white/5 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/5">
          <Clock size={14} />
          <span className="text-xs font-medium tracking-wide">{format(time, 'HH:mm')}</span>
        </div>
        <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full backdrop-blur-sm border border-emerald-500/10">
          <ShieldCheck size={14} />
          <span className="text-xs font-bold tracking-wide uppercase">System OK</span>
        </div>
      </div>

      {/* Center: Brand Logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-5 group cursor-pointer">
         <div className="flex flex-col items-center">
            <div className="flex items-center gap-3">
                {/* Premium Abstract Logo Mark */}
                <div className="relative w-8 h-8 flex items-center justify-center">
                    {/* Outer Glow */}
                    <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-md group-hover:blur-lg transition-all duration-500"></div>
                    
                    {/* Main Shape */}
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="relative drop-shadow-lg transform group-hover:scale-105 transition-transform duration-500">
                        <defs>
                            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ffffff" />
                                <stop offset="100%" stopColor="#94a3b8" />
                            </linearGradient>
                        </defs>
                        {/* Shield-like Hexagon */}
                        <path d="M16 2L4 8V15C4 22 9 28 16 30C23 28 28 22 28 15V8L16 2Z" fill="url(#logoGrad)" fillOpacity="0.1" stroke="url(#logoGrad)" strokeWidth="1.5" />
                        
                        {/* Inner S Shape / Abstract Circuit */}
                        <path d="M16 8V14M16 18V24M12 16H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                {/* Typography */}
                <h1 className="text-2xl font-bold tracking-[0.3em] font-display text-white flex items-center">
                   SECURE
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-500 ml-1 mt-1 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
                </h1>
            </div>
            {/* Minimal Underline decoration */}
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mt-2"></div>
         </div>
      </div>

      {/* Right: Connectivity Icons */}
      <div className="flex items-center gap-5 text-white/80">
        <div className="flex items-center gap-1">
            <span className="text-[10px] font-bold text-white/50 mr-1">5G</span>
            <Signal size={18} />
        </div>
        <Wifi size={18} />
        <div className="h-4 w-[1px] bg-white/20 mx-1"></div>
        <div className="flex items-center gap-1.5">
            <BatteryCharging size={18} className="text-green-400" />
            <span className="text-sm font-medium">100%</span>
        </div>
      </div>
    </div>
  );
};