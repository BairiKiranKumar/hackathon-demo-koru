import { useParams, Link } from 'react-router-dom';
import { useProduct } from '../features/products/api/useProducts';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { ArrowLeft, Package, Tag, DollarSign, Activity } from 'lucide-react';

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError } = useProduct(id!);

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
        <div className="h-8 w-64 bg-gray-200 rounded mt-4"></div>
        <div className="h-64 bg-gray-100 rounded-xl mt-8"></div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="space-y-4">
        <Link to="/products" className="inline-flex items-center text-sm text-blue-600 hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
        </Link>
        <div className="p-12 text-center border rounded-xl bg-gray-50 flex flex-col items-center">
          <Package className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Product not found</h3>
          <p className="text-gray-500 mt-1">The product you are looking for does not exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div>
        <Link to="/products" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 hover:underline mb-4 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
        </Link>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h2>
        <p className="text-muted-foreground mt-2 font-mono text-sm">ID: {product.id}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm border-gray-200">
          <CardHeader className="bg-gray-50/50 border-b">
            <CardTitle className="text-lg flex items-center">
              <Package className="mr-2 h-5 w-5 text-gray-500" />
              Product Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center text-sm font-medium text-gray-500">
                <Tag className="mr-2 h-4 w-4" />
                Category
              </div>
              <div className="text-sm font-medium text-gray-900">{product.category}</div>
            </div>
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center text-sm font-medium text-gray-500">
                <DollarSign className="mr-2 h-4 w-4" />
                Price
              </div>
              <div className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm font-medium text-gray-500">
                <Activity className="mr-2 h-4 w-4" />
                Status
              </div>
              <div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                  product.status === 'active' ? 'bg-green-100 text-green-800 border border-green-200' :
                  product.status === 'draft' ? 'bg-gray-100 text-gray-800 border border-gray-200' :
                  'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
