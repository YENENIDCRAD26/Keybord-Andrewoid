import React from 'react';
import { Sparkles, Command } from 'lucide-react';

export interface ShortcutHudNotification {
  id: string;
  keys: string;
  message: string;
  icon?: string;
  timestamp: number;
}

interface ShortcutHudToastProps {
  notification: ShortcutHudNotification | null;
  onDismiss: () => void;
}

export const ShortcutHudToast: React.FC<ShortcutHudToastProps> = ({
  notification,
  onDismiss,
}) => {
  if (!notification) return null;

  return (
    <div
      id="shortcut-hud-toast"
      onClick={onDismiss}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] cursor-pointer select-none animate-in fade-in slide-in-from-top-4 duration-200"
      dir="rtl"
    >
      <div className="bg-slate-900/95 backdrop-blur-md text-white px-4 py-2 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center gap-3 max-w-[92vw] sm:max-w-md">
        {/* Icon / Key tag */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-lg">{notification.icon || '⚡'}</span>
          <span className="bg-blue-600/90 text-white font-mono font-bold text-[11px] px-2 py-0.5 rounded-lg border border-blue-400/40 shadow-xs">
            {notification.keys}
          </span>
        </div>

        {/* Message */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-slate-100 truncate">
            {notification.message}
          </p>
        </div>

        {/* Pulsing indicator */}
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
      </div>
    </div>
  );
};
