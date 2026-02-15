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
        return 'bg-gradient-to-br from-red-950/80 via-black/60 to-black/80';
      case 'ARMED_HOME':
        return 'bg-gradient-to-br from-orange-950/80 via-black/60 to-black/80';
      case 'SOS':
        return 'bg-gradient-to-br from-red-600/40 via-red-950/90 to-black';
      case 'DISARMED':
      default:
        // Premium neutral/teal dark tint
        return 'bg-gradient-to-br from-slate-900/70 via-black/50 to-black/80';
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden -z-0">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
      >
        {/* Calm, premium abstract dark liquid/smoke */}
        <source src="https://cdn.pixabay.com/video/2023/10/22/186115-877232049_large.mp4" type="video/mp4" />
      </video>
      
      {/* State-based Color Overlay */}
      <div className={`absolute inset-0 transition-colors duration-1000 ease-in-out ${getOverlayGradient()}`} />
      
      {/* Vignette for focus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      
      {/* SOS Pulse Animation */}
      {state === 'SOS' && (
        <div className="absolute inset-0 bg-red-500/20 animate-pulse z-0 pointer-events-none" />
      )}
    </div>
  );
};