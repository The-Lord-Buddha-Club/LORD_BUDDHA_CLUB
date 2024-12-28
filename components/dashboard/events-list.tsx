"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, Trash2 } from "lucide-react";
import { EventDialog } from "@/components/events/event-dialog";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import type { Event } from "@/lib/types";

export function EventsList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventDialog, setShowEventDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    fetch("/api/events")
      .then((res) => res.json())
      .then(setEvents)
      .catch((error) => console.error("Failed to fetch events:", error));
  };

  const handleDelete = async (eventId: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete event");

      toast({
        title: "Success",
        description: "Event deleted successfully",
      });

      fetchEvents();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Upcoming Events</h2>
        <Button
          onClick={() => {
            setSelectedEvent(null);
            setShowEventDialog(true);
          }}
        >
          Create Event
        </Button>
      </div>

      <div className="grid gap-4">
        {events
          .filter((event) => event.status === "upcoming")
          .map((event) => (
            <Card key={event.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl">{event.title}</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setSelectedEvent(event);
                      setShowEventDialog(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(event.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    {format(new Date(event.startDate), "PPP")}
                  </div>
                  <p className="text-muted-foreground">{event.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      <EventDialog
        open={showEventDialog}
        onOpenChange={setShowEventDialog}
        event={selectedEvent}
      />
    </div>
  );
}