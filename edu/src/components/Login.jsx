import logo from "../assets/images/logo inverse.png";
import { FaGoogle } from "react-icons/fa";
import Card from "./Card";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8080";

const handleGoogleSignIn = () => {
  window.location.href = `${VITE_BASE_URL}/auth/google`;
};

const Login = () => {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <Card bg="bg-red-50">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Study Space Logo"
              src={logo}
              className="mx-auto h-32 w-auto "
            />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign in to your account or sign up below
            </h2>
          </div>

          <div className="flex justify-center flex-row">
            <button
              onClick={handleGoogleSignIn}
              className="bg-red-500 hover:bg-red-400 text-white font-bold mt-10 py-4 px-28 sm:px-40 rounded-lg shadow-md transition duration-300 text-center flex items-center justify-center space-x-2"
            >
              <FaGoogle className="text-2xl mr-3" />
              Google
            </button>
          </div>
        </Card>

        {/*ANCHOR: for future local auth login */}

        {/* <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Not a member?{' '}
                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Start a 14 day free trial
                        </a>
                    </p>
                </div> */}
      </div>
    </>
  );
};

export default Login;
