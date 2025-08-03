import Header from '@/components/Header'
import EventSubmissionForm from '@/components/EventSubmissionForm'

export const metadata = {
  title: 'Submit Event - Grand Rapids Events Hub',
  description: 'Submit your event to be featured on Grand Rapids Events Hub. Fill out the form and we\'ll review your submission.',
}

export default function SubmitEventPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Submit an Event
            </h1>
            <p className="text-gray-300 text-lg">
              Share your event with the Grand Rapids community. Fill out the form below and we'll review your submission for approval.
            </p>
          </div>

          <EventSubmissionForm />
        </div>
      </div>
    </main>
  )
}