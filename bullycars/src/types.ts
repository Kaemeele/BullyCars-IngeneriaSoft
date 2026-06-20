export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'insumos' | 'herramientas' | 'repuestos' | 'detailing';
  img: string;
  priceEntusiasta: number;
  priceProfesional: number;
  details: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CompareProject {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  beforeImg: string;
  afterImg: string;
  specs: { label: string; value: string }[];
}

export interface Appointment {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  vehicle: string;
  category: string;
  date: string;
  hour: string;
  note: string;
  status: 'PENDIENTE' | 'CONFIRMADO' | 'COMPLETADO';
}

export interface Member {
  id: string;
  fullName: string;
  email: string;
  vehicle: string;
  memberType: 'ENTUSIASTA' | 'PROFESIONAL';
  rfidCode: string;
  joinedDate: string;
}

export interface Message {
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}
