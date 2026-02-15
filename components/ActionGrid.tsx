import React from 'react';
import { SystemState } from '../types';
import { ScrollText, Sliders, Bell } from 'lucide-react';
import { playClickSound } from '../utils/sound';

interface ActionGridProps {
  currentState: SystemState;
  onStateChange: (newState: SystemState) => void;
  onTriggerSOS: () => void;
  onOpenSettings: () => void;
  onOpenLog: () => void;
  onOpenArm: () => void;
}

export const ActionGrid: React.FC<ActionGridProps> = ({ currentState, onStateChange, onTriggerSOS, onOpenSettings, onOpenLog, onOpenArm }) => {
  
  // Custom Icon for Home Arm (House with Checkmark)
  const HomeCheckIcon = ({ size, strokeWidth, className }: { size?: number, strokeWidth?: number, className?: string }) => (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={strokeWidth || 2} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M16 6V4h3v4" /> {/* Chimney */}
      <path d="M8.5 13.5l2 2 4.5-4.5" /> {/* Checkmark */}
    </svg>
  );

  // Custom Icon for Disarm (Shield with X)
  const DisarmShieldIcon = ({ size, strokeWidth, className }: { size?: number, strokeWidth?: number, className?: string }) => (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={strokeWidth || 2} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 9 6 6" />
      <path d="m15 9-6 6" />
    </svg>
  );

  // Custom Icon for Arm (Shield with Checkmark)
  const ArmCheckIcon = ({ size, strokeWidth, className }: { size?: number, strokeWidth?: number, className?: string }) => (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={strokeWidth || 2} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );

  const buttons = [
    {
      id: 'log',
      label: 'Log',
      icon: ScrollText,
      active: false,
      onClick: onOpenLog,
      colorClass: 'hover:bg-blue-500/20 hover:border-blue-400 text-blue-100 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Sliders,
      active: false,
      onClick: onOpenSettings,
      colorClass: 'hover:bg-purple-500/20 hover:border-purple-400 text-purple-100 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]'
    },
    {
      id: 'sos',
      label: 'SOS',
      icon: Bell, // We will style this heavily to be the required SOS custom icon
      active: currentState === 'SOS',
      onClick: onTriggerSOS,
      isSOS: true,
      colorClass: 'bg-gradient-to-br from-red-900/40 to-red-800/20 border-red-500/30 text-red-100 hover:bg-red-800/40 hover:shadow-[0_0_30px_rgba(220,38,38,0.8)] hover:border-red-500'
    },
    {
      id: 'arm',
      label: 'Arm',
      icon: ArmCheckIcon,
      active: currentState === 'ARMED_AWAY',
      onClick: onOpenArm, 
      colorClass: currentState === 'ARMED_AWAY' 
        ? 'bg-red-500 text-white border-red-400 shadow-[0_0_30px_-5px_rgba(239,68,68,0.5)] hover:shadow-[0_0_50px_rgba(239,68,68,0.9)]' 
        : 'hover:bg-red-500/20 hover:border-red-400 text-white/70 hover:text-red-100 hover:shadow-[0_0_20px_rgba(239,68,68,0.6)]'
    },
    {
      id: 'disarm',
      label: 'Disarm',
      icon: DisarmShieldIcon,
      active: currentState === 'DISARMED',
      onClick: () => onStateChange('DISARMED'),
      colorClass: currentState === 'DISARMED' 
        ? 'bg-emerald-500 text-white border-emerald-400 shadow-[0_0_30px_-5px_rgba(16,185,129,0.5)] hover:shadow-[0_0_50px_rgba(16,185,129,0.9)]' 
        : 'hover:bg-emerald-500/20 hover:border-emerald-400 text-white/70 hover:text-emerald-100 hover:shadow-[0_0_20px_rgba(16,185,129,0.6)]'
    },
    {
      id: 'home',
      label: 'Home Arm',
      icon: HomeCheckIcon,
      active: currentState === 'ARMED_HOME',
      onClick: () => onStateChange('ARMED_HOME'),
      colorClass: currentState === 'ARMED_HOME' 
        ? 'bg-amber-500 text-white border-amber-400 shadow-[0_0_30px_-5px_rgba(245,158,11,0.5)] hover:shadow-[0_0_50px_rgba(245,158,11,0.9)]' 
        : 'hover:bg-amber-500/20 hover:border-amber-400 text-white/70 hover:text-amber-100 hover:shadow-[0_0_20px_rgba(245,158,11,0.6)]'
    }
  ];

  // Custom SOS Icon Component to match requirements
  const SOSIcon = () => (
    <div className="relative flex items-center justify-center w-8 h-8">
       <span className="font-black text-xs tracking-tighter">SOS</span>
       <div className="absolute inset-0 border-[1.5px] border-current rounded-full"></div>
    </div>
  );

  return (
    <div className="grid grid-cols-6 gap-4 h-24 px-4 w-full">
      {buttons.map((btn) => {
        const Icon = btn.icon;
        
        return (
          <button
            key={btn.id}
            onClick={() => {
              playClickSound();
              btn.onClick();
            }}
            className={`
              relative group flex flex-col items-center justify-center gap-2
              rounded-xl border backdrop-blur-md transition-all duration-300
              active:scale-95
              ${btn.active ? 'border-transparent opacity-100 scale-105' : 'bg-white/5 border-white/10 opacity-90'}
              ${btn.colorClass}
            `}
          >
            {btn.isSOS ? (
               <SOSIcon />
            ) : (
               <Icon 
                 size={28} 
                 strokeWidth={1.5} 
                 className={`transition-transform duration-300 ${btn.active ? 'scale-110' : 'group-hover:scale-110'}`} 
               />
            )}
            
            <span className={`text-xs font-semibold tracking-wider uppercase ${btn.active ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}>
              {btn.label}
            </span>

            {/* Active Indicator Dot */}
            {btn.active && (
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            )}
          </button>
        );
      })}
    </div>
  );
};