import React from 'react';
import { SystemState } from '../types';

interface VideoBackgroundProps {
  state: SystemState;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({ state }) => {

  // Determine overlay color based on state
  const getOverlayGradient = () => {
    switch (state) {
      case 'ARMED_AWAY':
        // Deep Red/Burgundy tint for Away - Serious, Secure
        return 'bg-gradient-to-br from-red-950/90 via-[#2a0a0a]/80 to-black/90 mix-blend-multiply';
      case 'ARMED_HOME':
        // Warm Amber/Gold tint for Home
        return 'bg-gradient-to-br from-amber-900/90 via-[#2c1a05]/80 to-black/90 mix-blend-multiply';
      case 'SOS':
        // Urgent Red Pulse tint
        return 'bg-gradient-to-br from-red-600/80 via-red-950/90 to-black mix-blend-multiply';
      case 'DISARMED':
      default:
        // Cool Slate/Blue tint - Clean, Modern
        return 'bg-gradient-to-br from-slate-950/60 via-[#050a15]/70 to-black/90 mix-blend-multiply';
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden -z-0 bg-black">
      {/* 
        Background Image: Modern Home Security Context
        A premium modern architectural home at dusk, implying safety and monitoring.
      */}
      <img 
        src="https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=2070&auto=format&fit=crop" 
        alt="Secure Home Background"
        className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
      />
      
      {/* Primary State Gradient Overlay - Multiplies color onto the image */}
      <div className={`absolute inset-0 transition-all duration-1000 ease-in-out ${getOverlayGradient()}`} />
      
      {/* Secondary Atmosphere Glow */}
       <div className={`absolute inset-0 opacity-30 mix-blend-overlay transition-colors duration-1000
        ${state === 'ARMED_AWAY' ? 'bg-red-600' : 
          state === 'ARMED_HOME' ? 'bg-amber-500' : 
          state === 'SOS' ? 'bg-red-600' : 
          'bg-blue-500'}`} 
      />

      {/* Vignette for focus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.9)_100%)]" />
      
      {/* Subtle Scanline/Grid Texture for 'Tech' feel */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05] mix-blend-overlay pointer-events-none"></div>

      {/* SOS Visuals */}
      {state === 'SOS' && (
        <div className="absolute inset-0 bg-red-500/20 animate-pulse z-0 pointer-events-none mix-blend-screen" />
      )}
    </div>
  );
};