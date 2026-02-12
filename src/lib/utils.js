import clsx from 'clsx';

export function cn(...inputs) {
  return clsx(inputs);
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatNumber(number) {
  return new Intl.NumberFormat('en-US').format(number);
}

export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function getInitials(name) {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

export function formatDate(date, options = {}) {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat('en-US', { ...defaultOptions, ...options }).format(new Date(date));
}

export function getTimeAgo(date) {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
  return `${Math.floor(diffInSeconds / 31536000)}y ago`;
}

export function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getRandomColor() {
  const colors = [
    '#F26A27', // UinSports orange
    '#418BCA', // UinSports blue
    '#0C3042', // UinSports navy
    '#FF6B9D',
    '#C44569',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#8884D8',
    '#82CA9D'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

export function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise((resolve, reject) => {
      document.execCommand('copy') ? resolve() : reject();
      textArea.remove();
    });
  }
}

// Currency mapping: country code to currency code
const COUNTRY_CURRENCY_MAP = {
  'IN': 'INR', // India - Rupee
  'US': 'USD', // United States - Dollar
  'CA': 'CAD', // Canada - Dollar
  'GB': 'GBP', // United Kingdom - Pound
  'AU': 'AUD', // Australia - Dollar
  'EU': 'EUR', // European Union - Euro
  'JP': 'JPY', // Japan - Yen
  'CN': 'CNY', // China - Yuan
  'BR': 'BRL', // Brazil - Real
  'MX': 'MXN', // Mexico - Peso
  'SG': 'SGD', // Singapore - Dollar
  'AE': 'AED', // UAE - Dirham
  'SA': 'SAR', // Saudi Arabia - Riyal
  'ZA': 'ZAR', // South Africa - Rand
  'NZ': 'NZD', // New Zealand - Dollar
};

// Currency symbols
const CURRENCY_SYMBOLS = {
  'INR': '₹ ',
  'USD': '$ ',
  'CAD': '$ ',
  'GBP': '£',
  'AUD': 'A$',
  'EUR': '€',
  'JPY': '¥',
  'CNY': '¥',
  'BRL': 'R$',
  'MXN': '$',
  'SGD': 'S$',
  'AED': 'د.إ',
  'SAR': '﷼',
  'ZAR': 'R',
  'NZD': 'NZ$',
};

// Exchange rates relative to CAD (base currency)
// These are approximate rates - in production, fetch from an API
const EXCHANGE_RATES = {
  'CAD': 1.0,
  'USD': 0.74,
  'INR': 61.5,
  'GBP': 0.58,
  'AUD': 1.12,
  'EUR': 0.69,
  'JPY': 110.0,
  'CNY': 5.3,
  'BRL': 3.7,
  'MXN': 12.8,
  'SGD': 0.99,
  'AED': 2.7,
  'SAR': 2.75,
  'ZAR': 13.8,
  'NZD': 1.22,
};

// Get user's country from IP address
export async function getUserCountry() {
  try {
    // Try to get from localStorage first (cache for 24 hours)
    const cached = localStorage.getItem('userCountry');
    const cachedTime = localStorage.getItem('userCountryTime');

    if (cached && cachedTime) {
      const timeDiff = Date.now() - parseInt(cachedTime);
      // Cache for 24 hours
      if (timeDiff < 24 * 60 * 60 * 1000) {
        return cached;
      }
    }

    // Fetch from IP geolocation service
    const response = await fetch('https://ipapi.co/json/');
    if (!response.ok) {
      throw new Error('Failed to fetch location');
    }

    const data = await response.json();
    const countryCode = data.country_code || 'US';

    // Cache the result
    localStorage.setItem('userCountry', countryCode);
    localStorage.setItem('userCountryTime', Date.now().toString());

    return countryCode;
  } catch (error) {
    console.error('Error fetching user country:', error);
    // Fallback to United States for default USD pricing
    return 'US';
  }
}

// Get currency code from country code
export function getCurrencyFromCountry(countryCode) {
  const code = (countryCode || '').toUpperCase();

  // Business rule:
  // - India  -> INR
  // - Canada -> CAD
  // - Others -> USD (default)
  if (code === 'IN') return 'INR';
  if (code === 'CA') return 'CAD';

  return 'USD';
}

// Human‑readable currency labels
const CURRENCY_LABELS = {
  USD: 'USD (US Dollar)',
  CAD: 'CAD (Canadian Dollar)',
  INR: 'INR (Indian Rupee)',
};

export function getCurrencyLabel(currencyCode) {
  const code = (currencyCode || '').toUpperCase();
  return CURRENCY_LABELS[code] || code;
}

// Convert price from CAD to target currency
export function convertPrice(priceInCAD, targetCurrency) {
  const rate = EXCHANGE_RATES[targetCurrency] || 1.0;
  return (parseFloat(priceInCAD) * rate).toFixed(2);
}

// Format price: USD, CAD, INR before price (no $ or ₹ symbol)
export function formatPrice(price, currencyCode) {
  const code = (currencyCode || '').toUpperCase();
  const formattedPrice = parseFloat(price).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const symbol = CURRENCY_SYMBOLS[code] || (code === 'USD' || code === 'CAD' || code === 'INR' ? '' : code);
  return `${symbol}${formattedPrice}`;
}

// Get currency info (code, symbol, and formatted price)
export function getCurrencyInfo(countryCode) {
  const currencyCode = getCurrencyFromCountry(countryCode);
  const symbol = CURRENCY_SYMBOLS[currencyCode] || currencyCode;
  return {
    code: currencyCode,
    symbol: symbol,
  };
}
