'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Locale, 
  defaultLocale, 
  loadTranslations, 
  getTranslation, 
  formatNumber, 
  formatDate,
  Messages 
} from '@/lib/i18n';

interface TranslationsContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  messages: Messages;
  t: (key: string, params?: Record<string, string | number>) => string;
  formatNumber: (value: number) => string;
  formatDate: (date: Date) => string;
  isLoading: boolean;
}

const TranslationsContext = createContext<TranslationsContextType | undefined>(undefined);

interface TranslationsProviderProps {
  children: ReactNode;
  initialLocale?: Locale;
}

export function TranslationsProvider({ children, initialLocale = defaultLocale }: TranslationsProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [messages, setMessages] = useState<Messages>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load translations when locale changes
  useEffect(() => {
    const loadLocaleTranslations = async () => {
      setIsLoading(true);
      try {
        const translations = await loadTranslations(locale);
        setMessages(translations);
      } catch (error) {
        console.error('Failed to load translations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLocaleTranslations();
  }, [locale]);

  // Load initial locale from user preferences or localStorage
  useEffect(() => {
    const loadInitialLocale = async () => {
      try {
        // Try to get locale from user settings API
        const response = await fetch('/api/settings/locale');
        if (response.ok) {
          const data = await response.json();
          if (data.locale) {
            setLocaleState(data.locale);
            return;
          }
        }
      } catch (error) {
        console.warn('Failed to load locale from API:', error);
      }

      // Fallback to localStorage
      const savedLocale = localStorage.getItem('locale') as Locale;
      if (savedLocale && ['en', 'fr', 'sw', 'ha', 'yo', 'ig'].includes(savedLocale)) {
        setLocaleState(savedLocale);
      }
    };

    loadInitialLocale();
  }, []);

  const setLocale = async (newLocale: Locale) => {
    setLocaleState(newLocale);
    
    // Save to localStorage
    localStorage.setItem('locale', newLocale);
    
    // Save to user settings API
    try {
      await fetch('/api/settings/locale', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ locale: newLocale }),
      });
    } catch (error) {
      console.warn('Failed to save locale to API:', error);
    }
  };

  const t = (key: string, params?: Record<string, string | number>) => {
    return getTranslation(messages, key, params);
  };

  const formatNumberLocale = (value: number) => {
    return formatNumber(value, locale);
  };

  const formatDateLocale = (date: Date) => {
    return formatDate(date, locale);
  };

  const value: TranslationsContextType = {
    locale,
    setLocale,
    messages,
    t,
    formatNumber: formatNumberLocale,
    formatDate: formatDateLocale,
    isLoading,
  };

  return (
    <TranslationsContext.Provider value={value}>
      {children}
    </TranslationsContext.Provider>
  );
}

export function useTranslations() {
  const context = useContext(TranslationsContext);
  if (context === undefined) {
    throw new Error('useTranslations must be used within a TranslationsProvider');
  }
  return context;
}

// Hook for getting just the translation function
export function useT() {
  const { t } = useTranslations();
  return t;
} 