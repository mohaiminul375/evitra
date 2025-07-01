import { Facebook, Github, Instagram, Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
export const quintessential = Quintessential({
    weight: '400',
    subsets: ['latin'],
});
import logo from "../../../public/logo.png"
import { Quintessential } from 'next/font/google';
const Footer = () => {
    return (
        <footer className="bg-foreground text-white">
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Company Info */}
                    <div>
                        <div className='flex items-center'>
                            <Image className='rounded-full' width={30} src={logo} alt='logo' />
                            <span className={`ml-2 text-lg md:text-3xl italic font-bold text-white block ${quintessential.className}`}>Evitra</span>
                        </div>
                        <p className="mb-4"> All in One Event Management Web App. <br />Your Events, Your Way Manage, Host & Join with Ease.</p>
                        <p>© 2025 Evitra. All rights reserved.</p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className="hover:text-gray-300 transition-colors">Events</Link></li>
                            <li><Link href="/add-event" className="hover:text-gray-300 transition-colors">Add Events</Link></li>
                            <li><Link href="/my-event" className="hover:text-gray-300 transition-colors">My Events</Link></li>
                            <li><Link href="/contact" className="hover:text-gray-300 transition-colors"></Link></li>
                        </ul>
                    </div>

                    {/* Social Media and Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
                        <div className="flex space-x-4 mb-4">
                            <Link target='_blank' href="https://www.facebook.com" className="hover:text-gray-300 transition-colors"><Facebook size={24} /></Link>
                            <Link target='_blank' href="https://twitter.com" className="hover:text-gray-300 transition-colors"><Twitter size={24} /></Link>
                            <Link target='_blank' href="https://www.instagram.com" className="hover:text-gray-300 transition-colors"><Instagram size={24} /></Link>
                            <Link target='_blank' href="https://www.linkedin.com" className="hover:text-gray-300 transition-colors"><Linkedin size={24} /></Link>
                            <Link target='_blank' href="https://github.com/mohaiminul375/evitra" className="hover:text-gray-300 transition-colors"><Github size={24} /></Link>
                        </div>
                        <p>Email: info@evitra.com</p>
                        <p>Phone: +880 9638-427483</p>
                    </div>
                </div>
                {/* developer info */}
                <div className="flex flex-col items-start text-white space-y-2 text-sm md:text-sm font-semibold">
                    <p>
                        Design & Developed by:{" "}
                        <Link
                            target='_blank'
                            href="https://mohaiminul-dev.web.app" className="underline hover:text-gray-300">
                            Mohaiminul Islam
                        </Link>
                    </p>
                    <p> Last Update: 1-July-2025, 8:15 P.M (BDT)</p>
                </div>

            </div>
        </footer >
    );
};

export default Footer;