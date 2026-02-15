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
  const [systemState, setSystemState] = useState<SystemState>('DISARMED');
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
    <div className="w-screen h-screen flex items-center justify-center bg-[#0a0a0a] overflow-hidden relative">
       {/* Background noise/texture for the "device" casing feeling */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"></div>

      <div 
        style={{ 
          width: '1024px', 
          height: '600px', 
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          boxShadow: '0 0 100px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5) inset'
        }}
        className="relative bg-black rounded-xl overflow-hidden border border-white/5"
      >
        <VideoBackground state={systemState} />
        
        {/* Main Content Layer */}
        <div className="relative z-10 w-full h-full flex flex-col text-white p-6 justify-between select-none">
          
          {/* Row 1: Top System Bar */}
          <SystemStatusHeader />

          {/* Row 2: Main Info & Mode Indicator */}
          <div className="flex-1 flex flex-row items-center gap-8 mt-4 mb-2">
            
            {/* Left Col: Time & Weather */}
            <div className="flex flex-col gap-6 w-[40%] pl-2">
              <TimeDateModule />
              <WeatherModule />
            </div>

            {/* Middle: Dynamic System Mode Status (Hero Element) */}
            <div className="flex-1 flex justify-center items-center">
              <SystemModeDisplay state={systemState} />
            </div>

            {/* Right: Spacing buffer (Visual balance for the grid below) */}
            <div className="w-[10%]"></div>
          </div>

          {/* Row 3: Action Grid (Bottom) */}
          <div className="w-full pb-2">
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
          <div className="absolute inset-0 z-50 bg-red-950/90 backdrop-blur-md flex items-center justify-center flex-col animate-in fade-in zoom-in duration-200">
             <div className="bg-black/40 p-8 rounded-2xl border border-red-500/30 flex flex-col items-center gap-6 max-w-md text-center">
                <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center animate-pulse">
                  <span className="font-bold text-2xl">SOS</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Emergency Panic</h2>
                  <p className="text-white/70">Are you sure you want to trigger the emergency alarm? Authorities will be notified.</p>
                </div>
                <div className="flex gap-4 w-full">
                  <button 
                    onClick={() => {
                      playClickSound();
                      setShowSOSConfirm(false);
                    }}
                    className="flex-1 py-4 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      playClickSound();
                      setSystemState('SOS');
                      setShowSOSConfirm(false);
                    }}
                    className="flex-1 py-4 bg-red-600 hover:bg-red-500 rounded-xl font-bold transition-colors shadow-lg shadow-red-900/50"
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