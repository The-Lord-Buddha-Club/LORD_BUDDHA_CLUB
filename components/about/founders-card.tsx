"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GithubIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface Founder {
  name: string;
  role: string;
  github: string;
  avatarUrl: string;
}

const founders: Founder[] = [
  {
    name: "Piyush Mishra",
    role: "Founder",
    github: "PIYUSH-MISHRA-00",
    avatarUrl: "https://github.com/PIYUSH-MISHRA-00.png"
  },
  {
    name: "Utkarsh Tripathi",
    role: "Co-Founder",
    github: "UTK-a-RSH",
    avatarUrl: "https://github.com/UTK-a-RSH.png"
  }
];

export function FoundersCard() {
  return (
    <Card className="md:col-span-2 overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 dark:from-purple-900 dark:to-pink-900 shadow-lg">
      <CardHeader className="bg-white/10 backdrop-blur-sm dark:bg-black/10">
        <CardTitle className="text-2xl font-bold text-white">Our Visionaries</CardTitle>
      </CardHeader>
      <CardContent className="p-6 bg-dot-pattern">
        <div className="grid gap-6 md:grid-cols-2">
          {founders.map((founder) => (
            <div
              key={founder.github}
              className="group relative overflow-hidden rounded-xl bg-white/20 dark:bg-black/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative flex items-center space-x-4 p-4">
                <Avatar className="h-20 w-20 ring-2 ring-white dark:ring-gray-800 transition-all duration-300 group-hover:scale-110">
                  <AvatarImage src={founder.avatarUrl} alt={founder.name} />
                  <AvatarFallback>{founder.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 z-10">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-100 transition-colors duration-300">
                    {founder.name}
                  </h3>
                  <p className="text-sm text-pink-200 dark:text-pink-300 font-medium">
                    {founder.role}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 bg-white/10 text-white hover:bg-white/20 hover:text-cyan-100 transition-all duration-300"
                    asChild
                  >
                    <a
                      href={`https://github.com/${founder.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2"
                    >
                      <GithubIcon className="h-4 w-4" />
                      <span>@{founder.github}</span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

