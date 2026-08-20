'use client';

import { useMemo, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import { products, categories, type ProductCategory } from '@/lib/products';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest' },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') as ProductCategory | null;
  const initialQuery = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>(
    initialCategory || 'All'
  );
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(10000);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    result = result.filter((p) => p.price <= maxPrice);

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy, maxPrice]);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-24 pb-20 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Menswear Collection
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold sm:text-5xl lg:text-6xl">
          {selectedCategory === 'All' ? 'Shop All' : selectedCategory}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
        </p>
      </motion.div>

      {/* Search bar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:max-w-xs border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground"
        />
        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside
          className={cn(
            'w-full shrink-0 lg:w-56',
            showFilters ? 'block' : 'hidden lg:block'
          )}
        >
          <div className="sticky top-24 space-y-8">
            {/* Categories */}
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                Categories
              </h3>
              <div className="space-y-2">
                <button
                  className={cn(
                    'block w-full text-left text-sm transition-colors hover:text-foreground',
                    selectedCategory === 'All'
                      ? 'font-medium text-foreground'
                      : 'text-muted-foreground'
                  )}
                  onClick={() => setSelectedCategory('All')}
                >
                  All Products
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    className={cn(
                      'block w-full text-left text-sm transition-colors hover:text-foreground',
                      selectedCategory === cat.name
                        ? 'font-medium text-foreground'
                        : 'text-muted-foreground'
                    )}
                    onClick={() => setSelectedCategory(cat.name)}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                Max Price
              </h3>
              <input
                type="range"
                min="500"
                max="10000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-foreground"
              />
              <p className="mt-2 text-sm font-medium">
                ₹{maxPrice.toLocaleString('en-IN')}
              </p>
            </div>

            {/* Mobile close */}
            {showFilters && (
              <Button
                variant="outline"
                size="sm"
                className="w-full lg:hidden"
                onClick={() => setShowFilters(false)}
              >
                <X className="mr-2 h-4 w-4" /> Close Filters
              </Button>
            )}
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center gap-4 text-center">
              <p className="font-display text-2xl font-semibold">No products found</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your filters or search.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                  setMaxPrice(10000);
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-6 lg:grid-cols-3">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-64 items-center justify-center">
          <div className="text-sm text-muted-foreground">Loading...</div>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
