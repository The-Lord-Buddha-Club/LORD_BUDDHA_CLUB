"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Twitter, Facebook, Linkedin, Copy, Share2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { FloatingNav, FloatingNavItem } from "@/components/ui/floating-nav";

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postId?: string;
  title: string;
}

export function ShareDialog({
  open,
  onOpenChange,
  postId,
  title,
}: ShareDialogProps) {
  const { toast } = useToast();
  const postUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/blog/${postId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(postUrl).then(() => {
      toast({
        title: "Copied!",
        description: "Link copied to clipboard",
      });
    }).catch((err) => {
      console.error('Failed to copy: ', err);
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive",
      });
    });
  };

  const shareOn = (platform: string) => {
    let url = '';
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(postUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;
        break;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Share Post</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Label htmlFor="post-url">Post URL</Label>
            <div className="flex gap-2">
              <Input id="post-url" value={postUrl} readOnly className="flex-grow" />
              <Button variant="outline" size="icon" onClick={handleCopy} className="flex-shrink-0">
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy link</span>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <FloatingNav label="Share">
              <FloatingNavItem onClick={() => shareOn('twitter')} className="flex items-center">
                <Twitter className="h-4 w-4 mr-2" />
                Share on Twitter
              </FloatingNavItem>
              <FloatingNavItem onClick={() => shareOn('facebook')} className="flex items-center">
                <Facebook className="h-4 w-4 mr-2" />
                Share on Facebook
              </FloatingNavItem>
              <FloatingNavItem onClick={() => shareOn('linkedin')} className="flex items-center">
                <Linkedin className="h-4 w-4 mr-2" />
                Share on LinkedIn
              </FloatingNavItem>
            </FloatingNav>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

