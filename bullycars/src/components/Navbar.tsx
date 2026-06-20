import React, { useState } from 'react';
import { Wrench, Image as ImageIcon, Tag, User, Calendar, Menu, X, ShieldCheck, Award, ShoppingCart } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  currentTab: string;
  setTab: (tab: string) => void;
  cart: CartItem[];
  setActiveSubtab?: (subtab: 'bot' | 'insumos' | 'herramientas' | 'repuestos' | 'detaling' | 'presupuesto') => void;
}

export default function Navbar({ currentTab, setTab, cart = [], setActiveSubtab }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: 'Servicios', icon: Wrench },
    { id: 'gallery', label: 'Galería', icon: ImageIcon },
    { id: 'accessories', label: 'Accesorios', icon: Tag },
    { id: 'community', label: 'Comunidad', icon: User },
    { id: 'schedule', label: 'Agendar Cita', icon: Calendar },
    { id: 'certifications', label: 'Certificaciones 🏆', icon: Award },
    { id: 'connect', label: 'Bully-Connect ⚡', icon: ShieldCheck },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#0e0f11]/90 backdrop-blur-md border-b border-[#21242a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setTab('landing')}>
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#FFD16C] text-black shadow-lg shadow-amber-brand/10">
              <span className="font-display text-xl font-black tracking-tight">BC</span>
            </div>
            <div>
              <span className="font-display text-xl sm:text-2xl font-black text-white tracking-widest block">BULLY<span className="text-amber-brand">CARS</span></span>
              <span className="text-[9px] text-[#FFD16C]/60 font-mono tracking-widest block -mt-1 uppercase">ENGINEERING VAULT</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 border ${
                    isActive
                      ? 'bg-[rgba(255,209,108,0.08)] border-amber-brand/35 text-amber-brand shadow-md shadow-amber-brand/5'
                      : 'text-gray-400 hover:text-white hover:bg-white/5 border-transparent'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}

            {/* Core Desktop Shopping Cart Button with Super Accessibility */}
            {cart.length > 0 && (
              <button
                onClick={() => {
                  setTab('accessories');
                  if (setActiveSubtab) setActiveSubtab('presupuesto');
                  setTimeout(() => {
                    const el = document.getElementById('budget-section');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }
                  }, 150);
                }}
                className="flex items-center gap-2.5 px-4.5 py-2.5 rounded-xl text-sm font-black transition-all duration-300 border bg-[#1c1200]/90 border-amber-brand text-amber-brand cursor-pointer hover:bg-amber-brand hover:text-black shadow-[0_0_15px_rgba(255,209,108,0.25)] hover:shadow-amber-brand/40 animate-pulse active:scale-95 ml-2"
              >
                <ShoppingCart className="w-4 h-4 shrink-0" />
                <span>Carro ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
              </button>
            )}
          </div>

          {/* Mobile quick accessories cart shortcut & menu action */}
          <div className="flex md:hidden items-center gap-2.5">
            {cart.length > 0 && (
              <button
                onClick={() => {
                  setTab('accessories');
                  if (setActiveSubtab) setActiveSubtab('presupuesto');
                  setTimeout(() => {
                    const el = document.getElementById('budget-section');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }
                  }, 150);
                }}
                className="relative p-2.5 rounded-xl border-2 border-amber-brand bg-[#1c1200] text-amber-brand active:scale-95 shadow-[0_0_12px_rgba(255,209,108,0.3)] cursor-pointer flex items-center justify-center animate-bounce"
                title="Ver Carro"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white rounded-full w-5 h-5 flex items-center justify-center font-black text-[10px] shadow border border-black animate-pulse">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              </button>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-gray-400 hover:text-white hover:bg-[#1a1c22] focus:outline-none border border-[#21242a]"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0e0f11] border-b border-[#21242a] space-y-1.5 px-4 pt-2.5 pb-5 shadow-xl">
          {/* Mobile Shopping Cart Item inside navigation dropdown if items are present */}
          {cart.length > 0 && (
            <button
              onClick={() => {
                setTab('accessories');
                if (setActiveSubtab) setActiveSubtab('presupuesto');
                setIsOpen(false);
                setTimeout(() => {
                  const el = document.getElementById('budget-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 150);
              }}
              className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-left font-black text-sm bg-gradient-to-r from-[#1c1200] to-transparent border-l-4 border-amber-brand text-amber-brand shadow-[0_0_10px_rgba(255,209,108,0.1)] mb-2"
            >
              <span className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5 text-amber-brand" />
                Ver Presupuesto Final
              </span>
              <span className="bg-rose-600 text-white text-[10px] font-black rounded-full px-2 py-0.5 shadow">
                {cart.reduce((a, b) => a + b.quantity, 0)} items
              </span>
            </button>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setTab(item.id);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left font-semibold text-sm transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-brand/10 to-transparent border-l-4 border-amber-brand text-amber-brand'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}
