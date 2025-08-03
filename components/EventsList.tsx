import { Event } from '@/types'
import EventCard from '@/components/EventCard'

interface EventsListProps {
  events: Event[]
}

export default function EventsList({ events }: EventsListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}