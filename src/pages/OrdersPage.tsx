import { useOrders } from '../features/orders/api/useOrders';
import { OrderListTable } from '../features/orders/components/OrderListTable';

export default function OrdersPage() {
  const { data: orders, isLoading, isError } = useOrders();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Orders</h2>
        <p className="text-muted-foreground mt-1">View and manage customer orders.</p>
      </div>
      
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <OrderListTable 
          orders={orders ?? []} 
          isLoading={isLoading} 
          isError={isError} 
        />
      </div>
    </div>
  );
}
