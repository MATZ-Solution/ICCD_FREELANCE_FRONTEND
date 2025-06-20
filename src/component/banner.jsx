
const Banner = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between bg-gray-100 p-6 md:p-12 rounded-lg shadow-lg">
      {/* Left Text Content */}
      <div className="w-full md:w-1/2 text-center md:text-left mb-6 md:mb-0">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome to Our Platform
        </h1>
        <p className="text-gray-600 mb-6">
          Discover amazing features and seamless experiences built just for you.
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          Get Started
        </button>
      </div>

      {/* Right Image */}
      <div className="w-full md:w-1/2">
        <img
          src="https://via.placeholder.com/500x300"
          alt="Banner Illustration"
          className="w-full h-auto object-contain"
        />
      </div>
    </section>
  );
};

export default Banner;