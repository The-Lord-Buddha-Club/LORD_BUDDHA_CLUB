"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, MapPinIcon, ImageIcon, TypeIcon } from 'lucide-react';
import type { Event } from "@/lib/types";

interface EventFormProps {
  event?: Event;
  onSuccess: () => void;
  onCancel: () => void;
}

const formFields = [
  { id: "title", label: "Event Title", icon: TypeIcon },
  { id: "description", label: "Description", icon: TypeIcon },
  { id: "imageUrl", label: "Event Poster URL", icon: ImageIcon },
  { id: "startDate", label: "Start Date & Time", icon: CalendarIcon },
  { id: "endDate", label: "End Date & Time", icon: CalendarIcon },
  { id: "location", label: "Location", icon: MapPinIcon },
];

export function EventForm({ event, onSuccess, onCancel }: EventFormProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: event?.title || "",
    description: event?.description || "",
    imageUrl: event?.imageUrl || "",
    startDate: event?.startDate || "",
    endDate: event?.endDate || "",
    location: event?.location || "",
    type: event?.type || "in-person",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `/api/events${event ? `/${event.id}` : ""}`,
        {
          method: event ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Failed to save event");

      toast({
        title: "Success",
        description: `Event ${event ? "updated" : "created"} successfully`,
      });

      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save event",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          {event ? "Edit Event" : "Create New Event"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {formFields.map((field, index) => (
            <motion.div
              key={field.id}
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Label htmlFor={field.id} className="flex items-center space-x-2">
                <field.icon className="w-4 h-4 text-primary" />
                <span>{field.label}</span>
              </Label>
              {field.id === "description" ? (
                <Textarea
                  id={field.id}
                  value={formData[field.id as keyof typeof formData]}
                  onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                  required
                  className="min-h-[100px] transition-all duration-200 focus:ring-2 focus:ring-primary"
                />
              ) : (
                <Input
                  id={field.id}
                  type={field.id.includes("Date") ? "datetime-local" : field.id === "imageUrl" ? "url" : "text"}
                  value={formData[field.id as keyof typeof formData]}
                  onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                  required={field.id !== "imageUrl"}
                  placeholder={field.id === "imageUrl" ? "https://example.com/event-poster.jpg" : ""}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                />
              )}
            </motion.div>
          ))}

          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: formFields.length * 0.1 }}
          >
            <Label htmlFor="type" className="flex items-center space-x-2">
              <TypeIcon className="w-4 h-4 text-primary" />
              <span>Event Type</span>
            </Label>
            <Select
              value={formData.type}
              onValueChange={(value: "online" | "in-person") => setFormData({ ...formData, type: value })}
            >
              <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary">
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in-person">In-Person</SelectItem>
                <SelectItem value="online">Online</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          <motion.div
            className="flex justify-end space-x-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: (formFields.length + 1) * 0.1 }}
          >
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="transition-all duration-200 hover:bg-secondary/20"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="relative overflow-hidden transition-all duration-200"
            >
              <span className="relative z-10">
                {loading ? "Saving..." : event ? "Update Event" : "Create Event"}
              </span>
              {loading && (
                <motion.div
                  className="absolute inset-0 bg-primary/20"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </Button>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  );
}

