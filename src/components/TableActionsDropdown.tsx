'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  MoreVertical,
  ChevronDown,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  Ban,
  Unlock,
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';

export interface ActionItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'default' | 'danger' | 'success' | 'warning';
  divider?: boolean;
}

interface TableActionsDropdownProps {
  actions: ActionItem[];
  label?: string;
}

export function TableActionsDropdown({ actions, label = 'Actions' }: TableActionsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700/80 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
      >
        <span>{label}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-amber-400' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-48 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100 backdrop-blur-xl">
          {actions.map((action, idx) => (
            <React.Fragment key={idx}>
              {action.divider && <div className="my-1 border-t border-slate-800" />}

              {action.href ? (
                <Link
                  href={action.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors w-full text-left"
                >
                  {action.icon && <span className="text-slate-400">{action.icon}</span>}
                  <span>{action.label}</span>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    action.onClick?.();
                  }}
                  className={`flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium transition-colors w-full text-left cursor-pointer ${
                    action.variant === 'danger'
                      ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10'
                      : action.variant === 'success'
                      ? 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10'
                      : action.variant === 'warning'
                      ? 'text-amber-400 hover:text-amber-300 hover:bg-amber-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  {action.icon && (
                    <span
                      className={
                        action.variant === 'danger'
                          ? 'text-red-400'
                          : action.variant === 'success'
                          ? 'text-emerald-400'
                          : action.variant === 'warning'
                          ? 'text-amber-400'
                          : 'text-slate-400'
                      }
                    >
                      {action.icon}
                    </span>
                  )}
                  <span>{action.label}</span>
                </button>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
