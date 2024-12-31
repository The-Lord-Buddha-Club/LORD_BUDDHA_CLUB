"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Edit, Trash2, Plus, Loader2 } from 'lucide-react';
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EventForm } from "./event-form";
import type { Event } from "@/lib/types";
import { cn } from "@/lib/utils";

export function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/events");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      toast({
        title: "Error",
        description: "Failed to fetch events. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div 
      className="space-y-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="flex justify-between items-center"
        variants={itemVariants}
      >
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
          Events Management
        </h2>
        <Button 
          onClick={() => {
            setSelectedEvent(null);
            setShowEventDialog(true);
          }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
        </div>
      ) : (
        <motion.div 
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
        >
          <AnimatePresence>
            {events.map((event) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                layout
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800">
                  <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 p-4">
                    <div className="space-y-1">
                      <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">{event.title}</CardTitle>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Calendar className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
                        {format(new Date(event.startDate), "PPP")}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowEventDialog(true);
                        }}
                        className="hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors duration-300"
                      >
                        <Edit className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(event.id)}
                        className="hover:bg-red-600 transition-colors duration-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 p-4">
                    <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
                    <div className="flex flex-col gap-2 text-sm">
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <Clock className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
                        {format(new Date(event.startDate), "p")} - {format(new Date(event.endDate), "p")}
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <MapPin className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
                        {event.location}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
              {selectedEvent ? "Edit Event" : "Create New Event"}
            </DialogTitle>
          </DialogHeader>
          <EventForm
            event={selectedEvent ?? undefined}
            onSuccess={() => {
              setShowEventDialog(false);
              fetchEvents();
            }}
            onCancel={() => setShowEventDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

