export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import nextDynamic from 'next/dynamic'
import { Metadata } from 'next'

const Home = nextDynamic(() => import('@/components/pages/Home/Home'), {
  ssr: true,
  loading: () => <div>Loading...</div>
})

export const metadata: Metadata = {
  title: 'Portfolio - Hudson Kennedy',
  description: 'Professional developer portfolio showcasing skills and projects',
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Home />
    </Suspense>
  )
}