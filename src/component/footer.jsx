import React from 'react';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';

const Footer = () => {
    return (
        <footer className="rounded-t-xl  lg:rounded-xl bg-gray-900 text-white py-10 sm:mx-15 sm:my-5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Column 1 */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Company</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:underline">About Us</a></li>
                            <li><a href="#" className="hover:underline">Careers</a></li>
                            <li><a href="#" className="hover:underline">Blog</a></li>
                            <li><a href="#" className="hover:underline">Press</a></li>
                        </ul>
                    </div>

                    {/* Column 2 */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Support</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:underline">Help Center</a></li>
                            <li><a href="#" className="hover:underline">Contact Us</a></li>
                            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                            <li><a href="#" className="hover:underline">Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Services</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:underline">Web Design</a></li>
                            <li><a href="#" className="hover:underline">Development</a></li>
                            <li><a href="#" className="hover:underline">Marketing</a></li>
                            <li><a href="#" className="hover:underline">Consulting</a></li>
                        </ul>
                    </div>

                    {/* Column 4 */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:underline">Facebook</a></li>
                            <li><a href="#" className="hover:underline">Twitter</a></li>
                            <li><a href="#" className="hover:underline">Instagram</a></li>
                            <li><a href="#" className="hover:underline">LinkedIn</a></li>
                        </ul>
                    </div>
                </div>

                <div className='mt-10 flex flex-col gap-5  flex-wrap sm:justify-between sm:flex sm:flex-row'>
                    <div className='flex gap-5'>
                        <p className='text-white'>Follow us on </p>
                        <FacebookRoundedIcon />
                        <LinkedInIcon />
                        <YouTubeIcon />
                        <InstagramIcon />
                    </div>
                    <div className='flex gap-5'>
                        <p className='text-white'>Mobile app </p>
                        <AppleIcon />
                        <AndroidIcon />
                    </div>
                </div>

                {/* Optional footer bottom */}
                <div className="mt-10 text-center text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} ICCD. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
