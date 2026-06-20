import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, Award, BookOpen, Clock, Users, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, 
  MapPin, ShieldCheck, UserCheck, Search, FileText, BadgeCheck, Loader2
} from 'lucide-react';

interface CertificationsViewProps {
  setTab: (tab: string) => void;
}

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  capacity: number;
  remaining: number;
  price: string;
  level: 'ENTUSIASTA' | 'PROFESIONAL' | 'INTERMEDIO';
  dates: string[];
  days: number[]; // days in the month
  month: 'JUNIO' | 'JULIO';
  skills: string[];
}

export default function CertificationsView({ setTab }: CertificationsViewProps) {
  const [selectedMonth, setSelectedMonth] = useState<'JUNIO' | 'JULIO'>('JUNIO');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [rut, setRut] = useState('');
  const [levelExperience, setLevelExperience] = useState('Básico');
  const [targetCourseId, setTargetCourseId] = useState('BC-CERT-01');
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollmentTicket, setEnrollmentTicket] = useState<any | null>(null);

  // Certification courses list data
  const courses: Course[] = [
    {
      id: "BC-CERT-01",
      title: "Certificación en Corrección de Laca & Pulido Master de Tres Etapas",
      description: "Aprende el arte de la corrección micrométrica. Eliminación absoluta de marcas circulares (swirls), rayas profundas y marcas de lija mediante técnicas rotativas y roto-orbitales de última generación.",
      instructor: "Patricio \"Bully\" Rozas (Detailer Maestro)",
      duration: "16 Horas Académicas (Teórico-Práctico)",
      capacity: 8,
      remaining: 2,
      price: "$290.000 CLP",
      level: "INTERMEDIO",
      dates: ["12 de Junio, 2026", "13 de Junio, 2026"],
      days: [12, 13],
      month: 'JUNIO',
      skills: ["Medición micrométrica de barniz", "Lijado quirúrgico (Wet Sanding)", "Compuestos de corte ultra y refinado", "Uso de fuentes lumínicas multiespectrales"]
    },
    {
      id: "BC-CERT-02",
      title: "Masterclass de Revestimientos Cerámicos y Vidrio Líquido (Nano 9H)",
      description: "Instalación avanzada de sellados con base de dióxido de silicio (SiO2) y partículas de Grafeno. Preparación química profunda de paneles, técnicas de nivelado, curado por luz infrarroja y esquemas multicapas.",
      instructor: "Daniel S. (Especialista en Nanotecnología)",
      duration: "12 Horas Académicas",
      capacity: 6,
      remaining: 1,
      price: "$340.000 CLP",
      level: "PROFESIONAL",
      dates: ["24 de Junio, 2026", "25 de Junio, 2026"],
      days: [24, 25],
      month: 'JUNIO',
      skills: ["Descontaminación química y arcilla", "Aplicación homogénea antideslumbrante", "Tiempos de curado técnico e infrarrojo", "Garantías y mantenimiento de hidrofobicidad"]
    },
    {
      id: "BC-CERT-03",
      title: "Mecánica Avanzada de Alta Performance & Diagnósticos OBD-II",
      description: "Entra al diagnóstico automotriz del siglo XXI. Lectura e interpretación de flujos de datos bajo protocolo CAN-Bus, mapeos mediante osciloscopios digitales y ajuste fino de sistemas de inyección y sensores de chasis.",
      instructor: "Ing. Carlos Varas (Especialista Electrónica ECU)",
      duration: "20 Horas Académicas",
      capacity: 10,
      remaining: 5,
      price: "$310.000 CLP",
      level: "PROFESIONAL",
      dates: ["08 de Julio, 2026", "09 de Julio, 2026"],
      days: [8, 9],
      month: 'JULIO',
      skills: ["Escaneo en vivo de sensores de oxígeno", "Análisis de fallas de encendido (Misfires)", "Diagnóstico de suspensiones activas", "Reprogramaciones seguras de módulos OBD"]
    },
    {
      id: "BC-CERT-04",
      title: "Instalación Profesional de PPF (Film de Protección de Pintura) & Styling",
      description: "Aprende el servicio más cotizado del mercado: Paint Protection Film. Corte por plotter digital vs corte a mano alzada, técnicas de estiramiento controlado, aplicación con gel polimérico y acabado invisible.",
      instructor: "Marcelo Flores (Wrap Specialist)",
      duration: "18 Horas Académicas",
      capacity: 5,
      remaining: 1,
      price: "$450.000 CLP",
      level: "INTERMEDIO",
      dates: ["22 de Julio, 2026", "23 de Julio, 2026"],
      days: [22, 23],
      month: 'JULIO',
      skills: ["Corte en caliente sobre pintura", "Manejo de micro-burbujas y polvo", "Tratamiento térmico auto-curable del film", "Remoción segura sin daños de laca"]
    }
  ];

  // Configure June 2026 (starts Monday, June 1, 30 days)
  // Configure July 2026 (starts Wednesday, July 1, 31 days)
  const getDaysGrid = () => {
    if (selectedMonth === 'JUNIO') {
      // 30 days. June 1 is Monday.
      // We start matching spaces. Let's return an array of day numbers.
      // We can offset with nulls if we want standard Sunday-Saturday, or just Monday-Sunday.
      // Let's do Monday = 0, Tuesday = 1... Sunday = 6.
      // June 1st, 2026 is Monday, so 0 offset. Perfect.
      return Array.from({ length: 30 }, (_, i) => i + 1);
    } else {
      // July 1st, 2026 is a Wednesday (2 offset if Monday-first, or 3 if Sunday-first).
      // Let's use Monday-first layout. Offset is 2 (Monday, Tuesday represent as nulls).
      const offset = [null, null];
      const days = Array.from({ length: 31 }, (_, i) => i + 1);
      return [...offset, ...days];
    }
  };

  const getDayCourse = (dayNumber: number) => {
    return courses.find(c => c.month === selectedMonth && c.days.includes(dayNumber));
  };

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !rut) return;

    setIsEnrolling(true);

    // Simulate training server validation
    setTimeout(() => {
      const selected = courses.find(c => c.id === targetCourseId);
      const code = Math.floor(100000 + Math.random() * 900000);
      setEnrollmentTicket({
        id: `BC-CERT-REG-${code}`,
        studentName: name.toUpperCase(),
        rut: rut.toUpperCase(),
        email: email.toLowerCase(),
        courseTitle: selected?.title,
        instructor: selected?.instructor,
        dates: selected?.dates.join(' y '),
        level: selected?.level,
        status: "PRE-INSCRITO COMPILADO",
        investment: selected?.price,
        aula: "DOMO DE ENTRENAMIENTO BULLYCARS VAULT (LAS CONDES)"
      });
      setIsEnrolling(false);
    }, 1500);
  };

  const totalRegisteredCourses = courses.length;

  return (
    <div className="bg-[#0b0c0e] text-white min-h-screen py-16 lg:py-24 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner principal */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFD16C]/10 border border-[#FFD16C]/20 rounded-full text-[#FFD16C] text-[10px] font-bold tracking-widest uppercase font-mono">
            <Award className="w-3.5 h-3.5 text-amber-brand" />
            ACADEMIA DE DETALLADO INTERNACIONAL
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-display tracking-tight leading-none">
            CURSOS DE CERTIFICACIÓN <span className="text-[#FFD16C]">VAULT</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-sans">
            Desarrolla habilidades profesionales bajo el estándar de ingeniería de BullyCars. Cursos prácticos con cupos hiper-reducidos dirigidos por instructores certificados y metodologías de corrección micro-grupales.
          </p>
        </div>

        {!enrollmentTicket ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Columna Izquierda: Calendario Interactivo y Filtros (7 columnas) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Calendario de Cursos Card */}
              <div className="bg-[#121418] border border-[#22252c] rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD16C]/5 blur-2xl rounded-full pointer-events-none"></div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#21242a] pb-4 mb-6 gap-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] text-[#FFD16C] font-bold tracking-widest block uppercase">CRONOGRAMA MULTIFILTRO</span>
                    <h3 className="font-display text-lg font-black text-white uppercase flex items-center gap-2">
                      <CalendarIcon className="w-5 h-5 text-amber-brand" />
                      CALENDARIO ACADÉMICO 2026
                    </h3>
                  </div>

                  {/* Selector de Mes */}
                  <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-[#22252c]">
                    <button
                      onClick={() => { setSelectedMonth('JUNIO'); setSelectedDay(null); }}
                      className={`px-4 py-2 text-[10px] font-mono font-black uppercase rounded-lg transition-all cursor-pointer ${
                        selectedMonth === 'JUNIO' 
                          ? 'bg-amber-brand text-black' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Junio 2026
                    </button>
                    <button
                      onClick={() => { setSelectedMonth('JULIO'); setSelectedDay(null); }}
                      className={`px-4 py-2 text-[10px] font-mono font-black uppercase rounded-lg transition-all cursor-pointer ${
                        selectedMonth === 'JULIO' 
                          ? 'bg-amber-brand text-black' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Julio 2026
                    </button>
                  </div>
                </div>

                <p className="text-xs text-gray-400 mb-6 font-sans">
                  Los días destacados con un borde <span className="text-[#FFD16C] font-semibold">Dorado</span> poseen clases presenciales de certificación programadas. Pulsa en un día para explorar detalles.
                </p>

                {/* Grid del Calendario */}
                <div className="grid grid-cols-7 gap-2 text-center mb-6">
                  {/* Headers */}
                  {['LU', 'MA', 'MI', 'JU', 'VI', 'SÁ', 'DO'].map(d => (
                    <span key={d} className="font-mono text-[9.5px] text-gray-500 font-bold uppercase">{d}</span>
                  ))}

                  {/* Days */}
                  {getDaysGrid().map((day, idx) => {
                    if (day === null) {
                      return <div key={`empty-${idx}`} className="aspect-square bg-transparent"></div>;
                    }

                    const course = getDayCourse(day);
                    const isSelected = selectedDay === day;
                    
                    return (
                      <button
                        key={`day-${day}`}
                        onClick={() => {
                          setSelectedDay(day);
                          if (course) {
                            setSelectedCourse(course);
                            setTargetCourseId(course.id);
                          } else {
                            setSelectedCourse(null);
                          }
                        }}
                        className={`aspect-square rounded-xl flex flex-col justify-between p-1.5 transition-all relative border cursor-pointer ${
                          course 
                            ? isSelected
                              ? 'bg-amber-brand/20 border-amber-brand text-amber-brand font-black'
                              : 'bg-[#FFD16C]/5 border-[#FFD16C]/40 text-white hover:bg-[#FFD16C]/10'
                            : 'bg-black/20 border-[#2d313a]/30 text-gray-650 hover:border-gray-500/30'
                        }`}
                      >
                        <span className="text-xs font-mono text-left font-bold">{day}</span>
                        {course && (
                          <span className="w-1.5 h-1.5 bg-amber-brand rounded-full mx-auto mb-0.5 animate-pulse" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Detalle rápido de selección en el calendario */}
                <div className="p-4 bg-black/40 border border-[#21242a] rounded-xl text-xs space-y-2">
                  {selectedCourse ? (
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 bg-amber-brand/10 text-amber-brand text-[8px] font-bold rounded font-mono uppercase tracking-wider">
                          {selectedCourse.level}
                        </span>
                        <span className="text-white font-bold">{selectedCourse.title}</span>
                      </div>
                      <p className="text-gray-400 font-sans leading-relaxed text-[11px] font-medium">
                        Instructor: <span className="text-gray-300 font-semibold">{selectedCourse.instructor}</span> • Día seleccionado: {selectedDay} de {selectedMonth.toLowerCase()}.
                      </p>
                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-[11px] font-mono text-[#FFD16C] font-bold">Valor: {selectedCourse.price} CLP</span>
                        <a href="#form-inscripcion" className="text-[10px] font-mono font-extrabold text-amber-brand hover:underline flex items-center gap-1">
                          DESLIZAR AL FORMULARIO &rarr;
                        </a>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 font-mono text-[10px] text-center py-2 uppercase">
                      Ningún día de certificación seleccionado. Pulsa sobre los días con borde dorado.
                    </p>
                  )}
                </div>

              </div>

              {/* Lista descriptiva de todos los cursos */}
              <div className="space-y-6">
                <h3 className="font-display text-sm font-black text-white uppercase tracking-widest border-b border-[#21242a] pb-3">
                  DESCRIPCIÓN DE CERTIFICACIONES DISPONIBLES ({totalRegisteredCourses})
                </h3>

                <div className="grid grid-cols-1 gap-6">
                  {courses.map((course) => {
                    const isTarget = targetCourseId === course.id;
                    return (
                      <div 
                        key={course.id} 
                        className={`p-6 rounded-2xl border transition-all duration-300 ${
                          isTarget 
                            ? 'bg-[rgba(255,209,108,0.04)] border-amber-brand/40 shadow-lg shadow-amber-brand/5'
                            : 'bg-[#121418] border-[#22252c] opacity-90'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="px-2 py-0.5 bg-black text-[#FFD16C] font-mono text-[8px] font-extrabold rounded border border-[#FFD16C]/35">
                                {course.id}
                              </span>
                              <span className="px-2 py-0.5 bg-[#FFD16C]/10 text-amber-brand font-mono text-[8.5px] font-bold rounded uppercase">
                                NIVEL {course.level}
                              </span>
                              <span className="text-xs text-gray-400 font-mono flex items-center gap-0.5">
                                <Clock className="w-3.5 h-3.5 text-gray-500" />
                                {course.duration}
                              </span>
                            </div>
                            <h4 className="font-display text-base sm:text-lg font-extrabold text-white group-hover:text-amber-brand">
                              {course.title}
                            </h4>
                          </div>

                          <div className="text-left sm:text-right shrink-0">
                            <span className="block font-mono text-xs text-gray-500 uppercase">INVERSIÓN</span>
                            <span className="text-lg font-black text-amber-brand font-display">{course.price}</span>
                          </div>
                        </div>

                        <p className="text-xs text-gray-400 font-sans leading-relaxed mt-4">
                          {course.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-4 border-t border-[#21242a] text-xs">
                          <div className="space-y-1">
                            <span className="text-[9px] text-gray-500 font-mono uppercase block">CRONOGRAMA DE CLASES</span>
                            <span className="text-white font-medium flex items-center gap-1.5">
                              <CalendarIcon className="w-3.5 h-3.5 text-amber-brand shrink-0" />
                              {course.dates.join(' • ')} (Mes de {course.month})
                            </span>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[9px] text-gray-500 font-mono uppercase block">INSTRUCTOR MAESTRO</span>
                            <span className="text-white font-medium flex items-center gap-1.5 font-sans">
                              <UserCheck className="w-3.5 h-3.5 text-amber-brand shrink-0" />
                              {course.instructor}
                            </span>
                          </div>
                        </div>

                        {/* Temas claves cubiertos */}
                        <div className="mt-4 space-y-1.5">
                          <span className="text-[9px] text-gray-500 font-mono uppercase block">APRENDIZAJES CLAVES DE LA EVALUACIÓN</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                            {course.skills.map((skill, si) => (
                              <div key={si} className="flex items-center gap-1.5 text-[11px] text-gray-300">
                                <BadgeCheck className="w-3.5 h-3.5 text-amber-brand shrink-0" />
                                <span className="truncate font-sans">{skill}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Botón de selección rápida */}
                        <div className="mt-6 flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-gray-500" />
                            <span className="text-[11px] text-gray-400">
                              Cupos: <strong className="text-white">{course.capacity} máx.</strong> • Disponibles: <strong className="text-amber-brand">{course.remaining}</strong>
                            </span>
                          </div>

                          <button
                            onClick={() => {
                              setTargetCourseId(course.id);
                              setSelectedCourse(course);
                              const element = document.getElementById('form-inscripcion');
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                              }
                            }}
                            className={`px-4 py-2 rounded-xl font-mono text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer border ${
                              isTarget
                                ? 'bg-amber-brand text-black border-amber-brand'
                                : 'bg-transparent border-[#2d313a] text-gray-300 hover:text-white hover:border-gray-500'
                            }`}
                          >
                            {isTarget ? 'CURSO SELECCIONADO' : 'SELECCIONAR PARA INSCRIPCIÓN'}
                          </button>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Columna Derecha: Formulario de Inscripción (5 columnas) */}
            <div id="form-inscripcion" className="lg:col-span-5 space-y-6 scroll-mt-24">
              
              <div className="bg-[#121418] border border-[#22252c] rounded-2xl p-6 sm:p-8 space-y-6 sticky top-24">
                
                <div className="space-y-1 text-left">
                  <span className="font-mono text-[8.5px] text-[#FFD16C] font-bold tracking-widest block uppercase">VAULT TRAINING REGISTRAR</span>
                  <h3 className="font-display text-lg font-black text-white uppercase">RESERVAR INSCRIPCIÓN TÉCNICA</h3>
                  <p className="text-xs text-gray-400 font-sans leading-relaxed">
                    Completa la matrícula para resguardar uno de los cupos limitados en las jornadas prácticas presenciales de BullyCars Vault.
                  </p>
                </div>

                <form onSubmit={handleEnrollSubmit} className="space-y-5 text-left">
                  
                  {/* Selector de Curso */}
                  <div className="space-y-1 font-mono text-xs">
                    <label className="text-gray-400 font-medium block">Curso a Certificar</label>
                    <select
                      value={targetCourseId}
                      onChange={(e) => {
                        setTargetCourseId(e.target.value);
                        const match = courses.find(c => c.id === e.target.value);
                        if (match) setSelectedCourse(match);
                      }}
                      className="w-full bg-[#0b0c0e] border border-[#2d313a] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-brand font-sans cursor-pointer"
                    >
                      {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                          [{course.id}] {course.title.substring(0, 45)}...
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Nombre */}
                  <div className="space-y-1 font-mono text-xs">
                    <label className="text-gray-400 font-medium block">Nombre Completo del Estudiante</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="GABRIEL MEDINA FUENTES"
                      className="w-full bg-[#0b0c0e] border border-[#2d313a] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-brand font-sans"
                    />
                  </div>

                  {/* RUT / DNI */}
                  <div className="space-y-1 font-mono text-xs">
                    <label className="text-gray-400 font-medium block">RUT / Pasaporte</label>
                    <input
                      type="text"
                      required
                      value={rut}
                      onChange={(e) => setRut(e.target.value)}
                      placeholder="18.765.432-K"
                      className="w-full bg-[#0b0c0e] border border-[#2d313a] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-brand font-mono"
                    />
                  </div>

                  {/* Correo */}
                  <div className="space-y-1 font-mono text-xs">
                    <label className="text-gray-400 font-medium block">Correo Electrónico</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="gabriel.medina@gmail.com"
                      className="w-full bg-[#0b0c0e] border border-[#2d313a] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-brand font-sans"
                    />
                  </div>

                  {/* Celular */}
                  <div className="space-y-1 font-mono text-xs">
                    <label className="text-gray-400 font-medium block">Teléfono de Contacto</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+56 9 8888 7777"
                      className="w-full bg-[#0b0c0e] border border-[#2d313a] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-brand font-mono"
                    />
                  </div>

                  {/* Experiencia */}
                  <div className="space-y-1 font-mono text-xs">
                    <label className="text-gray-400 font-medium block">Nivel de Experiencia Previa</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Básico', 'Intermedio', 'Profesional'].map((lvl) => {
                        const isMatch = levelExperience === lvl;
                        return (
                          <button
                            type="button"
                            key={lvl}
                            onClick={() => setLevelExperience(lvl)}
                            className={`py-2 text-[10px] font-bold rounded-lg border text-center font-mono transition-all duration-350 cursor-pointer ${
                              isMatch
                                ? 'bg-amber-brand border-amber-brand text-black'
                                : 'bg-[#0b0c0e] border-[#2d313a] text-gray-440 hover:text-white'
                            }`}
                          >
                            {lvl.toUpperCase()}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Términos */}
                  <div className="p-3 bg-black/45 border border-[#21242a] rounded-xl text-[10px] text-gray-400 leading-relaxed space-y-1">
                    <span className="text-[#FFD16C] font-bold font-mono text-[9px] block">PROTOCOLO ACADÉMICO PRESENCIAL:</span>
                    <p className="font-sans">
                      La inasistencia sin previo aviso de 48 horas invalida la reprogramación automática debido a los insumos y vehículos destinados al entrenamiento. Se exige vestimenta de seguridad automotriz proporcionada en el domo.
                    </p>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isEnrolling}
                    className="w-full py-4 bg-amber-brand disabled:bg-gray-800 disabled:text-gray-500 text-black font-black font-mono text-xs rounded-xl uppercase tracking-widest transition-all duration-350 transform hover:brightness-105 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-amber-brand/10"
                  >
                    {isEnrolling ? (
                      <>
                        <Loader2 className="w-4 h-4 text-black animate-spin" />
                        <span>RESERVANDO VACANTE EN EL VAULT...</span>
                      </>
                    ) : (
                      <span>MATRICULARME & DESCARGAR TICKET</span>
                    )}
                  </button>

                </form>
              </div>

            </div>

          </div>
        ) : (
          /* Recibo de matrícula exitosa / Certificado provisional */
          <div className="max-w-xl mx-auto space-y-8 animate-[fadeIn_0.5s_ease-out]">
            
            <div className="text-center p-6 bg-emerald-950/20 border border-emerald-500/20 rounded-2xl space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="font-display text-lg font-black text-emerald-400 uppercase">
                ¡PRE-INSCRIPCIÓN REGISTRADA CORRECTAMENTE!
              </h3>
              <p className="text-xs text-gray-400 font-sans leading-relaxed max-w-md mx-auto">
                Tu postulación se ha completado en el servidor académico de BullyCars Vault. Un consultor técnico validará tu código de matrícula y RUT para coordinar el pago o la habilitación de becas.
              </p>
            </div>

            {/* Ticket o Credencial Académica de Lujo */}
            <div className="bg-gradient-to-b from-[#121418] to-[#15171e] border-2 border-amber-brand/25 rounded-2xl overflow-hidden shadow-2xl relative font-mono text-left">
              
              <div className="bg-[#1c1f27] px-6 py-4 border-b border-[#2d313a]/80 flex items-center justify-between">
                <div>
                  <span className="text-xs font-black text-white block">CREDENCIAL ACADÉMICA TEMPORAL</span>
                  <span className="text-[7.5px] text-gray-505 tracking-widest block uppercase font-mono">BULLYCARS ACADEMY PASSPORT</span>
                </div>
                <div className="text-right">
                  <span className="text-[9.5px] font-bold text-amber-brand border border-amber-brand/35 bg-amber-brand/5 px-2.5 py-0.5 rounded uppercase font-mono">
                    ALUMNO MATRICULADO
                  </span>
                </div>
              </div>

              {/* Detalles */}
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-4 text-xs font-mono border-b border-[#2d313a]/50 pb-4">
                  <div className="space-y-0.5">
                    <span className="text-[8px] text-gray-500 uppercase block">MATRÍCULA ID</span>
                    <span className="text-white font-extrabold block">{enrollmentTicket.id}</span>
                  </div>
                  <div className="space-y-0.5 text-right">
                    <span className="text-[8px] text-gray-500 uppercase block">UBICACIÓN EN LAS CONDES</span>
                    <span className="text-amber-brand font-extrabold block">AULA 3 - DOMO PRINCIPAL</span>
                  </div>
                </div>

                <div className="space-y-3 font-mono text-xs border-b border-[#2d313a]/50 pb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400 uppercase">ESTUDIANTE:</span>
                    <span className="text-white font-semibold text-right font-sans">{enrollmentTicket.studentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 uppercase">RUT / ID:</span>
                    <span className="text-white font-semibold text-right">{enrollmentTicket.rut}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 uppercase">EMAIL:</span>
                    <span className="text-white font-semibold text-right text-[11px] font-sans">{enrollmentTicket.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 uppercase font-mono">CERTIFICACIÓN:</span>
                    <span className="text-amber-brand font-black text-right text-[11px] uppercase font-sans max-w-[300px] leading-tight block">
                      {enrollmentTicket.courseTitle}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 uppercase">INSTRUCTOR:</span>
                    <span className="text-white font-semibold text-right font-sans">{enrollmentTicket.instructor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 uppercase">INVERSIÓN:</span>
                    <span className="text-amber-brand font-bold text-right font-sans">{enrollmentTicket.investment} CLP</span>
                  </div>
                </div>

                <div className="p-3 bg-[#0b0c0e] rounded-xl border border-[#2d313a]/60 font-sans text-[11px] text-gray-300 leading-relaxed">
                  <strong className="text-white block font-mono text-[9px] uppercase tracking-wider mb-1 text-amber-brand">DIRECCIÓN & FECHAS DE ASISTENCIA:</strong>
                  Válido para las clases a impartirse los días <strong className="text-white font-bold">{enrollmentTicket.dates}</strong> en <strong className="text-white">{enrollmentTicket.aula}</strong>. Tu kit de detallado y apuntes técnicos te serán entregados el primer día al verificar tu identidad.
                </div>

                {/* Código de barras simulado */}
                <div className="pt-4 space-y-1.5 text-center">
                  <div className="h-10 w-full bg-white rounded flex items-center justify-between px-6 mix-blend-screen opacity-20 overflow-hidden select-none">
                     {[...Array(32)].map((_, bi) => {
                       const barWidth = Math.floor(1 + Math.random() * 5);
                       return (
                         <div key={bi} className="h-full bg-black shrink-0" style={{ width: `${barWidth}px` }}></div>
                       );
                     })}
                  </div>
                  <span className="text-[8px] text-gray-500 tracking-widest font-bold uppercase block">
                    * {enrollmentTicket.id} * VAULT CAMPUS ADMIT
                  </span>
                </div>

              </div>

              {/* Pie de credencial */}
              <div className="bg-[#11131a] px-6 py-3 border-t border-[#2d313a]/50 font-mono text-[8.5px] text-[#555a6d] uppercase flex justify-between items-center bg-transparent">
                <span>CONGRESO ACADÉMICO BULLYCARSMEMBER</span>
                <span>SANTIAGO CHILE</span>
              </div>

            </div>

            {/* Acciones para retornar */}
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setTab('landing')}
                className="px-6 py-3.5 bg-amber-brand text-black font-bold rounded-xl text-xs font-mono transition-all uppercase tracking-widest cursor-pointer shadow-lg shadow-amber-brand/10"
              >
                VOLVER A SERVICIOS
              </button>
              
              <button
                onClick={() => {
                  setEnrollmentTicket(null);
                  setName('');
                  setEmail('');
                  setPhone('');
                  setRut('');
                }}
                className="px-6 py-3.5 bg-[#121418] border border-[#2d313a] hover:border-gray-500 text-gray-350 hover:text-white rounded-xl text-xs font-mono font-bold transition cursor-pointer"
              >
                MATRICULAR OTRO ALUMNO
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
