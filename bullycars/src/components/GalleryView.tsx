import React, { useState } from 'react';
import { CompareProject } from '../types';
import { Sparkles, Info, Sliders, ArrowLeft, ArrowRight } from 'lucide-react';

interface GalleryViewProps {
  setTab: (tab: string) => void;
}

export default function GalleryView({ setTab }: GalleryViewProps) {
  const projects: CompareProject[] = [
    {
      id: 'motor',
      title: 'Restauración Criogénica de Bloque Motor',
      subtitle: 'Corazón Porsche de 6 Cilindros Bóxer',
      category: 'Piston & Motor',
      description: 'Completo desmontaje técnico de bloque motor Porsche refrigerado por aire. Limpieza profunda con chorro de nieve carbónica/hielo seco (CO2 a -78.5°C), reconstrucción de pasantes de lubricación, zincado electrolítico de tornillería OEM y pulido a espejo de culatas.',
      beforeImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLQBgt4rBeoL63UNrRyWxw1X2z5Wi0yFgt4RNCoAoNG6ue_xwMeJuAxU4pKiDrbMQTeFl25PZqk-2sZt3c8YDtEBHIvxl9eYA6LA2HMujea8-0-iFi2f4GsWYg7IzqNjBPyZ097RtgU5-7MlBf4cvyQmi4zs8dEN7pRp23DZ7mSpBQuAsBBrXKNESlMWcEZP2UkQgxpq6gzgh6JSMyCF8XA35xTNvt5-BpoRQbkh2C4pgfyix86OIGRu7YAic52JFSfRsqi-i9lNE',
      afterImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDT5NKZLn8pjam0gUnugQ1oiII3huW9LrCNKCJL0KbQQdXTKCUiaD3CNXOAJSyrAwczmZ8mpmj8NcCMAiMDj5W9giZ85BAPKEpY3OxcVxzh9qxc_01ZV0-nMA6crm6-t40A0Bqt9TfOiMK-aj0sYH_xR77XDg_ZwN364HI9dlGgKGU4EEYRmzi_p3yazNTVj3jL6HgTyCZp20Y_KrF_VNSPSREc2FCoOVxit-yt-0mSsjpwdX3uo9_CWsEkfxw6M2kY9BpwUKUIbI4',
      specs: [
        { label: 'Proceso de Limpieza', value: 'Chorro de hielo seco CO2 seco' },
        { label: 'Ingeniería Aplicada', value: '32 Horas de Especialista' },
        { label: 'Sellos Incorporados', value: 'Fosfatizante y retenes OEM' },
      ],
    },
    {
      id: 'paint',
      title: 'Corrección de Laca & Reflejo Especular',
      subtitle: 'Tratamiento de Brillo Máximo',
      category: 'Paint & Estética',
      description: 'Corrección exhaustiva de pintura en 3 pasos en carrocería original Porsche GT Silver. Lijado de micras controladas mediante micrómetro digital para eliminar marcas de agua calcárea profunda, marcas de remolino de lavado (swirls) y selladura total con cuarzo 9H.',
      beforeImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBokdSZLoBHqY-7EXo5jay--EK-cvVgoXq9UaZhDvwW-hpDXfXoZlDgbFLMyNWwVP47f6yth7KhSsuLomYmZOujKJK9iag-E91zNjiw1OEQHxkqdVELdeuqThpWk_nt_Vn3U2_RzCGjWFhB5Zd-AQ7Zwq3rYRLJ6WYJMNfB_11hQcGMtHzIzdHO1rjeCpU0DcSORqdJ0oRIaxOic17o8aQNS2p5lJIze5cEBbSz449DKQk-hAC5Tnecn64JoWa5dv5BmX8FIyu4oQU',
      afterImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5ct_QxCiA7rcv0-oo5pxpjEXL-a0stsAEbfivaoxcADk1E4DtQmi2a8a69CBffntlWWlofMGdNJ_nX2sg07DOiAKTNtPFKip4WjwQow9qCpsUuX7Bkpg3v7rssAoIYzFvPk2kMfBbHgN2I1X7joKm5wrjiD4kO281-wWTb-cv7ZzMfh0rJlzOd1COudaP2g2zv18-daxt973qnKzN-AVjv6aEmKu91VpVvoqEF-Y6Q62TVdvwWuCNWV8YvDjK3_iSLwaUQzLwSsI',
      specs: [
        { label: 'Corte Inicial', value: 'Rotativa Rupes + Lana Merino' },
        { label: 'Fijación de Brillo', value: 'Doble Acción orbital de espuma' },
        { label: 'Protección de Capas', value: 'Capa Cerámica Carbon-Shell' },
      ],
    },
    {
      id: 'interior',
      title: 'Restauración de Cuero & Habitáculo',
      subtitle: 'Tapicería con Costura Francesa Dual',
      category: 'Interior & Detailing',
      description: 'Saneamiento íntegro de cueros Nappa envejecidos y agrietados por radiación solar. Remoción de aceites corporales grasos, hidratación profunda con emulsiones de lanolina, rellenado de grietas con polímero acrílico elástico y aplicación de laca protectora microporosa mate.',
      beforeImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApaBgQBzv_DNrmb9O1ATqaLyyfUxydY7s_NVOC2L-ju65AwVCagIe1d1gm6Zs4MiAnD5ZRU8YxgeHA_ZF_1kv3HfGJiKb1zTutc_mrtSF7upl079Gn9hCvGSLUs4DIEJYE_-zu9HWlr5SOm_yuCkE7_Egh-G2hqDDtN9lJvYibJ--QOz0FSMdr9tM9Ieq12k11ep75Vu1SDERzlP375-b4Ahzzdj-Zr0lZluwe1djIZ7xIwmGcNbA4KJzRR9eskW6B8xgAejbkEvI',
      afterImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvNLj74-nOZ7jE86SYNeI5dJ8to__Yv_xn4ZHWHmhZaRzYwsyzif2SWMRTnhkUewdKXk9dC42LA5KSxERtmfNU0KwjZoejDXIhjAI4NdRWw27s-r3AYCCt6az1h1bBjGaFTP31GcwGlIKNXgaVpc6oe2g03JSDNeysGUZXeL9UhMAxtmGTsY0wsrl7iSzin_sTEShKkQkiJN2CIc3XLUnlJtq11TtK7AVHqhtwtlik_BBXp3w3bV-Z3dpAFxI4FYUDkDj5NezzYkw',
      specs: [
        { label: 'Sustrato de Tacto', value: 'Piel Nappa curtida de origen alemán' },
        { label: 'Enfoque de Color', value: 'Lectura espectrofotométrica digital' },
        { label: 'Acabado Final', value: 'Nivel mate de fábrica libre de grasa' },
      ],
    },
    {
      id: 'undercarriage',
      title: 'Restauración de Chasis & Suspensión',
      subtitle: 'Protección Epóxica Antiarrosiva',
      category: 'Chasis & Suspensión',
      description: 'Retiro del óxido superficial mediante chorro abrasivo de arena sílica fina. Aplicación de base imprimante automotriz fosfatizante de cinc, acabado superior esmaltado de poliuretano industrial de alta dureza y re-engrase con grasa náutica sintética anti-agua salina.',
      beforeImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7sRZFjxPhBiRnYKVKGXv9B8c_bzQkc9xqIkryoAjdyYrM4vgDnaaA59kYfX5XUUv-FAfs6CQoF_nOPnNf9Z-JxK9khPzX1z1OaFVSKmnKCfqBX-sqZEXVA4-gN8eilVtJFUOKn5eI7PQ18JpgqQGypAWdk5ZyTgE4VFZ47cvsbtNy0AYn6FnawXKaQuSm5QY5W0pIYBESBzwkWTQvLngLyFn2EK9a-y3sNi_vbPy7xgEkA8yqSRWPpaJVQ-zJDrdid5Bo-q4E-Ew',
      afterImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAM9GTr9ibYo5M2ema7-2mqIik2HVRjpxEjNZHBjIXyWa9e_8fc3LxUMr6Oh2th6eVEOsiNMdzJpAfs3EbYNn_vqT5Ge8ZwZ_3j-RcHx19_hSy1tR_sYPpIvcGyi-YqkmkUPCL3c-bwl617PMdj1EfWDEqe98jGyF0zMF430Tfnw82aAFsSdg8plGCF_XaAIjneLJY_3fBKG96HHBSAUupXkxFhKwbAXzVYMAD-S6c3bmfxmz--1u5WbFS0lrM7yj6itV1_1OqxoE',
      specs: [
        { label: 'Sellador Base', value: 'Primer epóxico protector' },
        { label: 'Coilover Setup', value: 'Pre-carga y camber de pista' },
        { label: 'Resistencia Test', value: '150 horas de niebla salina ISO' },
      ],
    },
    {
      id: 'electronics',
      title: 'Tablero Customizado Carbon-Console',
      subtitle: 'Cabina de Precisión Aeroespacial',
      category: 'Dashboard & Interior',
      description: 'Ingeniería fina de remodelación para consolas agrietadas o desactualizadas por el sol. Instalación de tablero ultraligero moldeado a presión en fibra de carbono auténtica con terminación brillante de autoclave, y set de instrumentación digital integrada de alto contraste.',
      beforeImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCElcP-hXrcR7s2xNmlUBRpuOKp5zYX5gVHnWAxdC80zsXKwKWalj83VLM6dOf-hD5FWePnuKQB5eT8VS8ANIMWcx_W0iGfPkbdfZZDpSnTLqBUzKD_4myFKbNAX7YHYOpGOTaljIWWBTWGS71REFrP4goD3sbmpJ2vm_AxCjrcYjl5qt4xb15yKompVZhmRwNtUkn0Vz4x0HX_NADechhswmfZQLanw-Fs5amKf8fgByLhw8qXy4V8cRErRdBhc1-Af4jRGvcHqKA',
      afterImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJqxWyW-waAHkiG6xL6t0XqEeCvNbq1yXMmcpxueMgx_-551TvsgHKk4YqfTBz5ALCXTTr4aQi53FLkxTJyM8DNURi0bn7j6Igbz6UNRlzPcuGSP45c-_KczSnvZMzonZxX5wxyaNdJdQsaUlFmlQXag2qnL1Qx7YtIS5ocvDwieCBK-gsxzZWcn9Dk7WWtYnX0u9Nn23DdahOZP-qMOr1Kvq68I1RkgXB5jzUFBuovN3wKtejGcuX6itmzBja-fy56pEWlrEdCAc',
      specs: [
        { label: 'Sustrato Estructura', value: 'Fibra de Carbono sarga 2x2' },
        { label: 'Protocolo de Red', value: 'Gateway CAN-Bus directo a ECU' },
        { label: 'Display Óptico', value: 'LEDs síncronos inteligentes' },
      ],
    },
  ];

  const [activeProject, setActiveProject] = useState<CompareProject>(projects[0]);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 50%
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Keyboard/button navigation
  const cycleProject = (direction: 'prev' | 'next') => {
    const idx = projects.findIndex((p) => p.id === activeProject.id);
    let nextIdx = idx;
    if (direction === 'prev') {
      nextIdx = idx === 0 ? projects.length - 1 : idx - 1;
    } else {
      nextIdx = idx === projects.length - 1 ? 0 : idx + 1;
    }
    setActiveProject(projects[nextIdx]);
    setSliderPosition(50);
  };

  const handleMove = (clientX: number, containerRect: DOMRect) => {
    const x = clientX - containerRect.left;
    const percentage = Math.max(0, Math.min(100, (x / containerRect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX, rect);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMouseDown || e.buttons === 1) {
      const container = e.currentTarget;
      const rect = container.getBoundingClientRect();
      handleMove(e.clientX, rect);
    }
  };

  return (
    <div className="bg-[#0b0c0e] text-white min-h-screen py-16 lg:py-24 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title alignment */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-brand/10 border border-amber-brand/20 text-text-amber-brand text-[10px] font-bold font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-brand" />
            COMPROMISO CON LA EXCELENCIA HISTÓRICA
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight font-display text-white leading-none">
            MURO DE PROEZAS
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-sans max-w-2xl mx-auto">
            Explora de manera interactiva la meticulosa mano de obra de nuestros técnicos del Vault. Arrastra la barra central de izquierda a derecha para comparar el estado <span className="text-red-400 font-extrabold uppercase">Antes</span> de ingresar y el acabado <span className="text-emerald-400 font-extrabold uppercase">Despues de salir</span> de nuestras bahías.
          </p>
        </div>

        {/* Project Selector Tab Bar */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {projects.map((p) => {
            const isActive = activeProject.id === p.id;
            return (
              <button
                key={p.id}
                id={`project-tab-${p.id}`}
                onClick={() => {
                  setActiveProject(p);
                  setSliderPosition(50);
                }}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-[rgba(255,209,108,0.08)] border-amber-brand text-amber-brand shadow-md shadow-amber-brand/5'
                    : 'bg-[#121418] border-[#22252c] text-gray-400 hover:text-white hover:border-[#30343f]'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#FFD16C]' : 'bg-gray-600'}`}></span>
                {p.category}
              </button>
            );
          })}
        </div>

        {/* Showcase interactive component area Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Column A: Left panel for Interactive comparison slider (8 columns) */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Navigation buttons top of the image */}
            <div className="flex justify-between items-center px-1 font-mono text-[10px]">
              <span className="text-gray-500 tracking-wider">
                PROYECTO: <span className="text-white font-bold font-sans">{activeProject.category.toUpperCase()}</span>
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => cycleProject('prev')}
                  className="p-1.5 rounded-lg border border-[#21242a] bg-[#121418] hover:bg-[#1f2228] hover:text-[#FFD16C] transition cursor-pointer"
                  title="Anterior"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => cycleProject('next')}
                  className="p-1.5 rounded-lg border border-[#21242a] bg-[#121418] hover:bg-[#1f2228] hover:text-[#FFD16C] transition cursor-pointer"
                  title="Siguiente"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Slider Container Frame */}
            <div
              className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-[#2d313a] bg-[#121418] shadow-2xl select-none cursor-ew-resize group"
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onMouseDown={() => setIsMouseDown(true)}
              onMouseUp={() => setIsMouseDown(false)}
              onMouseLeave={() => setIsMouseDown(false)}
            >
              {/* BEFORE IMAGE (Background) */}
              <img
                src={activeProject.beforeImg}
                alt={`${activeProject.title} antes`}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
              />

              {/* AFTER IMAGE (Foreground - with width clipped by slider position using clipPath to prevent distortion) */}
              <img
                src={activeProject.afterImg}
                alt={`${activeProject.title} después`}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none transition-all duration-75"
                style={{
                  clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
                  WebkitClipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
                }}
              />

              {/* Before bottom tag (Visible on the right side) */}
              <div 
                className="absolute bottom-4 right-4 z-20 px-3 py-1 font-mono text-[10px] bg-red-950/85 border border-red-500/30 text-red-400 rounded-lg shadow-lg pointer-events-none uppercase tracking-widest font-black transition-opacity duration-200"
                style={{ opacity: sliderPosition > 85 ? 0 : 1 }}
              >
                Antes del Proceso
              </div>

              {/* After bottom tag (Visible on the left side) */}
              <div 
                className="absolute bottom-4 left-4 z-20 px-3 py-1 font-mono text-[10px] bg-emerald-950/85 border border-emerald-500/30 text-emerald-400 rounded-lg shadow-lg pointer-events-none uppercase tracking-widest font-black transition-opacity duration-200"
                style={{ opacity: sliderPosition < 15 ? 0 : 1 }}
              >
                Resultado de Precisión
              </div>

              {/* VERTICAL SLIDING BAR DIVISOR */}
              <div
                className="absolute top-0 bottom-0 z-30 w-[3px] bg-gradient-to-b from-amber-gold via-amber-brand to-amber-brand shadow-xl pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Drag handle block */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#0b0c0e] border-[3px] border-amber-brand shadow-2xl flex items-center justify-center pointer-events-none group-hover:scale-110 transition-transform">
                  <Sliders className="w-4 h-4 text-amber-brand rotate-90" />
                </div>
              </div>

              {/* Range input overlay for perfect touch support */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-40 pointing-events-auto"
                aria-label="Ejecutar divisor de comparación"
              />
            </div>

            {/* Slider visual hint instructions */}
            <div className="bg-[#121418] border border-[#21242a] p-4 rounded-2xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-brand/5 border border-amber-brand/15 flex items-center justify-center shrink-0">
                <Info className="w-4 h-4 text-amber-brand" />
              </div>
              <p className="text-xs text-gray-400 font-sans leading-relaxed">
                Utiliza el cursor o tu dedo sobre la imagen para <strong>deslizar interactivamente</strong>. Puedes pulsar en los extremos si lo deseas para cambiar de vista radicalmente.
              </p>
            </div>
          </div>

          {/* Column B: Right panel for Project technical specs (4 columns) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-amber-brand uppercase tracking-widest block">
                {activeProject.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight text-white leading-none">
                {activeProject.title}
              </h3>
              <p className="font-sans text-xs text-gray-500 font-medium">
                {activeProject.subtitle}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
              {activeProject.description}
            </p>

            {/* Technical stats container */}
            <div className="space-y-3.5 pt-6 border-t border-[#1f2228]">
              <h4 className="font-display text-xs text-white font-bold uppercase tracking-widest flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-amber-brand" />
                Especificaciones de Pista
              </h4>
              <div className="space-y-2">
                {activeProject.specs.map((spec, i) => (
                  <div key={i} className="flex flex-col gap-0.5 bg-[#121418] border border-[#22252c] p-3 rounded-xl font-mono text-xs">
                    <span className="text-[10px] text-gray-500 uppercase">{spec.label}</span>
                    <span className="text-white font-semibold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action booking CTA */}
            <div className="pt-4 space-y-3">
              <button
                onClick={() => setTab('schedule')}
                className="w-full py-3.5 rounded-xl font-mono text-xs font-black bg-amber-brand text-black hover:bg-[#ffe094] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                ¿QUIERES ESTE ACABADO EN TU MÁQUINA?
              </button>
            </div>
          </div>

        </div>

        {/* Section bottom gallery extra stats */}
        <div className="mt-20 border-t border-[#1f2228] pt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="space-y-2">
              <span className="text-amber-brand text-2xl font-black font-display block uppercase">99.7%</span>
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider block">Fidelidad Geométrica</span>
              <p className="text-xs text-gray-550 leading-relaxed font-sans">
                Nuestras correcciones por lijado y abrasión cuidan el espesor crítico de fábrica del barniz.
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-white text-2xl font-black font-display block uppercase">CRYO-CLEAN</span>
              <span className="font-mono text-xs font-bold text-[#FFD16C] uppercase tracking-wider block font-sans">Eco-Mano de Obra</span>
              <p className="text-xs text-gray-550 leading-relaxed font-sans">
                Sin solventes destructivos. El dióxido de carbono sólido remueve aceites grasos pesados al instante.
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-white text-2xl font-black font-display block uppercase">SINGER STANDARD</span>
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider block">Insumos Cast Film</span>
              <p className="text-xs text-gray-550 leading-relaxed font-sans">
                No arrugas domésticas. Vinilos moldeados de fundición con microcanales pasantes de salida para aire de purga.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
