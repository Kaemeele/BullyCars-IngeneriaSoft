import React, { useState } from 'react';
import { 
  ShieldCheck, Wrench, Sparkles, Database, Plus, Play, CheckCircle2, 
  Trash2, Sliders, Cpu, Gauge, RefreshCw, AlertTriangle, Send, 
  UserPlus, HelpCircle, Thermometer, ArrowUpRight, Check
} from 'lucide-react';

interface WorkOrder {
  id: string;
  vehicle: string;
  clientName: string;
  servicePackage: string;
  mechanic: string;
  status: 'espera' | 'criolimpieza' | 'pulido' | 'ceramico' | 'horno' | 'completado';
  progress: number; // 0 to 100
  booth: string;
  timestamp: string;
}

export default function BullyConnectView() {
  // --- STATE ---
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([
    {
      id: "BC-WO-4029",
      vehicle: "Porsche 911 Carrera S (992)",
      clientName: "Federico Valenzuela",
      servicePackage: "Corrección de Laca & Cerámico 9H",
      mechanic: "Ing. Ruiz",
      status: "pulido",
      progress: 60,
      booth: "Pits 2 - Pulido",
      timestamp: "Hace 14 min"
    },
    {
      id: "BC-WO-4030",
      vehicle: "BMW M5 Competition",
      clientName: "Catalina Silva-Prado",
      servicePackage: "Restauración Criogénica de Bloque",
      mechanic: "Ing. Vergara",
      status: "criolimpieza",
      progress: 35,
      booth: "Pits 1 - Limpieza",
      timestamp: "Hace 2 horas"
    },
    {
      id: "BC-WO-4031",
      vehicle: "Porsche GT3 RS (991)",
      clientName: "Mauricio Pinilla",
      servicePackage: "Premium Stealth Matte Wrap",
      mechanic: "Ing. Vergara",
      status: "horno",
      progress: 85,
      booth: "Booth UV - Curado",
      timestamp: "Hace 45 min"
    },
    {
      id: "BC-WO-4032",
      vehicle: "Audi RS6 Avant",
      clientName: "Gabriel Suazo",
      servicePackage: "Frenado Premium Carbon-Ceramic",
      mechanic: "Mec. Silva",
      status: "completado",
      progress: 100,
      booth: "Almacenamiento",
      timestamp: "Ayer"
    }
  ]);

  // Intake Form State
  const [vehicle, setVehicle] = useState('');
  const [clientName, setClientName] = useState('');
  const [servicePackage, setServicePackage] = useState('Corrección de Laca & Cerámico 9H');
  const [mechanic, setMechanic] = useState('Ing. Ruiz');
  const [booth, setBooth] = useState('Pits 2 - Pulido');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Active Telemetry Sliders State
  const [uvIntensity, setUvIntensity] = useState<number>(75);
  const [postHeatTemp, setPostHeatTemp] = useState<number>(90); // default to plastic memory 90°C!
  const [filterPurgeActive, setFilterPurgeActive] = useState(false);
  const [filterProgress, setFilterProgress] = useState(99.8);
  const [co2LiquidPercent, setCo2LiquidPercent] = useState<number>(84);
  const [co2Recharging, setCo2Recharging] = useState(false);

  // Live Logs Feed
  const [logs, setLogs] = useState<string[]>([
    "[10:45 AM] - Ing. Ruiz movió a 'Porsche 911 (Federico V.)' a la fase de acabado mecánico.",
    "[10:15 AM] - Sensor de Cabina UV detectó ajuste térmico de postcalentamiento estable.",
    "[09:30 AM] - Purga de filtros terminada. Aire del gabinete catalogado con 99.8% pureza.",
    "[08:45 AM] - Recarga de CO2 criogénico ejecutada para mantenimiento preventivo.",
    "[08:15 AM] - Inicio de jornada del pit de admisión BullyCars Chile."
  ]);
  const [newLogText, setNewLogText] = useState('');

  // --- ACTIONS ---
  const handleIntakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicle || !clientName) return;

    const newWO: WorkOrder = {
      id: `BC-WO-${Math.floor(4000 + Math.random() * 999)}`,
      vehicle: vehicle.toUpperCase(),
      clientName: clientName.toUpperCase(),
      servicePackage,
      mechanic,
      status: "espera",
      progress: 15,
      booth,
      timestamp: "Ahora mismo"
    };

    setWorkOrders(prev => [newWO, ...prev]);
    setVehicle('');
    setClientName('');
    
    // Add to activity log
    const logTime = new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
    setLogs(prev => [`[${logTime}] - Admitido nuevo vehículo '${newWO.vehicle}' para ${newWO.servicePackage}.`, ...prev]);

    // Show feedback toast
    setToastMessage(`¡Máquina ${newWO.vehicle} ingresada con éxito a ${newWO.booth}!`);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  const advanceStatus = (id: string) => {
    let advancedLog = "";
    setWorkOrders(prev => prev.map(order => {
      if (order.id !== id) return order;

      let nextStatus = order.status;
      let nextProgress = order.progress;
      let nextBooth = order.booth;

      switch (order.status) {
        case 'espera':
          nextStatus = 'criolimpieza';
          nextProgress = 35;
          nextBooth = "Pits 1 - Limpieza";
          advancedLog = `Iniciando criolimpieza con CO2 sólido en chasis.`;
          break;
        case 'criolimpieza':
          nextStatus = 'pulido';
          nextProgress = 60;
          nextBooth = "Pits 2 - Pulido";
          advancedLog = `Pasando a pulido correctivo en 3 etapas en laca de fábrica.`;
          break;
        case 'pulido':
          nextStatus = 'ceramico';
          nextProgress = 80;
          nextBooth = "Booth UV - Curado";
          advancedLog = `Aplicación de compuesto cerámico de dureza molecular 9H.`;
          break;
        case 'ceramico':
          nextStatus = 'horno';
          nextProgress = 90;
          nextBooth = "Booth UV - Curado";
          advancedLog = `Actuando postcalentamiento y curado UV controlado.`;
          break;
        case 'horno':
          nextStatus = 'completado';
          nextProgress = 100;
          nextBooth = "Almacenamiento";
          advancedLog = `Control de calidad superado con brillo óptico certificado. Despachado.`;
          break;
        case 'completado':
          // reset back for demo
          nextStatus = 'espera';
          nextProgress = 15;
          nextBooth = "Pits de Ingreso";
          advancedLog = `Reingresado a pits para inspección de garantía de cortesía.`;
          break;
      }

      // Append specialized log
      const logTime = new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
      setLogs(logsPrev => [`[${logTime}] - ${order.vehicle} (${order.mechanic}): ${advancedLog}`, ...logsPrev]);

      return {
        ...order,
        status: nextStatus as any,
        progress: nextProgress,
        booth: nextBooth
      };
    }));
  };

  const deleteOrder = (id: string, name: string) => {
    setWorkOrders(prev => prev.filter(o => o.id !== id));
    const logTime = new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
    setLogs(prev => [`[${logTime}] - Máquina de ${name} retirada de la plataforma conectada.`, ...prev]);
  };

  // Trigger simulated actions
  const triggerFilterPurge = () => {
    if (filterPurgeActive) return;
    setFilterPurgeActive(true);
    setFilterProgress(100.0);
    
    const logTime = new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
    setLogs(prev => [`[${logTime}] - Se inició purga forzada del purificador HEPA para remoción de polvos y micras.`, ...prev]);

    setTimeout(() => {
      setFilterPurgeActive(false);
      setFilterProgress(99.9);
    }, 3000);
  };

  const triggerCo2Recharge = () => {
    if (co2Recharging) return;
    setCo2Recharging(true);

    const logTime = new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
    setLogs(prev => [`[${logTime}] - Recarga de CO2 líquido en progreso. Llenado el tanque criogénico del pit 1.`, ...prev]);

    setTimeout(() => {
      setCo2LiquidPercent(100);
      setCo2Recharging(false);
    }, 2500);
  };

  const postCustomLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogText.trim()) return;

    const logTime = new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
    setLogs(prev => [`[${logTime}] - [OPERADOR]: ${newLogText}`, ...prev]);
    setNewLogText('');
  };

  // Computed values
  const totalInPits = workOrders.filter(w => w.status !== 'completado').length;
  const totalCompletados = workOrders.filter(w => w.status === 'completado').length;

  // Render status text
  const getStatusLabelAndColor = (status: string) => {
    switch (status) {
      case 'espera':
        return { label: 'En Cola', bg: 'bg-[#1e1510] text-[#E07A5F] border-[#E07A5F]/20' };
      case 'criolimpieza':
        return { label: 'Crio-Blaster', bg: 'bg-[#101920] text-[#3A86C8] border-[#3A86C8]/20' };
      case 'pulido':
        return { label: 'Corrección Laca', bg: 'bg-[#201525] text-[#9D4EDD] border-[#9D4EDD]/20' };
      case 'ceramico':
        return { label: 'Coating SiO2', bg: 'bg-[#1a1c12] text-[#Aacc00] border-[#Aacc00]/20' };
      case 'horno':
        return { label: 'Horno UV', bg: 'bg-[#251012] text-[#E01E37] border-[#E01E37]/20' };
      case 'completado':
        return { label: 'Despachado', bg: 'bg-[#102015] text-[#2EC4B6] border-[#2EC4B6]/20' };
      default:
        return { label: 'En Cola', bg: 'bg-gray-800 text-gray-300' };
    }
  };

  return (
    <div className="bg-[#0e0e0e] text-white min-h-screen py-16 lg:py-24 font-sans text-left relative overflow-hidden">
      
      {/* Background visual graphics */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-brand/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-red-600/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Platform Title Banner Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#262626]">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-brand/10 border border-amber-brand/20 rounded-full text-amber-brand text-[10px] font-bold font-mono tracking-widest uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-brand" />
              SISTEMA INTEGRADO DE PIT & TALLER • v4.2
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display uppercase tracking-tight text-white leading-none">
              BULLY<span className="text-amber-brand">-CONNECT</span>
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm font-sans max-w-2xl">
              Plataforma centralizada del Vault. Administra el ingreso de deportivos a pits, monitorea la atmósfera de micro-capas en tiempo real y gestiona las fases de curado criogénico con precisión molecular.
            </p>
          </div>

          {/* Diagnostic badge */}
          <div className="bg-[#1A1A1A] border border-[#262626] rounded-2xl p-4 flex items-center gap-4 shrink-0 shadow-xl self-start md:self-auto">
            <div className="w-10 h-10 rounded-xl bg-amber-brand/10 border border-amber-brand/20 flex items-center justify-center shrink-0 text-amber-brand">
              <Database className="w-5 h-5 animate-pulse text-[#FFD16C]" />
            </div>
            <div>
              <span className="font-mono text-[9px] text-gray-500 block uppercase font-bold">Base de Datos</span>
              <span className="font-mono text-xs font-black text-white block">Sincronizado Local</span>
              <span className="text-[9px] text-emerald-400 block font-bold mt-0.5">● CAN-BUS ACTIVO</span>
            </div>
          </div>
        </div>

        {/* Global Metric bento indicators row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="bg-[#1A1A1A] border border-[#262626] rounded-2xl p-5 space-y-2 shadow-lg">
            <div className="flex items-center justify-between text-[#888]">
              <span className="font-mono text-[10px] uppercase font-bold tracking-wider">Vehículos en Pits</span>
              <Wrench className="w-4 h-4 text-amber-brand" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold font-display text-white">{totalInPits}</span>
              <span className="text-[10px] text-amber-brand font-mono font-medium">Bajo Proceso</span>
            </div>
            <p className="text-[10px] text-gray-500 font-sans">Elevadores y pintura copados</p>
          </div>

          <div className="bg-[#1A1A1A] border border-[#262626] rounded-2xl p-5 space-y-2 shadow-lg">
            <div className="flex items-center justify-between text-[#888]">
              <span className="font-mono text-[10px] uppercase font-bold tracking-wider">Curado UV Cámara</span>
              <Thermometer className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold font-display text-white">{postHeatTemp}°C</span>
              <span className="text-[10px] text-emerald-400 font-mono font-bold">
                {Math.abs(postHeatTemp - 90) <= 5 ? 'Óptimo 90°' : 'Ajustable'}
              </span>
            </div>
            <p className="text-[10px] text-gray-500 font-sans">Ideal para memoria plástica</p>
          </div>

          <div className="bg-[#1A1A1A] border border-[#262626] rounded-2xl p-5 space-y-2 shadow-lg">
            <div className="flex items-center justify-between text-[#888]">
              <span className="font-mono text-[10px] uppercase font-bold tracking-wider">Gas Cryo CO2</span>
              <Gauge className="w-4 h-4 text-[#3A86C8]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold font-display text-white">{co2LiquidPercent}%</span>
              <span className="text-[10px] text-gray-400 font-mono">1450 PSI</span>
            </div>
            <p className="text-[10px] text-gray-500 font-sans">{co2Recharging ? 'Admitiendo gas...' : 'Presión nominal estable'}</p>
          </div>

          <div className="bg-[#1A1A1A] border border-[#262626] rounded-2xl p-5 space-y-2 shadow-lg">
            <div className="flex items-center justify-between text-[#888]">
              <span className="font-mono text-[10px] uppercase font-bold tracking-wider">Despachados</span>
              <CheckCircle2 className="w-4 h-4 text-[#2EC4B6]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold font-display text-white">{totalCompletados}</span>
              <span className="text-[10px] text-[#2EC4B6] font-mono font-bold">QC APPROVED</span>
            </div>
            <p className="text-[10px] text-gray-500 font-sans">Entregas exitosas certificadas</p>
          </div>

        </div>

        {/* Dynamic feedback toast */}
        {showToast && (
          <div className="bg-[#1A1A1A] border-l-4 border-amber-brand text-white p-4 rounded-xl shadow-2xl flex items-center gap-3 animate-[slideIn_0.3s_ease-out] text-sm">
            <Check className="w-5 h-5 text-amber-brand shrink-0" />
            <span className="font-bold">{toastMessage}</span>
          </div>
        )}

        {/* Bento Grid: Core Workspace Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Bento Card 1: Intake registration Form (4 columns) */}
          <div className="lg:col-span-4 bg-[#1A1A1A] border border-[#262626] rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-xl">
            
            <div className="space-y-2 text-left">
              <span className="font-mono text-[9px] text-amber-brand font-bold tracking-widest block uppercase">ADMISIÓN DE VEHÍCULO</span>
              <h3 className="font-display text-xl font-extrabold text-white uppercase tracking-tight">INGRESO DE MÁQUINA</h3>
              <p className="text-xs text-gray-405 font-sans leading-relaxed">
                Asocia la patente o chasis a un paquete del taller y asígnale un ingeniero de pits de inmediato.
              </p>
            </div>

            <form onSubmit={handleIntakeSubmit} className="space-y-4 text-left">
              <div className="space-y-1 font-mono text-xs">
                <label className="text-gray-400 font-medium font-sans">Modelo del Deportivo</label>
                <input
                  type="text"
                  required
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  placeholder="Ej. PORSCHE 911 GT3 ST"
                  className="w-full bg-[#0E0E0E] border border-[#262626] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-brand font-sans placeholder-gray-600"
                />
              </div>

              <div className="space-y-1 font-mono text-xs">
                <label className="text-gray-400 font-medium font-sans">Dueño del Auto / Cliente</label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Ej. CRISTIAN DE LA FUENTE"
                  className="w-full bg-[#0E0E0E] border border-[#262626] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-brand font-sans placeholder-gray-600"
                />
              </div>

              <div className="space-y-1 font-mono text-xs">
                <label className="text-gray-400 font-medium font-sans">Paquete Automotriz Solicitado</label>
                <select
                  value={servicePackage}
                  onChange={(e) => setServicePackage(e.target.value)}
                  className="w-full bg-[#0E0E0E] border border-[#262626] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-brand font-sans cursor-pointer"
                >
                  <option value="Restauración Criogénica de Bloque">❄️ Criolimpieza CO2 (-78.5°C)</option>
                  <option value="Corrección de Laca & Cerámico 9H">💎 Tratamiento Cerámico Carbon-Shell</option>
                  <option value="Premium Stealth Matte Wrap">🏎️ Forrado de Vinilo Cast Film</option>
                  <option value="Frenado Premium Carbon-Ceramic">🛑 Upgrade de Disipación de Calzado</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1 font-mono text-xs">
                  <label className="text-gray-400 font-medium font-sans">Técnico Líder</label>
                  <select
                    value={mechanic}
                    onChange={(e) => setMechanic(e.target.value)}
                    className="w-full bg-[#0E0E0E] border border-[#262626] rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-amber-brand font-sans cursor-pointer"
                  >
                    <option value="Ing. Ruiz">Ing. Ruiz</option>
                    <option value="Ing. Vergara">Ing. Vergara</option>
                    <option value="Mec. Silva">Mec. Silva</option>
                  </select>
                </div>

                <div className="space-y-1 font-mono text-xs">
                  <label className="text-gray-400 font-medium font-sans">Bahía Inicial</label>
                  <select
                    value={booth}
                    onChange={(e) => setBooth(e.target.value)}
                    className="w-full bg-[#0E0E0E] border border-[#262626] rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-amber-brand font-sans cursor-pointer"
                  >
                    <option value="Pits 1 - Limpieza">Pits 1 - Clean</option>
                    <option value="Pits 2 - Pulido">Pits 2 - Polish</option>
                    <option value="Booth UV - Curado">UV Booth</option>
                    <option value="Garantía de Cortesía">Garantía Pit</option>
                  </select>
                </div>
              </div>

              {/* Kinetic gradient main CTA button */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#FFD16C] to-[#FDC003] text-black font-mono text-xs font-black rounded-xl uppercase tracking-wider shadow-lg shadow-amber-brand/15 hover:brightness-105 transition-all duration-300 transform active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5"
              >
                <UserPlus className="w-4 h-4 text-black font-bold" />
                ADMITIR EN VAULT
              </button>
            </form>
          </div>

          {/* Bento Card 2: Active Pits progression table (8 columns) */}
          <div className="lg:col-span-8 bg-[#1A1A1A] border border-[#262626] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl flex flex-col justify-between">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
              <div className="space-y-1">
                <span className="font-mono text-[9px] text-amber-brand font-bold tracking-widest block uppercase">CONTROL DE FLUJO DE TRABAJO</span>
                <h3 className="font-display text-xl font-extrabold text-white uppercase tracking-tight">VEHÍCULOS EN PIT</h3>
              </div>
              <div className="text-[10px] font-mono text-gray-500 bg-[#0E0E0E] border border-[#262626] px-3.5 py-2 rounded-xl">
                Elevadores Asignados: <span className="text-amber-brand font-bold">{workOrders.length}/6 Máximo</span>
              </div>
            </div>

            {/* List table wrapper */}
            {workOrders.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-12 h-12 rounded-full border border-dashed border-[#262626] flex items-center justify-center mx-auto text-gray-600">
                  <Database className="w-5 h-5" />
                </div>
                <p className="text-xs text-gray-400 font-sans max-w-xs mx-auto">
                  No hay autos en pits ni bahías activas en el sistema conectado. Inserta uno a la izquierda.
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[390px] overflow-y-auto pr-1">
                {workOrders.map((order) => {
                  const statusConfig = getStatusLabelAndColor(order.status);
                  return (
                    <div
                      key={order.id}
                      className="bg-[#0E0E0E] border border-[#262626] hover:border-amber-brand/20 p-4 sm:p-5 rounded-xl transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-sans text-xs text-left group"
                    >
                      {/* Name and package descriptions */}
                      <div className="space-y-1.5 flex-1 w-full md:w-auto">
                        <div className="flex items-center gap-1.5">
                          <span className="inline-block w-2-h-2 rounded-full bg-amber-brand"></span>
                          <span className="font-display text-sm font-extrabold text-white leading-tight">{order.vehicle}</span>
                          <span className="font-mono text-[9px] text-gray-550 block font-bold">({order.id})</span>
                        </div>
                        
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-1 gap-x-4 text-[11px] text-gray-400 font-sans">
                          <div>
                            <span className="text-gray-500">Titular VIP:</span> <strong className="text-gray-300 font-sans font-medium">{order.clientName}</strong>
                          </div>
                          <div>
                            <span className="text-gray-500">Especialista:</span> <strong className="text-amber-brand font-mono font-medium">{order.mechanic}</strong>
                          </div>
                          <div className="col-span-2 lg:col-span-1">
                            <span className="text-gray-500">Bahía:</span> <strong className="text-gray-300 font-mono font-medium">{order.booth}</strong>
                          </div>
                        </div>

                        {/* Progress slider bar dynamic */}
                        <div className="pt-2.5 flex items-center gap-3">
                          <div className="w-full bg-[#1A1A1A] h-1.5 rounded-full overflow-hidden border border-[#262626]/50 relative">
                            <div 
                              className="h-full bg-gradient-to-r from-amber-brand/80 to-[#FDC003] transition-all duration-500" 
                              style={{ width: `${order.progress}%` }}
                            ></div>
                          </div>
                          <span className="font-mono text-[10px] text-gray-400 font-bold shrink-0 min-w-[28px] text-right">
                            {order.progress}%
                          </span>
                        </div>
                      </div>

                      {/* Right actions and statuses */}
                      <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto shrink-0 md:pt-0 pt-3 border-t md:border-t-0 border-[#262626] bg-transparent">
                        
                        {/* Status badge */}
                        <span className={`px-2.5 py-1 text-[9px] font-mono font-bold rounded-lg border uppercase tracking-wider block ${statusConfig.bg}`}>
                          {statusConfig.label}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => advanceStatus(order.id)}
                            className="bg-amber-brand/5 border border-amber-brand/15 text-amber-brand hover:bg-amber-brand hover:text-black hover:border-transparent px-3 py-1.5 rounded-lg font-mono text-[10px] font-black uppercase tracking-tight duration-300 transition-colors flex items-center gap-1 cursor-pointer"
                            title="Avanzar Máquina a Siguiente Etapa en Pits"
                          >
                            <RefreshCw className="w-3 h-3 text-inherit animate-spin-hover" />
                            Avanzar
                          </button>

                          <button
                            onClick={() => deleteOrder(order.id, order.clientName)}
                            className="p-1.5 text-zinc-650 hover:text-red-500 hover:bg-red-500/10 rounded-lg duration-300 transition-all border border-transparent hover:border-red-500/20 cursor-pointer"
                            title="Remover Vehículo del Taller"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                      </div>

                    </div>
                  );
                })}
              </div>
            )}

            <div className="bg-[#0E0E0E] border border-amber-brand/10 p-4 rounded-xl text-left">
              <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
                💡 <strong>Consejo de flujo de pits:</strong> Al pulsar el botón <strong>"Avanzar"</strong> el vehículo avanzará automáticamente por el proceso: <strong>Cola ➔ Criolimpieza ➔ Pulido ➔ Cerámico ➔ Horno UV ➔ Despachado</strong> actualizando la telemetría asociada.
              </p>
            </div>

          </div>

        </div>

        {/* Bento Grid Layer 2: Telemetry controls & environmental factors */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Card 3: UV Lamp Curing Cabin (6 columns) */}
          <div className="lg:col-span-6 bg-[#1A1A1A] border border-[#262626] rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-xl text-left">
            
            <div className="space-y-1.5">
              <span className="font-mono text-[9px] text-amber-brand font-bold tracking-widest block uppercase">CALEFACCIÓN & PROTECCIÓN NANO</span>
              <h3 className="font-display text-xl font-extrabold text-white uppercase tracking-tight">TELEMETRÍA CABINA DE CURADO</h3>
              <p className="text-xs text-gray-405 font-sans leading-relaxed">
                Regula la intensidad fotoeléctrica de las lámparas de espectro UV y vigila el rango de fijación molecular.
              </p>
            </div>

            <div className="space-y-6 py-2">
              {/* Slider 1: UV lamp emission power */}
              <div className="space-y-2">
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-gray-400 font-sans">Potencia de Emisión Lámpara UV</span>
                  <span className="text-amber-brand font-black font-mono">{uvIntensity}% potencia</span>
                </div>
                
                <input 
                  type="range"
                  min="0"
                  max="100"
                  value={uvIntensity}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setUvIntensity(val);
                    if (val > 90) {
                      setPostHeatTemp(Math.min(120, postHeatTemp + 2));
                    } else if (val < 30) {
                      setPostHeatTemp(Math.max(30, postHeatTemp - 2));
                    }
                  }}
                  className="w-full accent-amber-brand cursor-ew-resize py-2 h-1 bg-[#0E0E0E] rounded-lg border-none"
                  aria-label="Potencia de Emisión de Lámparas UV"
                />

                <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                  <span>Inactiva (0%)</span>
                  <span>Fijación Templada (50%)</span>
                  <span>Acelerador Térmico (100%)</span>
                </div>
              </div>

              {/* Slider 2: Wrapped Post-heat Temp */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-gray-400 font-sans">Temperatura de Curado Soplada</span>
                  <span className={`font-black font-mono ${Math.abs(postHeatTemp - 90) <= 5 ? 'text-emerald-400' : 'text-amber-brand'}`}>
                    {postHeatTemp}°C
                  </span>
                </div>

                <input 
                  type="range"
                  min="30"
                  max="120"
                  value={postHeatTemp}
                  onChange={(e) => setPostHeatTemp(Number(e.target.value))}
                  className="w-full accent-[#FDC003] cursor-ew-resize py-2 h-1 bg-[#0E0E0E] rounded-lg border-none"
                  aria-label="Temperatura de Curado de Post Calentamiento"
                />

                {/* Display plastic memory response */}
                <div className="bg-[#0E0E0E] border border-[#262626] p-4 rounded-xl flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <span className="text-[9px] text-gray-500 block uppercase font-mono">Respuesta Estructural Vinilo Wrap</span>
                    <span className="text-[11px] text-white block font-sans leading-snug">
                      {postHeatTemp < 60 && "⚠️ Temperatura baja: El vinilo mantiene tensiones residuales de estiramiento."}
                      {postHeatTemp >= 60 && postHeatTemp < 85 && "⚙️ Rango medio: Adhesión moderada de microcanales de salida."}
                      {postHeatTemp >= 85 && postHeatTemp <= 95 && "🔥 Óptimo: 90°C alcanzado para rotura física de memoria de fundición."}
                      {postHeatTemp > 95 && "🚨 Temperatura de peligro: Riesgo de deformación y quemaduras superficiales."}
                    </span>
                  </div>
                  
                  {/* Status Indicator circle light */}
                  <div className={`w-3.5 h-3.5 rounded-full shrink-0 shadow-lg ${
                    postHeatTemp < 60 ? 'bg-amber-500/80' : 
                    (postHeatTemp >= 85 && postHeatTemp <= 95) ? 'bg-emerald-400 shadow-emerald-400/25 animate-pulse' : 
                    postHeatTemp > 95 ? 'bg-red-500' : 'bg-[#E07A5F]'
                  }`}></div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 pt-4 border-t border-[#262626]/80">
              <span>Sensor: Carbon-Shell UV-3</span>
              <span className="text-emerald-400 font-bold">CALIBRACIÓN EXCELENTE</span>
            </div>

          </div>

          {/* Card 4: Environmental indicators & PM2.5 Purge (6 columns) */}
          <div className="lg:col-span-6 bg-[#1A1A1A] border border-[#262626] rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-xl text-left">
            
            <div className="space-y-1.5">
              <span className="font-mono text-[9px] text-amber-brand font-bold tracking-widest block uppercase">ATMÓSFERA LIBRE DE POLVO</span>
              <h3 className="font-display text-xl font-extrabold text-white uppercase tracking-tight">SALUD DE AIRE & FLUIDO CO2</h3>
              <p className="text-xs text-gray-405 font-sans leading-relaxed">
                Controla la pureza ambiental del gabinete de pintura para evitar motas, y recarga gas criogénico para limpieza a presión.
              </p>
            </div>

            <div className="space-y-6 py-2">
              
              {/* Air Filter PM2.5 Gauge bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-400 font-sans">Pureza Sello de Aire HEPA H13</span>
                  <span className="text-[#2EC4B6] font-bold">{filterProgress}% Estéril</span>
                </div>

                <div className="h-6 w-full bg-[#0E0E0E] rounded-xl overflow-hidden border border-[#262626] p-1 relative flex items-center justify-center">
                  <div 
                    className="h-full bg-gradient-to-r from-[#2EC4B6]/30 to-[#2EC4B6]/80 rounded-lg absolute left-1 transition-all duration-1000"
                    style={{ width: `calc(${filterProgress}% - 8px)` }}
                  ></div>
                  <span className="relative z-10 text-[9px] font-mono text-white font-black uppercase tracking-wider">
                    {filterPurgeActive ? 'PURGANDO MOTAS DE POLVO...' : 'Flujo Laminar Seguro'}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-[10px] text-gray-500 font-sans">Partículas suspendidas menores a 0.3 micras.</span>
                  
                  <button
                    onClick={triggerFilterPurge}
                    disabled={filterPurgeActive}
                    className="px-4 py-2 bg-[#2ec4b6]/10 hover:bg-[#2ec4b6]/25 disabled:bg-gray-800 border border-[#2ec4b6]/30 hover:border-[#2ec4b6]/50 rounded-lg text-xs font-mono font-bold text-[#2ec4b6] disabled:text-gray-500 transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-inherit ${filterPurgeActive ? 'animate-spin' : ''}`} />
                    FORZAR PURGA
                  </button>
                </div>
              </div>

              {/* CO2 Tank Criolimpieza Volume Indicator */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-400 font-sans">Tanque Recipiente de CO2 Líquido (Criolimpieza)</span>
                  <span className="text-[#3A86C8] font-bold">{co2LiquidPercent}% Volumen</span>
                </div>

                {/* Progress-shape container representing tank level */}
                <div className="h-4 bg-[#0E0E0E] rounded-full overflow-hidden border border-[#262626] relative">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-700 to-cyan-500 shadow-md transition-all duration-700"
                    style={{ width: `${co2LiquidPercent}%` }}
                  ></div>
                  {co2Recharging && (
                    <div className="absolute inset-0 bg-white/5 animate-pulse flex items-center justify-center">
                      <span className="text-[8px] text-white font-mono tracking-widest font-bold">CARGANDO RECEPTÁCULO CRYO...</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-4">
                  <p className="text-[10px] text-gray-500 font-sans">Fiel a limpieza en pasantes de motor a -78.5°C.</p>
                  
                  <button
                    onClick={triggerCo2Recharge}
                    disabled={co2Recharging || co2LiquidPercent === 100}
                    className="px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 disabled:bg-gray-800 border border-blue-500/30 rounded-lg text-xs font-mono font-bold text-blue-400 disabled:text-gray-500 transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                  >
                    <Sliders className="w-3.5 h-3.5 text-inherit" />
                    RECARGAR CO2
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Bento Grid Layer 3: Live operator log feed & chat announcements */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8">
          
          <div className="bg-[#1A1A1A] border border-[#262626] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl text-left">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="font-mono text-[9px] text-amber-brand font-bold tracking-widest block uppercase">LOG DEL VAULT CHILE</span>
                <h3 className="font-display text-xl font-extrabold text-white uppercase tracking-tight">BITÁCORA EN DIRECTO</h3>
              </div>

              {/* Operator announcement insertion form */}
              <form onSubmit={postCustomLog} className="flex gap-2 w-full sm:w-auto max-w-sm">
                <input
                  type="text"
                  required
                  value={newLogText}
                  onChange={(e) => setNewLogText(e.target.value)}
                  placeholder="Insertar anuncio del operador..."
                  className="bg-[#0E0E0E] border border-[#262626] rounded-xl px-4 py-2.5 text-xs text-white uppercase placeholder-gray-600 focus:outline-none focus:border-amber-brand font-sans min-w-[200px]"
                />
                
                {/* Submit log */}
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-gradient-to-r from-[#FFD16C] to-[#FDC003] text-black font-semibold text-xs font-mono rounded-xl uppercase tracking-wider shadow-lg hover:brightness-105 active:scale-95 transition-all cursor-pointer shrink-0"
                >
                  PUBLICAR LOG
                </button>
              </form>
            </div>

            <div className="bg-[#0E0E0E] border border-[#262626] rounded-xl p-5 font-mono text-[11px] sm:text-xs text-gray-400 leading-relaxed max-h-[180px] overflow-y-auto space-y-2.5 select-all">
              {logs.map((logLine, idx) => {
                let textClass = "text-gray-400";
                if (logLine.includes("[OPERADOR]")) {
                  textClass = "text-amber-brand font-semibold";
                } else if (logLine.includes("nuevo vehículo") || logLine.includes("Federico")) {
                  textClass = "text-[#FFD16C]";
                } else if (logLine.includes("curado cerámico") || logLine.includes("Garantía")) {
                  textClass = "text-[#2EC4B6]";
                }
                
                return (
                  <div key={idx} className={`border-b border-[#262626]/30 pb-2 bg-transparent ${textClass}`}>
                    {logLine}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono pt-4 border-t border-[#262626]/40">
              <span>Conexión de terminal: Bullycars-Connect-Centralizer</span>
              <span className="text-emerald-400">LATENCIA 4ms • EN CORRIENTE</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
