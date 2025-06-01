"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

interface CurrencySettings {
  currency: string
  locale: string
}

interface Currency {
  code: string
  name: string
  symbol: string
  flag: string
}

interface Locale {
  code: string
  name: string
  flag: string
}

interface CurrencyContextType {
  settings: CurrencySettings
  updateSettings: (currency: string, locale: string) => Promise<{ success: boolean; error?: string }>
  formatCurrency: (amount: number | string) => string
  getCurrencySymbol: () => string
  getCurrentCurrency: () => Currency | undefined
  currencies: Currency[]
  locales: Locale[]
  isLoading: boolean
}

const currencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', flag: '🇳🇬' },
  { code: 'GHS', name: 'Ghanaian Cedi', symbol: '₵', flag: '🇬🇭' },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', flag: '🇰🇪' },
  { code: 'UGX', name: 'Ugandan Shilling', symbol: 'USh', flag: '🇺🇬' },
  { code: 'TZS', name: 'Tanzanian Shilling', symbol: 'TSh', flag: '🇹🇿' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦' },
  { code: 'XOF', name: 'West African CFA Franc', symbol: 'CFA', flag: '🌍' },
  { code: 'XAF', name: 'Central African CFA Franc', symbol: 'FCFA', flag: '🌍' }
]

const locales: Locale[] = [
  { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
  { code: 'en-GB', name: 'English (UK)', flag: '🇬🇧' },
  { code: 'fr-FR', name: 'French', flag: '🇫🇷' },
  { code: 'sw-KE', name: 'Swahili', flag: '🇰🇪' },
  { code: 'ha-NG', name: 'Hausa', flag: '🇳🇬' },
  { code: 'yo-NG', name: 'Yoruba', flag: '🇳🇬' },
  { code: 'ig-NG', name: 'Igbo', flag: '🇳🇬' }
]

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<CurrencySettings>({
    currency: 'USD',
    locale: 'en-US'
  })
  const [isLoading, setIsLoading] = useState(true)

  // Fetch currency settings on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings/currency')
        if (response.ok) {
          const data = await response.json()
          if (data.success) {
            setSettings(data.data)
          }
        }
      } catch (error) {
        console.error('Error fetching currency settings:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSettings()
  }, [])

  const updateSettings = async (currency: string, locale: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const newSettings = { currency, locale }
      const response = await fetch('/api/settings/currency', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSettings),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSettings(newSettings)
        return { success: true }
      } else {
        return { success: false, error: data.error || 'Failed to update settings' }
      }
    } catch (error) {
      console.error('Error updating currency settings:', error)
      return { success: false, error: 'An error occurred while updating settings' }
    }
  }

  const getCurrencySymbol = () => {
    const currency = currencies.find(c => c.code === settings.currency)
    return currency?.symbol || '$'
  }

  const getCurrentCurrency = () => {
    return currencies.find(c => c.code === settings.currency)
  }

  const formatCurrency = (amount: number | string) => {
    if (!amount) return ''
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount
    if (isNaN(numAmount)) return ''
    
    const symbol = getCurrencySymbol()
    
    // Format based on currency
    if (settings.currency === 'NGN' || settings.currency === 'GHS' || settings.currency === 'KES') {
      // For African currencies, show symbol before amount with comma separators
      return `${symbol}${numAmount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
    } else {
      // For other currencies, use standard formatting
      return `${symbol}${numAmount.toLocaleString(settings.locale, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`
    }
  }

  const value: CurrencyContextType = {
    settings,
    updateSettings,
    formatCurrency,
    getCurrencySymbol,
    getCurrentCurrency,
    currencies,
    locales,
    isLoading
  }

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}

export { currencies, locales } 