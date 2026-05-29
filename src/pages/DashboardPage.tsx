import { Package, ShoppingCart } from 'lucide-react';
import { StatsCard } from '../features/dashboard/components/StatsCard';
import { RecentOrdersTable } from '../features/dashboard/components/RecentOrdersTable';
import { useDashboardStats } from '../features/dashboard/api/useDashboardStats';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';

export default function DashboardPage() {
  const { data: stats, isLoading } = useDashboardStats();

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
      </div>
    </div>
  );
}
