export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import nextDynamic from 'next/dynamic'
import { Metadata } from 'next'

const About = nextDynamic(() => import('@/components/pages/About/About'), {
  ssr: true,
  loading: () => <div>Loading...</div>
})

export const metadata: Metadata = {
  title: 'About - Hudson Kennedy',
  description: 'Learn more about Hudson Kennedy - Professional developer',
}

export default function AboutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <About />
    </Suspense>
  )
}