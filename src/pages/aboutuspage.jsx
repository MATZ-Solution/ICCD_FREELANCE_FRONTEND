import React from 'react';
import aboutheader from "../assets/aboutusheader.png";
import leftimage from "../assets/leftabout.png";
import c1 from "../assets/c1.png"
import c2 from "../assets/c2.png"
import c3 from "../assets/c3.png"
import aboutright from "../assets/aboutright.png"

const AboutUsPage = () => {
  const values = [
    {
      title: "Community first",
      description: "There’s no ICCD Freelance without our community and employees.",
    },
    {
      title: "Simplify",
      description: "In a complex world, simplicity is powerful and refreshing.",
    },
    {
      title: "Embrace change",
      description: "We dive into what’s new and harness it to make ICCD Freelance better.",
    },
    {
      title: "Get it done",
      description: "When we see an opportunity, we seize it—and see it through.",
    },
    {
      title: "Push limits",
      description: "We challenge ourselves to think differently and go beyond what feels familiar.",
    },
  ];

  const tutorials = [
    {
      image: c1,
      title: "10 Real-World Problems AI Can Solve for Your Business",
    },
    {
      image: c2,
      title: "Offline to Online Business: How to Successfully Lead a Digital Transformation",
    },
    {
      image: c3,
      title: "How to turn your skills into a profitable side business",
    },
  ];

  return (
    <div className=' px-6' >
      {/* Header */}
     <div className="relative mt-2  lg:rounded-3xl w-full">
  <img src={aboutheader} alt="About Us" className="w-full sm:rounded-lg lg:rounded-xl h-auto" />

  <div className="absolute space-y-2 top-1/2 left-10 lg:left-32 transform -translate-y-1/2 text-left">
    <p className="text-white text-sm md:text-base">A B O U T US</p>
    <h1 className="text-white sm:text-sm lg:text-5xl md:text-5xl font-bold">Making way for</h1>
    <h1 className="text-[#01AEAD] sm:text-sm italic font-serif lg:text-6xl md:text-5xl font-bold">breakthroughs</h1>
  </div>
</div>


      {/* Main Tagline */}
      <div className="text-center mt-6 text-gray-500 text-xl md:text-2xl px-4">
        {`At ICCD Freelance, we’re connecting every business to 
        the world’s most skilled digital freelancers, in the simplest way possible.`}
      </div>

      {/* Section 1 - Text Left, Image Right */}
      <div className="flex flex-col lg:flex-row items-center bg-gray-100 p-6 rounded-lg mx-auto my-6">
        <div className="w-full lg:w-xl lg:pr-8 mb-6 lg:mb-0 text-center lg:text-left">
          <p className="text-gray-700">
            ICCD Freelance operates all over the world with freelancers and businesses spanning an estimated 160 countries. The company was founded in 2010, is headquartered in Tel Aviv, and has satellite offices in New York, London, Kyiv, Berlin, and Orlando.
          </p>
        </div>
        <div className="w-full lg:w-1/2">
          <img src={leftimage} alt="About section image" className="rounded-lg object-cover w-full h-full" />
        </div>
      </div>

      {/* Section 2 - Image Left, Text Right */}
      <div className="flex flex-col lg:flex-row items-center bg-gray-100 p-6 rounded-lg mx-auto my-6">
        <div className="w-full lg:w-xl mb-6 lg:mb-0">
          <img src={aboutright} alt="About section image" className="rounded-lg object-cover w-full h-full" />
        </div>
        <div className="w-full lg:w-1/2 lg:pl-8 text-center lg:text-left">
          <p className="text-gray-700">
            Today, ICCD Freelance is a leading digital freelance solution <br/> on a global scale, providing you with access to high-quality, specialized, and diverse human talent on an AI-enhanced platform. You can find over 700 skills, ranging from AI to Programming, from Digital Marketing to Content Creation, from Video Editing to Architecture. We pride ourselves on being the best place to get the most value for your budget—whether you’re part of a startup or Fortune 500, whether you need help on a simple task or complex project.
          </p>
        </div>
      </div>

      {/* Middle Highlight */}
      <div className="text-center mt-6 text-gray-500 text-xl md:text-2xl px-4">
        {`ICCD Freelance helps businesses use freelance to flex in a whole new way.
         Speeding up growth. Changing the game. Making way for breakthroughs.`}
      </div>

      {/* Get Started Button Centered */}
      <div className="flex justify-center mt-6">
        <button className='bg-[#043A53] text-white px-6 py-3 text-center rounded-3xl'>
          Get Started Now
        </button>
      </div>

      {/* Our Mission & Values */}
      <section className="text-center px-6 py-16 bg-white">
        <h3 className="uppercase tracking-widest text-sm text-gray-600 mb-2">Our Mission</h3>
        <h1 className="text-3xl md:text-4xl font-bold mb-1">
          Change how the world{" "}
          <span className="block italic text-teal-600 font-semibold">works together.</span>
        </h1>

        <h2 className="mt-8 text-gray-700 text-lg font-medium mb-10">Our Values</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto mb-12">
          {values.map((val, index) => (
            <div key={index} className="px-4">
              <h3 className="font-semibold text-lg mb-2">{val.title}</h3>
              <p className="text-gray-600">{val.description}</p>
            </div>
          ))}
        </div>

        <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full transition flex items-center mx-auto">
          Get Started Now
          <span className="ml-2">&rarr;</span>
        </button>
      </section>

      {/* Tutorials Section */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          How-to’s on ICCD Freelance
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {tutorials.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img
                src={item.image}
                alt={item.title}
                className="rounded-lg shadow-md w-full max-h-56 object-cover"
              />
              <p className="mt-4 text-gray-800 text-sm font-medium">{item.title}</p>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 py-12 rounde-lg px-6 text-center">
          <h3 className="text-xl md:text-2xl font-semibold mb-4">
            Are you a <span className="italic text-teal-600 font-medium">freelancer</span> looking for work?
          </h3>
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full transition inline-flex items-center">
            Get Started Now
            <span className="ml-2">&rarr;</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
