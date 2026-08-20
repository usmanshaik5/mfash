'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Menu, X, Heart } from 'lucide-react';
import { useStore } from '@/lib/store-context';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/wishlist', label: 'Wishlist' },
  { href: '/orders', label: 'Orders' },
  { href: '/account', label: 'Account' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const { cartCount, wishlist, setCartOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'glass border-b border-border/40 text-foreground'
            : 'bg-transparent text-white'
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 -ml-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="font-display text-xl font-bold tracking-[0.2em] sm:text-2xl"
          >
            M FASHIONS
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-xs font-medium uppercase tracking-[0.15em] transition-colors relative',
                  scrolled ? 'hover:text-foreground/60' : 'hover:text-white/60',
                  pathname === link.href && (scrolled ? 'text-foreground' : 'text-white')
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-underline"
                    className={cn(
                      'absolute -bottom-1 left-0 right-0 h-[1px]',
                      scrolled ? 'bg-foreground' : 'bg-white'
                    )}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              className={cn(
                'p-2 rounded-full transition-colors',
                scrolled ? 'hover:bg-foreground/5' : 'hover:bg-white/10'
              )}
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              href="/wishlist"
              className={cn(
                'relative p-2 rounded-full transition-colors',
                scrolled ? 'hover:bg-foreground/5' : 'hover:bg-white/10'
              )}
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className={cn(
                    'absolute top-1 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full text-[9px] font-bold',
                    scrolled ? 'bg-foreground text-background' : 'bg-white text-black'
                  )}>
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button
              className={cn(
                'relative p-2 rounded-full transition-colors',
                scrolled ? 'hover:bg-foreground/5' : 'hover:bg-white/10'
              )}
              onClick={() => setCartOpen(true)}
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={cn(
                    'absolute top-1 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full text-[9px] font-bold',
                    scrolled ? 'bg-foreground text-background' : 'bg-white text-black'
                  )}
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-0 top-0 z-50 h-full w-[80%] max-w-sm bg-background lg:hidden"
            >
              <div className="flex items-center justify-between border-b px-6 py-4">
                <span className="font-display text-lg font-bold tracking-[0.2em]">
                  M FASHIONS
                </span>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col p-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        'block py-4 text-sm font-medium uppercase tracking-[0.15em] border-b border-border/40',
                        pathname === link.href ? 'text-foreground' : 'text-foreground/60'
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-start justify-center bg-background/95 pt-24 px-4"
          >
            <div className="w-full max-w-2xl">
              <div className="flex items-center justify-between mb-6">
                <span className="font-display text-2xl font-semibold">Search</span>
                <button onClick={() => setSearchOpen(false)} aria-label="Close search">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form
                action="/shop"
                method="get"
                className="flex items-center gap-3 border-b-2 border-foreground pb-3"
              >
                <Search className="h-5 w-5 text-muted-foreground" />
                <input
                  name="q"
                  autoFocus
                  placeholder="Search for products, categories..."
                  className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground"
                />
              </form>
              <div className="mt-6 flex flex-wrap gap-2">
                {['T-Shirts', 'Hoodies', 'Jackets', 'Streetwear', 'Cargo Pants'].map(
                  (tag) => (
                    <Link
                      key={tag}
                      href={`/shop?category=${encodeURIComponent(tag)}`}
                      className="rounded-full border border-border px-4 py-2 text-xs uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors"
                    >
                      {tag}
                    </Link>
                  )
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
