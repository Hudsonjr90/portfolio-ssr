import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Metadata } from 'next'

const Skills = dynamic(() => import('@/components/pages/Skills/Skills'), {
  ssr: true,
  loading: () => <div>Loading...</div>
})

export const metadata: Metadata = {
  title: 'Skills - Hudson Kennedy',
  description: 'Technical skills and expertise',
}

export default function SkillsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Skills />
    </Suspense>
  )
}