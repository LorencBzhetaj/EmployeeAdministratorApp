import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
    <nav className="w-full bg-white border-b border-gray-300 shadow-sm px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
        >
          ProjectManager
        </Link>
      </div>

      <div className="flex gap-6 font-medium text-gray-700">
        {userRole != "Admin" && (
          <Link to="/" className="hover:text-blue-500 transition-colors">
            Projects
          </Link>
        )}

        <Link to="/profile" className="hover:text-blue-500 transition-colors">
          Profile
        </Link>
        {userRole == "Admin" && (
          <Link to="/admin" className="hover:text-blue-500 transition-colors">
            Admin
          </Link>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex flex-col text-right">
          <span className="font-semibold text-gray-800">{userName}</span>
          <span className="text-sm text-gray-500">{userRole}</span>
        </div>
        <button
          onClick={onLogout}
          className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
