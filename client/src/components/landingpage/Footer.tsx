import React from 'react';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';

const Footer = () => {
  const sections = [
    {
      title: 'Clients',
      links: ['Templates', 'Enterprise', 'Extensions', 'Managers', 'How to Hire'],
    },
    {
      title: 'Talent',
      links: ['Operations', 'Marketing', 'Finance', 'Product', 'Support'],
    },
    {
      title: 'Resources',
      links: ['Community', 'Resources', 'Learning', 'Webinars', 'Customers'],
    },
    {
      title: 'Company',
      links: ['About us', 'Leadership', 'Careers', 'Services', 'Contact Us'],
    },
  ];

  const bottomLinks = ['Terms', 'Privacy', 'Advertise', 'Media'];

  return (
    <footer className="bg-black text-gray-200 py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Top sections */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {sections.map((section, idx) => (
            <div key={idx}>
              <h4 className="mb-3 text-sm font-semibold">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href="#!"
                      className="text-gray-400 hover:text-gray-100 transition duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom links */}
        <ul className="flex flex-wrap justify-center md:justify-start gap-6 mb-8 text-xs text-gray-400">
          {bottomLinks.map((link, i) => (
            <li key={i}>
              <a
                href="#!"
                className="hover:text-gray-100 transition duration-200"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Bottom row */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400">
          <div className="text-center md:text-left mb-3 md:mb-0">
            <div>© 2024. All Rights Reserved.</div>
            <div>
              Built by{' '}
              <a
                href="https://bootstrapbrain.com/"
                className="text-gray-300 hover:underline"
              >
                BootstrapBrain
              </a>{' '}
              with <span className="text-red-500">♥</span>
            </div>
          </div>

          <ul className="flex space-x-6">
            <li>
              <a href="#!" className="text-gray-400 hover:text-gray-100 transition duration-200">
                <YouTubeIcon style={{ fontSize: 22 }} />
              </a>
            </li>
            <li>
              <a href="#!" className="text-gray-400 hover:text-gray-100 transition duration-200">
                <FacebookIcon style={{ fontSize: 22 }} />
              </a>
            </li>
            <li>
              <a href="#!" className="text-gray-400 hover:text-gray-100 transition duration-200">
                <InstagramIcon style={{ fontSize: 22 }} />
              </a>
            </li>
            <li>
              <a href="#!" className="text-gray-400 hover:text-gray-100 transition duration-200">
                <XIcon style={{ fontSize: 22 }} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
