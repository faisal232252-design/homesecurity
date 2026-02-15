import React from 'react';
import { CloudSun, ArrowUp, ArrowDown } from 'lucide-react';

export const WeatherModule: React.FC = () => {
  return (
    <div className="mt-4 flex items-center gap-6 bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/5 w-fit">
      <div className="text-amber-300 drop-shadow-lg">
        <CloudSun size={48} strokeWidth={1.5} />
      </div>
      
      <div className="flex flex-col">
        <div className="text-4xl font-light text-white font-display">
          72&deg;
        </div>
        <div className="text-xs text-white/60 tracking-wider uppercase mt-1">
          Partly Cloudy
        </div>
      </div>

      <div className="h-10 w-[1px] bg-white/10 mx-1"></div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1 text-sm text-white/90">
          <ArrowUp size={14} className="text-red-400" />
          <span>78&deg;</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-white/60">
          <ArrowDown size={14} className="text-blue-400" />
          <span>65&deg;</span>
        </div>
      </div>
    </div>
  );
};