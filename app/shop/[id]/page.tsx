'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingBag, Minus, Plus, ChevronRight, Truck, RefreshCw, Shield } from 'lucide-react';
import { getProductById, getRelatedProducts, formatPrice } from '@/lib/products';
import { useStore } from '@/lib/store-context';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = getProductById(id);

  const { addToCart, toggleWishlist, isInWishlist, setCartOpen, placeOrder } =
    useStore();

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name || '');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4 pt-24 text-center">
        <h1 className="font-display text-3xl font-semibold">Product not found</h1>
        <Link href="/shop">
          <Button variant="outline">Back to Shop</Button>
        </Link>
      </div>
    );
  }

  const wished = isInWishlist(product.id);
  const related = getRelatedProducts(product);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    toast.success('Added to cart', {
      description: `${product.name} (${selectedSize}, ${selectedColor})`,
    });
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    placeOrder();
    toast.success('Order placed!', {
      description: `Your order for ${product.name} is being processed.`,
    });
  };

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/shop" className="hover:text-foreground">Shop</Link>
          <ChevronRight className="h-3 w-3" />
          <Link
            href={`/shop?category=${encodeURIComponent(product.category)}`}
            className="hover:text-foreground"
          >
            {product.category}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-muted">
              <motion.img
                key={activeImage}
                initial={{ opacity: 0.3, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                src={product.images[activeImage] || product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              {product.tag && (
                <span className="absolute left-4 top-4 bg-background px-3 py-1 text-[10px] font-semibold uppercase tracking-wider">
                  {product.tag}
                </span>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      'relative h-24 w-20 overflow-hidden border-2 transition-colors',
                      activeImage === i
                        ? 'border-foreground'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    )}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {product.category}
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      'h-4 w-4',
                      star <= Math.round(product.rating)
                        ? 'fill-foreground text-foreground'
                        : 'text-muted-foreground'
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mt-6 flex items-center gap-3">
              <span className="text-2xl font-semibold">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="bg-foreground px-2 py-0.5 text-xs font-medium text-background">
                    {Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100
                    )}
                    % OFF
                  </span>
                </>
              )}
            </div>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            {/* Colors */}
            <div className="mt-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em]">
                Color: <span className="text-muted-foreground">{selectedColor}</span>
              </p>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all',
                      selectedColor === color.name
                        ? 'border-foreground ring-2 ring-foreground/20'
                        : 'border-border'
                    )}
                    aria-label={color.name}
                  >
                    <span
                      className="h-6 w-6 rounded-full"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em]">
                Size: <span className="text-muted-foreground">{selectedSize}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      'min-w-[3rem] border px-4 py-2.5 text-sm font-medium transition-all',
                      selectedSize === size
                        ? 'border-foreground bg-foreground text-background'
                        : 'border-border hover:border-foreground'
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em]">
                Quantity
              </p>
              <div className="flex items-center border border-border">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-muted"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-6 text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-muted"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                <ShoppingBag className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-4"
                onClick={() => {
                  toggleWishlist(product.id);
                  toast.success(
                    wished ? 'Removed from wishlist' : 'Added to wishlist'
                  );
                }}
                aria-label="Toggle wishlist"
              >
                <Heart
                  className={cn(
                    'h-5 w-5',
                    wished && 'fill-foreground text-foreground'
                  )}
                />
              </Button>
            </div>

            {/* Trust badges */}
            <div className="mt-8 grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-3">
              {[
                { icon: Truck, label: 'Free Shipping', sub: 'On orders over ₹2999' },
                { icon: RefreshCw, label: 'Easy Returns', sub: '7-day return policy' },
                { icon: Shield, label: 'Secure Payment', sub: '100% protected' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="mb-8 font-display text-3xl font-semibold">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-6 lg:grid-cols-4">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
