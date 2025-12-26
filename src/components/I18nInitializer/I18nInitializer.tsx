'use client'

import { useEffect } from 'react'
import i18n from '@/config/i18n'

export default function I18nInitializer() {
  useEffect(() => {
    // Initialize i18n on client-side only
    i18n.changeLanguage(typeof window !== 'undefined' ? localStorage.getItem('language') || 'pt' : 'pt')
  }, [])

  return null // This component doesn't render anything
}