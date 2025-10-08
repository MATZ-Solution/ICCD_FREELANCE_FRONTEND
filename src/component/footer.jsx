import logo from '../assets/ICCD-01.png';
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
        // { label: 'Community Guidelines', href: '/community-guidelines' },
        { label: 'Report an Issue', href: '/report' },
        // { label: 'Feedback', href: '/feedback' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Blog / Insights', href: '/blog' },
      ],
    },
    {
      title: 'ICCD & Partnerships',
      links: [
        { label: 'About ICCD', href: '/aboutus' },
        { label: 'Community Guidelines', href: '/CommunityGuidelines' },
        { label: 'OIC Digital Transformation Agenda', href: '/oic-digital' },
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
    <footer className="bg-slate-900 text-slate-100 pt-10 pb-6">
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

            <div className="mt-6 flex items-center gap-3">
              {/* Social icons */}
              <a aria-label="LinkedIn" href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-md hover:bg-slate-800">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6C1.12 6 0 4.88 0 3.5C0 2.12 1.12 1 2.5 1C3.88 1 4.98 2.12 4.98 3.5Z" fill="currentColor" />
                  <path d="M0 8.5H5V24H0V8.5Z" fill="currentColor" />
                  <path d="M9 8.5H14V10.9C14.8 9.6 17 8.5 19.5 8.5C24 8.5 24 11.9 24 17.4V24H19V18.3C19 16.1 19 13.5 16 13.5C13 13.5 12.5 15.7 12.5 18V24H7.5V8.5H9Z" fill="currentColor" />
                </svg>
              </a>

              <a aria-label="X (Twitter)" href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-md hover:bg-slate-800">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M24 4.56c-.89.39-1.84.65-2.84.77A4.92 4.92 0 0 0 23.34 3c-.95.56-2 .96-3.12 1.18A4.92 4.92 0 0 0 16.62 3c-2.72 0-4.92 2.2-4.92 4.92 0 .39.04.76.13 1.12C7.69 9.77 4.07 7.86 1.64 4.93c-.43.74-.68 1.6-.68 2.51 0 1.73.88 3.25 2.22 4.14A4.88 4.88 0 0 1 .96 11v.06c0 2.42 1.72 4.44 4 4.9-.42.12-.86.18-1.32.18-.32 0-.62-.03-.92-.08.62 1.94 2.44 3.35 4.6 3.39A9.86 9.86 0 0 1 0 20.13 13.9 13.9 0 0 0 7.29 22c8.75 0 13.54-7.25 13.54-13.54 0-.21 0-.42-.02-.63A9.6 9.6 0 0 0 24 4.56z" fill="currentColor" />
                </svg>
              </a>

              <a aria-label="Facebook" href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-md hover:bg-slate-800">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9v-2.89h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.46h-1.25c-1.23 0-1.61.77-1.61 1.56v1.87h2.74l-.44 2.89h-2.3v6.99C18.34 21.12 22 16.99 22 12z" fill="currentColor" />
                </svg>
              </a>

              <a aria-label="YouTube" href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-md hover:bg-slate-800">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M23.5 6.2s-.2-1.7-.8-2.4c-.8-.8-1.7-.8-2.1-.9C16.6 2.5 12 2.5 12 2.5s-4.6 0-8.6.4c-.4 0-1.3.1-2.1.9C.2 4.5 0 6.2 0 6.2S0 8 0 9.8v2.4C0 14 0 15.8 0 15.8s.2 1.7.8 2.4c.8.8 1.8.8 2.3.9 1.7.2 7.2.4 7.2.4s4.6 0 8.6-.4c.4 0 1.3-.1 2.1-.9.6-.7.8-2.4.8-2.4s.1-1.8.1-3.6v-2.4C23.6 8 23.5 6.2 23.5 6.2z" fill="currentColor" />
                </svg>
              </a>
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

        <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm text-slate-400">© {currentYear} ICCD Talent Gate — All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm">
            <a href="/privacy-policy" className="hover:underline text-slate-300">Privacy</a>
            <a href="/terms-of-service" className="hover:underline text-slate-300">Terms</a>
            <a href="/cookies" className="hover:underline text-slate-300">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
