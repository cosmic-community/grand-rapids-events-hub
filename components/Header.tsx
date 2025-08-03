import Link from 'next/link'
import { Calendar, Plus } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-dark-800 border-b border-dark-600 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Calendar className="w-8 h-8 text-purple-400" />
            <div>
              <div className="text-xl font-bold text-white">GR Events</div>
              <div className="text-xs text-gray-400 -mt-1">Grand Rapids</div>
            </div>
          </Link>

          <nav className="flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Events
            </Link>
            <Link 
              href="/submit" 
              className="flex items-center space-x-2 btn-primary text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Submit Event</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}