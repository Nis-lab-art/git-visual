export default function Footer() {
  return (
    <footer className="py-8 text-center">
      <p className="text-sm">
        Built with{" "}
        <a
          href="https://nextjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Next.js
        </a>
        <span className="mx-1.5">·</span>
        <a
          href="https://recharts.org/en-US"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Recharts
        </a>
        <span className="mx-1.5">·</span>
        <a
          href="https://github.com/IonicaBizau/node-gh-polyglot"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          GitHub Polyglot
        </a>
        <span className="mx-1.5">·</span>
        <a
          href="https://ui.shadcn.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          shadcn/ui
        </a>
        <span className="mx-1.5">·</span>
        <a
          href="https://github.com/aholachek/react-flip-toolkit"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          React Flip Toolkit
        </a>{" "}
        and more!
      </p>
    </footer>
  );
}
