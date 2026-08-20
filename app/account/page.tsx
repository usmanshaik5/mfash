'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, CreditCard, Package, LogOut, Plus, Trash2, Check, Pencil } from 'lucide-react';
import { useStore, type Address, type PaymentMethod } from '@/lib/store-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import Link from 'next/link';

const sections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'payments', label: 'Payment Methods', icon: CreditCard },
  { id: 'orders', label: 'Orders', icon: Package },
] as const;

type SectionId = (typeof sections)[number]['id'];

export default function AccountPage() {
  const {
    profile,
    updateProfile,
    addresses,
    addAddress,
    updateAddress,
    deleteAddress,
    paymentMethods,
    addPayment,
    deletePayment,
    orders,
  } = useStore();

  const [activeSection, setActiveSection] = useState<SectionId>('profile');
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState(profile);
  const [showAddrForm, setShowAddrForm] = useState(false);
  const [addrForm, setAddrForm] = useState<Partial<Address>>({});
  const [editingAddrId, setEditingAddrId] = useState<string | null>(null);
  const [showPayForm, setShowPayForm] = useState(false);
  const [payForm, setPayForm] = useState({ number: '', name: '', expiry: '', cvv: '' });

  const handleSaveProfile = () => {
    updateProfile(profileForm);
    setEditingProfile(false);
    toast.success('Profile updated');
  };

  const handleSaveAddress = () => {
    if (!addrForm.name || !addrForm.line1 || !addrForm.city) {
      toast.error('Please fill required fields');
      return;
    }
    if (editingAddrId) {
      updateAddress({ ...(addrForm as Address), id: editingAddrId });
      toast.success('Address updated');
    } else {
      addAddress({
        ...addrForm,
        id: `addr-${Date.now()}`,
        label: addrForm.label || 'Home',
        phone: addrForm.phone || '',
        line1: addrForm.line1 || '',
        city: addrForm.city || '',
        state: addrForm.state || '',
        pincode: addrForm.pincode || '',
      } as Address);
      toast.success('Address added');
    }
    setShowAddrForm(false);
    setEditingAddrId(null);
    setAddrForm({});
  };

  const handleSavePayment = () => {
    if (!payForm.number || !payForm.name) {
      toast.error('Please fill required fields');
      return;
    }
    addPayment({
      id: `pm-${Date.now()}`,
      type: 'Card',
      last4: payForm.number.slice(-4),
      name: payForm.name,
      expiry: payForm.expiry,
    });
    setShowPayForm(false);
    setPayForm({ number: '', name: '', expiry: '', cvv: '' });
    toast.success('Payment method added');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pt-24 pb-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          My Account
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">
          Hello, {profile.name.split(' ')[0]}
        </h1>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <nav className="flex gap-2 overflow-x-auto scrollbar-hide lg:flex-col lg:gap-0">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={cn(
                  'flex shrink-0 items-center gap-3 px-4 py-3 text-sm font-medium transition-colors lg:w-full lg:border-l-2',
                  activeSection === s.id
                    ? 'border-foreground text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                )}
              >
                <s.icon className="h-4 w-4" />
                {s.label}
              </button>
            ))}
            <button
              onClick={() => toast.info('Logged out (demo)')}
              className="flex shrink-0 items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground lg:w-full lg:border-l-2 lg:border-transparent"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </nav>
        </aside>

        {/* Content */}
        <div className="min-h-[400px]">
          {/* Profile */}
          {activeSection === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-lg"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-display text-2xl font-semibold">
                  Profile Information
                </h2>
                {!editingProfile ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setProfileForm(profile);
                      setEditingProfile(true);
                    }}
                  >
                    <Pencil className="mr-2 h-3.5 w-3.5" />
                    Edit
                  </Button>
                ) : (
                  <Button size="sm" onClick={handleSaveProfile}>
                    <Check className="mr-2 h-3.5 w-3.5" />
                    Save
                  </Button>
                )}
              </div>
              <div className="space-y-5">
                <div>
                  <Label className="mb-1.5 block">Full Name</Label>
                  <Input
                    value={editingProfile ? profileForm.name : profile.name}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, name: e.target.value })
                    }
                    disabled={!editingProfile}
                    className="max-w-md"
                  />
                </div>
                <div>
                  <Label className="mb-1.5 block">Email</Label>
                  <Input
                    type="email"
                    value={editingProfile ? profileForm.email : profile.email}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, email: e.target.value })
                    }
                    disabled={!editingProfile}
                    className="max-w-md"
                  />
                </div>
                <div>
                  <Label className="mb-1.5 block">Phone</Label>
                  <Input
                    value={editingProfile ? profileForm.phone : profile.phone}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, phone: e.target.value })
                    }
                    disabled={!editingProfile}
                    className="max-w-md"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Addresses */}
          {activeSection === 'addresses' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-display text-2xl font-semibold">
                  Saved Addresses
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowAddrForm(!showAddrForm);
                    setEditingAddrId(null);
                    setAddrForm({});
                  }}
                >
                  <Plus className="mr-2 h-3.5 w-3.5" />
                  Add New
                </Button>
              </div>

              {showAddrForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mb-6 max-w-lg space-y-4 border border-border p-5"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="mb-1.5 block">Label</Label>
                      <Input
                        placeholder="Home, Work..."
                        value={addrForm.label || ''}
                        onChange={(e) =>
                          setAddrForm({ ...addrForm, label: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label className="mb-1.5 block">Name</Label>
                      <Input
                        placeholder="Full name"
                        value={addrForm.name || ''}
                        onChange={(e) =>
                          setAddrForm({ ...addrForm, name: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="mb-1.5 block">Phone</Label>
                    <Input
                      placeholder="Phone number"
                      value={addrForm.phone || ''}
                      onChange={(e) =>
                        setAddrForm({ ...addrForm, phone: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label className="mb-1.5 block">Address Line 1</Label>
                    <Input
                      placeholder="Street address"
                      value={addrForm.line1 || ''}
                      onChange={(e) =>
                        setAddrForm({ ...addrForm, line1: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="mb-1.5 block">City</Label>
                      <Input
                        placeholder="City"
                        value={addrForm.city || ''}
                        onChange={(e) =>
                          setAddrForm({ ...addrForm, city: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label className="mb-1.5 block">State</Label>
                      <Input
                        placeholder="State"
                        value={addrForm.state || ''}
                        onChange={(e) =>
                          setAddrForm({ ...addrForm, state: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="mb-1.5 block">Pincode</Label>
                    <Input
                      placeholder="PIN code"
                      value={addrForm.pincode || ''}
                      onChange={(e) =>
                        setAddrForm({ ...addrForm, pincode: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSaveAddress}>
                      {editingAddrId ? 'Update' : 'Save'} Address
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowAddrForm(false);
                        setEditingAddrId(null);
                        setAddrForm({});
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </motion.div>
              )}

              <div className="space-y-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="border border-border p-5"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            {addr.label}
                          </span>
                          {addr.isDefault && (
                            <span className="rounded-full bg-foreground px-2 py-0.5 text-[10px] font-medium text-background">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="mt-2 font-medium">{addr.name}</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {addr.phone}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {addr.line1}
                          {addr.line2 && `, ${addr.line2}`}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {addr.city}, {addr.state} — {addr.pincode}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="p-2 text-muted-foreground hover:text-foreground"
                          onClick={() => {
                            setEditingAddrId(addr.id);
                            setAddrForm(addr);
                            setShowAddrForm(true);
                          }}
                          aria-label="Edit address"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          className="p-2 text-muted-foreground hover:text-destructive"
                          onClick={() => {
                            deleteAddress(addr.id);
                            toast.success('Address removed');
                          }}
                          aria-label="Delete address"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Payments */}
          {activeSection === 'payments' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-display text-2xl font-semibold">
                  Payment Methods
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPayForm(!showPayForm)}
                >
                  <Plus className="mr-2 h-3.5 w-3.5" />
                  Add Card
                </Button>
              </div>

              {showPayForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mb-6 max-w-lg space-y-4 border border-border p-5"
                >
                  <div>
                    <Label className="mb-1.5 block">Card Number</Label>
                    <Input
                      placeholder="1234 5678 9012 3456"
                      value={payForm.number}
                      onChange={(e) =>
                        setPayForm({ ...payForm, number: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label className="mb-1.5 block">Name on Card</Label>
                    <Input
                      placeholder="Full name"
                      value={payForm.name}
                      onChange={(e) =>
                        setPayForm({ ...payForm, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="mb-1.5 block">Expiry</Label>
                      <Input
                        placeholder="MM/YY"
                        value={payForm.expiry}
                        onChange={(e) =>
                          setPayForm({ ...payForm, expiry: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label className="mb-1.5 block">CVV</Label>
                      <Input
                        type="password"
                        placeholder="•••"
                        value={payForm.cvv}
                        onChange={(e) =>
                          setPayForm({ ...payForm, cvv: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSavePayment}>Save Card</Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowPayForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </motion.div>
              )}

              <div className="space-y-4">
                {paymentMethods.map((pm) => (
                  <div
                    key={pm.id}
                    className="flex items-center justify-between border border-border p-5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-14 items-center justify-center rounded bg-foreground text-background">
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {pm.type} •••• {pm.last4}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {pm.name}
                          {pm.expiry && ` · Expires ${pm.expiry}`}
                        </p>
                      </div>
                    </div>
                    <button
                      className="p-2 text-muted-foreground hover:text-destructive"
                      onClick={() => {
                        deletePayment(pm.id);
                        toast.success('Payment method removed');
                      }}
                      aria-label="Delete payment method"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Orders */}
          {activeSection === 'orders' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-display text-2xl font-semibold">
                  Recent Orders
                </h2>
                <Link href="/orders">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
              {orders.length === 0 ? (
                <p className="text-sm text-muted-foreground">No orders yet.</p>
              ) : (
                <div className="space-y-4">
                  {orders.slice(0, 3).map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between border border-border p-4"
                    >
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}{' '}
                          · {order.items.length}{' '}
                          {order.items.length === 1 ? 'item' : 'items'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          ₹{order.total.toLocaleString('en-IN')}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {order.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
