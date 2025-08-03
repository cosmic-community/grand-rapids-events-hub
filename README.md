# Grand Rapids Events Hub

![App Preview](https://imgix.cosmicjs.com/4fc1e5f0-7074-11f0-a051-23c10f41277a-photo-1578662996442-48f60103fc96-1754230530289.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, dark-themed events platform for Grand Rapids, Michigan featuring both list and calendar views for browsing upcoming events, plus a community event submission system with admin approval workflow.

## ✨ Features

- **Dual View Experience**: Switch between clean list view and interactive calendar view
- **Event Submission Portal**: Community members can submit events for approval
- **Rich Event Details**: Complete information including images, pricing, venue details
- **Responsive Calendar**: Interactive month-based calendar with event indicators
- **Modern Dark Theme**: Sleek, contemporary design optimized for readability
- **Admin Approval System**: Backend workflow for reviewing and approving submissions
- **Mobile Optimized**: Fully responsive design for all device sizes
- **Accessibility First**: WCAG compliant with proper contrast and keyboard navigation

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=688f6e85a07f0c8e05e4d109&clone_repository=688f7067a07f0c8e05e4d114)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "I want to create an events page for Grand Rapids, Michigan that shows the list of events, a calendar, and a way for people to submit new upcoming events that I can approve or deny in the backend before they get added to the list and calendar"

### Code Generation Prompt

> "Build an events page for Grand Rapids, MI that shows upcoming events in a list and calendar view and build a way that people can submit upcoming events for us to approve or reject on the backend. Have the color pallet be dark and modern. Have the UI and UX be a priority. add to Cosmic config apiEnvironment: "staging""

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Modern styling framework
- **Cosmic** - Headless CMS for content management
- **React Hook Form** - Form handling and validation
- **Lucide React** - Modern icon library
- **Date-fns** - Date manipulation utilities

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your Cosmic credentials:
   ```
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Run the development server:
   ```bash
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📖 Cosmic SDK Examples

### Fetching Events
```typescript
import { cosmic } from '@/lib/cosmic'

// Get all approved events
const { objects: events } = await cosmic.objects
  .find({ type: 'events' })
  .props(['title', 'slug', 'metadata'])
  .depth(1)

// Get single event by slug
const { object: event } = await cosmic.objects
  .findOne({ type: 'events', slug: 'event-slug' })
  .depth(1)
```

### Submitting New Events
```typescript
// Create event submission (awaiting approval)
await cosmic.objects.insertOne({
  type: 'event-submissions',
  title: formData.title,
  metadata: {
    title: formData.title,
    description: formData.description,
    event_date: formData.eventDate,
    start_time: formData.startTime,
    venue_name: formData.venueName,
    address: formData.address,
    submitter_name: formData.submitterName,
    submitter_email: formData.submitterEmail,
    website: formData.website || '',
    price: formData.price || '',
    notes: formData.notes || ''
  }
})
```

## 🎨 Cosmic CMS Integration

This application uses two Cosmic object types:

### Events Object Type
- **Purpose**: Approved and published events
- **Fields**: Title, description, event date, times, venue, address, featured image, contact info, website, price
- **Status**: Published events visible to users

### Event Submissions Object Type  
- **Purpose**: Community-submitted events awaiting approval
- **Fields**: Title, description, event date, times, venue, address, submitter info, website, price, notes
- **Workflow**: Submissions reviewed in Cosmic dashboard, approved events moved to Events type

### Admin Workflow
1. Users submit events through the web form
2. Submissions stored as "Event Submissions" in Cosmic
3. Admins review submissions in Cosmic dashboard
4. Approved events manually created as "Events" objects
5. Published events appear on the website

## 🚀 Deployment Options

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically

### Netlify
1. Connect repository to Netlify
2. Add environment variables
3. Set build command: `bun run build`
4. Set publish directory: `.next`

### Environment Variables for Production
Set these in your hosting platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY` 
- `COSMIC_WRITE_KEY`

<!-- README_END -->