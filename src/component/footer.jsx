import logo from '../assets/ICCD-01.png';
import { Link } from 'react-router-dom';
import { LinkedIn } from '@mui/icons-material';
import { Facebook } from '@mui/icons-material';
import { Instagram } from '@mui/icons-material';
import { YouTube } from '@mui/icons-material';
import { Twitter } from '@mui/icons-material';
import XIcon from '@mui/icons-material/X';
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: 'Platform Overview',
      links: [
        { label: 'About ICCD Talent Gate', href: '/aboutus' },
        { label: 'How It Works', href: '/how-it-works' },
        { label: 'FAQs', href: '/faqs' },
        { label: 'Contact Us', href: '/contactus' },
      ],
    },
    {
      title: 'Legal & Policy',
      links: [
        { label: 'Terms of Service', href: '/terms-of-service' },
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Cookies Policy', href: '/cookies' },
      ],
    },
    {
      title: 'Support & Help',
      links: [
        { label: 'Community Guidelines', href: '/CommunityGuidelines' },
        { label: 'Report an Issue', href: '/report' },
        { label: 'Feedback', href: '/feedback' },

      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Blog / Insights', href: '/blog' },
      ],
    },
   
    {
      title: 'Quick Access',
      links: [
        { label: 'Login / Register', href: '/login' },
        { label: 'Post a Project', href: '/client/post-project' },
        { label: 'Find Freelancers', href: '/find-talent' },
        { label: 'Become a Freelancer', href: '/freelancer-profile' },
      ],
    },
  ];

  return (
    <footer className=" bg-gradient-to-r from-[#1C4C50] via-[#2E7A81] to-[#1C4C50] text-slate-100 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Brand / Mission */}
          <div className="md:w-1/3">
            <a href="/" className="inline-flex items-center gap-3 mb-4">
              {/* simple logo placeholder */}
              <img src={logo} alt="ICCD Talent Gate Logo" className="h-10 w-10 rounded-md object-cover" />
              <span className="text-xl font-semibold">ICCD Talent Gate</span>
            </a>
            <p className="text-slate-300 leading-relaxed">
              Empowering professionals across the OIC region with global freelancing opportunities , connecting talent,
              institutions and projects through a trusted digital marketplace.
            </p>

            <div className="mt-7 flex  items-center gap-3">
              {/* Social icons */}
              <p>Follow us </p>
              <div className="flex items-center gap-3">
                <Link to="https://www.facebook.com/Iccden"><Facebook style={{ fontSize: 30 }} /></Link>
                <Link to="https://www.linkedin.com/company/islamic-chamber-of-commece-and-development"><XIcon style={{ fontSize: 25 }} /></Link>
                <Link to="https://x.com/iccia_iccd"><Twitter style={{ fontSize: 30 }} /></Link>
                <Link to="https://www.instagram.com/iccd_online"><Instagram style={{ fontSize: 30 }} /></Link>
              </div>
            </div>
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6 md:gap-8 md:w-2/3">
            {sections.map((sec) => (
              <div key={sec.title}>
                <h4 className="text-sm font-semibold text-slate-200 mb-3">{sec.title}</h4>
                <ul className="space-y-2 text-slate-300 text-sm">
                  {sec.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="inline-block hover:underline" aria-label={link.label}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col items-center justify-center md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm text-slate-400">© {currentYear} ICCD Talent Gate — All rights reserved. A Product of Islamic Chamber Of Commerce Powered by Matz </p>
          {/* <div className="flex items-center gap-4 text-sm">
            <a href="/privacy-policy" className="hover:underline text-slate-300">Privacy</a>
            <a href="/terms-of-service" className="hover:underline text-slate-300">Terms</a>
            <a href="/cookies" className="hover:underline text-slate-300">Cookies</a>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
