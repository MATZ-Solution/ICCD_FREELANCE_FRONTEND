import React from 'react';
import hirefast from "../../assets/client_dashboard/person1.png";
import blog1 from "../../assets/client_dashboard/blog1.png";
import GigCard from '../client_dashboard/gig_card';
import { CircleQuestionMark } from 'lucide-react';

const GigsList = () => {
  const basedOnLookingFor = [
    {
      image: blog1,
      title: "I will create figma UI UX design for website mockup",
      author: "Saba Akbar",
      level: "Level 2++",
      rating: 4.7,
      reviews: 187,
      price: 2977,
      offersVideoConsultation: true,
    },
    {
      image: blog1,
      title: "I will design, redesign, and develop a responsive wordpress...",
      author: "Swapnil Halder",
      level: "Level 1++",
      rating: 5.0,
      reviews: 39,
      price: 5953,
      offersVideoConsultation: false,
    },
    {
      image: blog1,
      title: "I will do figma UI UX design for figma website, mobile app...",
      author: "Visual Voyage",
      level: "Level 1++",
      rating: 4.8,
      reviews: 30,
      price: 2977,
      offersVideoConsultation: false,
    },
    {
      image: blog1,
      title: "I will do responsive wordpress website design and develop...",
      author: "Muhammad I",
      level: "Level 1++",
      rating: 5.0,
      reviews: 209,
      price: 29810,
      offersVideoConsultation: true,
    },
  ];

  const gigsYouMayLike = [
    {
      image: blog1,
      title: "I will design unique logos for startups and businesses",
      author: "Ayesha N",
      level: "Top Rated",
      rating: 5.0,
      reviews: 102,
      price: 8000,
      offersVideoConsultation: false,
    },
    {
      image: blog1,
      title: "I will create a mobile app prototype in Figma",
      author: "Usman K",
      level: "Level 2",
      rating: 4.9,
      reviews: 88,
      price: 5500,
      offersVideoConsultation: true,
    },
    {
      image: blog1,
      title: "I will design creative social media posts",
      author: "Sarah M",
      level: "Level 1",
      rating: 4.8,
      reviews: 45,
      price: 2500,
      offersVideoConsultation: false,
    },
    {
      image: blog1,
      title: "I will develop modern responsive web pages",
      author: "Ali T",
      level: "Level 2",
      rating: 5.0,
      reviews: 120,
      price: 9500,
      offersVideoConsultation: true,
    },
    {
      image: blog1,
      title: "I will write SEO friendly website content",
      author: "Maria H",
      level: "Level 1",
      rating: 4.7,
      reviews: 35,
      price: 1800,
      offersVideoConsultation: false,
    },
  ];

  const verifiedProServices = [
    {
      image: blog1,
      title: "I will create advanced web animations",
      author: "Bilal A",
      level: "Pro Verified",
      rating: 5.0,
      reviews: 54,
      price: 15000,
      offersVideoConsultation: true,
    },
    {
      image: blog1,
      title: "I will design eCommerce product pages",
      author: "Fatima R",
      level: "Pro Verified",
      rating: 4.9,
      reviews: 89,
      price: 9000,
      offersVideoConsultation: false,
    },
    {
      image: blog1,
      title: "I will develop custom Shopify themes",
      author: "Hamza Y",
      level: "Pro Verified",
      rating: 5.0,
      reviews: 67,
      price: 20000,
      offersVideoConsultation: true,
    },
    {
      image: blog1,
      title: "I will optimize website speed for SEO",
      author: "Maham Z",
      level: "Pro Verified",
      rating: 4.8,
      reviews: 42,
      price: 7000,
      offersVideoConsultation: false,
    },
    {
      image: blog1,
      title: "I will integrate payment gateways in web apps",
      author: "Junaid L",
      level: "Pro Verified",
      rating: 5.0,
      reviews: 38,
      price: 12000,
      offersVideoConsultation: true,
    },
  ];

  const mostPopularGigs = [
    {
      image: blog1,
      title: "I will develop full-stack MERN apps",
      author: "Talha S",
      level: "Top Rated",
      rating: 5.0,
      reviews: 300,
      price: 25000,
      offersVideoConsultation: true,
    },
    {
      image: blog1,
      title: "I will design creative infographics",
      author: "Kinza B",
      level: "Level 2",
      rating: 4.9,
      reviews: 210,
      price: 4000,
      offersVideoConsultation: false,
    },
    {
      image: blog1,
      title: "I will write professional business plans",
      author: "Asad J",
      level: "Top Rated",
      rating: 5.0,
      reviews: 178,
      price: 18000,
      offersVideoConsultation: true,
    },
    {
      image: blog1,
      title: "I will create motion graphics videos",
      author: "Shazia K",
      level: "Level 1",
      rating: 4.7,
      reviews: 95,
      price: 8500,
      offersVideoConsultation: false,
    },
    {
      image: blog1,
      title: "I will provide UX research reports",
      author: "Noman P",
      level: "Level 2",
      rating: 4.8,
      reviews: 60,
      price: 6500,
      offersVideoConsultation: true,
    },
  ];

  return (
    <div className='px-6 space-y-24 sm:px-6 md:px-10'>
      {/* Hero Section */}
      <div className="rounded-xl mx-auto p-2 bg-[#F8F8F8]">
        <div className="grid md:grid-cols-2 gap-8  items-center">
          <div className='lg:ml-24'>
            <h1 className="text-5xl font-bold text-[#043A53] mb-4">
              Hire a Freelancer
            </h1>
            <p className="text-gray-600 text-lg">
              Choose a freelancer's personal and instantly generate 
              work in their distinct style.
            </p>
          </div>
          <div className=' flex justify-center md:block' >
            <img src={hirefast} alt="Hire Fast" className="w-auto" />
          </div>
        </div>
      </div>

      {/* Section 1 */}
      <Section title="Based on what you might be looking for">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {/* Keep Exploring Card */}
          <div className="w-full h-full flex flex-col bg-white">
            <h1 className='text-lg flex gap-2 rounded-lg border-gray-500 flex-row hover:shadow-lg transition relative border p-2'>
              <CircleQuestionMark /> Keep Exploring
            </h1>
          </div>
          {basedOnLookingFor.map((gig, index) => (
            <GigCard key={index} {...gig} />
          ))}
        </div>
      </Section>

      {/* Section 2 */}
      <Section title="Gigs You May Like">
        <GigGrid data={gigsYouMayLike} />
      </Section>

      {/* Section 3 */}
      <Section title="Verifies Pro Service in Web design">
        <GigGrid data={verifiedProServices} />
      </Section>

      {/* Section 4 */}
      <Section title="Most Popular Gigs In Website Design">
        <GigGrid data={mostPopularGigs} />
      </Section>
    </div>
  );
};

// Reusable Section Component
const Section = ({ title, children }) => (
  <>
    <h1 className="font-semibold mb-3 text-xl">{title}</h1>
    {children}
  </>
);

// Grid component for GigCards
const GigGrid = ({ data }) => (
  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
    {data.map((gig, index) => (
      <GigCard key={index} {...gig} />
    ))}
  </div>
);

export default GigsList;