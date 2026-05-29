import { useState } from 'react';
import { useProducts } from '../features/products/api/useProducts';
import { ProductListTable } from '../features/products/components/ProductListTable';
import { ProductSearch } from '../features/products/components/ProductSearch';

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: products, isLoading, isError } = useProducts(searchQuery);

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
      
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <ProductListTable 
          products={products ?? []} 
          isLoading={isLoading} 
          isError={isError} 
        />
      </div>
    </div>
  );
}
