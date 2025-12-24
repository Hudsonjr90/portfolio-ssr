import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Metadata } from 'next'

const Portfolio = dynamic(() => import('@/components/pages/Portfolio/Portfolio'), {
  ssr: true,
  loading: () => <div>Loading...</div>
})

export const metadata: Metadata = {
  title: 'Portfolio - Hudson Kennedy',
  description: 'View my portfolio of projects and work',
}

export default function PortfolioPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Portfolio />
    </Suspense>
  )
}