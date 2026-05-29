import { useState } from 'react';
import { useProducts } from '../features/products/api/useProducts';
import { ProductListTable } from '../features/products/components/ProductListTable';
import { ProductSearch } from '../features/products/components/ProductSearch';
import { InventoryFilter, LOW_STOCK_THRESHOLD } from '../features/products/components/InventoryFilter';
import type { InventoryStatus } from '../features/products/components/InventoryFilter';
import type { Product } from '../types';

function filterByInventory(products: Product[], status: InventoryStatus): Product[] {
  if (status === 'all') return products;
  if (status === 'out-of-stock') return products.filter(p => p.inventory === 0);
  if (status === 'low-stock') return products.filter(p => p.inventory >= 1 && p.inventory <= LOW_STOCK_THRESHOLD);
  return products.filter(p => p.inventory > LOW_STOCK_THRESHOLD);
}

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [inventoryFilter, setInventoryFilter] = useState<InventoryStatus>('all');
  const { data: products, isLoading, isError } = useProducts(searchQuery);

  const filteredProducts = filterByInventory(products ?? [], inventoryFilter);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>
          <p className="text-muted-foreground mt-1">Manage your product inventory and pricing.</p>
        </div>
        <div className="w-full sm:w-72">
          <ProductSearch onSearch={setSearchQuery} />
        </div>
      </div>

      <InventoryFilter value={inventoryFilter} onChange={setInventoryFilter} />

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <ProductListTable
          products={filteredProducts}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </div>
  );
}
