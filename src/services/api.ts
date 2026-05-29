import mockData from '../mocks/data.json';
import type { Product, Order } from '../types';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  products: {
    getAll: async (): Promise<Product[]> => {
      await delay(800);
      return mockData.products as Product[];
    },
    getById: async (id: string): Promise<Product | undefined> => {
      await delay(500);
      return mockData.products.find(p => p.id === id) as Product | undefined;
    },
    search: async (query: string): Promise<Product[]> => {
      await delay(600);
      const lowerQuery = query.toLowerCase();
      return (mockData.products as Product[]).filter(p => 
        p.name.toLowerCase().includes(lowerQuery) || p.category.toLowerCase().includes(lowerQuery)
      );
    }
  },
  orders: {
    getAll: async (): Promise<Order[]> => {
      await delay(800);
      return mockData.orders as Order[];
    },
    getById: async (id: string): Promise<Order | undefined> => {
      await delay(500);
      return mockData.orders.find(o => o.id === id) as Order | undefined;
    },
    getRecent: async (limit: number = 5): Promise<Order[]> => {
      await delay(600);
      const sorted = [...mockData.orders as Order[]].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      return sorted.slice(0, limit);
    }
  },
  dashboard: {
    getStats: async () => {
      await delay(700);
      return {
        totalProducts: mockData.products.length,
        totalOrders: mockData.orders.length,
      };
    }
  }
};
