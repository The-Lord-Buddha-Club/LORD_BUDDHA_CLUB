export interface BlogPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
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