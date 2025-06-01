"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, Globe, CheckCircle, AlertCircle, Save, RefreshCw, Loader2, Languages } from "lucide-react"
import { useCurrency } from "@/contexts/CurrencyContext"
import { useTranslations } from "@/contexts/TranslationsContext"
import { locales, languageNames, languageFlags, type Locale } from "@/lib/i18n"

export default function CurrencySettingsPage() {
  const { 
    settings: currencySettings, 
    updateSettings: updateCurrencySettings, 
    formatCurrency, 
    getCurrentCurrency,
    isLoading: currencyLoading 
  } = useCurrency()
  
  const { 
    locale, 
    setLocale, 
    t, 
    formatNumber, 
    formatDate,
    isLoading: translationsLoading 
  } = useTranslations()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSave = async () => {
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {

      setSuccess(t('currency_settings.success_message'))
    } catch (err) {
      setError(t('errors.generic'))
    } finally {
      setIsLoading(false)
    }
  }

  if (currencyLoading || translationsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>{t('common.loading')}</span>
        </div>
      </div>
    )
  }

  const currentCurrency = getCurrentCurrency()

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t('currency_settings.title')}</h1>
        <p className="text-muted-foreground mt-2">
          {t('currency_settings.description')}
        </p>
      </div>

      {error && (
        <Alert className="mb-6" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-6" variant="default">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6">
        {/* Current Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              {t('currency_settings.current_settings')}
            </CardTitle>
            <CardDescription>
              {t('currency_settings.current_description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">{t('common.currency')}</Label>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-lg">
                    {currentCurrency?.flag} {currentCurrency?.code}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {currentCurrency?.name}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">{t('common.language')}</Label>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-lg">
                    {languageFlags[locale]} {languageNames[locale]}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Currency Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              {t('currency_settings.currency_selection')}
            </CardTitle>
            <CardDescription>
              {t('currency_settings.currency_description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="currency">{t('common.currency')}</Label>
              <Select
                value={currencySettings.currency}
                onValueChange={(value) => updateCurrencySettings({ currency: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('currency_settings.currency_selection')} />
                </SelectTrigger>
                <SelectContent>
                  {[
                    { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
                    { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', flag: '🇳🇬' },
                    { code: 'GHS', name: 'Ghanaian Cedi', symbol: '₵', flag: '🇬🇭' },
                    { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', flag: '🇰🇪' },
                    { code: 'UGX', name: 'Ugandan Shilling', symbol: 'USh', flag: '🇺🇬' },
                    { code: 'TZS', name: 'Tanzanian Shilling', symbol: 'TSh', flag: '🇹🇿' },
                    { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦' },
                    { code: 'XOF', name: 'West African CFA Franc', symbol: 'CFA', flag: '🌍' },
                    { code: 'XAF', name: 'Central African CFA Franc', symbol: 'FCFA', flag: '🌍' }
                  ].map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center gap-2">
                        <span>{currency.flag}</span>
                        <span>{currency.code}</span>
                        <span className="text-muted-foreground">- {currency.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Language Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="h-5 w-5" />
              {t('currency_settings.locale_selection')}
            </CardTitle>
            <CardDescription>
              {t('currency_settings.locale_description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="language">{t('common.language')}</Label>
              <Select
                value={locale}
                onValueChange={(value) => setLocale(value as Locale)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('currency_settings.locale_selection')} />
                </SelectTrigger>
                <SelectContent>
                  {locales.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      <div className="flex items-center gap-2">
                        <span>{languageFlags[loc]}</span>
                        <span>{languageNames[loc]}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>{t('currency_settings.preview')}</CardTitle>
            <CardDescription>
              {t('currency_settings.formatting_preview')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium">{t('currency_settings.sample_amount')}</Label>
                  <p className="text-lg font-mono">{formatCurrency(1234.56)}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">{t('currency_settings.large_amount')}</Label>
                  <p className="text-lg font-mono">{formatCurrency(1234567.89)}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">{t('currency_settings.number_format')}</Label>
                  <p className="text-lg font-mono">{formatNumber(12345.67)}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium">{t('currency_settings.date_format')}</Label>
                  <p className="text-lg font-mono">{formatDate(new Date())}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">{t('currency_settings.currency_format')}</Label>
                  <p className="text-lg font-mono">{currentCurrency?.symbol} (Symbol)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Information */}
        <Card>
          <CardHeader>
            <CardTitle>{t('currency_settings.important_info')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>{t('currency_settings.info_immediate')}</p>
              <p>{t('currency_settings.info_persist')}</p>
              <p>{t('currency_settings.info_locale')}</p>
              <p>{t('currency_settings.info_accurate')}</p>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isLoading} size="lg">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t('currency_settings.save_settings')}
          </Button>
        </div>
      </div>
    </div>
  )
} 