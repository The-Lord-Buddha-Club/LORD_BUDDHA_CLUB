"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, Clock } from "lucide-react"
import { format, parseISO } from "date-fns"
import { Skeleton } from "@/components/ui/skeleton"
import type { Event } from "@/lib/types"

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Failed to fetch events:", error)
        setLoading(false)
      })
  }, [])

  const groupEventsByMonth = (events: Event[]) => {
    const grouped: Record<string, Event[]> = {}

    events.forEach((event) => {
      const date = parseISO(event.startDate)
      const key = format(date, "MMMM yyyy")

      if (!grouped[key]) {
        grouped[key] = []
      }
      grouped[key].push(event)
    })

    return grouped
  }

  const upcomingEvents = events.filter((event) => new Date(event.startDate) > new Date())
  const pastEvents = events.filter((event) => new Date(event.startDate) <= new Date())

  const groupedUpcoming = groupEventsByMonth(upcomingEvents)
  const groupedPast = groupEventsByMonth(pastEvents)

  if (loading) {
    return <EventsLoadingSkeleton />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Events</h1>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-6">Upcoming Events</h2>
          {Object.entries(groupedUpcoming).length > 0 ? (
            Object.entries(groupedUpcoming).map(([month, monthEvents]) => (
              <div key={month} className="mb-8">
                <h3 className="text-xl font-medium mb-4">{month}</h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {monthEvents.map((event) => (
                    <Card key={event.id} className="hover:shadow-lg transition-shadow">
                      {event.imageUrl && (
                        <img
                          src={event.imageUrl || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <CardHeader>
                        <CardTitle>{event.title}</CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2" />
                          {format(new Date(event.startDate), "PPP")}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{event.description}</p>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 mr-2" />
                            {format(new Date(event.startDate), "p")} - {format(new Date(event.endDate), "p")}
                          </div>
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 mr-2" />
                            {event.location}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No upcoming events scheduled.</p>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Past Events</h2>
          {Object.entries(groupedPast).length > 0 ? (
            Object.entries(groupedPast).map(([month, monthEvents]) => (
              <div key={month} className="mb-8">
                <h3 className="text-xl font-medium mb-4">{month}</h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {monthEvents.map((event) => (
                    <Card key={event.id} className="opacity-75">
                      {event.imageUrl && (
                        <img
                          src={event.imageUrl || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-48 object-cover grayscale"
                        />
                      )}
                      <CardHeader>
                        <CardTitle>{event.title}</CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2" />
                          {format(new Date(event.startDate), "PPP")}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{event.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No past events to display.</p>
          )}
        </section>
      </div>
    </div>
  )
}

function EventsLoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <Skeleton className="h-12 w-48 mb-8" />

      <div className="space-y-12">
        <section>
          <Skeleton className="h-8 w-40 mb-6" />
          <div className="mb-8">
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <Skeleton className="w-full h-48" />
                  <CardHeader>
                    <Skeleton className="h-6 w-full max-w-[250px] mb-2" />
                    <Skeleton className="h-4 w-32" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section>
          <Skeleton className="h-8 w-32 mb-6" />
          <div className="mb-8">
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="overflow-hidden opacity-75">
                  <Skeleton className="w-full h-48" />
                  <CardHeader>
                    <Skeleton className="h-6 w-full max-w-[250px] mb-2" />
                    <Skeleton className="h-4 w-32" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full mt-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

