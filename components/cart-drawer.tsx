'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/lib/store-context';
import { formatPrice } from '@/lib/products';
import { Button } from '@/components/ui/button';

export function CartDrawer() {
  const {
    isCartOpen,
    setCartOpen,
    cart,
    cartTotal,
    cartCount,
    updateQty,
    removeFromCart,
    placeOrder,
  } = useStore();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[70] bg-black/60"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-background"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b px-6 py-5">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                <h2 className="font-display text-lg font-semibold">
                  Cart ({cartCount})
                </h2>
              </div>
              <button onClick={() => setCartOpen(false)} aria-label="Close cart">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Your cart is empty</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Add some pieces to get started.
                    </p>
                  </div>
                  <Link href="/shop">
                    <Button
                      variant="outline"
                      onClick={() => setCartOpen(false)}
                    >
                      Browse Shop
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {cart.map((item, i) => (
                      <motion.div
                        key={`${item.product.id}-${item.size}-${item.color}`}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex gap-4 border-b pb-4"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-28 w-20 shrink-0 object-cover"
                        />
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between">
                            <h3 className="text-sm font-medium">
                              {item.product.name}
                            </h3>
                            <button
                              onClick={() => removeFromCart(i)}
                              aria-label="Remove item"
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {item.color} · Size {item.size}
                          </p>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center border">
                              <button
                                onClick={() => updateQty(i, item.quantity - 1)}
                                className="p-1.5"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="px-3 text-sm">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQty(i, item.quantity + 1)}
                                className="p-1.5"
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <span className="text-sm font-semibold">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t px-6 py-5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Subtotal</span>
                  <span className="text-sm font-semibold">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">Shipping</span>
                  <span className="text-sm font-semibold">Free</span>
                </div>
                <div className="flex items-center justify-between border-t pt-4 mb-4">
                  <span className="font-display text-lg font-semibold">
                    Total
                  </span>
                  <span className="text-lg font-semibold">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                <Link href="/orders" className="block">
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => {
                      placeOrder();
                      setCartOpen(false);
                    }}
                  >
                    Checkout — {formatPrice(cartTotal)}
                  </Button>
                </Link>
                <button
                  onClick={() => setCartOpen(false)}
                  className="mt-2 w-full text-center text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
