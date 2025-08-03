import { NextRequest, NextResponse } from 'next/server'
import { submitEvent } from '@/lib/cosmic'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Basic validation
    if (!data.title || !data.description || !data.eventDate || !data.startTime || 
        !data.venueName || !data.address || !data.submitterName || !data.submitterEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.submitterEmail)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Date validation
    const eventDate = new Date(data.eventDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (eventDate < today) {
      return NextResponse.json(
        { error: 'Event date must be in the future' },
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
      { error: 'Failed to submit event. Please try again.' },
      { status: 500 }
    )
  }
}