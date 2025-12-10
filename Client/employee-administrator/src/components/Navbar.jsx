import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="text-black p-4 flex justify-center items-center gap-6 h-15 border-b border-black">
      <Link
        to="/"
        className="hover:text-blue-500 transition-colors font-medium"
      >
        Project Management
      </Link>
      <Link
        to="/profile"
        className="hover:text-blue-500 transition-colors font-medium"
      >
        User Profile
      </Link>
      <Link
        to="/admin"
        className="hover:text-blue-500 transition-colors font-medium"
      >
        Admin Dashboard
      </Link>
    </nav>
  );
}
