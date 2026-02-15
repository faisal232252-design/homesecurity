import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

export const TimeDateModule: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Big Clock */}
      <div className="text-[7rem] leading-none font-light tracking-tighter text-white font-display drop-shadow-2xl">
        {format(time, 'HH:mm')}
      </div>
      
      {/* Date */}
      <div className="flex flex-col mt-2 pl-2 border-l-4 border-blue-500/50">
        <span className="text-2xl font-light tracking-widest text-blue-200 uppercase">
          {format(time, 'EEE, MMM dd')}
        </span>
        <span className="text-lg text-white/40 font-light tracking-widest">
          {format(time, 'yyyy')}
        </span>
      </div>
    </div>
  );
};