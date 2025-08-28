import Navbarlogo from "../assets/Navbarlogo.webp";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaDiscord,
  FaRedditAlien,
  FaTelegram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const EndSection = () => {
  return (
    <div className="py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-100 rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
            {/* Logo Column */}
            <div className="md:col-span-1">
              <div className="mb-7">
                <h1 className="text-purple-950 text-3xl font-extrabold">
                  <span className="text-4xl font-bold">X</span>
                  <span className="text-purple-900">WALLET</span>
                </h1>
              </div>

              <div className="mt-12">
                <h3 className="font-bold text-lg mb-2">
                  Download Trust Wallet
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  The most trusted & secure crypto wallet.
                </p>

                <div className="flex flex-col gap-3">
                  <a
                    href="#"
                    className="flex items-center justify-center gap-2 border border-purple-900 text-purple-900 rounded-full py-2 px-4 hover:bg-blue-50 transition-colors"
                  >
                    <span>Download for iOS</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.566 11.996c-.24.125-5.799 3.389-5.799 3.389-.121.075-.195.207-.195.357 0 .149.074.282.195.357 0 0 5.625 3.236 5.813 3.342.188.105.345.079.345-.232l-.001-6.979c0-.311-.156-.338-.358-.234z" />
                      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
                    </svg>
                  </a>

                  <a
                    href="#"
                    className="flex items-center justify-center gap-2 border border-purple-900 text-purple-900 rounded-full py-2 px-4 hover:bg-blue-50 transition-colors"
                  >
                    <span>Download Extension</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1.999 14.413-3.713-3.705L7.7 11.292l2.299 2.295 5.294-5.294 1.414 1.414-6.706 6.706z" />
                    </svg>
                  </a>

                  <a
                    href="#"
                    className="flex items-center justify-center gap-2 border border-purple-900 text-purple-900 rounded-full py-2 px-4 hover:bg-blue-50 transition-colors"
                  >
                    <span>Download APK</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18 10.561V7.108c0-1.25-.56-2.013-1.4-2.013-.84 0-1.4.763-1.4 2.013v3.453h-6.4V7.108c0-1.25-.56-2.013-1.4-2.013-.84 0-1.4.763-1.4 2.013v3.453H4v6.938h16v-6.938h-2zm-1.4 4.122h-9.2v-1.391h9.2v1.391zm-3.493-9.769c0-.297.213-.508.493-.508.28 0 .493.211.493.508v.801h-.986v-.801zm-7 0c0-.297.213-.508.493-.508.28 0 .493.211.493.508v.801h-.986v-.801zM12 21.447l.4-.268c2.24-1.5 3.6-2.702 3.6-4.032 0-1.07-.92-1.826-2-1.826-1.1 0-2 .924-2 1.993h-2c0-1.07-.9-1.993-2-1.993-1.08 0-2 .756-2 1.826 0 1.33 1.36 2.532 3.6 4.031l.4.269z" />
                    </svg>
                  </a>

                  <a
                    href="#"
                    className="flex items-center justify-center gap-2 border border-purple-900 text-purple-900 rounded-full py-2 px-4 hover:bg-blue-50 transition-colors"
                  >
                    <span>Download for Android</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.344 8.71c-.707 0-1.279.572-1.279 1.278v4.53a1.278 1.278 0 1 0 2.558 0v-4.53c0-.706-.572-1.278-1.279-1.278zm-12.688 0c-.707 0-1.279.572-1.279 1.278v4.53a1.278 1.278 0 1 0 2.558 0v-4.53A1.277 1.277 0 0 0 5.656 8.71zm8.889-3.809 1.122-1.122a.494.494 0 1 0-.707-.707l-1.27 1.27A5.46 5.46 0 0 0 12 4.001c-.734 0-1.433.142-2.076.402l-1.201-1.201a.5.5 0 0 0-.707.707l1.054 1.054A5.511 5.511 0 0 0 6.5 9.52v.96h11v-.96a5.511 5.511 0 0 0-2.955-4.858zM9.75 8.161a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5v-.64a.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5v.64zm5.5 0a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5v-.64a.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5v.64zm-9.25 3.84v5.5c0 .84.66 1.5 1.5 1.5h.5v2a1.5 1.5 0 0 0 3 0v-2h2v2a1.5 1.5 0 0 0 3 0v-2h.5c.84 0 1.5-.66 1.5-1.5v-5.5H6z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Navigation Columns */}
            <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-5 gap-8">
              {/* Wallet Column */}
              <div>
                <h3 className="font-bold text-lg mb-4">Wallet</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-gray-600 hover:text-purple-950">
                      Mobile App
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-purple-950">
                      Browser Extension
                    </a>
                  </li>
                </ul>
              </div>

              {/* Features Column */}
              <div>
                <h3 className="font-bold text-lg mb-4">Features</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-gray-600 hover:text-purple-950">
                      Buy Crypto
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-purple-950">
                      Swaps
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-purple-950">
                      Staking
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-purple-950">
                      NFTs
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-purple-950">
                      Security
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-purple-950">
                      SWIFT: Smart Contract Wallet
                    </a>
                  </li>
                </ul>
              </div>

              {/* Build Column */}
              <div>
                <h3 className="font-bold text-lg mb-4">Build</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-gray-600 hover:text-purple-950">
                      Developer Docs
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-purple-950">
                      Wallet Core
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-purple-950">
                      Submit dApp
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-purple-950">
                      Get assets listed
                    </a>
                  </li>
                </ul>
              </div>

              {/* Support Column */}
              <div>
                <h3 className="font-bold text-lg mb-4">Support</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-gray-600 hover:text-purple-950">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-purple-950">
                      Community Forum
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-purple-950">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>

              {/* About Column */}
              <div>
                <h3 className="font-bold text-lg mb-4">About</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-gray-600 hover:text-purple-950">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-purple-950">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-purple-950">
                      Press Kit
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-purple-950">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-purple-950">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-purple-950">
                      Blog
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Certification Badges */}
            <div className="md:col-span-1">
              <div className="flex flex-col items-center gap-4">
                <div className="border border-gray-300 rounded-lg p-2 w-24">
                  <div className="bg-yellow-400 h-4 w-full mb-2"></div>
                  <div className="text-center text-xs font-bold">ISO 27001</div>
                  <div className="text-center text-[10px] text-gray-500">
                    CERTIFIED
                  </div>
                </div>

                <div className="border border-gray-300 rounded-lg p-2 w-24">
                  <div className="bg-yellow-400 h-4 w-full mb-2"></div>
                  <div className="text-center text-xs font-bold">ISO 27001</div>
                  <div className="text-center text-[10px] text-gray-500">
                    CERTIFIED
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-12">
                <h3 className="font-bold text-lg mb-4">Stay Connected:</h3>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#"
                    className="bg-gray-800 text-white p-2 rounded-md hover:bg-gray-700"
                  >
                    <FaFacebookF size={18} />
                  </a>
                  <a
                    href="#"
                    className="bg-gray-800 text-white p-2 rounded-md hover:bg-gray-700"
                  >
                    <FaGithub size={18} />
                  </a>
                  <a
                    href="#"
                    className="bg-gray-800 text-white p-2 rounded-md hover:bg-gray-700"
                  >
                    <FaInstagram size={18} />
                  </a>
                  <a
                    href="#"
                    className="bg-gray-800 text-white p-2 rounded-md hover:bg-gray-700"
                  >
                    <FaXTwitter size={18} />
                  </a>
                  <a
                    href="#"
                    className="bg-gray-800 text-white p-2 rounded-md hover:bg-gray-700"
                  >
                    <FaDiscord size={18} />
                  </a>
                  <a
                    href="#"
                    className="bg-gray-800 text-white p-2 rounded-md hover:bg-gray-700"
                  >
                    <FaRedditAlien size={18} />
                  </a>
                  <a
                    href="#"
                    className="bg-gray-800 text-white p-2 rounded-md hover:bg-gray-700"
                  >
                    <FaTelegram size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndSection;
