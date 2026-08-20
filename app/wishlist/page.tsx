'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Trash2, Package, Truck, CheckCircle2, Clock } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '@/lib/store-context';
import { products, formatPrice } from '@/lib/products';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const statusConfig = {
  Processing: { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100' },
  Shipped: { icon: Truck, color: 'text-blue-600', bg: 'bg-blue-100' },
  Delivered: { icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100' },
};

export default function WishlistOrdersPage() {
  const { wishlist, toggleWishlist, addToCart, orders, setCartOpen } = useStore();
  const [activeTab, setActiveTab] = useState<'wishlist' | 'orders'>('wishlist');

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

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
          Your Activity
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">
          Wishlist & Orders
        </h1>
      </motion.div>

      {/* Tabs */}
      <div className="mb-8 flex gap-1 border-b border-border">
        {[
          { id: 'wishlist' as const, label: `Wishlist (${wishlist.length})` },
          { id: 'orders' as const, label: `Orders (${orders.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'relative px-4 py-3 text-sm font-medium uppercase tracking-wider transition-colors',
              activeTab === tab.id ? 'text-foreground' : 'text-muted-foreground'
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="tab-underline"
                className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-foreground"
              />
            )}
          </button>
        ))}
      </div>

      {/* Wishlist Tab */}
      {activeTab === 'wishlist' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {wishlistProducts.length === 0 ? (
            <div className="flex h-[50vh] flex-col items-center justify-center gap-4 text-center">
              <Heart className="h-12 w-12 text-muted-foreground" />
              <div>
                <p className="font-display text-2xl font-semibold">
                  Your wishlist is empty
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Save your favourite pieces here for later.
                </p>
              </div>
              <Link href="/shop">
                <Button variant="outline">Browse Shop</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-6 lg:grid-cols-4">
              {wishlistProducts.map((product, i) => (
                <div key={product.id} className="relative">
                  <ProductCard product={product} index={i} />
                  <div className="mt-2 flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        addToCart(
                          product,
                          product.sizes[0],
                          product.colors[0]?.name || '',
                          1
                        );
                      }}
                    >
                      <ShoppingBag className="mr-1.5 h-3.5 w-3.5" />
                      Add to Cart
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleWishlist(product.id)}
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {orders.length === 0 ? (
            <div className="flex h-[50vh] flex-col items-center justify-center gap-4 text-center">
              <Package className="h-12 w-12 text-muted-foreground" />
              <div>
                <p className="font-display text-2xl font-semibold">
                  No orders yet
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your order history will appear here.
                </p>
              </div>
              <Link href="/shop">
                <Button variant="outline">Start Shopping</Button>
              </Link>
            </div>
          ) : (
            <AnimatePresence>
              {orders.map((order, i) => {
                const StatusIcon = statusConfig[order.status].icon;
                return (
                  <motion.div
                    key={order.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="border border-border"
                  >
                    {/* Order header */}
                    <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-muted-foreground">
                          Order
                        </p>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-xs text-muted-foreground">
                          Placed on{' '}
                          {new Date(order.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium',
                            statusConfig[order.status].bg,
                            statusConfig[order.status].color
                          )}
                        >
                          <StatusIcon className="h-3.5 w-3.5" />
                          {order.status}
                        </span>
                        <span className="font-display text-lg font-semibold">
                          {formatPrice(order.total)}
                        </span>
                      </div>
                    </div>

                    {/* Order items */}
                    <div className="divide-y divide-border">
                      {order.items.map((item, j) => (
                        <div
                          key={j}
                          className="flex items-center gap-4 p-5"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-20 w-16 shrink-0 object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="text-sm font-medium">
                              {item.product.name}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {item.color} · Size {item.size} · Qty {item.quantity}
                            </p>
                          </div>
                          <span className="text-sm font-semibold">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Status tracker */}
                    <div className="border-t border-border p-5">
                      <div className="flex items-center justify-between">
                        {['Processing', 'Shipped', 'Delivered'].map(
                          (step, k) => {
                            const stepIndex = ['Processing', 'Shipped', 'Delivered'].indexOf(
                              order.status
                            );
                            const isComplete = k <= stepIndex;
                            const StepIcon = statusConfig[step as keyof typeof statusConfig].icon;
                            return (
                              <div
                                key={step}
                                className="flex flex-1 flex-col items-center gap-2"
                              >
                                <div className="flex w-full items-center">
                                  {k > 0 && (
                                    <div
                                      className={cn(
                                        'h-[2px] flex-1',
                                        k <= stepIndex
                                          ? 'bg-foreground'
                                          : 'bg-border'
                                      )}
                                    />
                                  )}
                                  <div
                                    className={cn(
                                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                                      isComplete
                                        ? 'border-foreground bg-foreground text-background'
                                        : 'border-border text-muted-foreground'
                                    )}
                                  >
                                    <StepIcon className="h-4 w-4" />
                                  </div>
                                  {k < 2 && (
                                    <div
                                      className={cn(
                                        'h-[2px] flex-1',
                                        k < stepIndex
                                          ? 'bg-foreground'
                                          : 'bg-border'
                                      )}
                                    />
                                  )}
                                </div>
                                <span
                                  className={cn(
                                    'text-[10px] uppercase tracking-wider',
                                    isComplete
                                      ? 'font-medium text-foreground'
                                      : 'text-muted-foreground'
                                  )}
                                >
                                  {step}
                                </span>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </motion.div>
      )}
    </div>
  );
}
