'use client'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface SafeTranslationProps {
  children: (t: (key: string) => string) => React.ReactNode
}

export default function SafeTranslation({ children }: SafeTranslationProps) {
  const { t, i18n } = useTranslation()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Return a fallback during SSR to prevent hydration mismatches
  if (!isClient || !i18n.isInitialized) {
    const fallbackT = (key: string) => key.split('.').pop() || key
    return <>{children(fallbackT)}</>
  }

  return <>{children(t)}</>
}