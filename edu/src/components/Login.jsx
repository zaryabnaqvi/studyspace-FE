import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import logo from "../../../assets/Study Space logo.png";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8080/api";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        window.location.href = `${VITE_BASE_URL}/auth/google/callback`;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        try {
            const response = await fetch(`${VITE_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.data)); // Store user data in local storage
                navigate("/dashboard"); // Redirect to dashboard
            } else {
                const errorMsg = await response.text();
                setError(errorMsg || "Failed to login. Please try again.");
            }
        } catch (err) {
            setError("Something went wrong. Please try again later.");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <Card bg="bg-white shadow-lg p-10 rounded-lg">
                <div className="text-center">
                    <img src={logo} alt="Study Space Logo" className="mx-auto h-24" />
                    <h2 className="mt-5 text-2xl font-bold text-gray-900">Sign in to your account</h2>
                </div>

                <div className="mt-6 flex justify-center">
                    <button
                        onClick={handleGoogleSignIn}
                        className="btn btn-error btn-wide text-white flex items-center gap-2"
                    >
                        <FaGoogle className="text-xl" />
                        Sign in with Google
                    </button>
                </div>

                <div className="divider">OR</div>

                <form onSubmit={handleLogin} className="space-y-4">
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <div>
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="input input-bordered w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="input input-bordered w-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-full">
                        Sign In
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-500">
                    Not a member?{" "}
                    <a href="#" className="text-blue-500 hover:underline">
                        Sign up here
                    </a>
                </p>
            </Card>
        </div>
    );
};

export default Login;
