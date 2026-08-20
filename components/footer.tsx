'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const footerLinks = {
  Shop: [
    { label: 'T-Shirts', href: '/shop?category=T-Shirts' },
    { label: 'Hoodies', href: '/shop?category=Hoodies' },
    { label: 'Jackets', href: '/shop?category=Jackets' },
    { label: 'Streetwear', href: '/shop?category=Streetwear' },
  ],
  Company: [
    { label: 'About Us', href: '/contact' },
    { label: 'Contact', href: '/contact' },
    { label: 'Account', href: '/account' },
    { label: 'Orders', href: '/orders' },
  ],
  Support: [
    { label: 'Shipping', href: '/contact' },
    { label: 'Returns', href: '/contact' },
    { label: 'Size Guide', href: '/contact' },
    { label: 'FAQ', href: '/contact' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      {/* Newsletter */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-display text-3xl font-semibold sm:text-4xl">
                Join the M FASHIONS circle
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Early access to drops, exclusive offers, and editorial content.
              </p>
            </motion.div>
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 border-b-2 border-foreground bg-transparent pb-3 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="shrink-0 border-b-2 border-foreground pb-3 text-sm font-medium uppercase tracking-wider"
              >
                Subscribe
              </button>
            </motion.form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="font-display text-2xl font-bold tracking-[0.2em]"
            >
              M FASHIONS
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground leading-relaxed">
              Premium menswear crafted for the modern man. Wear Your Identity.
            </p>
            <div className="mt-6 flex gap-4">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-foreground hover:text-background"
                  aria-label="Social media"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                {title}
              </h4>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/70 transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} M FASHIONS. All rights reserved.
          </p>
          <p className="font-display text-sm italic tracking-wide">
            Wear Your Identity.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
