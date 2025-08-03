import { createBucketClient } from '@cosmicjs/sdk'

if (!process.env.COSMIC_BUCKET_SLUG) {
  throw new Error('COSMIC_BUCKET_SLUG environment variable is required')
}

if (!process.env.COSMIC_READ_KEY) {
  throw new Error('COSMIC_READ_KEY environment variable is required')
}

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all approved events
export async function getEvents() {
  try {
    const response = await cosmic.objects
      .find({ type: 'events' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('-metadata.event_date');
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching events:', error);
    throw new Error('Failed to fetch events');
  }
}

// Fetch single event by slug
export async function getEvent(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'events', slug })
      .depth(1);
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching event:', error);
    throw new Error('Failed to fetch event');
  }
}

// Submit new event for approval
export async function submitEvent(data: any) {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'event-submissions',
      title: data.title,
      metadata: {
        title: data.title,
        description: data.description,
        event_date: data.eventDate,
        start_time: data.startTime,
        end_time: data.endTime || '',
        venue_name: data.venueName,
        address: data.address,
        submitter_name: data.submitterName,
        submitter_email: data.submitterEmail,
        website: data.website || '',
        price: data.price || '',
        notes: data.notes || ''
      }
    });
    return response.object;
  } catch (error) {
    console.error('Error submitting event:', error);
    throw new Error('Failed to submit event');
  }
}