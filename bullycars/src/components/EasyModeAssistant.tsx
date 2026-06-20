import React, { useState } from 'react';
import { Accessibility, HelpCircle, Eye, ZoomIn, X, ChevronRight, Phone, MessageSquare, Calendar, ShoppingCart, Award, Image, Home } from 'lucide-react';

interface EasyModeAssistantProps {
  currentTab: string;
  setTab: (tab: string) => void;
  isLargeText: boolean;
  setIsLargeText: (active: boolean) => void;
  isHighContrast: boolean;
  setIsHighContrast: (active: boolean) => void;
  setActiveSubtab?: (subtab: 'bot' | 'insumos' | 'herramientas' | 'repuestos' | 'detaling' | 'presupuesto') => void;
}

export default function EasyModeAssistant({
  currentTab,
  setTab,
  isLargeText,
  setIsLargeText,
  isHighContrast,
  setIsHighContrast,
  setActiveSubtab
}: EasyModeAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showHowToUse, setShowHowToUse] = useState(false);

  // Big, friendly, plain Spanish guide array
  const simpleDestinations = [
    {
      id: 'landing',
      title: '🏠 Portada e Inicio',
      description: 'Volver a la página principal de bienvenida comercial.',
      badge: 'Básico',
      action: () => {
        setTab('landing');
        setIsOpen(false);
      }
    },
    {
      id: 'accessories',
      title: '🛒 Comprar Espátulas y Herramientas',
      description: 'Ver herramientas, el kit de espátulas de fieltro o armar un presupuesto.',
      badge: 'Carro de Compras',
      action: () => {
        setTab('accessories');
        setIsOpen(false);
      }
    },
    {
      id: 'schedule',
      title: '📅 Reservar una Hora o Servicio',
      description: 'Agendar una cita para cuidar, limpiar o instalar vinyl en tu auto.',
      badge: 'Trámite Rápido',
      action: () => {
        setTab('schedule');
        setIsOpen(false);
      }
    },
    {
      id: 'connect',
      title: '💬 Asistente Virtual Inteligente',
      description: 'Escribir preguntas para resolver dudas sobre repuestos o asesoría.',
      badge: 'Ayuda Directa',
      action: () => {
        setTab('connect');
        setIsOpen(false);
      }
    },
    {
      id: 'certifications',
      title: '🏆 Cursos y Certificaciones',
      description: 'Aprender a instalar láminas protectoras y obtener diplomas aprobados.',
      badge: 'Cursos',
      action: () => {
        setTab('certifications');
        setIsOpen(false);
      }
    },
    {
      id: 'gallery',
      title: '🖼️ Ver Fotos de Trabajos Recientes',
      description: 'Fotos grandes de autos que ya han sido terminados por profesionales.',
      badge: 'Galería',
      action: () => {
        setTab('gallery');
        setIsOpen(false);
      }
    }
  ];

  return (
    <>
      {/* Floating Big Accessibility Toggle Button placed prominently in the bottom corner */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          id="btn-accessibility-assistant"
          onClick={() => setIsOpen(true)}
          className={`flex items-center gap-3 px-5 py-4 rounded-2xl font-black text-sm uppercase tracking-wide cursor-pointer shadow-[0_8px_32px_rgba(255,209,108,0.3)] border-2 transition-all duration-300 active:scale-95 ${
            isHighContrast
              ? 'bg-yellow-400 text-black border-black border-4'
              : 'bg-amber-brand text-[#121418] hover:bg-[#ffe19c] border-white/20'
          }`}
          title="Abrir Asistente de Ayuda y Accesibilidad"
        >
          <Accessibility className="w-6 h-6 animate-pulse" />
          <span>👵👴 Modo Sencillo y Ayuda</span>
        </button>
      </div>

      {/* Full screen Easy Navigation Modal Panel */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 overflow-y-auto flex items-center justify-center p-4">
          <div 
            id="accessibility-modal-content"
            className="w-full max-w-2xl bg-[#121418] border-3 border-amber-brand rounded-4xl p-6 sm:p-8 space-y-6 shadow-[0_20px_50px_rgba(255,209,108,0.15)] text-left relative animate-in fade-in-50 zoom-in-95 duration-200"
          >
            {/* Close button inside modal */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white hover:bg-[#e03a3d] hover:text-white transition-all cursor-pointer border border-white/20"
              title="Cerrar panel de ayuda"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header section with conversational tone */}
            <div className="border-b border-white/15 pb-5 space-y-2">
              <span className="flex items-center gap-2.5 text-amber-brand font-black tracking-widest text-xs uppercase bg-[#1c1200] max-w-max px-3.5 py-1.5 rounded-full border border-amber-brand/35">
                <Accessibility className="w-4 h-4" /> Asistente de Lectura Fácil
              </span>
              <h2 className="font-display text-2.5xl sm:text-3.5xl font-black text-white tracking-tight leading-none mt-1">
                ¿Qué deseas ver en la página?
              </h2>
              <p className="text-gray-300 text-base font-medium leading-relaxed">
                Diseñamos este menú interactivo con letras grandes para que te muevas sin complicaciones y encuentres todo a la primera.
              </p>
            </div>

            {/* Accessibility Quick Toggles Box */}
            <div className="bg-[#1a1c22] border border-[#2c303a] rounded-2.5xl p-5 space-y-4">
              <h4 className="font-bold text-sm text-gray-300 uppercase tracking-wider flex items-center gap-2">
                <Eye className="w-4 h-4 text-amber-brand" /> Ajustes para Mayor Visibilidad:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* FontSize Toggle */}
                <button
                  onClick={() => setIsLargeText(!isLargeText)}
                  className={`flex items-center justify-between p-4 rounded-xl border font-bold text-sm transition-all active:scale-[0.98] ${
                    isLargeText
                      ? 'bg-amber-brand text-black border-white'
                      : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <ZoomIn className="w-5 h-5 shrink-0" />
                    Letra Más Grande y Fácil
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded bg-black/20 uppercase font-black">
                    {isLargeText ? 'ACTIVADO' : 'DESACTIVADO'}
                  </span>
                </button>

                {/* High Contrast Toggle */}
                <button
                  onClick={() => setIsHighContrast(!isHighContrast)}
                  className={`flex items-center justify-between p-4 rounded-xl border font-bold text-sm transition-all active:scale-[0.98] ${
                    isHighContrast
                      ? 'bg-yellow-400 text-black border-black border-2 font-black'
                      : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Eye className="w-5 h-5 shrink-0" />
                    Colores de Alto Contraste
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded bg-black/20 uppercase font-black">
                    {isHighContrast ? 'ACTIVADO' : 'DESACTIVADO'}
                  </span>
                </button>
              </div>
            </div>

            {/* conversational Navigation Options List with big spacing and giant buttons */}
            <div className="space-y-3.5">
              <h4 className="font-bold text-sm text-gray-400 uppercase tracking-wider">
                Presiona cualquier botón grande para abrir esa sección:
              </h4>

              <div className="grid grid-cols-1 gap-3 max-h-[380px] overflow-y-auto pr-1">
                {simpleDestinations.map((dest) => {
                  const isActive = currentTab === dest.id;
                  return (
                    <button
                      key={dest.id}
                      onClick={dest.action}
                      className={`group flex items-start gap-4 p-4.5 rounded-2.5xl text-left border transition-all active:scale-[0.99] cursor-pointer hover:border-amber-brand ${
                        isActive
                          ? 'bg-gradient-to-r from-[#1c1200] to-transparent border-amber-brand/80 ring-2 ring-amber-brand/40 shadow-md'
                          : 'bg-white/[0.03] border-white/10 hover:bg-[#15171d]'
                      }`}
                    >
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2.5">
                          <span className={`text-base sm:text-lg font-black tracking-tight ${isActive ? 'text-amber-brand' : 'text-white'}`}>
                            {dest.title}
                          </span>
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-gray-400">
                            {dest.badge}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed group-hover:text-gray-300">
                          {dest.description}
                        </p>
                      </div>
                      <div className="p-2 rounded-xl bg-white/5 text-gray-400 group-hover:bg-amber-brand group-hover:text-black transition-all">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Direct Telephone Support Information Footer */}
            <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs font-semibold text-gray-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span>Asesores disponibles en horario hábil para compras asistidas.</span>
              </div>
              <a
                href="https://wa.me/56900000000"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-emerald-500/30 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500 hover:text-black transition-all active:scale-95 text-xs font-black uppercase"
              >
                <Phone className="w-3.5 h-3.5" />
                Ayuda Directa por WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
