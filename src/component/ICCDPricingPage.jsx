import React, { useState } from 'react';
import { Check, X, Zap, Users, Shield, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ICCDPricingPage() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const navigate = useNavigate();

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for individuals getting started',
      price: { monthly: 0, annual: 0 },
      fee: '5%',
      popular: false,
      features: [
        { text: 'Global freelance marketplace', included: true },
        { text: 'AI-powered job matching', included: true },
        { text: 'Project tracking tools', included: true },
        { text: 'Standard reporting', included: true },
        { text: '20 invites per job post', included: true },
        { text: 'Chat & file sharing', included: true },
        { text: 'Payment protection', included: true },
        { text: 'Expert-vetted talent', included: false },
        { text: 'Priority support', included: false },
        { text: 'Advanced analytics', included: false }
      ]
    },
    {
      name: 'Professional',
      description: 'For growing teams and businesses',
      price: { monthly: 49, annual: 470 },
      fee: '3%',
      popular: true,
      features: [
        { text: 'Everything in Starter', included: true },
        { text: 'Top 1% expert-vetted talent', included: true },
        { text: 'AI recruiter assistant', included: true },
        { text: '50 invites per job post', included: true },
        { text: '20 direct messages/day', included: true },
        { text: 'Team controls & permissions', included: true },
        { text: 'Advanced reporting', included: true },
        { text: 'Priority 24/7 support', included: true },
        { text: 'Pay later (Net 30)', included: true },
        { text: 'No contract initiation fees', included: true }
      ]
    },
    {
      name: 'Enterprise',
      description: 'Custom solutions for large organizations',
      price: { monthly: 'Custom', annual: 'Custom' },
      fee: 'Custom',
      popular: false,
      features: [
        { text: 'Everything in Professional', included: true },
        { text: 'Dedicated account manager', included: true },
        { text: 'Custom integrations & API', included: true },
        { text: 'Unlimited invites & messages', included: true },
        { text: 'White-label options', included: true },
        { text: 'Custom compliance & security', included: true },
        { text: 'Volume discounts', included: true },
        { text: 'Custom payment terms', included: true },
        { text: 'Onboarding & training', included: true },
        { text: 'SLA guarantees', included: true }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-#2E7A81 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Transparent Pricing
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Flexible pricing for freelancers and businesses of all sizes. No hidden fees.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-[#2E7A81] text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-md transition-all relative ${
                billingCycle === 'annual'
                  ? 'bg-[#2E7A81] text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Annual
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-105 ${
                plan.popular ? 'ring-2 ring-[#2E7A81]' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-[#1C4C50] via-[#2E7A81] to-[#1C4C50] text-white px-4 py-1 text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  {plan.name === 'Professional' ? (
                    <Star className="w-6 h-6 text-[#2E7A81]" />
                  ) : plan.name === 'Enterprise' ? (
                    <Shield className="w-6 h-6 text-indigo-600" />
                  ) : (
                    <Users className="w-6 h-6 text-gray-600" />
                  )}
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                </div>
                
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-gray-900">
                      {typeof plan.price[billingCycle] === 'number' 
                        ? `$${plan.price[billingCycle]}`
                        : plan.price[billingCycle]
                      }
                    </span>
                    {typeof plan.price[billingCycle] === 'number' && plan.price[billingCycle] > 0 && (
                      <span className="text-gray-600">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                    )}
                  </div>
                  <div className="mt-2 inline-flex items-center gap-2 bg-blue-50  text-[#2E7A81] px-3 py-1 rounded-full text-sm font-medium">
                    {plan.fee} platform fee
                  </div>
                </div>

           
                <div className="mt-8 space-y-4">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="mt-20 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Detailed Feature Comparison
          </h2>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Feature
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      Starter
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 bg-blue-50">
                      Professional
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { name: 'Platform Fee', starter: '5%', pro: '3%', enterprise: 'Custom' },
                    { name: 'Job Invites', starter: '20/post', pro: '50/post', enterprise: 'Unlimited' },
                    { name: 'Direct Messages', starter: '5/day', pro: '20/day', enterprise: 'Unlimited' },
                    { name: 'AI Recruiter', starter: false, pro: true, enterprise: true },
                    { name: 'Expert-Vetted Talent', starter: false, pro: true, enterprise: true },
                    { name: 'Payment Terms', starter: 'Immediate', pro: 'Net 30', enterprise: 'Custom' },
                    { name: 'Support', starter: 'Email', pro: '24/7 Priority', enterprise: 'Dedicated Manager' },
                    { name: 'API Access', starter: false, pro: false, enterprise: true },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {row.name}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">
                        {typeof row.starter === 'boolean' ? (
                          row.starter ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 mx-auto" />
                          )
                        ) : (
                          row.starter
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700 bg-blue-50">
                        {typeof row.pro === 'boolean' ? (
                          row.pro ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 mx-auto" />
                          )
                        ) : (
                          row.pro
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">
                        {typeof row.enterprise === 'boolean' ? (
                          row.enterprise ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 mx-auto" />
                          )
                        ) : (
                          row.enterprise
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            {[
              {
                q: 'Can I change my plan later?',
                a: 'Yes! You can upgrade or downgrade your plan at any time. Upgrades take effect immediately, while downgrades take effect at the end of your billing cycle.'
              },
              {
                q: 'Are there any hidden fees?',
                a: 'No hidden fees. You only pay the monthly subscription (if applicable) and the platform fee on completed work. Contract initiation fees may apply for Starter plan users.'
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, debit cards, PayPal, and bank transfers. Enterprise clients can arrange custom payment terms.'
              },
              {
                q: 'Is there a free trial?',
                a: 'The Starter plan is free to join with no monthly fees. Professional and Enterprise plans offer a 14-day free trial with no credit card required.'
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.q}
                </h3>
                <p className="text-gray-600">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-gradient-to-r from-[#1C4C50] via-[#2E7A81] to-[#1C4C50] rounded-2xl p-12 shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses and freelancers already working together on ICCD
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            
            <button onClick={() => navigate('/login')} className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#2E7A81] transition-all">
              Get Started 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}