import React, { useState } from 'react';
import { X, Shield, Delete, VolumeX, Timer, Lock } from 'lucide-react';
import { playClickSound } from '../utils/sound';

interface ArmPanelProps {
  onClose: () => void;
  onConfirm: () => void;
}

export const ArmPanel: React.FC<ArmPanelProps> = ({ onClose, onConfirm }) => {
  const [code, setCode] = useState<string>('');
  const [silent, setSilent] = useState(false);
  const [noDelay, setNoDelay] = useState(false);

  const handleNumClick = (num: string) => {
    playClickSound();
    if (code.length < 4) {
      setCode(prev => prev + num);
    }
  };

  const handleDelete = () => {
    playClickSound();
    setCode(prev => prev.slice(0, -1));
  };

  return (
    <div className="absolute inset-0 z-40 bg-black/90 backdrop-blur-xl animate-in fade-in zoom-in duration-200 flex flex-row">
      
      {/* Left Side: Status & Options */}
      <div className="w-1/3 border-r border-white/10 p-8 flex flex-col justify-between bg-white/5">
        <div>
          <div className="flex items-center gap-2 text-red-500 mb-2">
            <Shield size={24} />
            <span className="font-bold tracking-widest uppercase text-sm">System Arming</span>
          </div>
          <h2 className="text-3xl font-light text-white mb-6">Away Mode</h2>
          
          <div className="space-y-4">
            <button 
              onClick={() => { playClickSound(); setSilent(!silent); }}
              className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] ${silent ? 'bg-red-500/20 border-red-500/40 text-white' : 'bg-white/5 border-transparent text-white/50 hover:bg-white/10 hover:border-red-500/30'}`}
            >
              <div className="flex items-center gap-3">
                <VolumeX size={20} />
                <span className="font-medium">Silent Exit</span>
              </div>
              <div className={`w-4 h-4 rounded-full border ${silent ? 'bg-red-500 border-red-500' : 'border-white/30'}`} />
            </button>

            <button 
              onClick={() => { playClickSound(); setNoDelay(!noDelay); }}
              className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] ${noDelay ? 'bg-red-500/20 border-red-500/40 text-white' : 'bg-white/5 border-transparent text-white/50 hover:bg-white/10 hover:border-red-500/30'}`}
            >
              <div className="flex items-center gap-3">
                <Timer size={20} />
                <span className="font-medium">No Entry Delay</span>
              </div>
              <div className={`w-4 h-4 rounded-full border ${noDelay ? 'bg-red-500 border-red-500' : 'border-white/30'}`} />
            </button>
          </div>
        </div>

        <div className="text-white/40 text-xs leading-relaxed">
          <p>Please ensure all windows and doors are closed before arming the system.</p>
        </div>
      </div>

      {/* Right Side: Keypad */}
      <div className="flex-1 p-8 flex flex-col items-center justify-center relative">
        <button 
          onClick={() => { playClickSound(); onClose(); }}
          className="absolute top-6 right-6 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        >
          <X size={24} />
        </button>

        <div className="w-full max-w-sm">
          {/* Code Display */}
          <div className="flex justify-center gap-4 mb-10 h-16 items-center">
            {[...Array(4)].map((_, i) => (
              <div 
                key={i}
                className={`w-4 h-4 rounded-full transition-all duration-200 ${i < code.length ? 'bg-white scale-125 shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'bg-white/10'}`}
              />
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handleNumClick(num.toString())}
                className="h-20 w-full rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/40 text-3xl font-light text-white transition-all active:scale-95 flex items-center justify-center hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                {num}
              </button>
            ))}
            <div className="flex items-center justify-center">
               <Lock size={24} className="text-white/20" />
            </div>
            <button
              onClick={() => handleNumClick('0')}
              className="h-20 w-full rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/40 text-3xl font-light text-white transition-all active:scale-95 flex items-center justify-center hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              0
            </button>
            <button
              onClick={handleDelete}
              className="h-20 w-full rounded-2xl bg-transparent hover:bg-white/5 text-white/50 transition-all active:scale-95 flex items-center justify-center hover:text-white"
            >
              <Delete size={28} />
            </button>
          </div>

          {/* Action Button */}
          <button
            onClick={() => { playClickSound(); onConfirm(); }}
            className={`
              w-full py-5 rounded-2xl font-bold text-lg tracking-widest uppercase transition-all duration-300
              ${code.length === 4 
                ? 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.5)] hover:shadow-[0_0_50px_rgba(239,68,68,0.8)] scale-100' 
                : 'bg-white/5 text-white/30 cursor-not-allowed hover:bg-white/10'}
            `}
            disabled={code.length !== 4}
          >
            {code.length === 4 ? 'Confirm Arming' : 'Enter Code'}
          </button>
          
          {/* Quick Arm Option (Bypass Code) */}
          <button 
             onClick={() => { playClickSound(); onConfirm(); }}
             className="w-full mt-4 text-xs text-red-400 font-medium hover:text-red-300 uppercase tracking-wider hover:drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]"
          >
             Quick Arm (Bypass Code)
          </button>
        </div>
      </div>
    </div>
  );
};