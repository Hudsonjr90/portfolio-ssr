import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'
import { ThemeProvider } from '@/context/ThemeContext'
import { ParticlesProvider } from '@/context/ParticlesContext'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import SecurityMonitor from '@/components/SecurityMonitor/SecurityMonitor'
import { initializeTrustedTypes } from '@/utils/security'
import 'devicon/devicon.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portfolio - Professional Developer',
  description: 'Professional portfolio showcasing development skills and projects',
  keywords: 'developer, portfolio, react, nextjs, typescript, javascript',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps): React.ReactElement {
  if (typeof window !== 'undefined') {
    initializeTrustedTypes()
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <ParticlesProvider>
            <SecurityMonitor />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </ParticlesProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}