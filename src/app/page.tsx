import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Metadata } from 'next'

const Home = dynamic(() => import('@/components/pages/Home/Home'), {
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