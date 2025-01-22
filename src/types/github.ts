export interface GithubUser {
  avatar_url: string;
  bio: string | null;
  blog: string;
  company: string | null;
  created_at: string;
  location: string | null;
  login: string;
  name: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  twitter_username: string;
}

export interface Repository {
  id: number;
  name: string;
  description: string | null;
  size: number;
  language: string | null;
  forks_count: number;
  stargazers_count: number;
  html_url: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
}
