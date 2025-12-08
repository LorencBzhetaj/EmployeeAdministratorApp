import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="text-black p-4 flex justify-center items-center gap-6 h-15 border-b border-black">
      <Link
        to="/"
        className="hover:text-blue-500 transition-colors font-medium"
      >
        Home
      </Link>
      <Link
        to="/about"
        className="hover:text-blue-500 transition-colors font-medium"
      >
        About
      </Link>
      <Link
        to="/contact"
        className="hover:text-blue-500 transition-colors font-medium"
      >
        Contact
      </Link>
    </nav>
  );
}
