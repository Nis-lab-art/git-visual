// types/gh-polyglot.d.ts

declare module "gh-polyglot" {
  export default class Me {
    constructor(username: string);

    // Assuming `stats` is an array of any type; adjust this as necessary
    userStats(callback: (err: Error | null, stats: any[]) => void): void;
  }
}
