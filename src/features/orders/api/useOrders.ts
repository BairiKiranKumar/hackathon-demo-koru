import { useQuery } from '@tanstack/react-query';
import { api } from '../../../services/api';

export function useRecentOrders(limit: number = 5) {
  return useQuery({
    queryKey: ['orders', 'recent', limit],
    queryFn: () => api.orders.getRecent(limit),
  });
}

export function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: () => api.orders.getAll(),
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: () => api.orders.getById(id),
    enabled: !!id,
  });
}
