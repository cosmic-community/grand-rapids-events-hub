import Link from 'next/link'
import { Calendar, Clock, MapPin, DollarSign } from 'lucide-react'
import { Event } from '@/types'
import { formatEventDate, stripHtml, truncateText } from '@/lib/utils'

interface EventCardProps {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  const eventDate = formatEventDate(event.metadata.event_date)
  const plainDescription = stripHtml(event.metadata.description)
  const truncatedDescription = truncateText(plainDescription, 120)

  return (
    <article className="card group cursor-pointer h-full flex flex-col">
      <Link href={`/events/${event.slug}`} className="flex flex-col h-full">
        {event.metadata.featured_image && (
          <div className="mb-4 overflow-hidden rounded-lg">
            <img
              src={`${event.metadata.featured_image.imgix_url}?w=600&h=300&fit=crop&auto=format,compress`}
              alt={event.title}
              width="300"
              height="150"
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <div className="flex-1 flex flex-col">
          <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors">
            {event.title}
          </h3>

          <div className="space-y-3 mb-4 flex-1">
            <div className="flex items-center text-gray-300 text-sm">
              <Calendar className="w-4 h-4 mr-2 text-purple-400 flex-shrink-0" />
              <span>{eventDate}</span>
            </div>

            <div className="flex items-center text-gray-300 text-sm">
              <Clock className="w-4 h-4 mr-2 text-purple-400 flex-shrink-0" />
              <span>
                {event.metadata.start_time}
                {event.metadata.end_time && ` - ${event.metadata.end_time}`}
              </span>
            </div>

            <div className="flex items-start text-gray-300 text-sm">
              <MapPin className="w-4 h-4 mr-2 text-purple-400 flex-shrink-0 mt-0.5" />
              <span>{event.metadata.venue_name}</span>
            </div>

            {event.metadata.price && (
              <div className="flex items-center text-gray-300 text-sm">
                <DollarSign className="w-4 h-4 mr-2 text-purple-400 flex-shrink-0" />
                <span>{event.metadata.price}</span>
              </div>
            )}

            <p className="text-gray-400 text-sm leading-relaxed">
              {truncatedDescription}
            </p>
          </div>

          <div className="text-purple-400 text-sm font-medium group-hover:text-purple-300 transition-colors">
            Learn more →
          </div>
        </div>
      </Link>
    </article>
  )
}