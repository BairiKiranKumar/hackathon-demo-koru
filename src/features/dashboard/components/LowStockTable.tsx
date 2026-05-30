import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/Table';
import { useInventoryStats } from '../api/useInventoryStats';

export function LowStockTable() {
  const { data, isLoading, isError } = useInventoryStats();
  const products = data?.lowStockProducts ?? [];

  if (isLoading) {
    return <div className="p-4 text-center text-muted-foreground animate-pulse">Loading inventory data...</div>;
  }

  if (isError) {
    return <div className="p-4 text-center text-destructive">Failed to load inventory data.</div>;
  }

  if (products.length === 0) {
    return <div className="p-4 text-center text-muted-foreground">All products are well stocked.</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Stock</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">
                <Link to={`/products/${product.id}`} className="text-primary hover:underline">
                  {product.name}
                </Link>
              </TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell className="text-right">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                  product.inventory === 0
                    ? 'bg-red-100 text-red-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {product.inventory === 0 ? 'Out of Stock' : `${product.inventory} left`}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
