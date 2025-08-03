// app/events/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getEvent } from '@/lib/cosmic'
import { formatEventDate, stripHtml } from '@/lib/utils'
import Header from '@/components/Header'
import { Calendar, Clock, MapPin, DollarSign, Globe, Mail } from 'lucide-react'
import Link from 'next/link'
import { Event } from '@/types'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params
  const event = await getEvent(slug) as Event | null

  if (!event) {
    notFound()
  }

  const eventDate = formatEventDate(event.metadata.event_date)
  const plainDescription = stripHtml(event.metadata.description)

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/"
          className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8 transition-colors"
        >
          ← Back to Events
        </Link>

        <article className="max-w-4xl mx-auto">
          {event.metadata.featured_image && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={`${event.metadata.featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
                alt={event.title}
                width="1200"
                height="600"
                className="w-full h-96 object-cover"
              />
            </div>
          )}

          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {event.title}
            </h1>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center text-gray-300">
                  <Calendar className="w-5 h-5 mr-3 text-purple-400" />
                  <span>{eventDate}</span>
                </div>
                
                <div className="flex items-center text-gray-300">
                  <Clock className="w-5 h-5 mr-3 text-purple-400" />
                  <span>
                    {event.metadata.start_time}
                    {event.metadata.end_time && ` - ${event.metadata.end_time}`}
                  </span>
                </div>
                
                <div className="flex items-start text-gray-300">
                  <MapPin className="w-5 h-5 mr-3 text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">{event.metadata.venue_name}</div>
                    <div className="text-sm text-gray-400 whitespace-pre-line">
                      {event.metadata.address}
                    </div>
                  </div>
                </div>
                
                {event.metadata.price && (
                  <div className="flex items-center text-gray-300">
                    <DollarSign className="w-5 h-5 mr-3 text-purple-400" />
                    <span>{event.metadata.price}</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                {event.metadata.website && (
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 mr-3 text-purple-400" />
                    <a
                      href={event.metadata.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Event Website
                    </a>
                  </div>
                )}
                
                {event.metadata.contact_email && (
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-3 text-purple-400" />
                    <a
                      href={`mailto:${event.metadata.contact_email}`}
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Contact Organizer
                    </a>
                  </div>
                )}
              </div>
            </div>
          </header>

          <section className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-semibold text-white mb-4">About This Event</h2>
            <div 
              className="text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: event.metadata.description }}
            />
          </section>
        </article>
      </div>
    </main>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const event = await getEvent(slug) as Event | null

  if (!event) {
    return {
      title: 'Event Not Found - Grand Rapids Events Hub'
    }
  }

  const plainDescription = stripHtml(event.metadata.description)

  return {
    title: `${event.title} - Grand Rapids Events Hub`,
    description: plainDescription.slice(0, 160),
    openGraph: {
      title: event.title,
      description: plainDescription.slice(0, 160),
      images: event.metadata.featured_image ? [
        {
          url: `${event.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
          width: 1200,
          height: 630,
          alt: event.title,
        }
      ] : [],
    },
  }
}