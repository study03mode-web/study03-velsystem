export interface Category {
  id: string;
  name: string;
  type: number; // 1 = Expense, 2 = Income
  color: string;
  icon: string;
  deletable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryData {
  name: string;
  type: number;
  color: string;
  icon: string;
}

export interface UpdateCategoryData {
  name?: string;
  type?: number;
  color?: string;
  icon?: string;
}

export const CATEGORY_COLORS = [
  'indigo','teal','yellow', 'orange',
  'maroon', 'pink', 'lime',
  'violet', 'rose', 'slate',
  'sky','purple', 'stone',

  'red', 'green', 'blue', 'amber', 'cyan',
  'emerald', 'fuchsia', 'gray', 'zinc',

  'brown', 'magenta', 'bronze', 'peach', 'lavender',
  'mint', 'olive', 'navy', 'gold',
  'charcoal', 'coral', 'aqua', 'plum', 'mustard',
  'ruby', 'sapphire', 'topaz'

] as const;

export type CategoryColor = typeof CATEGORY_COLORS[number];

export const CATEGORY_ICONS = {
  'Food': [
    'coffee', 'milk', 'wine-glass', 'salad', 'sandwich',
    'apple', 'banana', 'carrot', 'egg', 'fish',
    'cookie','pizza', 'ice-cream', 'steak'
  ],
  'Travel': [
    'airplane', 'bus', 'car', 'train', 'taxi',
    'compass', 'map', 'ticket', 'suitcase', 'backpack',

    'ship', 'bike'
  ],
  'Shopping': [
    'shopping-bag','shopping-basket','credit-card','money-bill','barcode','qrcode',

    'cart', 'tag'
  ],
  'Family': [
    'family', 'home', 'baby', 'heart'
  ],
  'Entertainment': [
    'game','movie','music','dance','camera','drama','tv','party'
  ],
  'Medical': [
    'doctor','pill','syringe','heartbeat','thermometer'
  ],
  'Finance': [
    'wallet','bank','piggy-bank','salary','investment','loan','debt'
  ],
  'Business': [
    'briefcase','chart','meeting','document','calendar','task','office'
  ],
  'Utilities': [
    'electricity','water','gas','internet','phone','trash','maintenance','light'
  ],
  'Miscellaneous': [
    'note','misc','gift','question','tools','clock','location'
  ]
} as const;

export const colorMap: Record<string, string> = {
  'indigo': 'bg-indigo-500',
  'teal': 'bg-teal-500',
  'yellow': 'bg-yellow-500',
  'orange': 'bg-orange-500',
  'maroon': 'bg-red-800',
  'pink': 'bg-pink-500',
  'lime': 'bg-lime-500',
  'violet': 'bg-violet-500',
  'rose': 'bg-rose-500',
  'slate': 'bg-slate-500',
  'sky': 'bg-sky-500',
  'purple': 'bg-purple-500',
  'stone': 'bg-stone-500',

  'red': 'bg-red-500',
  'green': 'bg-green-700',
  'blue': 'bg-blue-800',
  'amber': 'bg-amber-500',
  'cyan': 'bg-cyan-500',
  'emerald': 'bg-emerald-500',
  'fuchsia': 'bg-fuchsia-800',
  'gray': 'bg-gray-400',
  'zinc': 'bg-zinc-500',

  'brown': 'bg-yellow-900',
  'magenta': 'bg-pink-700',
  'bronze': 'bg-yellow-800',
  'peach': 'bg-orange-200',
  'lavender': 'bg-purple-200',
  'mint': 'bg-green-200',
  'olive': 'bg-lime-800',
  'navy': 'bg-blue-900',
  'gold': 'bg-yellow-400',
  'charcoal': 'bg-gray-800',
  'coral': 'bg-red-300',
  'aqua': 'bg-cyan-200',
  'plum': 'bg-purple-800',
  'mustard': 'bg-yellow-600',
  'ruby': 'bg-red-700',
  'sapphire': 'bg-blue-900',
  'topaz': 'bg-yellow-300'
};

export const iconTitle: Record<string, string> = {
  'Food': '🍽️',
  'Travel': '✈️',
  'Shopping': '🛍️',
  'Family': '👨‍👩‍👧‍👦',
  'Entertainment': '🎭',
  'Medical': '🩺',
  'Finance': '💰',
  'Business': '💼',
  'Utilities': '⚙️',
  'Miscellaneous': '📦'
};