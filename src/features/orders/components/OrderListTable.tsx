import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/Table';
import type { Order } from '../../../types';
import { Link } from 'react-router-dom';

interface OrderListTableProps {
  orders: Order[];
  isLoading: boolean;
  isError: boolean;
}

export function OrderListTable({ orders, isLoading, isError }: OrderListTableProps) {
  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground animate-pulse">Loading orders...</div>;
  }

  if (isError) {
    return <div className="p-8 text-center text-destructive">Failed to load orders.</div>;
  }

  if (orders.length === 0) {
    return <div className="p-8 text-center text-muted-foreground">No orders found.</div>;
  }

  return (
    <div className="rounded-md border bg-white overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-gray-50/50">
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => {
            const date = new Date(order.createdAt).toLocaleDateString('en-US', {
              month: 'short', day: 'numeric', year: 'numeric'
            });
            return (
              <TableRow key={order.id} className="group hover:bg-blue-50/30 transition-colors">
                <TableCell className="font-medium">
                  <Link to={`/orders/${order.id}`} className="text-gray-900 group-hover:text-blue-600 transition-colors font-semibold">
                    {order.id}
                  </Link>
                </TableCell>
                <TableCell className="text-gray-600">{date}</TableCell>
                <TableCell className="text-gray-900">{order.customerName}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                    order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell className="text-right font-medium text-gray-900">${order.total.toFixed(2)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
