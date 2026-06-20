import React, { useState } from 'react';
import { Appointment } from '../types';
import { 
  Calendar, Clock, CheckCircle2, Sliders, ArrowLeft, Info
} from 'lucide-react';

interface ScheduleViewProps {
  setTab: (tab: string) => void;
}

export default function ScheduleView({ setTab }: ScheduleViewProps) {
  // Appointment state fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [category, setCategory] = useState('ESTÉTICA Y DETALLADO EXTREMO');
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('10:00 AM');
  const [note, setNote] = useState('');

  const [bookingReceipt, setBookingReceipt] = useState<Appointment | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  // Available hours slots
  const hourSlots = [
    '09:00 AM',
    '10:30 AM',
    '12:00 PM',
    '02:30 PM',
    '04:00 PM',
    '05:30 PM'
  ];

  // Available categories
  const categories = [
    { title: 'ESTÉTICA Y DETALLADO EXTREMO', desc: 'Tratamiento cerámico 9H, pulido, corrección, limpieza criogénica.' },
    { title: 'MECÁNICA ESPECIALIZADA & SUSPENSIÓN', desc: 'Reparación de frenos, alineación láser, coilovers, scanner.' },
    { title: 'POLARIZADO & VINILOS EN WRAP', desc: 'Instalación de láminas Pro-Tint, rollos de vinilo cast.' },
    { title: 'MANTENCIÓN PREVENTIVA POR KM', desc: 'Fluidos sintéticos Liqui Moly, filtros OEM, reseteo integral.' },
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !date || !vehicle) return;
    setIsBooking(true);

    setTimeout(() => {
      const code = Math.floor(1000 + Math.random() * 9000);
      const mockAppointment: Appointment = {
        id: `BC-APP-${code}-T`,
        fullName: fullName.toUpperCase(),
        email: email.toLowerCase(),
        phone: phone,
        vehicle: vehicle.toUpperCase(),
        category: category,
        date: date,
        hour: hour,
        note: note,
        status: 'CONFIRMADO'
      };
      setBookingReceipt(mockAppointment);
      setIsBooking(false);
    }, 1500);
  };

  return (
    <div className="bg-[#0b0c0e] text-white min-h-screen py-16 lg:py-24 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-brand/10 border border-amber-brand/20 rounded-full text-amber-brand text-[10px] font-bold tracking-widest uppercase font-mono">
            <Calendar className="w-3.5 h-3.5 text-amber-brand" />
            PLANIFICACIÓN AUTOMOTRIZ DE PRECISIÓN
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-display tracking-tight leading-none">
            AGENDAR CITA VAULT
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-sans">
            Reserva una ranura de ingeniería en nuestro taller exclusivo. Recibirás un comprobante digital codificado para la admisión prioritaria de tu vehículo premium.
          </p>
        </div>

        {/* Dynamic Display Booking State */}
        {!bookingReceipt ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Column A: Left side technical info instructions (4 columns) */}
            <div className="lg:col-span-4 space-y-6">
              <h3 className="font-display text-sm font-bold text-white uppercase tracking-widest border-b border-[#1f2228] pb-3">
                Protocolo de Ingreso Vault
              </h3>

              <div className="space-y-4">
                <div className="glass-card p-5 rounded-xl space-y-2 text-left">
                  <div className="flex items-center gap-2 text-amber-brand font-mono text-[10px] font-bold uppercase tracking-wider">
                    <Info className="w-4 h-4 shrink-0 text-amber-brand" />
                    1. ADMISIÓN PUNTO LIMPIO
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    El automóvil debe ingresar sin objetos personales en el habitáculo. Fotografiamo en 360 grados de alta definición cada carrocería al ingresar para resguardo mutuo.
                  </p>
                </div>

                <div className="glass-card p-5 rounded-xl space-y-2 text-left">
                  <div className="flex items-center gap-2 text-amber-brand font-mono text-[10px] font-bold uppercase tracking-wider">
                    <Clock className="w-4 h-4 shrink-0 text-amber-brand" />
                    2. TOLERANCIA DE RETRASO
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    Se otorga una tolerancia estricta de 15 minutos en bahía. Pasado este lapso, el elevador hidráulico asignado se reprogramará para optimizar el flujo.
                  </p>
                </div>

                <div className="glass-card p-5 rounded-xl space-y-2 text-left">
                  <div className="flex items-center gap-2 text-amber-brand font-mono text-[10px] font-bold uppercase tracking-wider">
                    <Sliders className="w-4 h-4 shrink-0 text-amber-brand" />
                    3. DIAGNÓSTICO PREVENTIVO OBD
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    Cada máquina ingresada se somete a lectura inicial de cortesía OBD-II de 45 puntos para verificar códigos DTC activos en la centralita de motor.
                  </p>
                </div>
              </div>

              {/* Physical details block */}
              <div className="p-5 border border-amber-brand/10 rounded-xl bg-amber-brand/5 text-left space-y-2">
                <span className="block font-mono text-[8.5px] text-gray-500 uppercase tracking-widest">¿Dudas específicas?</span>
                <span className="block font-display text-xs font-black text-amber-brand uppercase tracking-wider">TELÉFONO DE PITS DIRECTO</span>
                <p className="text-xs text-gray-405 font-sans leading-relaxed">
                  Contáctanos directo a la sucursal Las Condes al <strong className="text-white">+56 9 8452 1190</strong> para asesorías técnicas o swap de suspensiones.
                </p>
              </div>
            </div>

            {/* Column B: Right side Appointment Booking Form (8 columns) */}
            <div className="lg:col-span-8 bg-[#121418] border border-[#22252c] rounded-2xl p-6 sm:p-8 space-y-6">
              
              <div className="space-y-1 text-left">
                <span className="font-mono text-[8.5px] text-amber-brand font-bold tracking-widest block uppercase">FORMULARIO DE SELECCIÓN DE TURNO</span>
                <h3 className="font-display text-lg font-black text-white uppercase">RESERVAR ESPACIO TÉCNICO</h3>
                <p className="text-xs text-gray-400 font-sans leading-relaxed">
                  Completa los parámetros mecánicos de tu vehículo para asignar la bahía de trabajo correcta.
                </p>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-6 text-left">
                
                {/* Section A: Customer Identity Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 font-mono text-xs">
                    <label className="text-gray-400 font-medium">Nombre de Contacto</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="FRANCISCO ROZAS"
                      className="w-full bg-[#0b0c0e] border border-[#2d313a] rounded-lg px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-brand font-sans"
                    />
                  </div>

                  <div className="space-y-1 font-mono text-xs">
                    <label className="text-gray-400 font-medium">Correo Electrónico</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="francisco.rozas@example.cl"
                      className="w-full bg-[#0b0c0e] border border-[#2d313a] rounded-lg px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-brand font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 font-mono text-xs">
                    <label className="text-gray-400 font-medium">Teléfono Celular</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+56 9 7654 3210"
                      className="w-full bg-[#0b0c0e] border border-[#2d313a] rounded-lg px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-brand font-mono"
                    />
                  </div>

                  <div className="space-y-1 font-mono text-xs">
                    <label className="text-gray-400 font-medium">Auto (Marca, Modelo & Año)</label>
                    <input
                      type="text"
                      required
                      value={vehicle}
                      onChange={(e) => setVehicle(e.target.value)}
                      placeholder="AUDI R8 V10 PLUS 2021"
                      className="w-full bg-[#0b0c0e] border border-[#2d313a] rounded-lg px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-brand font-sans"
                    />
                  </div>
                </div>

                {/* Section B: Service Categorization specs */}
                <div className="space-y-1 font-mono text-xs">
                  <label className="text-gray-400 font-medium">Categoría de Servicio Relevante</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#0b0c0e] border border-[#2d313a] rounded-lg px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-brand font-sans cursor-pointer"
                  >
                    {categories.map((cat, ci) => (
                      <option key={ci} value={cat.title}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Section C: Calendar date & hour slots selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 font-mono text-xs">
                    <label className="text-gray-400 font-medium">Seleccionar Fecha</label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-[#0b0c0e] border border-[#2d313a] rounded-lg px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-brand font-mono cursor-pointer"
                    />
                  </div>

                  {/* Hour slots display selectors */}
                  <div className="space-y-1.5 font-mono text-xs">
                    <label className="text-gray-400 font-medium">Hora Disponible Sugerida</label>
                    <div className="grid grid-cols-3 gap-2">
                      {hourSlots.map((hs) => {
                        const isSelected = hour === hs;
                        return (
                          <button
                            type="button"
                            key={hs}
                            onClick={() => setHour(hs)}
                            className={`py-2 text-[10px] font-bold rounded-lg border text-center font-mono transition-all duration-300 cursor-pointer ${
                              isSelected
                                ? 'bg-amber-brand border-amber-brand text-black shadow shadow-amber-brand/10'
                                : 'bg-[#0b0c0e] border-[#2d313a] text-gray-400 hover:text-white hover:border-gray-500'
                            }`}
                          >
                            {hs}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Section D: Notes field request */}
                <div className="space-y-1 font-mono text-xs">
                  <label className="text-gray-400 font-medium">Especificaciones Técnicas o Comentarios Opcionales</label>
                  <textarea
                    rows={2}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Ej. Aplicar Ceramic de forma homogénea, corregir micras superficiales en guardabarros izquierdo..."
                    className="w-full bg-[#0b0c0e] border border-[#2d313a] rounded-lg px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-brand font-sans"
                  />
                </div>

                {/* Submit trigger button coding */}
                <button
                  type="submit"
                  disabled={isBooking}
                  className="w-full py-4 bg-amber-brand disabled:bg-gray-800 disabled:text-gray-500 text-black font-black font-mono text-xs rounded-lg uppercase tracking-widest transition transform active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-amber-brand/5"
                >
                  {isBooking ? (
                    <>
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                      <span>COMPROBANDO DISPONIBILIDAD DE BAHÍA...</span>
                    </>
                  ) : (
                    <span>CONFIRMAR AGENDAMIENTO PRIORITARIO</span>
                  )}
                </button>
              </form>
            </div>

          </div>
        ) : (
          /* Animated Success Receipt component coding */
          <div className="max-w-md mx-auto space-y-8 animate-[fadeIn_0.4s_ease-out]">
            
            {/* Confirmation Alert */}
            <div className="text-center p-6 bg-emerald-950/20 border border-emerald-500/20 rounded-xl space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="font-display text-lg font-black text-emerald-400 uppercase">
                ¡RESERVA TÉCNICA EXITOSA!
              </h3>
              <p className="text-xs text-gray-400 font-sans leading-relaxed max-w-sm mx-auto">
                Tu turno prioritario ha sido guardado en la agenda de ingeniería de BullyCars. Imprime tu ticket digital o preséntalo al staff en la bahía al entrar.
              </p>
            </div>

            {/* Ticket Graphic Receipt styling */}
            <div className="bg-gradient-to-b from-[#121418] to-[#161820] border-2 border-amber-brand/20 rounded-xl overflow-hidden shadow-2xl relative font-mono text-left">
              
              {/* Receipt header banner */}
              <div className="bg-[#1c1f27] px-6 py-4 border-b border-[#2d313a]/80 flex items-center justify-between">
                <div>
                  <span className="text-xs font-black text-white block">COMPROBANTE DE PIT</span>
                  <span className="text-[8px] text-gray-500 tracking-widest block uppercase font-mono">BULLYCARS VAULT RECEIPT</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-amber-brand border border-amber-brand/35 bg-amber-brand/5 px-2.5 py-0.5 rounded uppercase font-mono">
                    {bookingReceipt.status}
                  </span>
                </div>
              </div>

              {/* Receipt details specifications */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-xs font-mono border-b border-[#2d313a]/50 pb-4">
                  <div className="space-y-0.5">
                    <span className="text-[8px] text-gray-500 uppercase block">CÓDIGO DE CITA</span>
                    <span className="text-white font-extrabold block">{bookingReceipt.id}</span>
                  </div>
                  <div className="space-y-0.5 text-right">
                    <span className="text-[8px] text-gray-500 uppercase block">BAHÍA ASIGNADA</span>
                    <span className="text-amber-brand font-extrabold block">BAHÍA T-04 LÁSER</span>
                  </div>
                </div>

                <div className="space-y-3 font-mono text-xs border-b border-[#2d313a]/50 pb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400 uppercase">TITULAR:</span>
                    <span className="text-white font-semibold text-right font-sans">{bookingReceipt.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 uppercase">VEHÍCULO:</span>
                    <span className="text-amber-brand font-semibold text-right font-sans">{bookingReceipt.vehicle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 uppercase">SERVICIO:</span>
                    <span className="text-white font-semibold text-right text-[10px] uppercase font-sans">{bookingReceipt.category}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                  <div className="space-y-0.5">
                    <span className="text-[8px] text-gray-500 uppercase block">FECHA AGENDADA</span>
                    <span className="text-white font-semibold block">{bookingReceipt.date}</span>
                  </div>
                  <div className="space-y-0.5 text-right">
                    <span className="text-[8px] text-gray-500 uppercase block">HORA DE RESERVA</span>
                    <span className="text-white font-semibold block">{bookingReceipt.hour}</span>
                  </div>
                </div>

                {/* Fake Barcode graphics block */}
                <div className="pt-6 border-t border-[#2d313a]/60 space-y-2 mt-4 text-center">
                  <div className="h-10 w-full bg-white rounded flex items-center justify-between px-4 mix-blend-screen opacity-15 overflow-hidden select-none">
                     {/* Horizontal line representation of barcodes */}
                     {[...Array(26)].map((_, bi) => {
                       const barWidth = Math.floor(1 + Math.random() * 4);
                       return (
                         <div key={bi} className="h-full bg-black shrink-0" style={{ width: `${barWidth}px` }}></div>
                       );
                     })}
                  </div>
                  <span className="text-[8.5px] text-gray-500 tracking-widest font-bold uppercase block">
                    * {bookingReceipt.id} * ACCESS TOKEN
                  </span>
                </div>

              </div>

              {/* Receipt footer text decor */}
              <div className="bg-[#11131a] px-6 py-3 border-t border-[#2d313a]/50 font-mono text-[9px] text-[#555a6d] uppercase flex justify-between items-center bg-transparent">
                <span>CONSERJERÍA DE ÉLITE AUTOMOTRIZ</span>
                <span>CHILE RM</span>
              </div>

            </div>

            {/* Back action buttons row */}
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setTab('landing')}
                className="px-6 py-3.5 bg-amber-brand text-black font-bold rounded-lg text-xs font-mono transition flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-amber-brand/10"
              >
                <ArrowLeft className="w-4 h-4 text-black" />
                VOLVER A INICIO
              </button>
              
              <button
                onClick={() => {
                  setBookingReceipt(null);
                  setFullName('');
                  setEmail('');
                  setPhone('');
                  setVehicle('');
                  setNote('');
                }}
                className="px-6 py-3.5 bg-[#121418] border border-[#2d313a] text-gray-400 hover:text-white rounded-lg text-xs font-mono transition cursor-pointer"
              >
                AGENDAR CITA NUEVA
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
