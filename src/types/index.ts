export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  status: 'active' | 'draft' | 'archived';
  inventory: number;
}

export interface Order {
  id: string;
  customerName: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}
