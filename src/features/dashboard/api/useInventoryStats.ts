import { useQuery } from '@tanstack/react-query';
import { api } from '../../../services/api';

export function useInventoryStats() {
  return useQuery({
    queryKey: ['dashboard', 'inventory'],
    queryFn: () => api.dashboard.getInventoryStats(),
  });
}
