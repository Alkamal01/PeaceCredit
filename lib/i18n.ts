// Supported locales
export const locales = ['en', 'fr', 'sw', 'ha', 'yo', 'ig'] as const;
export type Locale = typeof locales[number];

// Default locale
export const defaultLocale: Locale = 'en';

// Language names
export const languageNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  sw: 'Kiswahili',
  ha: 'Hausa',
  yo: 'Yorùbá',
  ig: 'Igbo'
};

// Language flags (emoji)
export const languageFlags: Record<Locale, string> = {
  en: '🇺🇸',
  fr: '🇫🇷',
  sw: '🇹🇿',
  ha: '🇳🇬',
  yo: '🇳🇬',
  ig: '🇳🇬'
};

// Translation type
export type Messages = Record<string, any>;

// Translation cache
const translationCache = new Map<Locale, Messages>();

// Load translations for a specific locale
export async function loadTranslations(locale: Locale): Promise<Messages> {
  // Check cache first
  if (translationCache.has(locale)) {
    return translationCache.get(locale)!;
  }

  try {
    // Dynamically import the translation file
    const messages = await import(`../messages/${locale}.json`);
    const translations = messages.default || messages;
    
    // Cache the translations
    translationCache.set(locale, translations);
    
    return translations;
  } catch (error) {
    console.warn(`Failed to load translations for locale: ${locale}`, error);
    
    // Fallback to default locale if not already trying it
    if (locale !== defaultLocale) {
      return loadTranslations(defaultLocale);
    }
    
    // Return empty object as last resort
    return {};
  }
}

// Get nested translation value
export function getTranslation(messages: Messages, key: string, params?: Record<string, string | number>): string {
  const keys = key.split('.');
  let value: any = messages;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Return the key if translation not found
      return key;
    }
  }
  
  if (typeof value !== 'string') {
    return key;
  }
  
  // Replace parameters in the translation
  if (params) {
    return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
      return params[paramKey]?.toString() || match;
    });
  }
  
  return value;
}

// Format number according to locale
export function formatNumber(value: number, locale: Locale): string {
  try {
    return new Intl.NumberFormat(getIntlLocale(locale)).format(value);
  } catch (error) {
    return value.toString();
  }
}

// Format date according to locale
export function formatDate(date: Date, locale: Locale): string {
  try {
    return new Intl.DateTimeFormat(getIntlLocale(locale)).format(date);
  } catch (error) {
    return date.toLocaleDateString();
  }
}

// Get Intl locale string from our locale
function getIntlLocale(locale: Locale): string {
  const localeMap: Record<Locale, string> = {
    en: 'en-US',
    fr: 'fr-FR',
    sw: 'sw-TZ',
    ha: 'ha-NG',
    yo: 'yo-NG',
    ig: 'ig-NG'
  };
  
  return localeMap[locale] || 'en-US';
} 