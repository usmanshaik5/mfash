'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';
import type { Product } from '@/lib/products';
import { formatPrice } from '@/lib/products';
import { useStore } from '@/lib/store-context';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { toggleWishlist, isInWishlist } = useStore();
  const wished = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link href={`/shop/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <motion.img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Tag */}
          {product.tag && (
            <span className="absolute left-3 top-3 bg-background px-3 py-1 text-[10px] font-semibold uppercase tracking-wider">
              {product.tag}
            </span>
          )}

          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-colors hover:bg-background"
            aria-label="Toggle wishlist"
          >
            <motion.span
              key={wished ? 'wished' : 'not-wished'}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            >
              <Heart
                className={cn(
                  'h-4 w-4',
                  wished ? 'fill-foreground text-foreground' : 'text-foreground'
                )}
              />
            </motion.span>
          </button>

          {/* Quick add bar */}
          <motion.div
            initial={{ y: '100%' }}
            whileHover={{ y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm p-3 text-center"
          >
            <span className="text-xs font-medium uppercase tracking-wider">
              View Details
            </span>
          </motion.div>
        </div>

        {/* Info */}
        <div className="mt-3 space-y-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-medium leading-snug">{product.name}</h3>
            <div className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-foreground text-foreground" />
              {product.rating}
            </div>
          </div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            {product.category}
          </p>
          <div className="flex items-center gap-2 pt-1">
            <span className="text-sm font-semibold">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
