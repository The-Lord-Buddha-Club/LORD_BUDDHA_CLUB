'use client'

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GithubIcon, Star, GitFork, Clock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { motion } from "framer-motion"
import type { GithubRepo } from "@/lib/github"

export default function ProjectsPage() {
  const [projects, setProjects] = useState<GithubRepo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://api.github.com/orgs/The-Lord-Buddha-Club/repos', {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setProjects(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Failed to fetch projects:', error)
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        <motion.h1 
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-300 dark:via-purple-300 dark:to-pink-300"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Innovative Projects
        </motion.h1>
        <motion.p 
          className="text-center text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Explore our cutting-edge projects that push the boundaries of technology and innovation.
        </motion.p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array(6)
                .fill(0)
                .map((_, i) => (
                  <Card key={i} className="overflow-hidden bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-indigo-100 dark:border-indigo-800 shadow-lg shadow-indigo-500/10 dark:shadow-indigo-500/5">
                    <CardHeader className="space-y-2">
                      <Skeleton className="h-6 w-3/4 bg-indigo-200 dark:bg-indigo-700" />
                      <Skeleton className="h-4 w-1/4 bg-indigo-200 dark:bg-indigo-700" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Skeleton className="h-20 w-full bg-indigo-200 dark:bg-indigo-700" />
                      <div className="flex gap-4">
                        <Skeleton className="h-4 w-16 bg-indigo-200 dark:bg-indigo-700" />
                        <Skeleton className="h-4 w-16 bg-indigo-200 dark:bg-indigo-700" />
                      </div>
                    </CardContent>
                  </Card>
                ))
            : projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/20 group bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-indigo-100 dark:border-indigo-800">
                    <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 p-6">
                      <CardTitle className="flex items-center justify-between">
                        <span className="truncate text-xl font-bold text-indigo-800 dark:text-indigo-200 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300">
                          {project.name}
                        </span>
                        <div className="flex items-center gap-3 text-sm">
                          <span className="flex items-center text-indigo-600 dark:text-indigo-300">
                            <Star className="h-4 w-4 mr-1 text-yellow-500" />
                            {project.stargazers_count}
                          </span>
                          <span className="flex items-center text-indigo-600 dark:text-indigo-300">
                            <GitFork className="h-4 w-4 mr-1 text-blue-500" />
                            {project.forks_count}
                          </span>
                        </div>
                      </CardTitle>
                      {project.language && (
                        <Badge variant="secondary" className="mt-2 bg-purple-200 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
                          {project.language}
                        </Badge>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-4 p-6">
                      <p className="text-indigo-700 dark:text-indigo-200 line-clamp-3 text-sm md:text-base">
                        {project.description || "No description available"}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.topics?.map((topic) => (
                          <Badge key={topic} variant="outline" className="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100 text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-xs md:text-sm text-indigo-500 dark:text-indigo-300">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Updated {formatDistanceToNow(new Date(project.updated_at), { addSuffix: true })}
                        </span>
                      </div>
                      <Button asChild variant="outline" className="w-full bg-indigo-100 text-indigo-700 hover:bg-indigo-600 hover:text-white dark:bg-indigo-900 dark:text-indigo-100 dark:hover:bg-indigo-600 dark:hover:text-white transition-colors duration-300">
                        <a
                          href={project.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <GithubIcon className="h-4 w-4" />
                          View on GitHub
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
        </div>
      </div>
    </div>
  )
}

