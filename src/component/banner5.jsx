import { Globe, Shield, Sparkles, Users, Award, Zap } from 'lucide-react';

const Banner5 = () => {
  const stats = [
    { number: '10,000+', label: 'Jobs Created', icon: <Sparkles size={24} /> },
    { number: '57', label: 'OIC Member States', icon: <Globe size={24} /> },
    { number: '6,000+', label: 'Professionals Connected', icon: <Users size={24} /> },
  ];

  const features = [
    {
      icon: <Shield size={32} />,
      title: 'Secure & Transparent',
      description: 'Safe payment channels and verified profiles'
    },
    {
      icon: <Zap size={32} />,
      title: 'Smart Matching',
      description: 'AI-powered connections between talent and opportunity'
    },
    {
      icon: <Award size={32} />,
      title: 'Ethical Standards',
      description: 'Fair compensation and respectful engagement'
    }
  ];

  return (
    <div className="px-4 sm:px-10 mt-16 mb-20">
      

      {/* Features Section */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
          Built on Values, Designed for Impact
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          More than a platform it's a movement for inclusive growth rooted in Islamic ethical principles
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
         <div className="animated-border bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 group">

              <div className="w-16 h-16 bg-[#215657]/10 rounded-xl flex items-center justify-center mb-6 text-[#215657] group-hover:bg-[#215657] group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Banner5;