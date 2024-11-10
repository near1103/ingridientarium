import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    function logIn(e) {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                console.log(user);
                setError("");
                setEmail("");
                setPassword("");
                navigate("/"); // Redirect to /home on successful login
            })
            .catch((error) => {
                console.log(error);
                setError("SORRY, COULDN'T FIND YOUR ACCOUNT");
            });
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-gray-200">
            <form
                onSubmit={logIn}
                className="bg-gray-800 p-8 rounded shadow-lg w-full max-w-md space-y-6"
            >
                <h2 className="text-2xl font-bold text-center">Sign in</h2>
                <input
                    placeholder="Please enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="w-full p-3 bg-gray-900 border border-gray-700 rounded text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <input
                    placeholder="Please enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="w-full p-3 bg-gray-900 border border-gray-700 rounded text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button className="w-full py-3 bg-gray-600 text-gray-100 rounded hover:bg-gray-700 transition duration-200">Login</button>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <p className="text-center text-gray-400 text-sm">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default SignIn;
