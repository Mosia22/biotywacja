import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Youtube, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: '/#o-mnie', text: 'O mnie' },
    { href: '/blog', text: 'Blog' },
  ];

  const docLinks = [
    { href: '/regulamin', text: 'Regulamin' },
    { href: '/polityka-prywatnosci', text: 'Polityka Prywatności' },
    { href: '/polityka-cookies', text: 'Polityka Cookies' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* ZMIANA: Usunięto md:text-left, aby domyślnie wszystko było wyśrodkowane */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">

          {/* Kolumna 1: ZMIANA - dodano md:items-start i whitespace-pre-line */}
          <div className="flex flex-col items-center md:items-start md:text-left">
            <Link href="/" className="cursor-pointer mb-4">
              <h1 className="text-3xl font-bold font-poppins">
                <span className="text-white">Bio</span>
                <span className="text-primary-500">tywacja</span>
              </h1>
            </Link>

            <p className="text-base max-w-xs whitespace-pre-line">
              Tworzę przestrzeń dla nauczycieli
              {'\n'}i uczniów, którzy chcą uczyć
              {'\n'}i uczyć się z sensem.
            </p>
          </div>

          {/* Kolumna 2: Menu */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold text-white mb-4">Menu</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.text}>
                  <Link href={link.href} className="hover:text-primary-400 transition-colors duration-200">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolumna 3: Dokumenty */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold text-white mb-4">Dokumenty</h3>
            <ul className="space-y-2">
              {docLinks.map((link) => (
                <li key={link.text}>
                  <Link href={link.href} className="hover:text-primary-400 transition-colors duration-200">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolumna 4: Kontakt */}
          <div className="flex flex-col items-center md:items-end md:text-right">
            <h3 className="text-lg font-semibold text-white mb-4">Kontakt</h3>
            <div className="space-y-2">
              <a href="mailto:kontakt@biotywacja.pl" className="flex items-center justify-center md:justify-end gap-2 hover:text-primary-400 transition-colors duration-200">
                <Mail size={16} />
                <span>biotywacja@gmail.com</span>
              </a>
            </div>
            <div className="flex gap-4 mt-6">
              <a 
                href="https://www.instagram.com/biotywacja/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram" 
                className="hover:text-primary-400 transition-colors duration-200"
              >
                <Instagram size={24} />
              </a>
              
              <a 
                href="https://www.facebook.com/people/Biotywacja/100093248691929/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook" 
                className="hover:text-primary-400 transition-colors duration-200"
              >
                <Facebook size={24} />
              </a>

              <a 
                href="https://www.youtube.com/channel/UCLpcFe4LoCVbdYQvOhHKxSQ" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="YouTube" 
                className="hover:text-primary-400 transition-colors duration-200"
              >
                <Youtube size={24} />
              </a>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm">
            &copy; {currentYear} Biotywacja. Wszelkie prawa zastrzeżone.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
