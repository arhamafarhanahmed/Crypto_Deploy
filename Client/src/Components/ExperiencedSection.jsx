import pic01 from "../assets/pic01.png";
import pic02 from "../assets/pic02.png";
import pic03 from "../assets/pic03.png";
import pic04 from "../assets/pic04.png";

const ExperiencedSection = () => {
  return (
    <div className="bg-white py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading and description */}
        <div className="max-w-3xl ">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Enjoy a Web3 experience powered by community
          </h2>
          <p className="text-xl text-gray-700">
            Join our vibrant and diverse community to learn about the power of
            self-custody, crypto, and Web3.
          </p>
        </div>

        {/* Image grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Image 1 - Grayscale */}
          <div className="rounded-3xl overflow-hidden">
            <img
              src={pic01 || "/placeholder.svg"}
              alt="Community member working with data"
              className="w-full h-full object-cover filter grayscale"
            />
          </div>

          {/* Image 2 - Blue tint */}
          <div className="rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 bg-purple-900 mix-blend-color opacity-40"></div>
            <img
              src={pic02 || "/placeholder.svg"}
              alt="Community member at an event"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Image 3 - Grayscale */}
          <div className="rounded-3xl overflow-hidden">
            <img
              src={pic03 || "/placeholder.svg"}
              alt="Community member with motorcycle"
              className="w-full h-full object-cover filter grayscale"
            />
          </div>

          {/* Image 4 - Blue tint */}
          <div className="rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 bg-purple-900 mix-blend-color opacity-40"></div>
            <img
              src={pic04 || "/placeholder.svg"}
              alt="Community member working on laptop"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Juan */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Juan</h3>
            <p className="text-gray-700">
              The easiest way to understand DeFi is to get your hands dirty. The
              Trust Wallet dApp Browser helped me to use protocols with small
              amounts and learn what works and what doesn't work.
            </p>
          </div>

          {/* Jen */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Jen</h3>
            <p className="text-gray-700">
              Secure your private keys like your life depends on it. #DoNotShare
              🔑
            </p>
          </div>

          {/* Harry */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Harry</h3>
            <p className="text-gray-700">
              As a newcomer in this field, the introduction of blockchain
              technology has had a profound and transformative impact on my
              life. It has opened up an entirely new realm of possibilities that
              I am eager to explore.
            </p>
          </div>

          {/* Esmart */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Esmart</h3>
            <p className="text-gray-700">
              I thoroughly enjoy engaging with DeFi and have developed a passion
              for minting NFTs. However, I always make it a point to conduct my
              own research and consistently check the Trust Wallet Security
              Scanner prior to any acquisition. By following these Web3 security
              practices, I ensure my safety and stay #SAFU. 🔵
            </p>
          </div>
        </div>

        {/* Telegram Button */}
        <div>
          <a
            href="#"
            className="inline-block bg-purple-900 hover:bg-purple-950 text-white font-medium py-3 px-8 rounded-full transition-colors"
          >
            Join our community on Telegram
          </a>
        </div>
      </div>
    </div>
  );
};

export default ExperiencedSection;
