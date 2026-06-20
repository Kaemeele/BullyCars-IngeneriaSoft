import React, { useState } from 'react';
import { Member } from '../types';
import { 
  ShieldCheck, ArrowUpRight, CheckCircle, Sparkles, 
  Share2, ArrowLeft, Star, Quote, Award
} from 'lucide-react';

interface CommunityViewProps {
  setTab: (tab: string) => void;
}

export default function CommunityView({ setTab }: CommunityViewProps) {
  // Members list or registration states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [memberType, setMemberType] = useState<'ENTUSIASTA' | 'PROFESIONAL'>('ENTUSIASTA');
  
  const [registeredMember, setRegisteredMember] = useState<Member | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);

  // Reviews list
  const reviews = [
    {
      name: "Juan Domingo Ruiz",
      vehicle: "Porsche 911 Carrera S",
      comment: "El pulido holográfico en tres etapas devolvió el gloss original a mi pintura gris ágata. Es como si el auto hubiese salido de fábrica hoy por la mañana. Increíble el servicio del Vault.",
      rating: 5
    },
    {
      name: "Catalina Silva-Prado",
      vehicle: "BMW M5 Competition",
      comment: "Llevé mi coche para una pre-revisión técnica y scanner de motor. Resolvieron el micro-fallo del solenoide al instante. Un taller sincero, transparente y con ingeniería de verdad.",
      rating: 5
    },
    {
      name: "Mario Vergara",
      vehicle: "Audi RS6 Avant",
      comment: "El Ceramic Coating 9H hidrofóbico soporta la lluvia ácida y el barro de maravilla. Lo lavo yo mismo sólo con agua a presión. La mejor inversión que he hecho en estética automotriz.",
      rating: 5
    }
  ];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !vehicle) return;
    setIsRegistering(true);

    setTimeout(() => {
      const codeSuffix = Math.floor(100000 + Math.random() * 900000);
      const mockMember: Member = {
        id: `BC-MEM-${codeSuffix}`,
        fullName: fullName.toUpperCase(),
        email: email.toLowerCase(),
        vehicle: vehicle.toUpperCase(),
        memberType: memberType,
        rfidCode: `BC-RFID-990-${Math.floor(10 + Math.random() * 89)}X`,
        joinedDate: new Date().toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })
      };
      setRegisteredMember(mockMember);
      setIsRegistering(false);
    }, 1500);
  };

  const shareMembership = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Membresía BullyCars Vault',
        text: `¡Hola! Ya soy miembro verificado VIP en el Vault de BullyCars con mi ${registeredMember?.vehicle}. Código: ${registeredMember?.id}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert(`Enlace de Membresía copiado temporalmente en el portapapeles: Código ${registeredMember?.id}. ¡Pisa a fondo!`);
    }
  };

  return (
    <div className="bg-[#0b0c0e] text-white min-h-screen py-16 lg:py-24 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-brand/10 border border-amber-brand/20 rounded-full text-amber-brand text-[10px] font-bold font-mono tracking-widest uppercase">
            <Award className="w-3.5 h-3.5 text-amber-brand" />
            BULLYCARS COMUNIDAD VIP
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-display tracking-tight leading-none">
            ÚNETE AL VAULT
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-sans max-w-xl mx-auto">
            Forma parte de la hermandad fierrera organizada más sofisticada del país. Regístrate sin costo y obtén un código RFID digital de membresía para acceder a tarifas especiales en mantenimiento, detailing y accesorios.
          </p>
        </div>

        {/* Dynamic State Layout (Registration Form OR Created Digital Card Success Display) */}
        {!registeredMember ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Column A: Left side list of Membership Perks (5 rows) */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="font-display text-sm font-bold text-white uppercase tracking-widest border-b border-[#1f2228] pb-3">
                Beneficios de Membresía Vault
              </h3>

              <div className="space-y-4">
                <div className="flex gap-4 p-4 glass-card rounded-xl">
                  <div className="w-10 h-10 rounded-xl bg-amber-brand/10 border border-amber-brand/20 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-amber-brand" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold text-white">Acceso VIP a Reportes Digitales</h4>
                    <p className="text-xs text-gray-400 font-sans mt-1 leading-relaxed">
                      Recibe carpetas dinámicas de mantención con fotos microscópicas y video del scanner directo a tu correo cada vez que tu auto entre en pits.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 glass-card rounded-xl">
                  <div className="w-10 h-10 rounded-xl bg-amber-brand/10 border border-amber-brand/20 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-amber-brand" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold text-white">Prioridad en Workshops Academy</h4>
                    <p className="text-xs text-gray-400 font-sans mt-1 leading-relaxed">
                      Inscripción y matrículas pre-aprobadas garantizadas con 72 horas de antelación para nuestros workshops teóricos y prácticos de detailing.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 glass-card rounded-xl">
                  <div className="w-10 h-10 rounded-xl bg-amber-brand/10 border border-amber-brand/20 flex items-center justify-center shrink-0">
                    <Star className="w-5 h-5 text-amber-brand" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold text-white">Tarifas Pro en Accesorios</h4>
                    <p className="text-xs text-gray-400 font-sans mt-1 leading-relaxed">
                      Sincronización directa con el simulador de presupuesto para cotizar con menor tasa bulk de revendedor certificado pro.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#121418] border border-amber-brand/10 p-5 rounded-2xl">
                <p className="text-xs text-amber-brand font-mono leading-relaxed">
                  ⚠️ <strong>Aviso técnico:</strong> Las membresías son personales y se ligan al número de chasis/VIN registrado durante las visitas presenciales al taller para vigilar la vigencia.
                </p>
              </div>
            </div>

            {/* Column B: Right side Registration Form Submission (7 rows) */}
            <div className="lg:col-span-7 bg-[#121418] border border-[#22252c] rounded-3xl p-6 sm:p-8 space-y-6">
              
              <div className="space-y-1.5 text-left">
                <span className="font-mono text-[9px] text-[#FFD16C] font-bold tracking-widest block uppercase">FORMULARIO DE ADMISIÓN</span>
                <h3 className="font-display text-lg font-black text-white uppercase">ÚNETE AL VAULT VIP</h3>
                <p className="text-xs text-gray-400 font-sans leading-relaxed">
                  Completa tu registro para acuñar tu tarjeta criptográfica y comenzar a rastrear tus visitas técnicas al taller.
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-4 text-left">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 font-mono text-xs">
                    <label className="text-gray-400 font-medium">Nombre Completo</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="CARLOS VERGARA"
                      className="w-full bg-[#0b0c0e] border border-[#2d313a] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-brand font-sans"
                    />
                  </div>

                  <div className="space-y-1 font-mono text-xs">
                    <label className="text-gray-400 font-medium">Correo Electrónico</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="carlos.vergara@example.cl"
                      className="w-full bg-[#0b0c0e] border border-[#2d313a] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-brand font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 font-mono text-xs">
                    <label className="text-gray-400 font-medium">Modelo de Vehículo Principal</label>
                    <input
                      type="text"
                      required
                      value={vehicle}
                      onChange={(e) => setVehicle(e.target.value)}
                      placeholder="PORSCHE 911 GT3 RS"
                      className="w-full bg-[#0b0c0e] border border-[#2d313a] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-brand font-sans"
                    />
                  </div>

                  <div className="space-y-1 font-mono text-xs">
                    <label className="text-gray-400 font-medium">Perfil Profesional / Afición</label>
                    <select
                      value={memberType}
                      onChange={(e) => setMemberType(e.target.value as 'ENTUSIASTA' | 'PROFESIONAL')}
                      className="w-full bg-[#0b0c0e] border border-[#2d313a] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-brand font-sans cursor-pointer"
                    >
                      <option value="ENTUSIASTA">🏎️ Entusiasta Automotriz</option>
                      <option value="PROFESIONAL">👨‍🔧 Profesional / Distribuidor</option>
                    </select>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isRegistering}
                  className="w-full py-3.5 bg-amber-brand text-black font-black font-mono text-xs rounded-xl uppercase tracking-wider shadow-lg shadow-amber-brand/5 hover:bg-[#ffe094] transition transform active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isRegistering ? (
                    <>
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                      <span>ACUÑANDO TARJETA EN SERVIDORES...</span>
                    </>
                  ) : (
                    <span>SOLICITAR REGISTRO DE MEMBRESÍA</span>
                  )}
                </button>
              </form>
            </div>
            
          </div>
        ) : (
          /* Created Digital Card Success Display */
          <div className="max-w-2xl mx-auto space-y-8">
            
            <div className="text-center p-6 bg-emerald-950/20 border border-emerald-500/20 rounded-3xl space-y-2">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="font-display text-lg font-black text-emerald-400 uppercase">
                ¡BIENVENIDO A LA COMUNIDAD BULLYCARS!
              </h3>
              <p className="text-xs text-gray-400 font-sans leading-relaxed max-w-sm mx-auto">
                Tu solicitud de registro ha sido verificada con éxito. Ya eres miembro del Vault. Abajo se encuentra tu tarjeta RFID digital para acceso rápido en sucursal.
              </p>
            </div>

            {/* Interactive Luxury Card Frame with rotating skewed hover effects */}
            <div className="relative group">
              <div className="w-full max-w-[450px] mx-auto aspect-[1.586/1] rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#121418] via-[#101114] to-[#1d222b] border-[3px] border-amber-brand/35 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 select-none overflow-hidden relative font-mono text-left">
                
                {/* Background futuristic decor overlays */}
                <div className="absolute top-0 right-0 w-44 h-44 bg-amber-brand/10 blur-2xl rounded-full pointer-events-none"></div>
                
                {/* Brand Name row */}
                <div className="flex justify-between items-start pt-1">
                  <div>
                    <span className="text-lg font-black text-white tracking-widest block font-display">BULLY<span className="text-amber-brand">CARS</span></span>
                    <span className="text-[7.5px] text-amber-brand/70 tracking-widest block uppercase font-bold">DIGITAL RFID CERTIFICATE v2.4</span>
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#FFD16C] text-black font-black text-xs font-display">
                    BC
                  </div>
                </div>

                {/* RFID gold microchip contact */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="w-10 h-7 rounded-md bg-gradient-to-br from-amber-200 via-[#FFD16C] to-yellow-600 border border-amber-300 shadow relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 grid grid-cols-3 gap-0.5 opacity-20 bg-[#000000]"></div>
                    <span className="sr-only">RFID chip</span>
                  </div>
                  <div className="text-right text-[8px] text-emerald-400 font-bold bg-emerald-950/50 border border-emerald-500/30 px-2 py-0.5 rounded uppercase tracking-wider animate-pulse flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    ACTIVE ID
                  </div>
                </div>

                {/* Member credential specs details row */}
                <div className="mt-6 space-y-1.5">
                  <div className="text-xs text-white font-extrabold tracking-wide uppercase font-sans">
                    {registeredMember.fullName}
                  </div>
                  <div className="text-[10px] text-gray-400 font-sans uppercase font-bold leading-tight flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-brand"></span>
                    MÁQUINA: <span className="text-white font-sans">{registeredMember.vehicle}</span>
                  </div>
                </div>

                {/* Code RFID footer row */}
                <div className="mt-6 pt-3.5 border-t border-[#2d313a]/80 flex justify-between items-end bg-transparent">
                  <div className="space-y-0.5">
                    <span className="block text-[7px] text-gray-500 uppercase tracking-widest font-black">RFID SECURE KEY</span>
                    <span className="block text-[10px] text-gray-300 tracking-wide font-black">{registeredMember.rfidCode}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[7px] text-gray-400 uppercase tracking-widest font-black">MEMBRESÍA</span>
                    <span className="block text-[9px] text-[#FFD16C] font-black tracking-wide bg-amber-brand/10 border border-amber-brand/20 px-2.5 py-0.5 rounded-md uppercase">
                      {registeredMember.memberType}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Sharing and actions buttons row */}
            <div className="flex flex-wrap gap-3.5 justify-center">
              <button
                onClick={shareMembership}
                className="px-6 py-3.5 bg-[#121418] border border-[#2d313a] hover:border-gray-500 text-gray-300 hover:text-white rounded-xl text-xs font-mono font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-amber-brand" />
                COMPARTIR MEMBRESÍA
              </button>
              
              <button
                onClick={() => setTab('landing')}
                className="px-6 py-3.5 bg-amber-brand text-black rounded-xl text-xs font-mono font-black transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                EXPLORAR SERVICIOS
              </button>

              <button
                onClick={() => setRegisteredMember(null)}
                className="px-6 py-3.5 border border-dashed border-[#2d313a] text-gray-505 hover:text-gray-300 hover:border-gray-500 rounded-xl text-xs font-mono transition cursor-pointer"
              >
                NUEVO REGISTRO
              </button>
            </div>

          </div>
        )}

        {/* Voz del Conductor reviews slider */}
        <section className="mt-20 border-t border-[#1f2228] pt-16">
          <div className="text-center md:text-left mb-12 space-y-2">
            <span className="font-mono text-xs font-bold text-amber-brand tracking-widest uppercase block">VOZ DEL CONDUCTOR</span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase text-white leading-tight font-display">
              TESTIMONIOS DE NUESTRA CLIENTELA
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans max-w-xl">
              Nuestros clientes avalan la rigurosidad mecánica y el pulido celestial aplicados en el Vault. Opiniones verificadas de conductores premium.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev, index) => (
              <div
                key={index}
                className="bg-[#121418] border border-[#21242a] rounded-2xl p-6 hover:border-amber-brand/20 transition-all flex flex-col justify-between group text-left"
              >
                <div className="space-y-4">
                  {/* Rating stars and icon quote */}
                  <div className="flex justify-between items-center bg-transparent">
                    <div className="flex gap-1 text-amber-brand">
                      {[...Array(rev.rating)].map((_, si) => (
                        <Star key={si} className="w-3.5 h-3.5 fill-amber-brand text-amber-brand shrink-0" />
                      ))}
                    </div>
                    <Quote className="w-4 h-4 text-gray-600" />
                  </div>

                  <p className="text-xs sm:text-sm text-gray-350 font-sans leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1f2228]/50 flex items-center gap-3 bg-transparent">
                  <div className="w-8 h-8 rounded-full bg-amber-brand/5 border border-amber-brand/15 flex items-center justify-center font-display text-xs font-black text-amber-brand">
                    {rev.name.charAt(0)}
                  </div>
                  <div className="space-y-0.5">
                    <span className="block text-xs font-bold text-white leading-tight font-sans">{rev.name}</span>
                    <span className="block text-[10px] text-gray-500 font-mono tracking-wide">{rev.vehicle}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
