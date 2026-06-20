import React, { useState, useRef, useEffect } from 'react';
import { Product, CartItem, Message } from '../types';
// @ts-ignore
import ceramicCoatingImg from '../assets/images/regenerated_image_1781135734318.png';
// @ts-ignore
const viniloPremiumImg = 'https://motor.elpais.com/wp-content/uploads/2023/04/Exterior-Hatsune-Miku.jpg';
// @ts-ignore
import knifelessTapeImg from '../assets/images/regenerated_image_1781136937571.jpg';
// @ts-ignore
import clayBarImg from '../assets/images/regenerated_image_1781136586949.jpg';
// @ts-ignore
import quickDetailerImg from '../assets/images/regenerated_image_1779600402364.webp';
const heatGunImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTycT-7NUoVc1pC_4gc3DEHth0cH03_ni0f-Q&s';
const squeegeeImg = 'https://cl-cenco-pim-resizer.ecomm.cencosud.com/unsafe/adaptive-fit-in/3840x0/filters:quality(75)/prd-cl/product-medias/7d4c92d9-9549-49db-b3c4-4cc7ac432e3b/MKW47EBFW7/MKW47EBFW7-1/1774916662636-MKW47EBFW7-1-3.png';
// @ts-ignore
import brakePadsImg from '../assets/images/regenerated_image_1779600459925.png';
// @ts-ignore
import brakeRotorsImg from '../assets/images/regenerated_image_1779600547298.png';
import { 
  ShieldAlert, Sparkles, Send, Loader2, 
  Wrench, Package, Cpu, ShoppingBag, Plus, Trash2, 
  CheckCircle2, ToggleLeft, ToggleRight,
  Award, FileText, Car
} from 'lucide-react';

const formatCLP = (value: number) => {
  return `$${Math.round(value).toLocaleString('es-CL')}`;
};

interface AccessoriesViewProps {
  cart?: CartItem[];
  setCart?: React.Dispatch<React.SetStateAction<CartItem[]>>;
  activeSubtab?: 'bot' | 'insumos' | 'herramientas' | 'repuestos' | 'detaling' | 'presupuesto';
  setActiveSubtab?: React.Dispatch<React.SetStateAction<'bot' | 'insumos' | 'herramientas' | 'repuestos' | 'detaling' | 'presupuesto'>>;
}

