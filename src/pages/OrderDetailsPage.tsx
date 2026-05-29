import { useParams, Link } from 'react-router-dom';
import { useOrder } from '../features/orders/api/useOrders';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { ArrowLeft, ShoppingCart, User, CreditCard } from 'lucide-react';

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading, isError } = useOrder(id!);

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
        <div className="h-8 w-64 bg-gray-200 rounded mt-4"></div>
        <div className="h-64 bg-gray-100 rounded-xl mt-8"></div>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="space-y-4">
        <Link to="/orders" className="inline-flex items-center text-sm text-blue-600 hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
        </Link>
        <div className="p-12 text-center border rounded-xl bg-gray-50 flex flex-col items-center">
          <ShoppingCart className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Order not found</h3>
          <p className="text-gray-500 mt-1">The order you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  const date = new Date(order.createdAt).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div>
        <Link to="/orders" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 hover:underline mb-4 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Order #{order.id}</h2>
            <p className="text-muted-foreground mt-2 text-sm">{date}</p>
          </div>
          <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm ${
            order.status === 'delivered' ? 'bg-green-100 text-green-800 border border-green-200' :
            order.status === 'processing' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
            order.status === 'shipped' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
            order.status === 'cancelled' ? 'bg-red-100 text-red-800 border border-red-200' :
            'bg-gray-100 text-gray-800 border border-gray-200'
          }`}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm border-gray-200">
          <CardHeader className="bg-gray-50/50 border-b">
            <CardTitle className="text-lg flex items-center">
              <User className="mr-2 h-5 w-5 text-gray-500" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-lg font-medium text-gray-900">{order.customerName}</div>
            <div className="text-sm text-gray-500 mt-1">Customer ID: {order.id.replace('o', 'c')}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-gray-200">
          <CardHeader className="bg-gray-50/50 border-b">
            <CardTitle className="text-lg flex items-center">
              <CreditCard className="mr-2 h-5 w-5 text-gray-500" />
              Payment Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-gray-500">Total Amount</div>
              <div className="text-2xl font-bold text-gray-900">${order.total.toFixed(2)}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
