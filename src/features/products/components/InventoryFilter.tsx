import { cn } from '../../../utils';

export const LOW_STOCK_THRESHOLD = 5;

export type InventoryStatus = 'all' | 'in-stock' | 'low-stock' | 'out-of-stock';

const FILTERS: { label: string; value: InventoryStatus }[] = [
  { label: 'All', value: 'all' },
  { label: 'In Stock', value: 'in-stock' },
  { label: 'Low Stock', value: 'low-stock' },
  { label: 'Out of Stock', value: 'out-of-stock' },
];

interface InventoryFilterProps {
  value: InventoryStatus;
  onChange: (value: InventoryStatus) => void;
}

export function InventoryFilter({ value, onChange }: InventoryFilterProps) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          className={cn(
            'px-3 py-1.5 rounded-full text-xs font-medium transition-colors border',
            value === filter.value
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600'
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
