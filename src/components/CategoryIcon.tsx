import { Apple, Car, ShoppingBag, Banana, Bus, ShoppingBasket, Carrot, Plane, CreditCard, Coffee, Train, DollarSign, Fish, CarTaxiFront as Taxi, Receipt, Utensils, QrCode, MapPin, Cookie, Compass, Backpack, Wine, Briefcase as Suitcase, Map, Salad, Ticket, Sandwich, Egg, Milk, Clock, Settings, HelpCircle, Gift, Puzzle, StickyNote, Calendar, Droplets, Flame, Wifi, Phone, Trash2, Wrench, Lightbulb, Zap, Briefcase, BarChart3, Users, FileText, CheckCircle2, Building2, Wallet, Banknote, PiggyBank, TrendingUp, HandCoins, Stethoscope, Pill, Syringe, HeartPulse, Thermometer, Clapperboard, Gamepad2, Music, Music2, Camera, Theater, Tv, PartyPopper, Home, User, Heart, Pizza, IceCream, Beef, Ship, Bike, ShoppingCart, Tag, LucideIcon, MoreHorizontal } from 'lucide-react';
import { colorMap } from '../types/category';

// Icon mapping - using closest Lucide icons for the specified names
const iconMap: Record<string, LucideIcon> = {
  // Food icons
  'coffee': Coffee,
  'milk': Milk,
  'wine-glass': Wine,
  'salad': Salad,
  'sandwich': Sandwich,
  'apple': Apple,
  'banana': Banana,
  'carrot': Carrot,
  'egg': Egg,
  'fish': Fish,
  'cookie': Cookie,
  'pizza': Pizza,
  'ice-cream': IceCream,
  'steak': Beef,


  // Travel icons 
  'airplane': Plane,
  'bus': Bus,
  'car': Car,
  'train': Train,
  'taxi': Taxi,
  'compass': Compass,
  'map': Map,
  'ticket': Ticket,
  'suitcase': Suitcase,
  'backpack': Backpack,

  'ship': Ship,
  'bike': Bike,

  // Shopping icons
  'shopping-bag': ShoppingBag,
  'shopping-basket': ShoppingBasket,
  'credit-card': CreditCard,
  'money-bill': DollarSign,
  'barcode': Receipt,
  'qrcode': QrCode,

  'cart': ShoppingCart,
  'tag': Tag,

  // Family icons
  'family': Users,
  'home': Home,
  'baby': User,
  'heart': Heart,

  // Entertainment icons
  'game': Gamepad2,
  'movie': Clapperboard,
  'music': Music,
  'dance': Music2,
  'camera': Camera,
  'drama': Theater,
  'tv': Tv,
  'party': PartyPopper,

  // Medical icons
  'doctor': Stethoscope,
  'pill': Pill,
  'syringe': Syringe,
  'heartbeat': HeartPulse,
  'thermometer': Thermometer,

  // Finance icons
  'wallet': Wallet,
  'bank': Banknote,
  'piggy-bank': PiggyBank,
  'salary': DollarSign,
  'investment': TrendingUp,
  'loan': HandCoins,
  'debt': HandCoins,

  // Business icons
  'briefcase': Briefcase,
  'chart': BarChart3,
  'meeting': Users,
  'document': FileText,
  'calendar': Calendar,
  'task': CheckCircle2,
  'office': Building2,

  // Utilities icons
  'electricity': Zap,
  'water': Droplets,
  'gas': Flame,
  'internet': Wifi,
  'phone': Phone,
  'trash': Trash2,
  'maintenance': Wrench,
  'light': Lightbulb,

  // Miscellaneous icons
  'note': StickyNote,
  'misc': Puzzle,
  'gift': Gift,
  'question': HelpCircle,
  'tools': Settings,
  'clock': Clock,
  'location': MapPin,
  'others': MoreHorizontal
};


interface CategoryIconProps {
  icon: string;
  color: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function CategoryIcon({ icon, color, size = 'md', className = '' }: CategoryIconProps) {
  const IconComponent = iconMap[icon] || Utensils;
  const colorClass = colorMap[color] || 'bg-gray-500';

  const sizeClasses = {
    sm: 'w-8 h-8 p-1.5',
    md: 'w-10 h-10 p-2',
    lg: 'w-12 h-12 p-2.5',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div className={`${colorClass} ${sizeClasses[size]} rounded-full flex items-center justify-center ${className}`}>
      <IconComponent className={`${iconSizes[size]} text-white`} />
    </div>
  );
}