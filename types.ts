// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Cosmic metafield interface
export interface CosmicMetafield {
  id: string;
  key: string;
  type: string;
  title: string;
  required: boolean;
  value: any;
  helptext?: string;
}

// Event object type (approved events)
export interface Event extends CosmicObject {
  type: 'events';
  metadata: {
    title: string;
    description: string;
    event_date: string;
    start_time: string;
    end_time?: string;
    venue_name: string;
    address: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    contact_email?: string;
    website?: string;
    price?: string;
  };
}

// Event submission object type (pending approval)
export interface EventSubmission extends CosmicObject {
  type: 'event-submissions';
  metadata: {
    title: string;
    description: string;
    event_date: string;
    start_time: string;
    end_time?: string;
    venue_name: string;
    address: string;
    submitter_name: string;
    submitter_email: string;
    website?: string;
    price?: string;
    notes?: string;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Form data interface matching the exact form field names
export interface EventSubmissionFormData {
  title: string;
  description: string;
  event_date: string;
  start_time: string;
  end_time?: string;
  venue_name: string;
  address: string;
  submitter_name: string;
  submitter_email: string;
  website?: string;
  price?: string;
  notes?: string;
}

// Calendar types
export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime?: string;
  venue: string;
  price?: string;
  slug: string;
}

// View types
export type ViewMode = 'list' | 'calendar';

// Utility types
export type CreateEventData = Omit<EventSubmission, 'id' | 'created_at' | 'modified_at' | 'slug'>;

// Type guards
export function isEvent(obj: CosmicObject): obj is Event {
  return obj.type === 'events';
}

export function isEventSubmission(obj: CosmicObject): obj is EventSubmission {
  return obj.type === 'event-submissions';
}