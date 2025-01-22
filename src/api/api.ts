import Me from "gh-polyglot";
import { ApiError } from "../types/github";

const getUserDetails = async (username: string): Promise<any> => {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json();
  if (!response.ok) {
    const error: ApiError = {
      message: data.message || "Unknown error occurred",
      statusCode: response.status,
    };
    throw error;
  }
  return data;
};

const getRepoDetails = async (username: string): Promise<any> => {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100`
  );
  const data = await response.json();
  if (!response.ok) {
    const error: ApiError = {
      message: data.message || "Unknown error occurred",
      statusCode: response.status,
    };
    throw error;
  }
  return data;
};

const getRateLimit = async () => {
  const response = await fetch(`https://api.github.com/rate_limit`);
  const data = await response.json();
  if (!response.ok) {
    const error: ApiError = {
      message: data.message || "Unknown error occurred",
      statusCode: response.status,
    };
    throw error;
  }
  return data;
};

const getLanguageStats = async (username: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const userLangs = new Me(username);
    userLangs.userStats((err: Error | null, stats: any[]) => {
      if (err) {
        reject(err);
      } else {
        resolve(stats);
      }
    });
  });
};

export { getUserDetails, getRepoDetails, getRateLimit, getLanguageStats };
