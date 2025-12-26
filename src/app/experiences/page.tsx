export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import nextDynamic from 'next/dynamic'
import { Metadata } from 'next'

const Experiences = nextDynamic(() => import('@/components/pages/Experiences/Experiences'), {
  ssr: true,
  loading: () => <div>Loading...</div>
})

export const metadata: Metadata = {
  title: 'Experiences - Hudson Kennedy',
  description: 'Professional work experience and career history',
}

export default function ExperiencesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Experiences />
    </Suspense>
  )
}