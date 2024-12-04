export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  updated_at: string;
}

export interface GithubOrg {
  login: string;
  name: string;
  description: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  location: string;
  blog: string;
  email: string;
  twitter_username: string;
}

export async function fetchOrgDetails(): Promise<GithubOrg> {
  const response = await fetch('https://api.github.com/orgs/The-Lord-Buddha-Club', {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      ...(process.env.GITHUB_TOKEN && {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`
      })
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch organization details');
  }
  
  return response.json();
}

export async function fetchOrgRepos(): Promise<GithubRepo[]> {
  const response = await fetch('https://api.github.com/orgs/The-Lord-Buddha-Club/repos', {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      ...(process.env.GITHUB_TOKEN && {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`
      })
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch repositories');
  }
  
  return response.json();
}