"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { format, parseISO, isSameMonth, isSameYear } from "date-fns";
import type { Event } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch events:", error);
        setLoading(false);
      });
  }, []);

  const groupEventsByMonth = (events: Event[]) => {
    const grouped: Record<string, Event[]> = {};
    
    events.forEach((event) => {
      const date = parseISO(event.startDate);
      const key = format(date, "MMMM yyyy");
      
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(event);
    });

    return grouped;
  };

  const upcomingEvents = events.filter(
    (event) => new Date(event.startDate) > new Date()
  );
  const pastEvents = events.filter(
    (event) => new Date(event.startDate) <= new Date()
  );

  const groupedUpcoming = groupEventsByMonth(upcomingEvents);
  const groupedPast = groupEventsByMonth(pastEvents);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen bg-gradient-to-b from-background to-background/80">
      <motion.h1 
        className="text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Upcoming Events
      </motion.h1>

      <div className="space-y-16">
        <EventSection 
          title="Upcoming Events" 
          groupedEvents={groupedUpcoming} 
          expandedSections={expandedSections}
          toggleSection={toggleSection}
          isPast={false}
        />

        <EventSection 
          title="Past Events" 
          groupedEvents={groupedPast} 
          expandedSections={expandedSections}
          toggleSection={toggleSection}
          isPast={true}
        />
      </div>
    </div>
  );
}

function EventSection({ title, groupedEvents, expandedSections, toggleSection, isPast }: {
  title: string;
  groupedEvents: Record<string, Event[]>;
  expandedSections: Record<string, boolean>;
  toggleSection: (section: string) => void;
  isPast: boolean;
}) {
  return (
    <section>
      <motion.h2 
        className="text-3xl font-semibold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {title}
      </motion.h2>
      {Object.entries(groupedEvents).map(([month, monthEvents], index) => (
        <motion.div 
          key={month} 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <button
            onClick={() => toggleSection(month)}
            className="flex items-center justify-between w-full text-left text-xl font-medium mb-6 group"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary group-hover:to-primary transition-all duration-300">
              {month}
            </span>
            {expandedSections[month] ? (
              <ChevronUp className="w-6 h-6 text-primary transition-transform duration-300" />
            ) : (
              <ChevronDown className="w-6 h-6 text-primary transition-transform duration-300" />
            )}
          </button>
          <AnimatePresence>
            {expandedSections[month] && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {monthEvents.map((event) => (
                    <EventCard key={event.id} event={event} isPast={isPast} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </section>
  );
}

function EventCard({ event, isPast }: { event: Event; isPast: boolean }) {
  return (
    <motion.div
      whileHover={{ scale: isPast ? 1 : 1.03 }}
      whileTap={{ scale: isPast ? 1 : 0.98 }}
    >
      <Card className={cn(
        "overflow-hidden transition-all duration-300",
        isPast ? "opacity-75" : "hover:shadow-lg hover:shadow-primary/20"
      )}>
        {event.imageUrl && (
          <div className="relative h-48 overflow-hidden">
            <motion.img
              src={event.imageUrl}
              alt={event.title}
              className={cn(
                "w-full h-full object-cover transition-all duration-300",
                isPast ? "grayscale" : "hover:scale-110"
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-xl font-semibold line-clamp-2">{event.title}</CardTitle>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2 text-primary" />
            {format(new Date(event.startDate), "PPP")}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4 line-clamp-3">{event.description}</p>
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 text-primary" />
              {format(new Date(event.startDate), "p")} - {format(new Date(event.endDate), "p")}
            </div>
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-2 text-primary" />
              {event.location}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

