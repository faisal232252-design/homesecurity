import React, { useState, useEffect } from 'react';
import { Wifi, Signal, BatteryCharging, Battery, Clock, ShieldCheck } from 'lucide-react';
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
      <div className="absolute left-1/2 transform -translate-x-1/2 top-7">
         <div className="flex items-center gap-2 opacity-90">
            {/* Simple geometric logo mark */}
            <div className="w-5 h-5 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-sm"></div>
            <h1 className="text-lg font-bold tracking-[0.2em] font-display text-white">SECURE</h1>
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