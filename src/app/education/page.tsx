export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import nextDynamic from 'next/dynamic'
import { Metadata } from 'next'

const Education = nextDynamic(() => import('@/components/pages/Education/Education'), {
  ssr: true,
  loading: () => <div>Loading...</div>
})

export const metadata: Metadata = {
  title: 'Education - Hudson Kennedy',
  description: 'Educational background and certifications',
}

export default function EducationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Education />
    </Suspense>
  )
}