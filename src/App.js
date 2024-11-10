import React from 'react';
import {Routes, Route, Outlet, Router} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";

function Layout() {
    return (
    <>
        <Navbar/>
            <Outlet/>
        <Footer/>
    </>
    )
}

function App() {
    return (
        <div className="bg-black">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="signup" element={<SignUp />} />
                    <Route path="signin" element={<SignIn />} />
                    <Route path="recipes/:id" element={<RecipeDetail />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
