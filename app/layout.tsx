import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Grand Rapids Events Hub',
  description: 'Discover upcoming events in Grand Rapids, Michigan. Browse events by list or calendar view and submit your own events for approval.',
  keywords: 'Grand Rapids, Michigan, events, calendar, community, entertainment, local events',
  authors: [{ name: 'Grand Rapids Events Hub' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Grand Rapids Events Hub',
    description: 'Discover upcoming events in Grand Rapids, Michigan',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grand Rapids Events Hub',
    description: 'Discover upcoming events in Grand Rapids, Michigan',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="min-h-screen bg-dark-900">
          {children}
        </div>
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}