'use client'

import { useState } from 'react'
import { Event, ViewMode } from '@/types'
import ViewToggle from '@/components/ViewToggle'
import EventsList from '@/components/EventsList'
import EventsCalendar from '@/components/EventsCalendar'

interface EventsSectionProps {
  initialEvents: Event[]
}

export default function EventsSection({ initialEvents }: EventsSectionProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [events] = useState<Event[]>(initialEvents)

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Upcoming Events</h2>
          <p className="text-gray-400">
            {events.length} event{events.length !== 1 ? 's' : ''} found
          </p>
        </div>
        
        <ViewToggle currentView={viewMode} onViewChange={setViewMode} />
      </div>

      {events.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-4">No events found</div>
          <p className="text-gray-500">
            Be the first to add an event to the community!
          </p>
        </div>
      ) : (
        <>
          {viewMode === 'list' ? (
            <EventsList events={events} />
          ) : (
            <EventsCalendar events={events} />
          )}
        </>
      )}
    </div>
  )
}