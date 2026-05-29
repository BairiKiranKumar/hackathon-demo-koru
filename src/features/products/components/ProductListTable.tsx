import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/Table';
import type { Product } from '../../../types';
import { Link } from 'react-router-dom';

interface ProductListTableProps {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className="group hover:bg-blue-50/30 transition-colors">
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
