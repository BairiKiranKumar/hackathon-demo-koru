import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/Table';
import type { Product } from '../../../types';
import { Link } from 'react-router-dom';
import { cn } from '../../../utils';
import { LOW_STOCK_THRESHOLD } from './InventoryFilter';

interface ProductListTableProps {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
}

function getInventoryMeta(inventory: number) {
  if (inventory === 0) return { label: 'Out of Stock', rowCls: 'bg-red-50/40', badgeCls: 'bg-red-100 text-red-700' };
  if (inventory <= LOW_STOCK_THRESHOLD) return { label: 'Low Stock', rowCls: 'bg-amber-50/60', badgeCls: 'bg-amber-100 text-amber-700' };
  return { label: null, rowCls: '', badgeCls: '' };
}

export function ProductListTable({ products, isLoading, isError }: ProductListTableProps) {
  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground animate-pulse">Loading products...</div>;
  }

  if (isError) {
    return <div className="p-8 text-center text-destructive">Failed to load products.</div>;
  }

  if (products.length === 0) {
    return <div className="p-8 text-center text-muted-foreground">No products found.</div>;
  }

  return (
    <div className="rounded-md border bg-white overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-gray-50/50">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Inventory</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            const inv = getInventoryMeta(product.inventory);
            return (
              <TableRow key={product.id} className={cn('group hover:bg-blue-50/30 transition-colors', inv.rowCls)}>
                <TableCell className="font-medium">
                  <Link to={`/products/${product.id}`} className="text-gray-900 group-hover:text-blue-600 transition-colors font-semibold">
                    {product.name}
                  </Link>
                </TableCell>
                <TableCell className="text-gray-600">{product.category}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    product.status === 'active' ? 'bg-green-100 text-green-800' :
                    product.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell className="text-right font-medium text-gray-900">${product.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <span className="font-medium text-gray-900">{product.inventory}</span>
                  {inv.label && (
                    <span className={cn('ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium', inv.badgeCls)}>
                      {inv.label}
                    </span>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
