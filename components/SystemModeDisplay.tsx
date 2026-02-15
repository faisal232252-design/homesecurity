import React from 'react';
import { ShieldCheck, ShieldAlert, Shield, BellRing } from 'lucide-react';
import { SystemState } from '../types';

interface SystemModeDisplayProps {
  state: SystemState;
}

export const SystemModeDisplay: React.FC<SystemModeDisplayProps> = ({ state }) => {
  const getConfig = () => {
    switch (state) {
      case 'DISARMED':
        return {
          icon: ShieldCheck,
          text: 'DISARMED',
          subtext: 'System is ready',
          color: 'text-emerald-400',
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/20',
          glow: 'shadow-[0_0_50px_-10px_rgba(16,185,129,0.3)]'
        };
      case 'ARMED_AWAY':
        return {
          icon: Shield,
          text: 'ARMED AWAY',
          subtext: 'All sensors active',
          color: 'text-red-500',
          bg: 'bg-red-500/10',
          border: 'border-red-500/20',
          glow: 'shadow-[0_0_60px_-10px_rgba(239,68,68,0.4)]'
        };
      case 'ARMED_HOME':
        return {
          icon: Shield,
          text: 'ARMED HOME',
          subtext: 'Motion disabled',
          color: 'text-amber-400',
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/20',
          glow: 'shadow-[0_0_50px_-10px_rgba(245,158,11,0.3)]'
        };
      case 'SOS':
        return {
          icon: BellRing,
          text: 'EMERGENCY',
          subtext: 'Alarm Triggered',
          color: 'text-white',
          bg: 'bg-red-600',
          border: 'border-red-500',
          glow: 'shadow-[0_0_80px_0px_rgba(220,38,38,0.6)] animate-pulse'
        };
    }
  };

  const config = getConfig();
  const Icon = config.icon;

  return (
    <div className={`
      relative flex flex-col items-center justify-center 
      w-64 h-64 rounded-full backdrop-blur-xl border-2
      transition-all duration-500 ease-out
      ${config.bg} ${config.border} ${config.glow}
    `}>
      <Icon size={80} strokeWidth={1} className={`${config.color} mb-3 transition-colors duration-500`} />
      
      <div className="text-center">
        <h2 className={`text-2xl font-bold tracking-widest ${config.color} transition-colors duration-500`}>
          {config.text}
        </h2>
        <p className="text-sm text-white/60 font-medium uppercase tracking-wider mt-1">
          {config.subtext}
        </p>
      </div>

      {/* Decorative ring */}
      <div className={`absolute inset-2 rounded-full border border-dashed opacity-30 ${config.border}`}></div>
    </div>
  );
};