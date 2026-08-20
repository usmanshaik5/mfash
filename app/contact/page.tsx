'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const contactImage =
  'https://images.pexels.com/photos/18397428/pexels-photo-18397428.jpeg?auto=compress&cs=tinysrgb&h=900&w=700';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'hello@mfashions.in', href: 'mailto:hello@mfashions.in' },
  { icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
  { icon: MapPin, label: 'Studio', value: '42 MG Road, Indiranagar, Bengaluru 560038', href: null },
];

const socials = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill all required fields');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setForm({ name: '', email: '', subject: '', message: '' });
      toast.success('Message sent', {
        description: "We'll get back to you within 24 hours.",
      });
    }, 800);
  };

  return (
    <div className="pt-20">
      {/* Hero image */}
      <section className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
        <motion.img
          src={contactImage}
          alt="M FASHIONS contact — male model in white shirt"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-white/70">
              Get in Touch
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl lg:text-6xl">
              Contact Us
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Send a Message
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
              Let's Talk
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Questions about products, orders, or collaborations? We're here to help.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label className="mb-1.5 block">Name *</Label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <Label className="mb-1.5 block">Email *</Label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <Label className="mb-1.5 block">Subject</Label>
                <Input
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="What's this about?"
                />
              </div>
              <div>
                <Label className="mb-1.5 block">Message *</Label>
                <Textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us more..."
                  rows={5}
                />
              </div>
              <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto">
                {loading ? 'Sending...' : 'Send Message'}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Business Information
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
                M FASHIONS
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Premium menswear crafted for the modern man. Visit our studio or
                reach out — we'd love to hear from you.
              </p>
            </div>

            <div className="space-y-5">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border">
                    <info.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {info.label}
                    </p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-sm font-medium hover:underline"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Follow Us
              </p>
              <div className="flex gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-colors hover:bg-foreground hover:text-background"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Business Hours
              </p>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monday — Friday</span>
                  <span className="font-medium">10:00 — 19:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday</span>
                  <span className="font-medium">11:00 — 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="font-medium">Closed</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
