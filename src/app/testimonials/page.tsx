import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Metadata } from 'next'

const Testimonials = dynamic(() => import('@/components/pages/Testimonials/Testimonials'), {
  ssr: true,
  loading: () => <div>Loading...</div>
})

export const metadata: Metadata = {
  title: 'Testimonials - Hudson Kennedy',
  description: 'Client testimonials and feedback',
}

export default function TestimonialsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Testimonials />
    </Suspense>
  )
}