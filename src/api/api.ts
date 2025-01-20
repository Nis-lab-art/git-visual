import Me from "gh-polyglot";

const getUserDetails = async (username: string) => {
  const response = await fetch(`https://api.github.com/users/${username}`);
  if (!response.ok) {
    if (response.status === 403) {
      throw new Error("Forbidden");
    }
    throw new Error("An error occurred");
  }
  return response.json();
};

const getRepoDetails = async (username: string) => {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100`
  );
  if (!response.ok) {
    if (response.status === 403) {
      throw new Error("Forbidden");
    }
    throw new Error("An error occurred");
  }
  return response.json();
};

const getRateLimit = async () => {
  const response = await fetch(`https://api.github.com/rate_limit`);
  if (!response.ok) {
    if (response.status === 403) {
      throw new Error("Forbidden");
    }
    throw new Error("An error occurred");
  }
  return response.json();
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
