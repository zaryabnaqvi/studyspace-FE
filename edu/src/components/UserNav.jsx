import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAuthActions } from "../hooks/useAuthActions";
import { FaUserCircle } from "react-icons/fa";

const UserNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user,setUser } = useAuth();
  const { signOut } = useAuthActions();
  const navigate = useNavigate();


  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-white hover:bg-red-600 px-4 py-2 rounded-md"
      >
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt="Profile"
            className="w-11 h-11 rounded-full"
          />
        ) : (
          <FaUserCircle className="w-11 h-11 text-gray-200" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
          <Link
            to="/dashboard"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <button
            onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");

                setUser(null)
                navigate("/login")
              signOut();
              setIsOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserNav;
