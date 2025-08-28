"use client";
import { motion } from "framer-motion";
import hand from "../assets/hand-removebg-preview.png";


const CryptoSection = () => {
  return (
    <div className="bg-white px-[10%] pb-0">
      <section
        className="w-full rounded-3xl py-16"
        style={{
          background: "linear-gradient(to bottom, #fff9c4, #ffb6c1)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Heading */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Simple. Seamless.</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Enjoy a smooth mobile app and desktop experience with easy-to-use,
              powerful tools to support your entire Web3 journey.
            </p>
          </div>

          {/* Feature Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-lg overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              {/* Left Content */}
              <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Deposit crypto easily from exchanges
                </h2>
                <p className="text-gray-700 mb-8">
                  Take control of your crypto. Avoid complicated steps and
                  deposit directly to your wallet from exchanges like Binance
                  and Coinbase.
                </p>
                <div>
                  <a
                    href="#"
                    className="inline-block px-8 py-3 rounded-full bg-purple-900 text-white font-medium border-2 border-purple-900 hover:bg-purple-950 transition-colors"
                  >
                    Get started with deposits
                  </a>
                </div>
              </div>

              {/* Right Image - Using hand image */}
              <div className="md:w-1/2 relative p-4">
                <img
                  src={hand || "/placeholder.svg"}
                  alt="Hand holding phone with QR code"
                  className="w-full h-full object-contain object-center rounded-3xl"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CryptoSection;
