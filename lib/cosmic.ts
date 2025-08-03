import { createBucketClient } from '@cosmicjs/sdk'

// Initialize Cosmic client for read operations
const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
})

// Initialize Cosmic client for write operations (server-side only)
const cosmicWrite = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
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
    const { object } = await cosmicWrite.objects.insertOne({
      title: formData.title,
      type: 'event-submissions',
      metadata: {
        title: formData.title,
        description: formData.description,
        event_date: formData.event_date,
        start_time: formData.start_time,
        end_time: formData.end_time || '',
        venue_name: formData.venue_name,
        address: formData.address,
        submitter_name: formData.submitter_name,
        submitter_email: formData.submitter_email,
        website: formData.website || '',
        price: formData.price || '',
        notes: formData.notes || ''
      }
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