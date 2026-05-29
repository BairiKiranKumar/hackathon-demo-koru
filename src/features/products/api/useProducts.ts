import { useQuery } from '@tanstack/react-query';
import { api } from '../../../services/api';

export function useProducts(searchQuery?: string) {
  return useQuery({
    queryKey: ['products', { search: searchQuery }],
    queryFn: () => searchQuery ? api.products.search(searchQuery) : api.products.getAll(),
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => api.products.getById(id),
    enabled: !!id,
  });
}
