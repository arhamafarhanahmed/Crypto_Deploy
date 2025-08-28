import React, { useState, useEffect } from "react";
import logo from "../assets/trust-removebg-preview.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-purple-950 text-4xl font-extrabold">
            <span className="text-5xl font-bold">X</span>
            <span className="text-purple-900">WALLET</span>
          </h1>
        </div>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#wallet"
            className="text-gray-800 hover:text-purple-900 font-medium"
          >
            Wallet
          </a>
          <a
            href="#features"
            className="text-gray-800 hover:text-purple-900 font-medium"
          >
            Features
          </a>
          <a
            href="#build"
            className="text-gray-800 hover:text-purple-900 font-medium"
          >
            Build
          </a>
          <a
            href="#support"
            className="text-gray-800 hover:text-purple-900 font-medium"
          >
            Support
          </a>
          <a
            href="#about"
            className="text-gray-800 hover:text-purple-900 font-medium"
          >
            About
          </a>
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              {isDarkMode ? (
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              ) : (
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              )}
            </svg>
          </button>

          {/* Language Selector */}
          <button className="hidden md:flex items-center space-x-1 border border-gray-300 rounded-full px-4 py-1.5 text-sm font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-purple-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
            <span>Language</span>
          </button>

          {/* Download Button */}
          <a
            href="#download"
            className="hidden md:block bg-purple-900 hover:bg-blue-950 text-white font-medium py-2 px-6 rounded-full transition-colors"
          >
            Download
          </a>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-md hover:bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
