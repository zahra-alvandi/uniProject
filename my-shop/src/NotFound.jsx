import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-gray-500 mt-2">Page not found</p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800"
      >
        Go Home
      </Link>
    </div>
  );
}