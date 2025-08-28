import heropic from "../assets/heropic-removebg-preview.png";

const Hero = () => {
  return (
    <div className="bg-white py-12 md:py-24">
      <div className="container mt-10 mx-auto px-4 md:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Left Side - Text Content */}
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight mb-4 md:mb-6">
              True crypto ownership.
              <br />
              Powerful Web3
              <br />
              experiences
            </h1>
            <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 max-w-lg">
              Unlock the power of your cryptocurrency assets and explore the
              world of Web3 with Trust Wallet.
            </p>

            {/* Download Buttons - Improved for mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-md">
              <a
                href="#download-mobile"
                className="flex items-center justify-center border-2 border-purple-900 rounded-full px-4 py-2.5 text-purple-900 hover:bg-blue-50 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                <div className="flex flex-col items-start">
                  <span className="text-xs">Download</span>
                  <span className="text-sm font-medium">Mobile App</span>
                </div>
              </a>

              <a
                href="#download-extension"
                className="flex items-center justify-center border-2 border-purple-900 rounded-full px-4 py-2.5 text-purple-900 hover:bg-blue-50 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <div className="flex flex-col items-start">
                  <span className="text-xs">Download</span>
                  <span className="text-sm font-medium">Extension</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
            {/* Using the imported hero pic - larger size */}
            <img
              src={heropic || "/placeholder.svg"}
              alt="Crypto Wallet Interface"
              className="w-full max-w-md h-auto"
            />
          </div>
        </div>

        {/* Trust indicators with better mobile responsiveness */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4 mt-16 md:mt-24 text-center">
          <div className="col-span-1">
            <p className="text-lg font-medium">Trusted by</p>
            <p className="text-xl md:text-2xl font-bold text-purple-900">
              140M <span className="text-black font-normal">people</span>
            </p>
          </div>

          <div className="col-span-1">
            <p className="text-lg font-medium">Founded in</p>
            <p className="text-xl md:text-2xl font-bold text-purple-900">
              2017
            </p>
          </div>

          <div className="col-span-1">
            <p className="text-lg font-medium">Independently</p>
            <p className="text-xl md:text-2xl font-bold text-purple-900">
              Audited
            </p>
          </div>

          <div className="col-span-1">
            <p className="text-lg font-medium">ISO</p>
            <p className="text-xl md:text-2xl font-bold text-purple-900">
              Certified
            </p>
          </div>

          <div className="col-span-2 md:col-span-1 mt-4 md:mt-0">
            <p className="text-lg font-medium">Top reviews</p>
            <div className="flex justify-center text-xl md:text-2xl text-purple-900">
              ★ ★ ★ ★ ★
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
