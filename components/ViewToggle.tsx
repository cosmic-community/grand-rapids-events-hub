import { List, Calendar } from 'lucide-react'
import { ViewMode } from '@/types'

interface ViewToggleProps {
  currentView: ViewMode
  onViewChange: (view: ViewMode) => void
}

export default function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex bg-dark-700 p-1 rounded-lg">
      <button
        onClick={() => onViewChange('list')}
        className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
          currentView === 'list'
            ? 'bg-purple-600 text-white'
            : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        <List className="w-4 h-4" />
        <span>List</span>
      </button>
      
      <button
        onClick={() => onViewChange('calendar')}
        className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
          currentView === 'calendar'
            ? 'bg-purple-600 text-white'
            : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        <Calendar className="w-4 h-4" />
        <span>Calendar</span>
      </button>
    </div>
  )
}