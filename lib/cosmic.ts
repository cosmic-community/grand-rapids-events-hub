import { createBucketClient } from '@cosmicjs/sdk'
import { Event, EventSubmission, CosmicResponse, EventSubmissionFormData } from '@/types'

// Read-only client for public data
const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG!,
  readKey: process.env.COSMIC_READ_KEY!,
})

// Write client for server-side operations (includes write key)
const cosmicWrite = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG!,
  readKey: process.env.COSMIC_READ_KEY!,
  writeKey: process.env.COSMIC_WRITE_KEY!,
})

export async function getEvents(): Promise<Event[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'events' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return objects as Event[]
  } catch (error) {
    console.error('Error fetching events:', error)
    return []
  }
}

export async function getEvent(slug: string): Promise<Event | null> {
  try {
    const { object } = await cosmic.objects
      .findOne({ type: 'events', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return object as Event
  } catch (error) {
    console.error(`Error fetching event with slug ${slug}:`, error)
    return null
  }
}

export async function submitEvent(formData: EventSubmissionFormData): Promise<{ id: string }> {
  try {
    const { object } = await cosmicWrite.objects.insertOne({
      title: formData.title,
      type: 'event-submissions',
      status: 'published',
      metafields: [
        {
          id: '4e81f2fd-37f9-4a1c-8a22-8e8616bd2257',
          key: 'title',
          type: 'text',
          title: 'Event Title',
          required: true,
          value: formData.title
        },
        {
          id: 'a7f2d90f-ade2-41ab-a031-be61d13be29e',
          key: 'description',
          type: 'textarea',
          title: 'Description',
          required: true,
          value: formData.description
        },
        {
          id: 'dded015e-b47c-4e4d-b7b4-92ccf9637526',
          key: 'event_date',
          type: 'date',
          title: 'Event Date',
          required: true,
          value: formData.event_date
        },
        {
          id: '08c37c83-7522-4bcd-bc49-90fade885db8',
          key: 'start_time',
          type: 'text',
          title: 'Start Time',
          required: true,
          value: formData.start_time
        },
        {
          id: 'd744cec2-ebf8-4eb6-9b50-8efd9021dadc',
          key: 'end_time',
          type: 'text',
          title: 'End Time',
          required: false,
          value: formData.end_time || ''
        },
        {
          id: 'de7bbcb4-da30-451a-9e87-94fd96a4845d',
          key: 'venue_name',
          type: 'text',
          title: 'Venue Name',
          required: true,
          value: formData.venue_name
        },
        {
          id: '043b18fb-2010-49a1-bdda-73e07e3c77bf',
          key: 'address',
          type: 'textarea',
          title: 'Address',
          required: true,
          value: formData.address
        },
        {
          id: '9b61bc6d-b827-491a-8e7f-321ee480c930',
          key: 'submitter_name',
          type: 'text',
          title: 'Submitter Name',
          required: true,
          value: formData.submitter_name
        },
        {
          id: '3aca52d2-7c40-4d3e-861a-50feb499c83d',
          key: 'submitter_email',
          type: 'text',
          title: 'Submitter Email',
          required: true,
          value: formData.submitter_email
        },
        {
          id: 'c5850080-ed8f-424d-b385-1e028cf73564',
          key: 'website',
          type: 'text',
          title: 'Event Website',
          required: false,
          value: formData.website || ''
        },
        {
          id: 'd774490f-c726-4aca-a6b5-9fd02b1426a1',
          key: 'price',
          type: 'text',
          title: 'Price',
          required: false,
          value: formData.price || ''
        },
        {
          id: '90b49e21-21c4-4987-af2c-e41b0d271f92',
          key: 'notes',
          type: 'textarea',
          title: 'Additional Notes',
          required: false,
          value: formData.notes || ''
        }
      ]
    })

    return { id: object.id }
  } catch (error) {
    console.error('Error submitting event to Cosmic:', error)
    throw new Error('Failed to submit event to CMS')
  }
}