import React, { useState, useEffect } from 'react';
import Logo from '../images/logo.png';
import { HiMenuAlt3 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import Button from "./Button";
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);
    const auth = getAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Следим за изменениями состояния авторизации
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, [auth]);

    const handleSignInClick = () => {
        navigate('/signin');
    };

    const handleSignOutClick = async () => {
        await signOut(auth);
        setUser(null); // сбрасываем состояние пользователя
        navigate("/"); // Перенаправляем на главную страницу после выхода
    };

    return (
        <header className='w-full fixed z-10 bg-black opacity-90'>
            <nav className='flex w-full py-2 md:py-3 px-4 md:px-20 items-center justify-between'>
                <a href="/" className='flex items-center justify-center text-white text-lg cursor-pointer'>
                    <img src={Logo} alt="Logo" className='hidden md:block w-8 h-8 lg:w-14 lg:h-14'/>
                    <span>Ingridientarium</span>
                </a>
                <ul className='hidden md:flex text-white gap-6'>
                    <li><a href="/">Home</a></li>
                    <li><a href="/#recipes">Explore</a></li>
                    <li><a href="/favorites">Favorites</a></li>
                </ul>
                {user ? (
                    <div className='hidden md:flex items-center gap-4'>
                        <span className='text-white'>{user.email}</span>
                        <button
                            onClick={handleSignOutClick}
                            className='bg-transparent border border-white
                            text-white hover:bg-white hover:text-slate-700
                            rounded-full px-4 py-1'
                        >
                            Sign out
                        </button>
                    </div>
                ) : (
                    <Button
                        title='Sign in'
                        handleClick={handleSignInClick}
                        containerStyle='hidden md:block bg-transparent
                        border border-white text-white hover:bg-white
                        hover:text-slate-700 rounded-full min-w-[130px]'
                    />
                )}
                <button className='block md:hidden text-white text-xl' onClick={() => setOpen(prev => !prev)}>
                    {open ? <AiOutlineClose /> : <HiMenuAlt3 />}
                </button>
            </nav>
            <div className={`${open ? "flex" : "hidden"} bg-black flex-col w-full px-4 pt-16 pb-10 text-white gap-6 text-[14px]`}>
                <a href="/">Home</a>
                <a href="/#recipes">Recipes</a>
                <a href="/favorites">Favorites</a>
            </div>
        </header>
    );
};

export default Navbar;
