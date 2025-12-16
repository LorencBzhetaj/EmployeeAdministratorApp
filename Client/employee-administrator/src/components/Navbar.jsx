import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { logout } from "../store/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.userId);
  const userName = useSelector((state) => state.auth.userName);
  const userRole = useSelector((state) => state.auth.userRole);

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="flex items-center justify-between p-4 border-b border-black bg-white">
      <div className="flex flex-col">
        <span className="font-medium">{userName}</span>
        <span className="text-sm text-gray-600">{userRole}</span>
      </div>

      <div className="flex gap-6">
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
        {userRole == "Admin" && (
          <Link
            to="/admin"
            className="hover:text-blue-500 transition-colors font-medium"
          >
            Admin Dashboard
          </Link>
        )}
      </div>

      <div>
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
