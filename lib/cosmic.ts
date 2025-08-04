import { createBucketClient } from '@cosmicjs/sdk'
import { Event, EventSubmission, EventSubmissionFormData, CosmicResponse } from '@/types'

// Create read-only client for client-side operations
const cosmicRead = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  apiEnvironment: 'staging'
})

// Create write client for server-side operations (includes write key)
const cosmicWrite = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
})

// Fetch all approved events
export async function getEvents(): Promise<Event[]> {
  try {
    const { objects } = await cosmicRead.objects
      .find({ type: 'events' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return objects as Event[]
  } catch (error) {
    // Handle 404 error when no objects are found
    if (error && typeof error === 'object' && 'status' in error && (error as any).status === 404) {
      return []
    }
    throw error
  }
}

// Fetch a single event by slug
export async function getEvent(slug: string): Promise<Event | null> {
  try {
    const { object } = await cosmicRead.objects
      .findOne({ type: 'events', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return object as Event
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error && (error as any).status === 404) {
      return null
    }
    throw error
  }
}

// Submit an event for review (saves to event-submissions object type)
export async function submitEvent(formData: EventSubmissionFormData): Promise<{ id: string }> {
  try {
    // Create the event submission object with proper metafield structure
    const eventSubmission = {
      title: formData.title,
      type: 'event-submissions',
      status: 'draft', // Set as draft for review
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
    }

    const { object } = await cosmicWrite.objects.insertOne(eventSubmission)
    
    return { id: object.id }
  } catch (error) {
    console.error('Error creating event submission:', error)
    throw new Error('Failed to submit event to Cosmic CMS')
  }
}

// Fetch event submissions (for admin use)
export async function getEventSubmissions(): Promise<EventSubmission[]> {
  try {
    const { objects } = await cosmicRead.objects
      .find({ type: 'event-submissions' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return objects as EventSubmission[]
  } catch (error) {
    // Handle 404 error when no objects are found
    if (error && typeof error === 'object' && 'status' in error && (error as any).status === 404) {
      return []
    }
    throw error
  }
}