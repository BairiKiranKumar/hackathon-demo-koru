import { Package, ShoppingCart, AlertTriangle, XCircle } from 'lucide-react';
import { StatsCard } from '../features/dashboard/components/StatsCard';
import { RecentOrdersTable } from '../features/dashboard/components/RecentOrdersTable';
import { LowStockTable } from '../features/dashboard/components/LowStockTable';
import { useDashboardStats } from '../features/dashboard/api/useDashboardStats';
import { useInventoryStats } from '../features/dashboard/api/useInventoryStats';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';

export default function DashboardPage() {
  const { data: stats, isLoading } = useDashboardStats();
  const { data: inventory, isLoading: inventoryLoading } = useInventoryStats();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Products"
          value={stats?.totalProducts ?? 0}
          icon={Package}
          loading={isLoading}
        />
        <StatsCard
          title="Total Orders"
          value={stats?.totalOrders ?? 0}
          icon={ShoppingCart}
          loading={isLoading}
        />
        <StatsCard
          title="Low Stock"
          value={inventory?.lowStock ?? 0}
          icon={AlertTriangle}
          description="Products running low"
          loading={inventoryLoading}
        />
        <StatsCard
          title="Out of Stock"
          value={inventory?.outOfStock ?? 0}
          icon={XCircle}
          description="Products unavailable"
          loading={inventoryLoading}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentOrdersTable />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Low Stock Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <LowStockTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
