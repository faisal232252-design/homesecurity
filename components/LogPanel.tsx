import React from 'react';
import { X, Shield, ShieldCheck, DoorOpen, AlertTriangle, Info, Calendar } from 'lucide-react';
import { playClickSound } from '../utils/sound';

interface LogPanelProps {
  onClose: () => void;
}

interface LogEntry {
  id: number;
  type: 'arm' | 'disarm' | 'alert' | 'info' | 'door';
  title: string;
  detail: string;
  time: string;
  date: string;
}

export const LogPanel: React.FC<LogPanelProps> = ({ onClose }) => {
  // Mock Data
  const logs: LogEntry[] = [
    { id: 1, type: 'disarm', title: 'System Disarmed', detail: 'Disarmed by User (Master)', time: '08:45 AM', date: 'Today' },
    { id: 2, type: 'door', title: 'Front Door Opened', detail: 'Sensor 01 Triggered', time: '08:42 AM', date: 'Today' },
    { id: 3, type: 'info', title: 'Daily System Check', detail: 'All sensors responding', time: '06:00 AM', date: 'Today' },
    { id: 4, type: 'arm', title: 'Armed (Home Mode)', detail: 'Armed by User (Jane)', time: '10:30 PM', date: 'Yesterday' },
    { id: 5, type: 'door', title: 'Back Door Closed', detail: 'Sensor 03 Restored', time: '06:15 PM', date: 'Yesterday' },
    { id: 6, type: 'alert', title: 'Motion Detected', detail: 'Garage Camera detected movement', time: '02:12 PM', date: 'Yesterday' },
    { id: 7, type: 'arm', title: 'Armed (Away Mode)', detail: 'Armed by Auto-Schedule', time: '08:00 AM', date: 'Yesterday' },
    { id: 8, type: 'info', title: 'Firmware Updated', detail: 'Updated to v2.4.1', time: '03:00 AM', date: 'Yesterday' },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'arm': return <Shield size={20} className="text-red-400" />;
      case 'disarm': return <ShieldCheck size={20} className="text-emerald-400" />;
      case 'alert': return <AlertTriangle size={20} className="text-amber-400" />;
      case 'door': return <DoorOpen size={20} className="text-blue-400" />;
      default: return <Info size={20} className="text-white/60" />;
    }
  };

  const getRowStyle = (type: string) => {
    if (type === 'alert') return 'bg-amber-500/10 border-amber-500/20';
    return 'bg-white/5 border-white/5 hover:bg-white/10';
  };

  return (
    <div className="absolute inset-0 z-40 bg-black/85 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-10 duration-300 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
        <h2 className="text-2xl font-light tracking-wide text-white flex items-center gap-3">
          <div className="w-1 h-8 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
          Event Log
        </h2>
        <button 
          onClick={() => { playClickSound(); onClose(); }}
          className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors active:scale-95 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        >
          <X size={24} />
        </button>
      </div>

      {/* List Container */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-6">
        <div className="flex flex-col gap-3">
          {logs.map((log) => (
            <div 
              key={log.id} 
              className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${getRowStyle(log.type)}`}
            >
              {/* Left: Icon & Info */}
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-black/30 border border-white/5 shadow-inner">
                  {getIcon(log.type)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white tracking-wide">{log.title}</div>
                  <div className="text-xs text-white/50 mt-0.5">{log.detail}</div>
                </div>
              </div>

              {/* Right: Timestamp */}
              <div className="text-right">
                <div className="text-sm font-medium text-white/90">{log.time}</div>
                <div className="text-xs font-medium text-white/40 uppercase tracking-wider mt-0.5 flex items-center justify-end gap-1">
                    {log.date !== 'Today' && <Calendar size={10} />}
                    {log.date}
                </div>
              </div>
            </div>
          ))}

          {/* End of list marker */}
          <div className="text-center py-6 text-xs font-medium text-white/20 uppercase tracking-widest">
            End of Records
          </div>
        </div>
      </div>
    </div>
  );
};