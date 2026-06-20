import React from 'react';
import { Shield, Sparkles, Wrench, ShieldCheck, Zap, PenTool, Flame, Compass, Car, Clock, Sliders, ArrowUpRight, Award } from 'lucide-react';

interface LandingViewProps {
  setTab: (tab: string) => void;
}

export default function LandingView({ setTab }: LandingViewProps) {
  // VIP Concierge items styled with advice prose
  const concierge = [
    {
      title: "Conserjería Premium & Custodia",
      desc: "Evita trasladarte en medio de tu agenda. Coordinamos el retiro seguro de tu vehículo en camión cerrado blindado o mediante chofer certificado para ingresarlo en custodia del Vault.",
      highlight: "RETIRADA DIRECTA"
    },
    {
      title: "Auxilio Dinámico y Soporte de Pistas",
      desc: "Asegura cobertura total ante imprevistos mecánicos en ruta. Nuestro servicio de auxilio rápido entrega scanner dinámico en terreno, carga y diagnósticos flash las 24 horas.",
      highlight: "ASISTENCIA EXCLUSIVA"
    },
    {
      title: "Inspección Pre-Compra Científica",
      desc: "Protege tu inversión adquiriendo un auto usado. Evaluamos el espesor micrométrico de pintura, posibles choques camuflados y un escaneo absoluto del kilometraje en busca de alteraciones.",
      highlight: "DIAGNÓSTICO CERTIFICADO"
    }
  ];

  return (
    <div className="bg-[#0b0c0e] text-white min-h-screen font-sans">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[#1f2228] bg-radial-[#15171c]_at_center py-24 lg:py-36">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[rgba(255,209,108,0.06)] blur-[140px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/2 left-10 w-80 h-80 bg-amber-brand/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-brand/10 border border-amber-brand/20 rounded-full">
              <Zap className="w-3.5 h-3.5 text-amber-brand animate-pulse" />
              <span className="font-mono text-xs font-bold text-amber-brand tracking-widest uppercase">INGENIERÍA SIN LÍMITES</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold font-display tracking-tight uppercase leading-[1.05] text-white">
              INGENIERÍA DE ALTO NIVEL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-brand to-[#e5b54a]">
                PASIÓN POR LA PERFECCIÓN
              </span>
            </h1>

            <p className="text-gray-400 font-sans text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl">
              Consigue el desempeño definitivo en nuestro taller boutique automotriz. Combinamos diagnósticos de pista asistidos por software de ingeniería, corrección holográfica tridimensional de laca y restauración integral de habitáculos bajo estricta discreción técnica.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => setTab('schedule')}
                className="px-7 py-4 rounded-xl font-mono text-xs font-black bg-amber-brand text-black hover:bg-[#ffe094] transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-amber-brand/10 flex items-center gap-2 cursor-pointer"
              >
                <Clock className="w-4.5 h-4.5" />
                RESERVAR TURNO PRIORITARIO
              </button>

              <button
                onClick={() => setTab('certifications')}
                className="px-7 py-4 rounded-xl font-mono text-xs font-semibold border border-[#2d313a] bg-[#121418] hover:bg-[#1a1d24] hover:border-amber-brand/45 transition-all duration-300 flex items-center gap-2 cursor-pointer text-gray-200"
              >
                <Award className="w-4.5 h-4.5 text-amber-brand" />
                CURSOS DE CERTIFICACIÓN 🏆
              </button>
            </div>

            {/* Micro stats board with amber branding */}
            <div className="grid grid-cols-3 gap-6 pt-14 border-t border-[#1f2228]/80 max-w-xl font-mono text-left">
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-white font-display">4,800+</span>
                <span className="text-[9px] text-gray-550 uppercase tracking-widest block font-bold">OBRAS TERMINADAS</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-amber-brand font-display">9H COATING</span>
                <span className="text-[9px] text-gray-550 uppercase tracking-widest block font-bold">ESTÁNDAR CERTIFICADO</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-white font-display">100%</span>
                <span className="text-[9px] text-gray-550 uppercase tracking-widest block font-bold">COMPROMISO TÉCNICO</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Core Section: Muro de 7 Proezas Maestras (Bento Grid) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#1f2228]/50 text-left">
        <div className="text-center md:text-left mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-brand/8 border border-amber-brand/20 rounded-full text-amber-brand text-[10px] font-bold tracking-widest uppercase font-mono">
            <Sparkles className="w-3.5 h-3.5 text-amber-brand" />
            CONAGRACIÓN MECÁNICA & ESTÉTICA
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight uppercase text-white leading-none">
            MURO DE 7 PROEZAS MAESTRAS
          </h2>
          <p className="text-gray-450 text-xs sm:text-sm max-w-3xl leading-relaxed font-sans">
            La excelencia expresada en siete hitos de ingeniería fina y restauración microscópica. Todo resguardado en tarjetas de diseño bento transparentes, configuradas bajo el estándar estricto de nuestro Vault.
          </p>
        </div>

        {/* Bento Grid container */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Card 1: Detallado de Laca & Escudo Cerámico Estelar 9H - Col Span 2, Row Span 2 */}
          <div className="md:col-span-2 md:row-span-2 p-8 glass-card glass-card-hover rounded-xl flex flex-col justify-between min-h-[460px] group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-brand/5 blur-3xl rounded-full pointer-events-none group-hover:bg-amber-brand/10 transition-all"></div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="p-3.5 bg-amber-brand/10 border border-amber-brand/20 rounded-xl">
                  <Sparkles className="w-6 h-6 text-amber-brand" />
                </div>
                <span className="font-mono text-[10px] text-amber-brand border border-amber-brand/25 bg-amber-brand/5 px-3 py-1 rounded-full uppercase font-bold tracking-wider">
                  Estándar 9H
                </span>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3.5xl font-black font-display text-white group-hover:text-amber-brand transition-colors tracking-tight uppercase leading-none">
                  Detallado Holográfico <br />& Capa Cerámica 9H
                </h3>
                <p className="text-sm text-gray-400 font-sans leading-relaxed">
                  Protege tu inversión con nuestra capa cerámica de dureza 9H nano-reforzada Carbon-Shell. Recupera la profundidad especular del color original eliminando de raíz las micro-rayas y swirl marks de lavados deficientes. Crea un revestimiento superhidrofóbico autolimpiante hermético que resiste la sal de carretera, lluvia ácida y rayos UV por más de tres años.
                </p>
              </div>
            </div>
            <div className="pt-6 border-t border-white/5 flex justify-between items-center bg-transparent mt-6">
              <span className="font-mono text-[10px] text-gray-500 uppercase">PROEZA MAESTRA_01</span>
              <button onClick={() => setTab('schedule')} className="text-xs font-mono font-bold text-amber-brand hover:underline flex items-center gap-1 cursor-pointer">
                RESERVAR AHORA &rarr;
              </button>
            </div>
          </div>

          {/* Card 2: Restauración Criogénica de Bloque Motor - Col Span 2, Row Span 1 */}
          <div className="md:col-span-2 p-6 glass-card glass-card-hover rounded-xl flex flex-col justify-between min-h-[210px] group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-brand/5 blur-2xl rounded-full pointer-events-none"></div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-amber-brand/10 border border-amber-brand/20 rounded-lg">
                  <Flame className="w-5 h-5 text-amber-brand" />
                </div>
                <span className="font-mono text-[9px] text-amber-brand border border-amber-brand/20 bg-amber-brand/5 px-2.5 py-0.5 rounded uppercase font-bold">
                  CRYO-CLEANING
                </span>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg sm:text-xl font-black font-display text-white group-hover:text-amber-brand transition-colors uppercase leading-tight">
                  Restauración Criogénica de Tren Motriz
                </h3>
                <p className="text-xs text-gray-450 font-sans leading-relaxed">
                  Conserva la pureza y disipación de temperatura de tu bloque motor. Remueve aceites densos y óxidos a -78.5°C con chorro de hielo seco micrométrico. Limpia profundamente en seco y sin agua, resguardando alternadores, conectores y cables de la deformación de laca.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-white/5 flex justify-between items-center bg-transparent mt-4">
              <span className="font-mono text-[9px] text-gray-550">PROEZA MAESTRA_02</span>
              <button onClick={() => setTab('schedule')} className="text-xs font-mono font-bold text-amber-brand hover:underline cursor-pointer">
                AGENDAR CITA
              </button>
            </div>
          </div>

          {/* Card 3: Wrapping Cast Film & Stealth Matte - Col Span 1, Row Span 1 */}
          <div className="md:col-span-1 p-6 glass-card glass-card-hover rounded-xl flex flex-col justify-between min-h-[210px] group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-amber-brand/10 border border-amber-brand/20 rounded-lg">
                  <PenTool className="w-5 h-5 text-amber-brand" />
                </div>
                <span className="font-mono text-[9px] text-amber-brand border border-amber-brand/15 bg-amber-brand/5 px-2 py-0.5 rounded font-bold">
                  STEALTH CAST
                </span>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-black font-display text-white group-hover:text-amber-brand transition-colors uppercase leading-snug">
                  Wrapping Cast & Stealth Matte
                </h3>
                <p className="text-xs text-gray-440 font-sans leading-relaxed">
                  Cambia la piel de tu superdeportivo. Instalamos vinilo cast fundido premium de alta estabilidad geométrica con cantos sellados térmicamente a 90°C.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-white/5 flex justify-between items-center bg-transparent mt-4 font-mono text-[9px] text-gray-550">
              <span>PROEZA MAESTRA_03</span>
            </div>
          </div>

          {/* Card 4: Suspensión de Pista & Coilovers Regulables - Col Span 1, Row Span 1 */}
          <div className="md:col-span-1 p-6 glass-card glass-card-hover rounded-xl flex flex-col justify-between min-h-[210px] group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-amber-brand/10 border border-amber-brand/20 rounded-lg">
                  <Sliders className="w-5 h-5 text-amber-brand" />
                </div>
                <span className="font-mono text-[9px] text-amber-brand border border-amber-brand/15 bg-amber-brand/5 px-2 py-0.5 rounded font-bold">
                  HIGH ROLO
                </span>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-black font-display text-white group-hover:text-amber-brand transition-colors uppercase leading-snug">
                  Suspensión Track & Coilovers
                </h3>
                <p className="text-xs text-gray-440 font-sans leading-relaxed">
                  Lleva el agarre de tus llantas al límite técnico. Calibramos y ajustamos amortiguadores progresivos de gas de dureza y altura milimétrica.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-white/5 flex justify-between items-center bg-transparent mt-4 font-mono text-[9px] text-gray-550">
              <span>PROEZA MAESTRA_04</span>
            </div>
          </div>

          {/* Card 5: Artesanía de Interiores & Cuero Nappa Selecto - Col Span 2, Row Span 1 */}
          <div className="md:col-span-2 p-6 glass-card glass-card-hover rounded-xl flex flex-col justify-between min-h-[210px] group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-brand/5 blur-2xl rounded-full pointer-events-none"></div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-amber-brand/10 border border-amber-brand/20 rounded-lg">
                  <Car className="w-5 h-5 text-amber-brand" />
                </div>
                <span className="font-mono text-[9px] text-[#FFD16C] border border-amber-brand/20 bg-amber-brand/5 px-2.5 py-0.5 rounded uppercase font-bold">
                  SINGER LEVEL
                </span>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg sm:text-xl font-black font-display text-white group-hover:text-amber-brand transition-colors uppercase leading-tight">
                  Artesanía de Cueros Nappa & Tableros Customizados
                </h3>
                <p className="text-xs text-gray-450 font-sans leading-relaxed">
                  Satisface tus sentidos recuperando la elasticidad y aroma en cabina. Brindamos hidratación celular profunda con lanolina pura a tapizados fatigados. Re-enfundamos costura manual francesa sobre tableros moldeados en fibra de carbono real.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-white/5 flex justify-between items-center bg-transparent mt-4">
              <span className="font-mono text-[9px] text-gray-550">PROEZA MAESTRA_05</span>
              <button onClick={() => setTab('gallery')} className="text-xs font-mono font-bold text-amber-brand hover:underline cursor-pointer">
                REVISAR GALERÍA
              </button>
            </div>
          </div>

          {/* Card 6: Sistemas de Frenado Brembo de Alta Disipación - Col Span 1, Row Span 1 */}
          <div className="md:col-span-1 p-6 glass-card glass-card-hover rounded-xl flex flex-col justify-between min-h-[210px] group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-amber-brand/10 border border-amber-brand/20 rounded-lg">
                  <Shield className="w-5 h-5 text-amber-brand" />
                </div>
                <span className="font-mono text-[9px] text-amber-brand border border-amber-brand/15 bg-amber-brand/5 px-2 py-0.5 rounded font-bold">
                  ABS OPTIMIZED
                </span>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-black font-display text-white group-hover:text-amber-brand transition-colors uppercase leading-snug">
                  Frenado High-Carbon Brembo
                </h3>
                <p className="text-xs text-gray-440 font-sans leading-relaxed">
                  Evita el fading y fatiga crítica en frenadas sucesivas. Montamos pastillas de compuesto de carbono con purgado electrónico de circuito ABS.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-white/5 flex justify-between items-center bg-transparent mt-4 font-mono text-[9px] text-gray-550">
              <span>PROEZA MAESTRA_06</span>
            </div>
          </div>

          {/* Card 7: Alineación Geométrica Láser Tridimensional - Col Span 1, Row Span 1 */}
          <div className="md:col-span-1 p-6 glass-card glass-card-hover rounded-xl flex flex-col justify-between min-h-[210px] group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-amber-brand/10 border border-amber-brand/20 rounded-lg">
                  <Compass className="w-5 h-5 text-amber-brand" />
                </div>
                <span className="font-mono text-[9px] text-amber-brand border border-amber-brand/15 bg-amber-brand/5 px-2 py-0.5 rounded font-bold">
                  LASER 3D
                </span>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-black font-display text-white group-hover:text-amber-brand transition-colors uppercase leading-snug">
                  Alineación Láser Multi-Link CCD
                </h3>
                <p className="text-xs text-gray-440 font-sans leading-relaxed">
                  Alinea tus neumáticos de bajo perfil para evitar desgastes prematuros. Calibración en banco óptico digital de la convergencia y divergencia de fábrica.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-white/5 flex justify-between items-center bg-transparent mt-4 font-mono text-[9px] text-gray-550">
              <span>PROEZA MAESTRA_07</span>
            </div>
          </div>

        </div>
      </section>

      {/* VIP Concierge y Auxilio */}
      <section className="py-24 bg-[#07080a] border-b border-[#1f2228]/50 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center md:text-left mb-16 space-y-3">
            <span className="font-mono text-xs font-bold text-amber-brand tracking-widest uppercase block mb-1">CONSERJERÍA INTEGRAL DE ÉLITE</span>
            <h2 className="text-2xl sm:text-3.5xl font-black font-display tracking-tight uppercase text-white leading-tight">
              BULLYCARS CONCIERGE & ASISTENCIA EN SUTILEZA
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed font-sans">
              No detengas tus obligaciones ni comprometas tu valioso tiempo libre. El staff del Vault provee soluciones logísticas personalizadas con remolque cubierto para asegurar un cuidado discreto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {concierge.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#0b0c0e]/80 border border-[#21242a] rounded-xl p-8 hover:border-amber-brand/35 hover:bg-[#121418]/80 transition-all duration-300 relative group"
              >
                <div className="font-mono text-[9px] tracking-widest text-[#FFD16C]/60 uppercase font-black mb-3">
                  {item.highlight}
                </div>
                <h3 className="font-display text-base font-bold text-white mb-3 group-hover:text-amber-brand transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Vault Bottom with custom styling and gradients */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="relative overflow-hidden border border-amber-brand/15 bg-gradient-to-br from-[#121418] to-[#0d0e11] rounded-2xl p-8 lg:p-14 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
          {/* Ambient lighting inside the frame */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-b from-amber-brand/5 to-transparent blur-3xl rounded-full pointer-events-none"></div>

          <div className="space-y-4 relative z-10 max-w-2xl">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display uppercase tracking-tight text-white leading-none">
              ¿Tu máquina está lista para recibir el tratamiento celestial?
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed">
              Trabajamos con cupos limitados por semana para garantizar el cuidado milimétrico que cada superdeportivo Porsche, BMW, Ferrari o vehículo premium exige. Asegura su cita prioritario en las bahías del taller hoy mismo.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <button
              onClick={() => setTab('schedule')}
              className="px-7 py-4.5 rounded-xl font-mono text-xs font-black bg-amber-brand text-black hover:bg-[#ffe094] transition-all duration-300 transform hover:-translate-y-0.5 shadow-xl shadow-amber-brand/5 cursor-pointer flex items-center gap-1.5 uppercase"
            >
              RESERVAR MI EXCLUSIVA CITA
              <ArrowUpRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
