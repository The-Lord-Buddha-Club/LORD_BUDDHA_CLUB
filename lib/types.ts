export interface BlogPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  githubUrl: string;
  image?: string;
  createdAt: string;
}

export interface EmailVerificationPayload {
  email: string;
  token: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  type: 'online' | 'in-person';
  status: 'upcoming' | 'past';
  createdById: string;
  createdAt: string;
  updatedAt: string;
}