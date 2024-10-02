import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { FaFacebookF, FaLinkedinIn, FaGooglePlusG, FaRss, FaBars, FaTimes } from 'react-icons/fa';
import "../styles/Home.css";

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="homepage min-h-screen  flex-col bg-gray-900 text-white">
    <header className="py-4 px-6 flex justify-between items-center z-20 relative">
      <div className="flex items-center">
        <div className="md:hidden mr-4">
          <button onClick={toggleMenu} className="text-white">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        <img src="/CJ-ART-Logo1.png" alt="City Tax Accountants" className="img-logo w-32 h-12 object-contain" />
      </div>
      <nav className={`nav-container absolute left-0 right-0 top-full ${isMenuOpen ? 'block' : 'hidden'} md:relative md:block`}>
        <ul className="nav-options flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-sm p-4 md:p-0">
          <li className='nav-item'><a href="#" className="hover:text-teal-400">HOME</a></li>
          <li className='nav-item'><a href="#" className="hover:text-teal-400">ABOUT US</a></li>
          <li className='nav-item'><a href="#" className="hover:text-teal-400">OUR SERVICES</a></li>
          <li className='nav-item'><a href="#" className="hover:text-teal-400">CONTACT US</a></li>
        </ul>
      </nav>
      <div className="hidden md:flex items-center">
        <span className="text-sm mr-4">0812 811 2674</span>
        <button className="bg-teal-400 text-white px-4 py-1 rounded text-sm">Contact us now</button>
      </div>
    </header>
 

    <main className={`flex-grow flex flex-col justify-center px-6 z-10 transition-all duration-300 ease-in-out ${isMenuOpen ? 'mt-40 md:mt-0' : ''}`}>
    <div className="max-w-2xl mx-auto mt-5 text-center md:text-left ">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            WELCOME TO CJ ART
          </h1>
          <h2 className="text-2xl md:text-3xl text-teal-400 mb-6">
          signage | interior decoration | cladding 
          </h2>
          <p className="mb-8 max-w-xl mx-auto md:mx-0">
            contact us: cjart@gmail.com | www.cjart.com | +234 812 811 2674
          </p>
          <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Link to="/register">
            <button className="w-full md:w-auto mb-3 bg-transparent border-2 border-teal-400 text-teal-400 px-6 py-2 rounded-full hover:bg-teal-400 hover:text-white transition duration-300">
             REGISTER
            </button>
            </Link>

            <Link to="/login">
            <button className="w-full md:w-auto bg-teal-400 text-white px-6 py-2 rounded-full hover:bg-teal-500 transition duration-300">
              LOGIN 
            </button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="py-4 px-6 flex flex-col md:flex-row justify-between items-center z-10">
        <p className="text-sm text-center md:text-left mb-4 md:mb-0">
          Miracle Junction Ifite-Awka, Awka, Anambra state.
        </p>
        <div className="flex space-x-4">
          <FaFacebookF className="text-gray-400 hover:text-teal-400 cursor-pointer" />
          <FaLinkedinIn className="text-gray-400 hover:text-teal-400 cursor-pointer" />
          <FaGooglePlusG className="text-gray-400 hover:text-teal-400 cursor-pointer" />
          <FaRss className="text-gray-400 hover:text-teal-400 cursor-pointer" />
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
