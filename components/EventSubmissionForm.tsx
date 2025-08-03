'use client'

import { useState } from 'react'
import LoadingSpinner from './LoadingSpinner'

interface FormData {
  title: string
  description: string
  event_date: string
  start_time: string
  end_time: string
  venue_name: string
  address: string
  submitter_name: string
  submitter_email: string
  website: string
  price: string
  notes: string
}

export default function EventSubmissionForm() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    event_date: '',
    start_time: '',
    end_time: '',
    venue_name: '',
    address: '',
    submitter_name: '',
    submitter_email: '',
    website: '',
    price: '',
    notes: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/submit-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to submit event')
      }

      setSubmitStatus('success')
      // Reset form
      setFormData({
        title: '',
        description: '',
        event_date: '',
        start_time: '',
        end_time: '',
        venue_name: '',
        address: '',
        submitter_name: '',
        submitter_email: '',
        website: '',
        price: '',
        notes: ''
      })
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit Your Event</h2>
        
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800">Thank you! Your event has been submitted for review.</p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800">{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Event Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Event Date */}
          <div>
            <label htmlFor="event_date" className="block text-sm font-medium text-gray-700 mb-2">
              Event Date *
            </label>
            <input
              type="date"
              id="event_date"
              name="event_date"
              required
              value={formData.event_date}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Time Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="start_time" className="block text-sm font-medium text-gray-700 mb-2">
                Start Time * <span className="text-gray-500 text-xs">(e.g. 7:00 PM)</span>
              </label>
              <input
                type="text"
                id="start_time"
                name="start_time"
                required
                placeholder="7:00 PM"
                value={formData.start_time}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="end_time" className="block text-sm font-medium text-gray-700 mb-2">
                End Time <span className="text-gray-500 text-xs">(e.g. 9:00 PM)</span>
              </label>
              <input
                type="text"
                id="end_time"
                name="end_time"
                placeholder="9:00 PM"
                value={formData.end_time}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Venue Name */}
          <div>
            <label htmlFor="venue_name" className="block text-sm font-medium text-gray-700 mb-2">
              Venue Name *
            </label>
            <input
              type="text"
              id="venue_name"
              name="venue_name"
              required
              value={formData.venue_name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Address *
            </label>
            <textarea
              id="address"
              name="address"
              required
              rows={3}
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Submitter Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="submitter_name" className="block text-sm font-medium text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                id="submitter_name"
                name="submitter_name"
                required
                value={formData.submitter_name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="submitter_email" className="block text-sm font-medium text-gray-700 mb-2">
                Your Email *
              </label>
              <input
                type="email"
                id="submitter_email"
                name="submitter_email"
                required
                value={formData.submitter_email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Optional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                Event Website <span className="text-gray-500 text-xs">(Event or venue website URL)</span>
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Price <span className="text-gray-500 text-xs">(e.g. Free, $10, $15-25)</span>
              </label>
              <input
                type="text"
                id="price"
                name="price"
                placeholder="Free"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes <span className="text-gray-500 text-xs">(Any additional information about the event)</span>
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting && <LoadingSpinner size="sm" />}
              {isSubmitting ? 'Submitting...' : 'Submit Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}