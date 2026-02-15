import React, { useState } from 'react';
import { X, Volume2, Sun, Wifi, Bell, Shield, Smartphone, Info } from 'lucide-react';
import { playClickSound } from '../utils/sound';

interface SettingsPanelProps {
  onClose: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ onClose }) => {
  const [volume, setVolume] = useState(75);
  const [brightness, setBrightness] = useState(60);
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  // Reusable Slider Component
  const Slider = ({ value, onChange, icon: Icon }: { value: number, onChange: (val: number) => void, icon: any }) => (
    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-white/20 transition-colors hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]">
      <Icon size={24} className="text-white/70" />
      <div className="flex-1 h-2 bg-white/10 rounded-full relative overflow-hidden group cursor-pointer">
         <input 
            type="range" 
            min="0" 
            max="100" 
            value={value} 
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
         />
         <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-100 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            style={{ width: `${value}%` }}
         />
      </div>
      <span className="text-sm font-medium w-8 text-right text-white/60">{value}%</span>
    </div>
  );

  // Reusable Toggle Row
  const ToggleRow = ({ label, sublabel, icon: Icon, active, onToggle }: { label: string, sublabel: string, icon: any, active: boolean, onToggle: () => void }) => (
    <button 
      onClick={() => { playClickSound(); onToggle(); }}
      className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${active ? 'bg-white/10 border-white/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-white/5 border-transparent opacity-80 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]'}`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${active ? 'bg-blue-500/20 text-blue-200' : 'bg-white/5 text-white/40'}`}>
          <Icon size={20} />
        </div>
        <div className="text-left">
          <div className="text-sm font-semibold text-white">{label}</div>
          <div className="text-xs text-white/50">{sublabel}</div>
        </div>
      </div>
      <div className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${active ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-white/20'}`}>
        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 shadow-md ${active ? 'left-7' : 'left-1'}`} />
      </div>
    </button>
  );

  return (
    <div className="absolute inset-0 z-40 bg-black/80 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-10 duration-300 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
        <h2 className="text-2xl font-light tracking-wide text-white flex items-center gap-3">
          <div className="w-1 h-8 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
          System Settings
        </h2>
        <button 
          onClick={() => { playClickSound(); onClose(); }}
          className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors active:scale-95 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        >
          <X size={24} />
        </button>
      </div>

      {/* Content Grid */}
      <div className="flex-1 p-8 overflow-y-auto no-scrollbar grid grid-cols-2 gap-8">
        
        {/* Left Column: Sliders & Connectivity */}
        <div className="flex flex-col gap-6">
          <section className="space-y-4">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest pl-1">Display & Sound</h3>
            <Slider value={volume} onChange={setVolume} icon={Volume2} />
            <Slider value={brightness} onChange={setBrightness} icon={Sun} />
          </section>

          <section className="space-y-4">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest pl-1">Connectivity</h3>
             <ToggleRow 
              label="Wi-Fi Network" 
              sublabel={wifiEnabled ? "Connected to Home_5G" : "Disconnected"}
              icon={Wifi} 
              active={wifiEnabled} 
              onToggle={() => setWifiEnabled(!wifiEnabled)} 
            />
             <ToggleRow 
              label="Voice Prompts" 
              sublabel="Panel voice feedback"
              icon={Smartphone} 
              active={voiceEnabled} 
              onToggle={() => setVoiceEnabled(!voiceEnabled)} 
            />
          </section>
        </div>

        {/* Right Column: System Options */}
        <div className="flex flex-col gap-6">
          <section className="space-y-4">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest pl-1">Security Preferences</h3>
            <div className="grid grid-cols-1 gap-3">
              <ToggleRow 
                label="Chime on Open" 
                sublabel="Beep when doors open"
                icon={Bell} 
                active={true} 
                onToggle={() => {}} 
              />
              <ToggleRow 
                label="Entry Delay" 
                sublabel="30s entry delay active"
                icon={Shield} 
                active={true} 
                onToggle={() => {}} 
              />
            </div>
          </section>

          <section className="mt-auto bg-white/5 rounded-xl p-4 border border-white/5 flex items-start gap-4 hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all">
            <Info size={20} className="text-white/40 mt-1" />
            <div>
              <div className="text-sm font-medium text-white">System Info</div>
              <div className="text-xs text-white/40 mt-1 space-y-0.5">
                <p>Model: SecureTouch 7 Pro</p>
                <p>Firmware: v2.4.1 (Latest)</p>
                <p>Battery: Good (98%)</p>
              </div>
            </div>
            <button 
              onClick={() => playClickSound()}
              className="ml-auto px-4 py-2 text-xs font-bold bg-white/10 hover:bg-white/20 rounded-lg transition-colors hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]"
            >
              UPDATE
            </button>
          </section>
        </div>

      </div>
    </div>
  );
};