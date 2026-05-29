import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/Table';
import { useRecentOrders } from '../../orders/api/useOrders';
import { Link } from 'react-router-dom';

export function RecentOrdersTable() {
  const { data: orders, isLoading, isError } = useRecentOrders(5);

  if (isLoading) {
    return <div className="p-4 text-center text-muted-foreground animate-pulse">Loading recent orders...</div>;
  }

  if (isError || !orders) {
    return <div className="p-4 text-center text-destructive">Failed to load recent orders.</div>;
  }

  if (orders.length === 0) {
    return <div className="p-4 text-center text-muted-foreground">No recent orders found.</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">
                <Link to={`/orders/${order.id}`} className="text-primary hover:underline">
                  {order.id}
                </Link>
              </TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                  order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                  order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                  order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {order.status}
                </span>
              </TableCell>
              <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
