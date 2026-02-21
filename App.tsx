import React, { useState, useEffect } from 'react';
import { VideoBackground } from './components/VideoBackground';
import { SystemStatusHeader } from './components/SystemStatusHeader';
import { TimeDateModule } from './components/TimeDateModule';
import { WeatherModule } from './components/WeatherModule';
import { ActionGrid } from './components/ActionGrid';
import { SystemModeDisplay } from './components/SystemModeDisplay';
import { SettingsPanel } from './components/SettingsPanel';
import { LogPanel } from './components/LogPanel';
import { ArmPanel } from './components/ArmPanel';
import { SystemState } from './types';
import { playClickSound } from './utils/sound';

// The main layout simulates a 1024x600px screen.
// We center it on the user's browser window.

const App: React.FC = () => {
  const [systemState, setSystemState] = useState<SystemState>('ARMED_HOME');
  const [showSOSConfirm, setShowSOSConfirm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const [showArmPanel, setShowArmPanel] = useState(false);

  // Auto-scale logic to fit the 1024x600 panel on smaller screens if necessary
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const targetWidth = 1024;
      const targetHeight = 600;
      
      // Calculate scale to fit with some margin
      const scaleX = (windowWidth - 40) / targetWidth;
      const scaleY = (windowHeight - 40) / targetHeight;
      const newScale = Math.min(scaleX, scaleY, 1); // Max scale 1 (don't upscale)
      setScale(newScale);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleArmConfirm = () => {
    setSystemState('ARMED_AWAY');
    setShowArmPanel(false);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#0a0a0a] overflow-hidden relative font-sans selection:bg-amber-500/30">
       {/* 
         Architectural Wall Background 
         Simulates a dark, matte wall with subtle lighting.
       */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-[#050505]"></div>
      
      {/* Subtle Wall Texture */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
      </div>

      {/* Ambient Lighting / Shadow behind device - Adjusted for Yellow/Gold Theme */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-gradient-radial from-amber-500/10 to-transparent opacity-60 blur-[120px] pointer-events-none"></div>

      <div 
        style={{ 
          width: '1024px', 
          height: '600px', 
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          boxShadow: '0 25px 60px -12px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 1px rgba(255,255,255,0.1)'
        }}
        className="relative bg-black rounded-[1.5rem] overflow-hidden group"
      >
        <VideoBackground state={systemState} />
        
        {/* Main Content Layer */}
        <div className="relative z-10 w-full h-full flex flex-col text-white p-8 justify-between select-none">
          
          {/* Row 1: Top System Bar */}
          <SystemStatusHeader />

          {/* Row 2: Main Info & Mode Indicator */}
          <div className="flex-1 flex flex-row items-center gap-10 mt-6 mb-4">
            
            {/* Left Col: Time & Weather */}
            <div className="flex flex-col gap-8 w-[40%] pl-2 animate-in fade-in slide-in-from-left-4 duration-700">
              <TimeDateModule />
              <WeatherModule />
            </div>

            {/* Middle: Dynamic System Mode Status (Hero Element) */}
            <div className="flex-1 flex justify-center items-center animate-in fade-in zoom-in duration-700 delay-150">
              <SystemModeDisplay state={systemState} />
            </div>

            {/* Right: Spacing buffer (Visual balance for the grid below) */}
            <div className="w-[10%]"></div>
          </div>

          {/* Row 3: Action Grid (Bottom) */}
          <div className="w-full pb-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <ActionGrid 
              currentState={systemState} 
              onStateChange={setSystemState} 
              onTriggerSOS={() => setShowSOSConfirm(true)}
              onOpenSettings={() => setShowSettings(true)}
              onOpenLog={() => setShowLog(true)}
              onOpenArm={() => setShowArmPanel(true)}
            />
          </div>

        </div>

        {/* Settings Panel Overlay */}
        {showSettings && (
          <SettingsPanel onClose={() => setShowSettings(false)} />
        )}

        {/* Log Panel Overlay */}
        {showLog && (
          <LogPanel onClose={() => setShowLog(false)} />
        )}

        {/* Arm Panel Overlay */}
        {showArmPanel && (
          <ArmPanel 
            onClose={() => setShowArmPanel(false)} 
            onConfirm={handleArmConfirm}
          />
        )}

        {/* SOS Overlay Mockup */}
        {showSOSConfirm && (
          <div className="absolute inset-0 z-50 bg-red-950/95 backdrop-blur-xl flex items-center justify-center flex-col animate-in fade-in zoom-in duration-200">
             <div className="bg-black/60 p-10 rounded-3xl border border-red-500/30 flex flex-col items-center gap-8 max-w-lg text-center shadow-2xl">
                <div className="w-24 h-24 rounded-full bg-red-600 flex items-center justify-center animate-pulse shadow-[0_0_40px_rgba(220,38,38,0.5)]">
                  <span className="font-black text-3xl tracking-tighter">SOS</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-3">Emergency Alarm</h2>
                  <p className="text-white/70 text-lg leading-relaxed">This will immediately trigger the high-decibel siren and notify emergency contacts and authorities.</p>
                </div>
                <div className="flex gap-4 w-full pt-4">
                  <button 
                    onClick={() => {
                      playClickSound();
                      setShowSOSConfirm(false);
                    }}
                    className="flex-1 py-5 bg-white/10 hover:bg-white/20 rounded-2xl font-semibold text-lg transition-colors border border-white/5"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      playClickSound();
                      setSystemState('SOS');
                      setShowSOSConfirm(false);
                    }}
                    className="flex-1 py-5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 rounded-2xl font-bold text-lg transition-all shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_50px_rgba(220,38,38,0.6)]"
                  >
                    CONFIRM
                  </button>
                </div>
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default App;