import { NavLink } from "react-router-dom";
import UserNav from "./UserNav";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? "btn lg:text-lg bg-black text-white hover:bg-gray-900 hover:text-white pt-2 pb-3 border-none"
      : "text-white hover:bg-gray-900 transition duration-300 hover:text-white rounded-md px-3 pt-2 pb-3";

  const signInClass = ({ isActive }) =>
    isActive
      ? "btn bg-black text-white hover:bg-gray-900 border-none"
      : "btn bg-red-50 hover:bg-black hover:text-white transition duration-300 text-black border-none";

  const { user } = useAuth();

  return (
    <>
      <div className="navbar bg-red-500 border-b border-red-500">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#fef2f2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-red-50 text-black rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/" className="">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/resources" className="">
                  Resources
                </NavLink>
              </li>
              <li>
                <NavLink to="/add-resources" className="">
                  Add Resources
                </NavLink>
              </li>
            </ul>
          </div>
          <NavLink
            className="flex flex-shrink-0 items-center mr-4 lg:ml-16"
            to="/"
          >
            {/* TODO:// add study space logo */}
            {/* <img
              className="h-16 w-auto"
              src={logo}
            /> */}
            <span className="hidden md:block text-white text-3xl font-bold italic ml-4 uppercase">
              Study Space
            </span>
          </NavLink>
        </div>
        <div className=" ml-64 navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-lg space-x-4">
            <li>
              <NavLink to="/" className={linkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/resources" className={linkClass}>
                Resources
              </NavLink>
            </li>
            <li>
              <NavLink to="/add-resources" className={linkClass}>
                Add Resources
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="sm:mr-4 lg:mr-16 navbar-end">
          {user ? (
            <UserNav />
          ) : (
            <NavLink to="/login" className={signInClass}>
              Sign In
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
