"use client";

import { type Editor } from "@tiptap/react";
import { Bold, Italic, Underline, Strikethrough, List, ListOrdered, Quote, Undo, Redo, LinkIcon, Image, Code, Heading1, Heading2, Heading3 } from 'lucide-react';
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface EditorToolbarProps {
  editor: Editor | null;
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  if (!editor) return null;

  const addLink = () => {
    if (linkUrl) {
      editor.chain().focus().toggleLink({ href: linkUrl }).run();
      setLinkUrl("");
      setIsLinkDialogOpen(false);
    }
  };

  const ToolbarButton = ({ icon, action, isActive, tooltip }: { icon: React.ReactNode, action: () => void, isActive?: boolean, tooltip: string }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            pressed={isActive}
            onPressedChange={action}
            className="h-8 w-8 p-1 rounded-md hover:bg-primary/10 data-[state=on]:bg-primary/20 data-[state=on]:text-primary transition-all duration-200 ease-in-out"
          >
            {icon}
          </Toggle>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="bg-primary text-primary-foreground px-2 py-1 text-xs rounded-md">
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  const ToolbarGroup = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center space-x-1 bg-background/50 backdrop-blur-sm rounded-md p-1">
      {children}
    </div>
  );

  return (
    <BackgroundGradient className="p-2 rounded-lg border shadow-lg">
      <div className="flex flex-wrap items-center gap-2">
        <TextGenerateEffect words="Format your content" className="mr-4 font-semibold text-primary text-sm" />
        
        <ToolbarGroup>
          <ToolbarButton icon={<Bold className="h-4 w-4" />} action={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive("bold")} tooltip="Bold" />
          <ToolbarButton icon={<Italic className="h-4 w-4" />} action={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive("italic")} tooltip="Italic" />
          <ToolbarButton icon={<Underline className="h-4 w-4" />} action={() => editor.chain().focus().toggleMark('underline').run()} isActive={editor.isActive("underline")} tooltip="Underline" />
          <ToolbarButton icon={<Strikethrough className="h-4 w-4" />} action={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive("strike")} tooltip="Strikethrough" />
        </ToolbarGroup>

        <Separator orientation="vertical" className="h-8" />

        <ToolbarGroup>
          <ToolbarButton icon={<Heading1 className="h-4 w-4" />} action={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive("heading", { level: 1 })} tooltip="Heading 1" />
          <ToolbarButton icon={<Heading2 className="h-4 w-4" />} action={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive("heading", { level: 2 })} tooltip="Heading 2" />
          <ToolbarButton icon={<Heading3 className="h-4 w-4" />} action={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive("heading", { level: 3 })} tooltip="Heading 3" />
        </ToolbarGroup>

        <Separator orientation="vertical" className="h-8" />

        <ToolbarGroup>
          <ToolbarButton icon={<List className="h-4 w-4" />} action={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive("bulletList")} tooltip="Bullet List" />
          <ToolbarButton icon={<ListOrdered className="h-4 w-4" />} action={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive("orderedList")} tooltip="Numbered List" />
          <ToolbarButton icon={<Quote className="h-4 w-4" />} action={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive("blockquote")} tooltip="Quote" />
          <ToolbarButton icon={<Code className="h-4 w-4" />} action={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive("codeBlock")} tooltip="Code Block" />
        </ToolbarGroup>

        <Separator orientation="vertical" className="h-8" />

        <ToolbarGroup>
          <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
            <DialogTrigger asChild>
              <Toggle pressed={editor.isActive("link")} className="h-8 w-8 p-1 rounded-md hover:bg-primary/10 data-[state=on]:bg-primary/20 data-[state=on]:text-primary transition-all duration-200 ease-in-out">
                <LinkIcon className="h-4 w-4" />
              </Toggle>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Link</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input 
                  type="url" 
                  placeholder="https://example.com" 
                  value={linkUrl} 
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="col-span-3"
                />
                <Button onClick={addLink} className="col-span-3">Add Link</Button>
              </div>
            </DialogContent>
          </Dialog>
          <ToolbarButton icon={<Image className="h-4 w-4" />} action={() => {/* Implement image upload logic */}} tooltip="Insert Image" />
        </ToolbarGroup>

        <Separator orientation="vertical" className="h-8" />

        <ToolbarGroup>
          <ToolbarButton icon={<Undo className="h-4 w-4" />} action={() => editor.chain().focus().undo().run()} tooltip="Undo" />
          <ToolbarButton icon={<Redo className="h-4 w-4" />} action={() => editor.chain().focus().redo().run()} tooltip="Redo" />
        </ToolbarGroup>
      </div>
    </BackgroundGradient>
  );
}

