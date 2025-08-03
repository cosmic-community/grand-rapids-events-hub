import { Suspense } from 'react'
import { getEvents } from '@/lib/cosmic'
import Header from '@/components/Header'
import EventsSection from '@/components/EventsSection'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Event } from '@/types'

export default async function HomePage() {
  const events = await getEvents() as Event[]

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Grand Rapids
            <span className="block text-purple-400">Events Hub</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover amazing events happening in Grand Rapids, Michigan. Browse by list or calendar view, and submit your own events for the community.
          </p>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <EventsSection initialEvents={events} />
        </Suspense>
      </div>
    </main>
  )
}