export default function AccessoriesView({
  cart: externalCart,
  setCart: externalSetCart,
  activeSubtab: externalActiveSubtab,
  setActiveSubtab: externalSetActiveSubtab
}: AccessoriesViewProps = {}) {
  // Profiles: 'ENTUSIASTA' or 'PROFESIONAL'
  const [profile, setProfile] = useState<'ENTUSIASTA' | 'PROFESIONAL'>('ENTUSIASTA');

  // Internal fallback states
  const [localActiveSubtab, localSetActiveSubtab] = useState<'bot' | 'insumos' | 'herramientas' | 'repuestos' | 'detaling' | 'presupuesto'>('bot');
  const [localCart, localSetCart] = useState<CartItem[]>([]);

  // Resolve whether to use external or internal states
  const activeSubtab = externalActiveSubtab !== undefined ? externalActiveSubtab : localActiveSubtab;
  const setActiveSubtab = externalSetActiveSubtab !== undefined ? externalSetActiveSubtab : localSetActiveSubtab;
  const cart = externalCart !== undefined ? externalCart : localCart;
  const setCart = externalSetCart !== undefined ? externalSetCart : localSetCart;

  // Modal to display product added to budget
  const [addedProduct, setAddedProduct] = useState<Product | null>(null);

  // Form for booking training calendar
  const [showTrainingModal, setShowTrainingModal] = useState(false);
  const [trainingDate, setTrainingDate] = useState('');
  const [trainingName, setTrainingName] = useState('');
  const [trainingEmail, setTrainingEmail] = useState('');
  const [trainingSuccess, setTrainingSuccess] = useState(false);

  // Chat BullyBot states
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: '¡Saludos, as del volante y la laca! 🏎️💨 Soy **BullyBot**, tu copiloto de ingeniería técnica. Estoy memorizado con todas las fichas técnicas del Vault.\n\n¿Tienes alguna duda sobre **curado de Ceramic Coatings**, **dilatación térmica de vinilos fundidos a 90°C**, o la **alineación geométrica de suspensión mangueta** de tu deportivo? Pregúntame, y te daré el fundamento científico al instante.',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isBotThinking, setIsBotThinking] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll chat to bottom ONLY inside the message container, preventing window jumps
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isBotThinking]);

  // Product Database matching requested new bento structure
  const products: Product[] = [
    {
      id: 'vinilo-premium',
      name: 'Vinilo Premium',
      description: 'Estilo deportivo de alta adherencia.',
      category: 'insumos',
      img: viniloPremiumImg,
      priceEntusiasta: 249990,
      priceProfesional: 179990,
      details: [
        'Espesor de 150 micras termoformable',
        'Acabado ultra-gloss de alta estabilidad',
        'Adhesivo acrílico reposicionable con microcanales'
      ]
    },
    {
      id: 'cinta-corte',
      name: 'Cinta de Corte Knifeless',
      description: 'Corta el vinilo sin tocar la pintura.',
      category: 'insumos',
      img: knifelessTapeImg,
      priceEntusiasta: 39990,
      priceProfesional: 26990,
      details: [
        'Filamento de alta resistencia a la tracción',
        'Contornea bordes complejos sin esfuerzo',
        'Garantía de cero rayaduras en laca original'
      ]
    },
    {
      id: 'clay-bar',
      name: 'Barra de Arcilla Clay Bar',
      description: 'Deja la pintura suave como un cristal.',
      category: 'insumos',
      img: clayBarImg,
      priceEntusiasta: 29990,
      priceProfesional: 19990,
      details: [
        'Contaminación férrica y ambiental eliminada al 100%',
        'No abrasivo, grado medio de grano fino',
        'Rinde hasta 12 aplicaciones completas'
      ]
    },
    {
      id: 'pistola-calor',
      name: 'Soplador Pistola de Calor',
      description: 'Moldea materiales como un maestro.',
      category: 'herramientas',
      img: heatGunImg,
      priceEntusiasta: 99990,
      priceProfesional: 69990,
      details: [
        'Temperatura ajustable de 50°C a 650°C',
        'Boquillas de desviación cónica calibradas',
        'Flujo de aire constante optimizado para Cast Film'
      ]
    },
    {
      id: 'espatula-fieltro',
      name: 'Kit de Espátulas de Fieltro',
      description: 'Cero burbujas, acabados perfectos.',
      category: 'herramientas',
      img: squeegeeImg,
      priceEntusiasta: 19990,
      priceProfesional: 12990,
      details: [
        'Protectores de fieltro de microfibra reemplazables',
        'Espátulas ergonómicas con durezas duales',
        'Perfecto deslizamiento en seco o húmedo'
      ]
    },
    {
      id: 'pastillas-freno',
      name: 'Pastillas de Freno de Disco',
      description: 'Frenado preciso y seguro.',
      category: 'repuestos',
      img: brakePadsImg,
      priceEntusiasta: 159990,
      priceProfesional: 109990,
      details: [
        'Coeficiente de fricción altamente stable',
        'Fricción de compuesto cerámico con bajo desvanecimiento',
        'Cero chirridos, menor suspensión de polvo negro'
      ]
    },
    {
      id: 'discos-ranurados',
      name: 'Discos Ranurados',
      description: 'Mayor ventilación para exigencia extrema.',
      category: 'repuestos',
      img: brakeRotorsImg,
      priceEntusiasta: 299990,
      priceProfesional: 219990,
      details: [
        'Ranurado direccional que expulsa agua y gases',
        'Fundición de carbono de alta conductividad térmica',
        'Reduce la temperatura de operación en 80°C'
      ]
    },
    {
      id: 'ceramic-coating',
      name: 'Ceramic Coating',
      description: 'El escudo invisible definitivo.',
      category: 'detailing',
      img: ceramicCoatingImg,
      priceEntusiasta: 89990,
      priceProfesional: 59990,
      details: [
        'Formación de película sólida SiO2 de dureza 9H',
        'Sello hidrofóbico permanente con brillo cristal',
        'Resistencia química severa (pH 2 a pH 12)'
      ]
    },
    {
      id: 'quick-detailer',
      name: 'Quick Detailer con Grafeno',
      description: 'Efecto espejo en 5 minutos.',
      category: 'detailing',
      img: quickDetailerImg,
      priceEntusiasta: 34990,
      priceProfesional: 23990,
      details: [
        'Infusión con óxido de grafeno de acción instantánea',
        'Profundidad de color espectacular en lacas oscuras',
        'Protección antiestática que reduce polvo asentado'
      ]
    }
  ];

  // Helper functions for shopping cart and calculators
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (pId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== pId));
  };

  const updateQuantity = (pId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(pId);
      return;
    }
    setCart(prev => prev.map(item => item.product.id === pId ? { ...item, quantity: qty } : item));
  };

  const clearCart = () => setCart([]);

  const subtotalCart = cart.reduce((acc, item) => {
    const price = profile === 'PROFESIONAL' ? item.product.priceProfesional : item.product.priceEntusiasta;
    return acc + (price * item.quantity);
  }, 0);

  const taxCart = subtotalCart * 0.19; // 19% IVA
  const totalCart = subtotalCart + taxCart;

  // ChatGPT API / Gemini Mock simulation backend call
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isBotThinking) return;

    const userMsg: Message = {
      sender: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsBotThinking(true);

    // Call simulated technical advice
    setTimeout(() => {
      let responseText = '';
      const query = userMsg.text.toLowerCase();

      if (query.includes('coat') || query.includes('ceramico') || query.includes('vidrio') || query.includes('silice')) {
        responseText = 'El **Ceramic Coating 9H Guard-Armor** es un compuesto molecular basado en dióxido de silicio (SiO2). Al aplicarse sobre el barniz de la máquina:\n\n• Genera una capa de cristales fluidos con un espesor de 1.5 a 2.0 micras.\n• Su ángulo de contacto con el agua es de 115°, produciendo un efecto súper-hidrofóbico.\n• **Recomendación técnica del Vault:** Deja curar el barniz por 24 horas a temperatura ambiente antes de rodar bajo la lluvia, o acelera el ciclo con lámparas infrarrojas a 60°C por 40 minutos.';
      } else if (query.includes('vinyl') || query.includes('wrap') || query.includes('vinilo') || query.includes('estirar')) {
        responseText = 'La instalación de **Premium Stealth Matte Wrap (Cast Film)** requiere un control termodinámico riguroso:\n\n• Su rango de estiramiento plástico óptimo ocurre entre los 45°C y 55°C utilizando la **Heat Gun Pro 3000**.\n• Recuerda realizar el postcalentamiento de memoria plástica a **90°C exactos** en todos los cantos y rebordes de la chapa. De lo contrario, las tensiones residuales provocarán levantamientos de material pasadas las 72 horas.';
      } else if (query.includes('freno') || query.includes('pasto') || query.includes('pastillas') || query.includes('calzar')) {
        responseText = 'Las pastillas de fricción **Carbon-Ceramic Brem-X** están formuladas para soportar temperaturas extremas:\n\n• Combina fibras de carbono hilado estructural con matriz cerámica para eliminar el desvanecimiento térmico (fading).\n• Requiere un proceso de asentamiento (bedding) inicial: realizar 10 deceleraciones consecutivas de 80 km/h a 20 km/h con presión uniforme, seguidas de un rodaje templado frío.';
      } else if (query.includes('precio') || query.includes('descuento') || query.includes('valor')) {
        responseText = `Actualmente estás navegando con el perfil **${profile}**.\n\n• Los entusiastas compran de forma unitaria con tarifa regular.\n• Los profesionales acumulan precios bulk con descuentos del 20% al 35% en rollos y bidones de sellado. Si deseas simular precios mayoristas, simplemente pulsa sobre el switch deslizable superior.`;
      } else {
        responseText = 'Excelente consulta técnica automotriz. En el Vault controlamos rigurosamente cada parámetro mecánico:\n\n• **Dureza Mecánica:** Empleamos sustratos probados con ensayos de dureza de lápiz ISO15184.\n• **Fijación Óptica:** El brillo se sella laca a laca impidiendo rayas de lavado.\n\n¿Deseas que simulemos el presupuesto de estos insumos de grado aeroespacial para el VIN de tu deportivo?';
      }

      setMessages(prev => [...prev, {
        sender: 'bot',
        text: responseText,
        timestamp: new Date()
      }]);
      setIsBotThinking(false);
    }, 1200);
  };

  const handleTrainingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trainingName || !trainingEmail || !trainingDate) return;

    setTrainingSuccess(true);
    setTimeout(() => {
      setShowTrainingModal(false);
      setTrainingSuccess(false);
      setTrainingName('');
      setTrainingEmail('');
      setTrainingDate('');
    }, 4500);
  };

  // Filter products by active tab
  const filteredProducts = activeSubtab === 'insumos' || activeSubtab === 'herramientas' || activeSubtab === 'repuestos' || activeSubtab === 'detaling'
    ? products.filter(p => p.category === (activeSubtab === 'detaling' ? 'detailing' : activeSubtab))
    : products;

  return (
    <div className="bg-[#0b0c0e] text-white min-h-screen py-16 lg:py-24 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner header and toggle */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-8 border-b border-[#1f2228] mb-10">
          <div className="space-y-2">
            <span className="font-mono text-xs font-bold text-amber-brand tracking-wider block">ALMACÉN DE INSUMOS & SOPORTE DIGITAL</span>
            <h1 className="text-3xl sm:text-4xl font-black font-display uppercase tracking-tight text-white leading-none">ACCESORIOS</h1>
            <p className="text-gray-400 text-xs sm:text-sm font-sans max-w-xl">
              Equípate con los mismos componentes químicos y herramientas de soplado que empleamos en el Vault, optimizado por nuestro recomendador técnico.
            </p>
          </div>

          {/* PROFESIONAL TOGGLE */}
          <div className="bg-[#121418] border border-[#23272e] rounded-2xl p-4 flex items-center justify-between gap-6 shrink-0 shadow-lg relative overflow-hidden group">
            {/* Ambient indicator */}
            <div className={`absolute top-0 right-0 w-2 h-full ${profile === 'PROFESIONAL' ? 'bg-[#FFD16C]' : 'bg-emerald-500'}`}></div>

            <div className="space-y-1.5 max-w-[170px]">
              <span className="font-mono text-[9px] text-gray-400 block font-bold">TIPO DE MEMBRESÍA</span>
              <span className="font-mono text-xs font-black text-white block uppercase leading-none">
                {profile === 'PROFESIONAL' ? '👨‍🔧 PRO / DISTRIBUIDOR' : '🏎️ ENTUSIASTA AUTOMOTRIZ'}
              </span>
              <span className="text-[9px] text-gray-400 block font-sans">
                {profile === 'PROFESIONAL' ? 'Precios bulk y distribución' : 'Tarifa regular de taller'}
              </span>
            </div>

            <button
              onClick={() => {
                const newProfile = profile === 'ENTUSIASTA' ? 'PROFESIONAL' : 'ENTUSIASTA';
                setProfile(newProfile);
                setMessages(prev => [...prev, {
                  sender: 'bot',
                  text: `🔄 **Membresía modificada:** He recalculado todas las tarifas del catálogo a tu nuevo perfil de tipo **${newProfile}**. ¡Suma insumos en tu presupuesto y aprovecha el descuento!`,
                  timestamp: new Date()
                }]);
              }}
              className="text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              {profile === 'PROFESIONAL' ? (
                <ToggleRight className="w-12 h-12 text-[#FFD16C]" />
              ) : (
                <ToggleLeft className="w-12 h-12 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Catalog layout structure (Sidebar navigation + Main display area) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Area (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-mono text-[10px] text-gray-500 uppercase tracking-widest px-3">CATEGORÍAS DE ALMACÉN</h3>
            
            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => setActiveSubtab('bot')}
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-mono text-xs font-bold transition-all text-left border cursor-pointer ${
                  activeSubtab === 'bot'
                    ? 'bg-amber-brand/10 text-amber-brand border-[#FFD16C]/40 shadow-sm'
                    : 'bg-[#121418] border-[#21242a] text-gray-400 hover:text-white hover:bg-[#1a1c22]'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 shrink-0 text-amber-brand" />
                  Asistente BullyBot AI
                </span>
                <span className="text-[8px] bg-red-500 text-white px-1.5 py-0.5 rounded-full animate-pulse">LIVE</span>
              </button>

              <button
                onClick={() => setActiveSubtab('insumos')}
                className={`flex items-center gap-2 px-4 py-3.5 rounded-xl font-mono text-xs font-bold transition-all text-left border cursor-pointer ${
                  activeSubtab === 'insumos'
                    ? 'bg-amber-brand/10 text-amber-brand border-[#FFD16C]/40'
                    : 'bg-[#121418] border-[#21242a] text-gray-400 hover:text-white hover:bg-[#1a1c22]'
                }`}
              >
                <Package className="w-4 h-4 shrink-0" />
                Insumos
              </button>

              <button
                onClick={() => setActiveSubtab('herramientas')}
                className={`flex items-center gap-2 px-4 py-3.5 rounded-xl font-mono text-xs font-bold transition-all text-left border cursor-pointer ${
                  activeSubtab === 'herramientas'
                    ? 'bg-amber-brand/10 text-amber-brand border-[#FFD16C]/40'
                    : 'bg-[#121418] border-[#21242a] text-gray-400 hover:text-white hover:bg-[#1a1c22]'
                }`}
              >
                <Wrench className="w-4 h-4 shrink-0" />
                Herramientas
              </button>

              <button
                onClick={() => setActiveSubtab('repuestos')}
                className={`flex items-center gap-2 px-4 py-3.5 rounded-xl font-mono text-xs font-bold transition-all text-left border cursor-pointer ${
                  activeSubtab === 'repuestos'
                    ? 'bg-amber-brand/10 text-amber-brand border-[#FFD16C]/40'
                    : 'bg-[#121418] border-[#21242a] text-gray-400 hover:text-white hover:bg-[#1a1c22]'
                }`}
              >
                <ShoppingBag className="w-4 h-4 shrink-0" />
                Repuestos
              </button>

              <button
                onClick={() => setActiveSubtab('detaling')}
                className={`flex items-center gap-2 px-4 py-3.5 rounded-xl font-mono text-xs font-bold transition-all text-left border cursor-pointer ${
                  activeSubtab === 'detaling'
                    ? 'bg-amber-brand/10 text-amber-brand border-[#FFD16C]/40'
                    : 'bg-[#121418] border-[#21242a] text-gray-400 hover:text-white hover:bg-[#1a1c22]'
                }`}
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                Detonantes de Brillo
              </button>

              <button
                onClick={() => setActiveSubtab('presupuesto')}
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-mono text-xs font-bold transition-all text-left border cursor-pointer ${
                  activeSubtab === 'presupuesto'
                    ? 'bg-amber-brand/15 text-amber-brand border-amber-brand/80 shadow-[0_0_15px_rgba(255,209,108,0.2)] font-black'
                    : cart.length > 0
                      ? 'bg-[#181a20] border-amber-brand text-amber-brand hover:bg-[#20242d] hover:text-white hover:border-[#FFD16C] shadow-[0_0_12px_rgba(255,209,108,0.25)] animate-pulse'
                      : 'bg-[#121418] border-[#21242a] text-gray-400 hover:text-white hover:bg-[#1a1c22]'
                }`}
              >
                <span className="flex items-center gap-2 font-outfit uppercase tracking-wider text-xs">
                  <Car className="w-4 h-4 shrink-0 text-amber-brand" />
                  Presupuesto Final {cart.length > 0 && '🛒'}
                </span>
                {cart.length > 0 ? (
                  <span className="text-[10px] bg-red-650 bg-rose-600 text-white rounded-full w-5 h-5 flex items-center justify-center font-black animate-bounce shadow">
                    {cart.reduce((a, b) => a + b.quantity, 0)}
                  </span>
                ) : (
                  null
                )}
              </button>
            </div>

            {/* Quick mini budget summary with high visibility pro decoration */}
            {cart.length > 0 && activeSubtab !== 'presupuesto' && (
              <div className="bg-[#121418] border-2 border-amber-brand rounded-2xl p-5 mt-6 space-y-4 shadow-xl relative overflow-hidden transition-all hover:border-[#FFD16C]">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-amber-brand to-transparent"></div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                    <span className="font-outfit text-[10px] text-[#FFD16C] block uppercase font-extrabold tracking-wider">COTIZACIÓN EN CURSO</span>
                  </div>
                  <span className="bg-amber-brand/10 text-amber-brand text-[9px] font-mono px-2 py-0.5 rounded-full font-bold">
                    {cart.reduce((a, b) => a + b.quantity, 0)} Art.
                  </span>
                </div>
                <div className="space-y-2 pt-1">
                  <div className="flex justify-between font-outfit text-xs border-b border-[#21242a] pb-2">
                    <span className="text-gray-400 uppercase">Total Estimado</span>
                    <span className="text-[#FFD16C] font-black text-sm">{formatCLP(totalCart)}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setActiveSubtab('presupuesto');
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  className="w-full py-3 bg-gradient-to-r from-amber-brand to-[#FFD16C] hover:brightness-110 active:scale-95 text-black font-outfit text-xs font-black rounded-xl uppercase tracking-wider cursor-pointer transition-all duration-300 shadow-lg hover:shadow-amber-brand/35 flex items-center justify-center gap-2"
                >
                  <span>VER DETALLE DEL CARRO</span>
                  <span className="text-xs">🛒</span>
                </button>
              </div>
            )}
          </div>

          {/* Main Display Area (9 cols) */}
          <div className="lg:col-span-9">
            
            {/* SUBTAB 1: BullyBot Assistant Panel */}
            {activeSubtab === 'bot' && (
              <div className="bg-[#121418] border border-[#22252c] rounded-3xl overflow-hidden shadow-xl flex flex-col h-[580px]">
                {/* Header chat banner info */}
                <div className="bg-[#191b22] px-6 py-4 border-b border-[#22252c] flex items-center justify-between bg-transparent">
                  <div className="flex items-center gap-3 bg-transparent">
                    <div className="w-10 h-10 rounded-xl bg-amber-brand/10 border border-amber-brand/20 flex items-center justify-center text-amber-brand">
                      <Cpu className="w-5 h-5 animate-pulse text-[#FFD16C]" />
                    </div>
                    <div>
                      <h4 className="font-mono text-sm font-bold text-white tracking-wide leading-tight">BULLYBOT ASSISTANT</h4>
                      <span className="font-mono text-[9px] text-emerald-400 block mt-0.5">
                        ● CONEXIÓN DIRECTA CON GEMINI FLASH AI
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-[10px] font-mono text-gray-500 max-w-[150px] hidden sm:block leading-tight text-right">
                    Perfil activo: <span className="text-[#FFD16C] font-bold">{profile}</span>
                  </div>
                </div>

                {/* Message logs viewport */}
                <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#0e1014]">
                  {messages.map((msg, index) => {
                    const isBot = msg.sender === 'bot';
                    return (
                      <div
                        key={index}
                        className={`flex gap-3 max-w-2xl ${isBot ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                      >
                        {/* Avatar */}
                        <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center font-mono text-xs font-black ${
                          isBot ? 'bg-amber-brand text-black' : 'bg-gradient-to-br from-gray-700 to-gray-900 border border-gray-600 text-white'
                        }`}>
                          {isBot ? 'BB' : 'ME'}
                        </div>

                        {/* Speech Bubble */}
                        <div className={`p-4 rounded-2xl border text-xs sm:text-sm font-sans leading-relaxed ${
                          isBot 
                            ? 'bg-[#171920] border-[#252832] text-gray-200 shadow-md whitespace-pre-line' 
                            : 'bg-amber-brand/10 border-amber-brand/20 text-[#FFD16C]'
                        }`}>
                          <div dangerouslySetInnerHTML={{
                            __html: msg.text
                              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                              .replace(/-(.*?)\n/g, '• $1\n')
                          }} />
                          
                          <span className="block text-[8px] text-gray-500 font-mono text-right mt-2 uppercase tracking-widest">
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  {/* Thinking Spinner */}
                  {isBotThinking && (
                    <div className="flex gap-3 mr-auto max-w-md items-center">
                      <div className="w-8 h-8 rounded-lg bg-amber-brand text-black flex items-center justify-center font-mono text-xs font-black shrink-0">
                        BB
                      </div>
                      <div className="bg-[#171920] border border-[#252832] p-4 rounded-2xl flex items-center gap-2 text-xs font-mono text-gray-400 shadow-md">
                        <Loader2 className="w-4 h-4 text-amber-brand animate-spin" />
                        <span>Ajustando torque cognitivo...</span>
                      </div>
                    </div>
                  )}

                  <div ref={chatBottomRef} />
                </div>

                {/* Input form */}
                <form onSubmit={handleSendMessage} className="p-4 bg-[#191b22] border-t border-[#22252c] flex gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Pregunta sobre micro-capas de SiO2, vinilos wraps o temperaturas de estirado..."
                    disabled={isBotThinking}
                    className="flex-1 bg-[#0b0c0e] border border-[#2d313a] rounded-xl px-4 py-3 text-xs sm:text-sm text-gray-300 focus:outline-none focus:border-amber-brand font-sans"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim() || isBotThinking}
                    className="px-4 py-3 bg-[#FFD16C] hover:bg-[#ffe094] disabled:bg-gray-800 disabled:text-gray-500 text-black font-black font-mono rounded-xl text-xs sm:text-sm flex items-center gap-1 cursor-pointer transition-all shrink-0"
                  >
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">ENVIAR</span>
                  </button>
                </form>
              </div>
            )}

            {/* SUBTAB 2: Custom Product Grid */}
            {activeSubtab !== 'bot' && activeSubtab !== 'presupuesto' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between bg-transparent">
                  <span className="font-outfit text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    FILTRADOS: {filteredProducts.length} productos
                  </span>
                  <div className="bg-[#14161c] border border-[#22252c] rounded-lg px-2.5 py-1 text-[10px] text-gray-400 font-mono">
                    MODO: <span className="text-[#FFD16C] font-semibold">{profile}</span>
                  </div>
                </div>

                {/* Product Layout Bento Grid with matte carbon background */}
                <div className="bg-[#0E0E0E] p-4 sm:p-6 lg:p-8 rounded-3xl border border-[#1f2228] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((p, index) => {
                    const price = profile === 'PROFESIONAL' ? p.priceProfesional : p.priceEntusiasta;
                    const oldPrice = profile === 'PROFESIONAL' ? p.priceEntusiasta : null;
                    const isSpecialProduct = p.id === 'ceramic-coating' || p.id === 'vinilo-premium';

                    // Construct asymmetric Bento spaces for visual rhythm
                    let bentoSpan = "col-span-1";
                    if (p.id === 'vinilo-premium') {
                      bentoSpan = "sm:col-span-2 lg:col-span-2";
                    }

                    return (
                      <div
                        key={p.id}
                        className={`glass-card glass-card-hover rounded-2.5xl overflow-hidden hover:border-amber-brand/40 flex flex-col justify-between group h-full ${bentoSpan}`}
                      >
                        <div>
                          {/* Image banner with high quality visuals */}
                          <div className={`relative ${p.id === 'vinilo-premium' ? 'aspect-video sm:aspect-[2.5/1]' : 'aspect-video'} bg-[#0b0c0e] overflow-hidden`}>
                            <img
                              src={p.img}
                              alt={p.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105 group-hover:brightness-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#121418] via-[#121418]/20 to-transparent"></div>
                            
                            {/* Pro membership tag overlay */}
                            {oldPrice && (
                              <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-amber-brand font-outfit text-[9px] font-extrabold uppercase text-black shadow-lg">
                                TARIFA PRO
                              </span>
                            )}
                          </div>

                          {/* Product detailed parameters using core styles */}
                          <div className="p-6 space-y-3.5">
                            <div className="space-y-1.5 text-left">
                              <span className="font-outfit text-[9px] font-bold text-amber-brand uppercase tracking-widest block">
                                {p.category === 'detailing' ? 'Detonantes de Brillo' : p.category}
                              </span>
                              <h4 className="font-outfit text-base sm:text-xl font-black text-white leading-tight tracking-tight uppercase">
                                {p.name}
                              </h4>
                              <p className="text-xs sm:text-sm text-gray-300 font-dmsans font-normal leading-relaxed opacity-90">
                                {p.description}
                              </p>
                            </div>

                            {/* Bullet specs list using DM Sans */}
                            <div className="space-y-1.5 pt-3 border-t border-[#1f2228]/80 text-left">
                              {p.details.map((detail, dindex) => (
                                <div key={dindex} className="flex items-start gap-2 text-[11px] sm:text-xs font-dmsans text-gray-400">
                                  <span className="inline-block w-1 h-1 rounded-full bg-amber-brand shrink-0 mt-1.5"></span>
                                  <span>{detail}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Price tier block paired with high hierarchy button */}
                        <div className="px-6 pb-6 pt-3 bg-transparent flex items-center justify-between border-t border-[#1f2228]/40 bg-radial-[#151a24] relative">
                          <div className="space-y-0.5 text-left">
                            {oldPrice && (
                              <span className="block text-[10px] sm:text-xs font-outfit text-gray-500 line-through">
                                {formatCLP(oldPrice)}
                              </span>
                            )}
                            <span className="text-base sm:text-lg font-outfit font-black text-white">
                              {formatCLP(price)}
                            </span>
                          </div>

                          {isSpecialProduct ? (
                            <button
                              onClick={() => {
                                addToCart(p);
                                setAddedProduct(p);
                              }}
                              className="px-4 py-2 bg-amber-brand hover:bg-[#ffe094] hover:shadow-lg hover:shadow-amber-brand/10 text-black font-outfit text-[11px] font-extrabold rounded-xl uppercase tracking-wider transition-all cursor-pointer border border-[#FFD16C]"
                            >
                              Solicitar Instalación
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                addToCart(p);
                                setAddedProduct(p);
                              }}
                              className="px-4 py-2 bg-amber-brand hover:bg-[#ffe094] hover:shadow-lg hover:shadow-amber-brand/10 text-black font-outfit text-[11px] font-extrabold rounded-xl uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 border border-[#FFD16C]"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              Añadir al Presupuesto
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SUBTAB 3: Heavy Calculator and Budget Summary View */}
            {activeSubtab === 'presupuesto' && (
              <div id="budget-section" className="bg-[#121418] border border-[#22252c] rounded-3xl p-6 sm:p-8 space-y-6 text-left">
                <div className="flex items-center justify-between border-b border-[#21242a] pb-4">
                  <h4 className="font-display text-base font-bold text-white uppercase tracking-tight">
                    SIMULADOR DE COTIZACIÓN FORMAL
                  </h4>
                  {cart.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="text-xs font-mono text-red-505 hover:text-red-400 flex items-center gap-1.5 bg-transparent border-none cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      LIMPIAR
                    </button>
                  )}
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <div className="w-12 h-12 rounded-full border border-dashed border-[#2d313a] flex items-center justify-center mx-auto text-gray-500">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <p className="text-sm text-gray-400 font-sans max-w-sm mx-auto">
                      Tu presupuesto está en cero. Añade algunos insumos premium o aditivos desde el catálogo para simular tus costos de importación y taller.
                    </p>
                    <button
                      onClick={() => setActiveSubtab('insumos')}
                      className="px-4 py-2 border border-[#2d313a] text-xs font-mono rounded-xl hover:border-amber-brand font-bold transition text-gray-200 cursor-pointer"
                    >
                      Navegar Catálogo
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Item lines list */}
                    <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-2">
                      {cart.map((item) => {
                        const price = profile === 'PROFESIONAL' ? item.product.priceProfesional : item.product.priceEntusiasta;
                        const rowTotal = price * item.quantity;
                        return (
                          <div
                            key={item.product.id}
                            className="bg-[#171920] border border-[#22252e] rounded-xl p-4 flex items-center justify-between gap-4 font-mono text-xs text-left animate-fade-in"
                          >
                            <div className="space-y-1">
                              <span className="block text-[9px] text-[#FFD16C] uppercase tracking-wider font-bold">{item.product.category}</span>
                              <span className="block font-sans text-sm font-bold text-white leading-snug">{item.product.name}</span>
                              <span className="block text-gray-500">Precio Unitario: {formatCLP(price)}</span>
                            </div>

                            <div className="flex items-center gap-4 shrink-0">
                              {/* Quantity controller buttons */}
                              <div className="flex items-center border border-[#2d313a] bg-[#0b0c0e] rounded-lg p-1 text-xs">
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                  className="px-2 py-0.5 text-gray-400 hover:text-white font-bold bg-transparent border-none cursor-pointer"
                                >
                                  -
                                </button>
                                <span className="px-2 font-bold text-white">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  className="px-2 py-0.5 text-gray-400 hover:text-white font-bold bg-transparent border-none cursor-pointer"
                                >
                                  +
                                </button>
                              </div>

                              <div className="text-right min-w-[70px]">
                                <span className="block font-black text-white">{formatCLP(rowTotal)}</span>
                                <button
                                  onClick={() => removeFromCart(item.product.id)}
                                  className="text-[10px] text-red-500 hover:text-red-400 underline uppercase block ml-auto mt-0.5 cursor-pointer bg-transparent border-none"
                                >
                                  Remover
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Numeric breakdown totals */}
                    <div className="border-t border-[#21242a] pt-6 space-y-3 font-mono text-xs text-gray-400">
                      <div className="flex justify-between">
                        <span>SUBTOTAL ESTIMADO</span>
                        <span className="text-white">{formatCLP(subtotalCart)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>IVA ADUANA & TALLER (19%)</span>
                        <span className="text-white">{formatCLP(taxCart)}</span>
                      </div>
                      <div className="flex justify-between text-sm border-t border-[#21242a]/60 pt-3 text-white font-black">
                        <span className="uppercase text-[#FFD16C]">PRESUNTIVO TOTAL ESTIMADO</span>
                        <span className="text-xl sm:text-2.5xl text-amber-brand">{formatCLP(totalCart)}</span>
                      </div>
                    </div>

                    {/* Submit Simulation Action Form code */}
                    <div className="bg-[#1a1d25] border border-amber-brand/10 p-5 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                      <p className="text-[10px] text-gray-400 leading-relaxed font-sans max-w-sm text-left">
                        Esta simulación genera una reserva de inventario temporal en el Vault por 48 horas bajo la tarifa <strong>{profile}</strong>. El staff automotriz revisará las compatibilidades con el chasis de tu auto.
                      </p>
                      
                      <button
                        onClick={() => {
                          alert(`¡Cotización generada con Éxito! Código: BC-PRE-${Math.floor(1000 + Math.random() * 9000)}-CL. Nos pondremos en contacto vía correo para verificar compatibilidades mecánicas.`);
                          clearCart();
                        }}
                        className="px-6 py-3 bg-[#FFD16C] hover:bg-[#ffe094] text-black font-mono text-xs font-black rounded-lg uppercase tracking-tight shrink-0 transition cursor-pointer"
                      >
                        EXPORTAR COTIZACIÓN
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Training Certificate Academy CTA Box */}
        <section className="mt-20 border-t border-[#1f2228] pt-16">
          <div className="bg-gradient-to-br from-[#121418] to-[#171a21] border border-amber-brand/10 p-8 lg:p-12 rounded-3xl relative overflow-hidden flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFD16C]/5 blur-3xl rounded-full pointer-events-none"></div>

            <div className="space-y-4 max-w-2xl text-left relative z-10">
              <span className="font-mono text-xs font-bold text-amber-brand uppercase tracking-widest block font-sans">
                BULLYCARS ACADEMY
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-white leading-tight font-display text-white">
                ¿Quieres certificarte en instalación Pro en el Vault?
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans leading-relaxed">
                Descubre los secretos mecánicos del postcalentamiento a 90°C, cortes por trazador sin contacto, corrección holográfica a tres componentes y aplicación perfecta de tratamientos cerámicos en nuestros workshops presenciales limitados dirigidos por ingenieros jefes.
              </p>
            </div>

            <div className="shrink-0 flex flex-wrap gap-3.5 relative z-10">
              <button
                onClick={() => setShowTrainingModal(true)}
                className="px-6 py-3.5 bg-amber-brand text-black font-mono text-xs font-black rounded-xl hover:bg-[#ffe094] transition cursor-pointer flex items-center gap-1.5 shadow-lg shadow-amber-brand/10"
              >
                <Award className="w-4 h-4 text-black" />
                RESERVAR TRAINING
              </button>
              <button
                onClick={() => alert('Calendario de Workshops Academy cargándose... Próxima sesión: Aplicación de Carbo-Shell 9H, Sábado 12 de Julio.')}
                className="px-6 py-3.5 border border-[#2d313a] hover:border-gray-500 text-gray-300 hover:text-white bg-[#121418] hover:bg-[#191b21] font-mono text-xs font-black rounded-xl transition cursor-pointer flex items-center gap-1.5"
              >
                <FileText className="w-4 h-4 text-amber-brand font-bold" />
                VER CALENDARIO
              </button>
            </div>
          </div>
        </section>

        {/* Training Registration Modal Dialog Box */}
        {showTrainingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#121418] border border-amber-brand/20 p-6 sm:p-8 rounded-3xl max-w-md w-full relative space-y-6">
              
              <div className="space-y-2 text-left">
                <span className="font-mono text-[9px] text-[#FFD16C] font-bold tracking-widest block uppercase">BULLYCARS TRAINING RESERVA</span>
                <h4 className="font-display text-lg font-black text-white uppercase leading-tight">RESERVA TU MATRÍCULA ACADÉMICA</h4>
                <p className="text-xs text-gray-400 font-sans leading-relaxed">
                  Completa tus datos profesionales para postular a una de las 8 vacantes exclusivas de nuestra clínica de instalación de vinilos wrap.
                </p>
              </div>

              {trainingSuccess ? (
                <div className="p-6 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <span className="block font-mono text-sm font-bold text-emerald-400">MATRÍCULA PRE-AUTORIZADA</span>
                  <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
                    Felicidades, te hemos enviado un instructivo en PDF para el Workshop de Detailing al correo. ¡Pisa a fondo!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleTrainingSubmit} className="space-y-4 text-left">
                  <div className="space-y-1 font-mono text-xs mt-0">
                    <label className="text-gray-400 font-medium">Nombre Completo</label>
                    <input
                      type="text"
                      required
                      value={trainingName}
                      onChange={(e) => setTrainingName(e.target.value)}
                      placeholder="Juan Pérez"
                      className="w-full bg-[#0b0c0e] border border-[#2d313a] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-brand font-sans"
                    />
                  </div>
                  
                  <div className="space-y-1 font-mono text-xs">
                    <label className="text-gray-400 font-medium">Correo Electrónico</label>
                    <input
                      type="email"
                      required
                      value={trainingEmail}
                      onChange={(e) => setTrainingEmail(e.target.value)}
                      placeholder="juan.perez@detailingchile.cl"
                      className="w-full bg-[#0b0c0e] border border-[#2d313a] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-brand font-sans"
                    />
                  </div>

                  <div className="space-y-1 font-mono text-xs">
                    <label className="text-gray-400 font-medium">Fecha Sugerida Workshop</label>
                    <input
                      type="date"
                      required
                      value={trainingDate}
                      onChange={(e) => setTrainingDate(e.target.value)}
                      className="w-full bg-[#0b0c0e] border border-[#2d313a] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-brand font-sans"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-3 font-mono text-xs">
                    <button
                      type="button"
                      onClick={() => setShowTrainingModal(false)}
                      className="h-11 px-4 border border-[#2d313a] rounded-xl text-gray-400 hover:text-white transition cursor-pointer"
                    >
                      CANCELAR
                    </button>
                    <button
                      type="submit"
                      className="h-11 px-5 bg-amber-brand hover:bg-[#ffe094] text-black font-black rounded-xl transition cursor-pointer"
                    >
                      SOLICITAR MATRÍCULA
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Custom Added Product Confirmation Modal */}
        {addedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
            <div className="bg-[#0E0E0E] p-6 sm:p-8 rounded-3xl max-w-md w-full relative text-center space-y-6 shadow-2xl border border-amber-brand/30">
              
              <div className="w-14 h-14 rounded-full bg-amber-brand/10 border border-amber-brand/30 flex items-center justify-center mx-auto text-amber-brand">
                <CheckCircle2 className="w-7 h-7 text-[#FFD16C]" />
              </div>

              <div className="space-y-2">
                <span className="font-outfit text-[9px] font-bold text-amber-brand uppercase tracking-widest block">
                  ALMACÉN COLD VAULT
                </span>
                <h4 className="font-outfit text-xl font-black text-white uppercase leading-tight tracking-tight">
                  ¡Agregado a tu Presupuesto!
                </h4>
                
                <div className="bg-[#121418] border border-[#1f2228] p-4 rounded-2xl text-left flex items-center gap-3.5 mt-3">
                  <img 
                    src={addedProduct.img} 
                    alt={addedProduct.name} 
                    className="w-12 h-12 object-cover rounded-lg shrink-0 border border-[#2d313a]" 
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="block text-[8px] font-outfit text-amber-brand uppercase tracking-wider font-extrabold">
                      {addedProduct.category === 'detailing' ? 'Detonantes de Brillo' : addedProduct.category}
                    </span>
                    <span className="block font-outfit text-sm font-black text-white leading-snug">
                      {addedProduct.name}
                    </span>
                    <span className="block text-xs font-outfit text-gray-400">
                      Precio: {formatCLP(profile === 'PROFESIONAL' ? addedProduct.priceProfesional : addedProduct.priceEntusiasta)}
                    </span>
                  </div>
                </div>
                
                <p className="text-xs text-gray-400 font-dmsans pt-3 leading-relaxed">
                  {addedProduct.id === 'ceramic-coating' || addedProduct.id === 'vinilo-premium' 
                    ? "Se ha sumado este servicio a tu cotización bajo modalidad de instalación certificada. El especialista del taller te contactará para reservar el slot de elevación." 
                    : "El insumo se ha sumado a las líneas de cálculo de tu planilla. Puedes simular el IVA, cantidades y exportar la simulación de inmediato."}
                </p>
              </div>

              <div className="flex gap-3 pt-2 font-outfit text-xs">
                <button
                  onClick={() => setAddedProduct(null)}
                  className="flex-grow py-3 border border-[#2d313a] hover:border-gray-500 rounded-xl text-gray-300 font-bold uppercase transition cursor-pointer bg-transparent"
                >
                  Seguir Navegando
                </button>
                <button
                  onClick={() => {
                    setAddedProduct(null);
                    setActiveSubtab('presupuesto');
                  }}
                  className="flex-grow py-3 bg-amber-brand hover:bg-[#ffe094] text-black font-extrabold uppercase rounded-xl transition cursor-pointer shadow-lg shadow-amber-brand/10"
                >
                  Ver Presupuesto
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Floating Shopping Cart Widget for Extreme Visibility */}
        {cart.length > 0 && activeSubtab !== 'presupuesto' && (
          <div className="fixed bottom-6 right-6 z-40 animate-fade-in">
            <button
              onClick={() => {
                setActiveSubtab('presupuesto');
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 bg-[#121418] hover:bg-[#191c24] border-2 border-amber-brand px-5 py-4 rounded-full shadow-2xl text-white font-mono text-xs font-black uppercase tracking-wider transition-all duration-300 transform hover:scale-105 active:scale-95 group relative cursor-pointer"
            >
              <span className="absolute -top-1.5 -right-1 bg-rose-600 border border-black text-white rounded-full w-6 h-6 flex items-center justify-center font-black text-xs animate-pulse shadow">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
              <div className="w-8 h-8 rounded-full bg-amber-brand/15 text-amber-brand flex items-center justify-center group-hover:bg-amber-brand group-hover:text-black transition-all">
                <span className="text-sm">🛒</span>
              </div>
              <div className="text-left font-outfit leading-tight pr-1">
                <span className="block text-[9px] text-[#FFD16C] font-extrabold uppercase tracking-wide">VER MI CARRO</span>
                <span className="block text-white font-black text-xs">{formatCLP(totalCart)}</span>
              </div>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
