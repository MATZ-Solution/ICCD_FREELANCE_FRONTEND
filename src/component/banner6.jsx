const Banner6 = () => {
  const testimonials = [
    {
      text: "“If we didn't have Upwork… the quality of talent wouldn't be as easy to measure, and we wouldn't have the incredible support we get from the Upwork team.”",
      author: "Jessica Khawaja, VP of People Operations",
      bgColor: "#14416B",
    },
    {
      text: "“If we didn't have Upwork… the quality of talent wouldn't be as easy to measure, and we wouldn't have the incredible support we get from the Upwork team.”",
      author: "Jessica Khawaja, VP of People Operations",
      bgColor: "#15A9B2",
    },
    {
      text: "“If we didn't have Upwork… the quality of talent wouldn't be as easy to measure, and we wouldn't have the incredible support we get from the Upwork team.”",
      author: "Jessica Khawaja, VP of People Operations",
      bgColor: "#14416B",
    },
  ];

  return (
    <div className="px-3 sm:px-10 mt-10">
      <section className="flex flex-col items-center p-6 md:p-12 rounded-2xl">
        {/* Heading */}
        <div className="w-full text-center md:text-left mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-black mb-10 lg:w-2/3 lg:leading-tight">
            Trusted by Leading <span className="text-[#15A9B2]">Brands and Startups</span>
          </h1>

          {/* Testimonials */}
          <div className="flex flex-col md:flex-row gap-6 w-full">
            {testimonials.map((item, index) => (
              <div
                key={index}
                style={{ backgroundColor: item.bgColor }}
                className="flex-1 px-6 py-6 rounded-xl text-white cursor-pointer transition transform hover:scale-105"
              >
                <p className="text-base sm:text-lg font-semibold">{item.text}</p>
                <p className="mt-4 text-xs sm:text-sm">{item.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner6;
