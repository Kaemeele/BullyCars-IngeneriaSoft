import React from 'react';
import { Shield, Mail, Phone, MapPin, Clock, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  setTab: (tab: string) => void;
}

export default function Footer({ setTab }: FooterProps) {
  return (
    <footer className="bg-[#07080a] border-t border-[#1a1c22] text-gray-400 font-sans mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Brand */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setTab('landing')}>
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#FFD16C] text-black font-display font-black text-sm">
                BC
              </div>
              <span className="font-display text-lg font-black text-white tracking-widest">
                BULLY<span className="text-amber-brand">CARS</span>
              </span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed font-sans">
              Ingeniería de confianza y estética vehicular de precisión extrema. Elevando el estándar del tuning, detallado y protección en el Vault.
            </p>
            <div className="flex items-center gap-2 text-[10px] text-amber-brand bg-amber-brand/5 border border-amber-brand/15 px-3 py-1 rounded-full w-fit font-semibold">
              <Shield className="w-3.5 h-3.5 text-amber-brand" />
              <span>SOPORTE DE ÉLITE VAULT</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-widest mb-4">Secciones</h4>
            <ul className="text-xs space-y-2.5">
              <li>
                <button onClick={() => setTab('landing')} className="hover:text-amber-brand transition-colors flex items-center gap-1 group font-medium cursor-pointer">
                  Servicios y Mecánica <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button onClick={() => setTab('gallery')} className="hover:text-amber-brand transition-colors flex items-center gap-1 group font-medium cursor-pointer">
                  Muro de Proezas (Galería) <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button onClick={() => setTab('accessories')} className="hover:text-amber-brand transition-colors flex items-center gap-1 group font-medium cursor-pointer">
                  Insumos Premium & BullyBot <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button onClick={() => setTab('community')} className="hover:text-amber-brand transition-colors flex items-center gap-1 group font-medium cursor-pointer">
                  Comunidad del Vault <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button onClick={() => setTab('certifications')} className="hover:text-amber-brand transition-colors flex items-center gap-1 group font-medium cursor-pointer">
                  Certificaciones y Cursos <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Hours */}
          <div>
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-widest mb-4">Horarios Vault</h4>
            <ul className="text-xs space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <Clock className="w-3.5 h-3.5 text-amber-brand shrink-0" />
                <div>
                  <span className="block text-[10px] text-gray-500 font-sans">Lunes a Viernes</span>
                  <span className="text-gray-300 font-medium">08:30 AM – 06:30 PM</span>
                </div>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Clock className="w-3.5 h-3.5 text-amber-brand shrink-0" />
                <div>
                  <span className="block text-[10px] text-gray-500 font-sans">Sábados (Detallado/Mantención)</span>
                  <span className="text-gray-300 font-medium font-sans">09:00 AM – 02:00 PM</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Location/Contact */}
          <div>
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-widest mb-4">Contacto Directo</h4>
            <ul className="text-xs space-y-3 text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-brand shrink-0 mt-0.5" />
                <span className="leading-tight text-gray-300">Avenida Las Condes 10450, Santiago, RM, Chile</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-brand shrink-0" />
                <span className="text-gray-300">+56 9 8452 1190</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-brand shrink-0" />
                <span className="text-gray-300 font-sans">vault@bullycars.cl</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1a1c22] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-gray-500">
          <div>
            © {new Date().getFullYear()} BULLYCARS CHILE S.A. Todos los derechos reservados.
          </div>
          <div className="flex gap-4">
            <span className="hover:text-gray-300 transition-colors uppercase select-none cursor-pointer">SLA SERVICIO</span>
            <span className="hover:text-gray-300 transition-colors uppercase select-none cursor-pointer">TÉRMINOS VAULT</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
