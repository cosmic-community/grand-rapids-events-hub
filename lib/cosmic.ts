import { createBucketClient } from '@cosmicjs/sdk'

// Initialize Cosmic client for read operations
const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  apiEnvironment: 'staging'
})

// Initialize Cosmic client for write operations (server-side only)
const cosmicWrite = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
})

// Type guard to check if error has status property
function isCosmicError(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Get all events
export async function getEvents(limit: number = 10, skip: number = 0) {
  try {
    const { objects } = await cosmic.objects
      .find({
        type: 'events',
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(limit)
      .skip(skip)
    
    return objects || []
  } catch (error) {
    // Handle 404 error when no objects are found
    if (isCosmicError(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

// Get single event by slug
export async function getEvent(slug: string) {
  try {
    const { object } = await cosmic.objects
      .findOne({
        type: 'events',
        slug,
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return object
  } catch (error) {
    // Handle 404 error when object is not found
    if (isCosmicError(error) && error.status === 404) {
      return null
    }
    throw error
  }
}

// Submit event to event-submissions object type
export async function submitEvent(formData: {
  title: string
  description: string
  event_date: string
  start_time: string
  end_time?: string
  venue_name: string
  address: string
  submitter_name: string
  submitter_email: string
  website?: string
  price?: string
  notes?: string
}) {
  try {
    // Create the metafields array matching the exact structure from the Cosmic API
    const metafields = [
      {
        key: 'title',
        type: 'text',
        title: 'Event Title',
        id: '4e81f2fd-37f9-4a1c-8a22-8e8616bd2257',
        value: formData.title,
        required: true
      },
      {
        key: 'description',
        type: 'textarea',
        title: 'Description',
        id: 'a7f2d90f-ade2-41ab-a031-be61d13be29e',
        value: formData.description,
        required: true
      },
      {
        key: 'event_date',
        type: 'date',
        title: 'Event Date',
        id: 'dded015e-b47c-4e4d-b7b4-92ccf9637526',
        value: formData.event_date,
        required: true
      },
      {
        key: 'start_time',
        type: 'text',
        title: 'Start Time',
        id: '08c37c83-7522-4bcd-bc49-90fade885db8',
        value: formData.start_time,
        required: true
      },
      {
        key: 'end_time',
        type: 'text',
        title: 'End Time',
        id: 'd744cec2-ebf8-4eb6-9b50-8efd9021dadc',
        value: formData.end_time || '',
        required: false
      },
      {
        key: 'venue_name',
        type: 'text',
        title: 'Venue Name',
        id: 'de7bbcb4-da30-451a-9e87-94fd96a4845d',
        value: formData.venue_name,
        required: true
      },
      {
        key: 'address',
        type: 'textarea',
        title: 'Address',
        id: '043b18fb-2010-49a1-bdda-73e07e3c77bf',
        value: formData.address,
        required: true
      },
      {
        key: 'submitter_name',
        type: 'text',
        title: 'Submitter Name',
        id: '9b61bc6d-b827-491a-8e7f-321ee480c930',
        value: formData.submitter_name,
        required: true
      },
      {
        key: 'submitter_email',
        type: 'text',
        title: 'Submitter Email',
        id: '3aca52d2-7c40-4d3e-861a-50feb499c83d',
        value: formData.submitter_email,
        required: true
      },
      {
        key: 'website',
        type: 'text',
        title: 'Event Website',
        id: 'c5850080-ed8f-424d-b385-1e028cf73564',
        value: formData.website || '',
        required: false
      },
      {
        key: 'price',
        type: 'text',
        title: 'Price',
        id: 'd774490f-c726-4aca-a6b5-9fd02b1426a1',
        value: formData.price || '',
        required: false
      },
      {
        key: 'notes',
        type: 'textarea',
        title: 'Additional Notes',
        id: '90b49e21-21c4-4987-af2c-e41b0d271f92',
        value: formData.notes || '',
        required: false
      }
    ]

    console.log('Submitting event with data:', {
      title: formData.title,
      type: 'event-submissions',
      metafields
    })

    const { object } = await cosmicWrite.objects.insertOne({
      title: formData.title,
      type: 'event-submissions',
      metafields
    })
    
    return object
  } catch (error) {
    console.error('Error submitting event to Cosmic:', error)
    throw error
  }
}

// Get event submissions (for admin use)
export async function getEventSubmissions(limit: number = 10, skip: number = 0) {
  try {
    const { objects } = await cosmic.objects
      .find({
        type: 'event-submissions',
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(limit)
      .skip(skip)
    
    return objects || []
  } catch (error) {
    // Handle 404 error when no objects are found
    if (isCosmicError(error) && error.status === 404) {
      return []
    }
    throw error
  }
}