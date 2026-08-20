'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { products, categories } from '@/lib/products';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';

const heroImage =
  'https://images.pexels.com/photos/15568482/pexels-photo-15568482.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800';

const editorialImage =
  'https://images.pexels.com/photos/35689789/pexels-photo-35689789.jpeg?auto=compress&cs=tinysrgb&h=900&w=700';

const bannerImage =
  'https://images.pexels.com/photos/15834453/pexels-photo-15834453.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600';

const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);
const newArrivals = products.filter((p) => p.isNew).slice(0, 4);

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[100svh] min-h-[600px] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src={heroImage}
            alt="M FASHIONS hero — male model in black attire"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-4 text-xs uppercase tracking-[0.4em] sm:text-sm"
          >
            Autumn / Winter 2026
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="font-display text-5xl font-bold leading-[0.95] sm:text-7xl lg:text-8xl"
          >
            Wear Your
            <br />
            Identity
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-6 max-w-md text-sm text-white/80 sm:text-base"
          >
            Premium menswear for the modern man. Crafted with intention, worn
            with purpose.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/shop">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90"
              >
                Shop Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/shop?category=Streetwear">
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10"
              >
                Explore Streetwear
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="h-10 w-[1px] bg-white/50"
          />
        </motion.div>
      </section>

      {/* Marquee */}
      <section className="border-y border-border bg-foreground py-3 text-background overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center">
              {[
                'FREE SHIPPING OVER ₹2999',
                'WEAR YOUR IDENTITY',
                'NEW ARRIVALS EVERY WEEK',
                'PREMIUM MENSWEAR',
                'CRAFTED WITH INTENTION',
              ].map((text) => (
                <span
                  key={text}
                  className="mx-8 text-xs font-medium uppercase tracking-[0.2em]"
                >
                  {text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          {...fadeUp}
          className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Shop by Category
            </p>
            <h2 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">
              The Collection
            </h2>
          </div>
          <Link
            href="/shop"
            className="group flex items-center gap-2 text-sm font-medium uppercase tracking-wider"
          >
            View All
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Link href={`/shop?category=${encodeURIComponent(cat.name)}`}>
                <div className="group relative aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/40" />
                  <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                    <h3 className="font-display text-lg font-semibold sm:text-xl">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-white/70">{cat.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          {...fadeUp}
          className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Curated Selection
            </p>
            <h2 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">
              Featured Pieces
            </h2>
          </div>
          <Link
            href="/shop"
            className="group flex items-center gap-2 text-sm font-medium uppercase tracking-wider"
          >
            Shop All
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-6 lg:grid-cols-4">
          {featuredProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* Editorial */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] overflow-hidden bg-muted"
            >
              <img
                src={editorialImage}
                alt="M FASHIONS editorial — male model in suit"
                className="h-full w-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                The Editorial
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">
                Tailored for
                <br />
                the Modern Man
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Every M FASHIONS piece is born from a commitment to craftsmanship
                and a respect for the men who wear them. We believe clothing is
                not just fabric — it is identity, confidence, and expression.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                From the stitching of a leather jacket to the drape of an
                oversized tee, each detail is considered. Each cut is deliberate.
                This is menswear, refined.
              </p>
              <Link href="/shop" className="mt-8 inline-block">
                <Button variant="outline" size="lg">
                  Discover the Collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          {...fadeUp}
          className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Just Dropped
            </p>
            <h2 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">
              New Arrivals
            </h2>
          </div>
          <Link
            href="/shop"
            className="group flex items-center gap-2 text-sm font-medium uppercase tracking-wider"
          >
            View All
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-6 lg:grid-cols-4">
          {newArrivals.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="relative overflow-hidden">
        <div className="relative h-[60vh] min-h-[400px] w-full">
          <img
            src={bannerImage}
            alt="M FASHIONS promotional banner"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-xs uppercase tracking-[0.4em] text-white/70">
                Limited Time
              </p>
              <h2 className="mt-4 font-display text-4xl font-bold sm:text-6xl lg:text-7xl">
                Up to 40% Off
              </h2>
              <p className="mt-4 max-w-md text-sm text-white/80 sm:text-base">
                Selected styles. Premium quality. Unmistakably M FASHIONS.
              </p>
              <Link href="/shop" className="mt-8 inline-block">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-white/90"
                >
                  Shop the Sale <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
