import { useState } from "react";
import crypto from "../assets/crypto.png";

const WalletSection = () => {
  const [activeTab, setActiveTab] = useState("mobile");

  return (
    <div className="bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-100 p-12 rounded-3xl flex flex-col md:flex-row items-center gap-8">
          {/* Left content */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">
              Your one-stop, Web3 wallet
            </h2>
            <p className="text-gray-700 mb-8">
              Buy, sell, and swap crypto, earn rewards, manage NFTs, and
              discover DApps, all in one place.
            </p>

            {/* Tabs */}
            <div className="inline-flex p-1 bg-white border border-gray-200 rounded-full mb-8">
              <button
                className={`px-8 py-3 rounded-full text-sm font-medium transition-colors ${
                  activeTab === "mobile"
                    ? "bg-purple-900 text-white"
                    : "text-gray-700"
                }`}
                onClick={() => setActiveTab("mobile")}
              >
                Mobile
              </button>
              <button
                className={`px-8 py-3 rounded-full text-sm font-medium transition-colors ${
                  activeTab === "extension"
                    ? "bg-purple-900 text-white"
                    : "text-gray-700"
                }`}
                onClick={() => setActiveTab("extension")}
              >
                Extension
              </button>
            </div>

            {/* Download Button */}
            <div>
              <a
                href="#"
                className="inline-block px-8 py-3 rounded-full bg-purple-900 text-white font-medium hover:bg-purple-950 transition-colors"
              >
                {activeTab === "mobile"
                  ? "Download Mobile App"
                  : "Install Browser Extension"}
              </a>
            </div>
          </div>

          {/* Right image */}
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="relative w-full max-w-md">
              <img
                src={crypto || "/placeholder.svg"}
                alt="Crypto wallet illustration"
                className="object-contain w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletSection;
