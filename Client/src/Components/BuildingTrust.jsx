import helmet from "../assets/helmet.png";

const BuildingTrust = () => {
  return (
    <div className="py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center bg-purple-900">
          {/* Left content */}
          <div className="md:w-2/3 mb-10 md:mb-0 md:pr-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Building on Trust
            </h2>
            <p className="text-white text-lg mb-10">
              We know that working together as a community is better for
              everyone. Our platform enables blockchain developers to build
              their dApps and wallets natively and connect with millions of
              users, without having to worry about the low-level implementation
              details.
            </p>
            <a
              href="#"
              className="inline-block bg-white text-purple-800 font-medium py-3 px-8 rounded-full hover:bg-gray-100 transition-colors"
            >
              Check out our Developer Docs
            </a>
          </div>

          {/* Right image */}
          <div className="md:w-1/3 flex justify-center md:justify-end">
            <img
              src={helmet || "/placeholder.svg"}
              alt="Developer helmet illustration"
              className="w-full max-w-xs md:max-w-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingTrust;
