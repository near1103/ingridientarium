import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [copyPassword, setCopyPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    function register(e) {
        e.preventDefault();
        if (copyPassword !== password) {
            setError("Passwords didn't match");
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
                console.log(user);
                setError("");
                setEmail("");
                setCopyPassword("");
                setPassword("");
                navigate("/signin"); // Redirect to /signin after successful registration
            })
            .catch((error) => {
                console.log(error);
                setError("Error creating account");
            });
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-gray-200">
            <form
                onSubmit={register}
                className="bg-gray-800 p-8 rounded shadow-lg w-full max-w-md space-y-6"
            >
                <h2 className="text-2xl font-bold text-center">Create an account</h2>
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
                <input
                    placeholder="Please enter your password again"
                    value={copyPassword}
                    onChange={(e) => setCopyPassword(e.target.value)}
                    type="password"
                    className="w-full p-3 bg-gray-900 border border-gray-700 rounded text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button className="w-full py-3 bg-gray-600 text-gray-100 rounded hover:bg-gray-700 transition duration-200">Create</button>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            </form>
        </div>
    );
};

export default SignUp;
