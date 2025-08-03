import Link from 'next/link'
import { X, Clock, MapPin } from 'lucide-react'
import { Event } from '@/types'
import { format } from 'date-fns'

interface CalendarEventPopoverProps {
  date: Date
  events: Event[]
  onClose: () => void
}

export default function CalendarEventPopover({ date, events, onClose }: CalendarEventPopoverProps) {
  return (
    <div className="card animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-white">
          Events on {format(date, 'MMMM d, yyyy')}
        </h4>
        <button
          onClick={onClose}
          className="p-1 hover:bg-dark-600 rounded-lg transition-colors text-gray-400 hover:text-white"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {events.map(event => (
          <Link
            key={event.id}
            href={`/events/${event.slug}`}
            className="block p-4 bg-dark-700 rounded-lg hover:bg-dark-600 transition-colors"
          >
            <h5 className="font-medium text-white mb-2 hover:text-purple-400 transition-colors">
              {event.title}
            </h5>
            
            <div className="space-y-1 text-sm text-gray-300">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-purple-400 flex-shrink-0" />
                <span>
                  {event.metadata.start_time}
                  {event.metadata.end_time && ` - ${event.metadata.end_time}`}
                </span>
              </div>
              
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-purple-400 flex-shrink-0" />
                <span>{event.metadata.venue_name}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}