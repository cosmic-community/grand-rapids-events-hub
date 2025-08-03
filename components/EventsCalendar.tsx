'use client'

import { useState } from 'react'
import { format, addMonths, subMonths, parseISO, isSameDay } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Event } from '@/types'
import { getCalendarDays, dateHasEvents, getEventsForDate, isCurrentMonth } from '@/lib/utils'
import CalendarEventPopover from '@/components/CalendarEventPopover'

interface EventsCalendarProps {
  events: Event[]
}

export default function EventsCalendar({ events }: EventsCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const calendarDays = getCalendarDays(currentDate)
  const today = new Date()

  const handlePrevMonth = () => {
    setCurrentDate(prev => subMonths(prev, 1))
    setSelectedDate(null)
  }

  const handleNextMonth = () => {
    setCurrentDate(prev => addMonths(prev, 1))
    setSelectedDate(null)
  }

  const handleDateClick = (date: Date) => {
    if (dateHasEvents(date, events)) {
      setSelectedDate(selectedDate && isSameDay(selectedDate, date) ? null : date)
    }
  }

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate, events) : []

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold text-white">
          {format(currentDate, 'MMMM yyyy')}
        </h3>
        
        <div className="flex space-x-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-lg bg-dark-700 hover:bg-dark-600 text-gray-300 hover:text-white transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-lg bg-dark-700 hover:bg-dark-600 text-gray-300 hover:text-white transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-dark-800 rounded-lg p-6 border border-dark-600">
        {/* Week Days Header */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-400 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map(day => {
            const hasEvents = dateHasEvents(day, events)
            const isToday = isSameDay(day, today)
            const isCurrentMonthDay = isCurrentMonth(day, currentDate)
            const isSelected = selectedDate && isSameDay(day, selectedDate)

            return (
              <button
                key={day.toISOString()}
                onClick={() => handleDateClick(day)}
                disabled={!hasEvents}
                className={`
                  calendar-day relative
                  ${isCurrentMonthDay ? 'calendar-day-current-month' : 'calendar-day-other-month'}
                  ${hasEvents ? 'calendar-day-has-events' : ''}
                  ${isToday ? 'calendar-day-today' : ''}
                  ${isSelected ? 'ring-2 ring-purple-400' : ''}
                  ${!hasEvents ? 'cursor-default' : ''}
                `}
              >
                {format(day, 'd')}
                {hasEvents && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Selected Date Events */}
      {selectedDate && (
        <CalendarEventPopover 
          date={selectedDate} 
          events={selectedDateEvents} 
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  )
}