import { NextRequest, NextResponse } from 'next/server'
import { submitEvent } from '@/lib/cosmic'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Basic validation - check for required fields using the correct field names
    if (!data.title || !data.description || !data.event_date || !data.start_time || 
        !data.venue_name || !data.address || !data.submitter_name || !data.submitter_email) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.submitter_email)) {
      return NextResponse.json(
        { message: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Date validation
    const eventDate = new Date(data.event_date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (eventDate < today) {
      return NextResponse.json(
        { message: 'Event date must be in the future' },
        { status: 400 }
      )
    }

    const result = await submitEvent(data)
    
    return NextResponse.json(
      { 
        message: 'Event submitted successfully! We\'ll review it and get back to you.',
        id: result.id 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error submitting event:', error)
    return NextResponse.json(
      { message: 'Failed to submit event. Please try again.' },
      { status: 500 }
    )
  }
}