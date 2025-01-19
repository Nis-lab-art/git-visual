import Me from "gh-polyglot";

const getUserDetails = async (username: string) => {
  const response = await fetch(`https://api.github.com/users/${username}`);
  return response.json();
};

const getRepoDetails = async (username: string) => {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100`
  );
  return response.json();
};

const rateLimit = async () => {
  const response = await fetch(`https://api.github.com/rate_limit`);
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

export { getUserDetails, getRepoDetails, rateLimit, getLanguageStats };
