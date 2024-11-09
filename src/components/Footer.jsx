import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import Button from "./Button"

const Footer = () => {
    return (
        <footer className="text-white py-20 bg_gradient ">
            <div className="container mx-auto px-20 lg:px-20 py-20 flex flex-col gap-10 md:flex-row justify-between border-t border-slate-800">
                <div className="flex">
                    <p className="font-bold text-center">
                        <span className="text-gray-400 text-xl">Ingridientarium</span>
                    </p>
                </div>

                <div className="">
                    <p>QUICK LINKS</p>

                    <div className="flex flex-col text-start mb-4 md:mb-0">
                        <a
                            href='#'
                            className='block md:inline-block py-2 hover:text-gray-500'
                        >
                            Home
                        </a>
                        <a
                            href='#'
                            className='block md:inline-block py-2 hover:text-gray-500'
                        >
                            About
                        </a>
                        <a
                            href='#'
                            className='block md:inline-block py-2 hover:text-gray-500'
                        >
                            Services
                        </a>
                        <a
                            href='#'
                            className='block md:inline-block py-2 hover:text-gray-500'
                        >
                            Contact
                        </a>
                        <a
                            href='#'
                            className='block md:inline-block py-2 hover:text-gray-500'
                        >
                            Chiefs
                        </a>
                    </div>
                </div>

                <div>
                    <p>LEGAL</p>
                    <div className='flex flex-col text-start mb-4 md:mb-0 text-[14px]'>
                        <a
                            href='#'
                            className='block md:inline-block py-2 hover:text-gray-500'
                        >
                            Terms and Conditions
                        </a>
                        <a
                            href='#'
                            className='block md:inline-block py-2 hover:text-gray-500'
                        >
                            License Agreement
                        </a>
                        <a
                            href='#'
                            className='block md:inline-block py-2 hover:text-gray-500'
                        >
                            Privacy Policy
                        </a>
                        <a
                            href='#'
                            className='block md:inline-block py-2 hover:text-gray-500'
                        >
                            Copyright Information
                        </a>
                        <a
                            href='#'
                            className='block md:inline-block py-2 hover:text-gray-500'
                        >
                            Cookies Policy
                        </a>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center py-10">
                <span className="text-gray-400 leading-10">AS224 OPU &copy; 2024</span>
            </div>
        </footer>
    )
}

export default Footer
