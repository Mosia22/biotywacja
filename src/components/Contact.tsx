import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Send } from 'lucide-react';
import mosiaImage from '../assets/Mosia.png';

const Contact = () => {
  // Stan tylko do kolorków i disabled na przycisku
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [agreed, setAgreed] = useState(false);

  const isButtonDisabled = !name || !email || !message || !agreed;

  return (
    <section
      id="kontakt"
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-primary-50 relative overflow-hidden"
    >
      {/* TŁO */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute bottom-0 left-0 w-full h-32 opacity-8 rotate-180"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="url(#wave4)"
          />
          <defs>
            <linearGradient id="wave4" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.03" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute top-24 left-20 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full opacity-15 animate-float"></div>
        <div
          className="absolute top-48 right-32 w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-lg opacity-15 animate-float"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="absolute bottom-20 left-16 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg opacity-15 animate-float"
          style={{ animationDelay: '4s' }}
        ></div>
        <div
          className="absolute bottom-24 right-20 w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg opacity-15 animate-float"
          style={{ animationDelay: '1s' }}
        ></div>
      </div>

      {/* TREŚĆ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* NAGŁÓWEK */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 font-poppins leading-tight mb-6">
            Skontaktuj się
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">
              {' '}
              ze mną
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-stretch">
          {/* LEWA KOLUMNA – ZDJĘCIE + MAIL */}
          <div className="lg:col-span-2 flex flex-col justify-between items-center lg:items-start text-center lg:text-left">
            <div className="relative w-80 h-80 lg:w-[26rem] lg:h-[26rem] flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 animate-pulse-slow"></div>
              <div className="absolute inset-4 rounded-full overflow-hidden shadow-2xl">
                <Image
                  src={mosiaImage}
                  alt="Monika - Biotywacja"
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div
                className="absolute -top-6 -left-6 w-12 h-12 bg-yellow-400 rounded-full animate-float opacity-80"
                style={{ animationDelay: '1s' }}
              ></div>
              <div
                className="absolute -bottom-6 -right-6 w-10 h-10 bg-green-400 rounded-full animate-float opacity-80"
                style={{ animationDelay: '3s' }}
              ></div>
              <div
                className="absolute top-1/4 -right-10 w-8 h-8 bg-purple-400 rounded-full animate-float opacity-80"
                style={{ animationDelay: '5s' }}
              ></div>
              <div
                className="absolute bottom-1/4 -left-8 w-6 h-6 bg-pink-400 rounded-full animate-float opacity-80"
                style={{ animationDelay: '2.5s' }}
              ></div>
            </div>

            <div className="w-full text-center lg:text-left mt-8">
              <p className="text-xl text-gray-700 leading-relaxed max-w-md mx-auto lg:mx-0">
                Hej tu Monika, to ja tworzę Biotywację. Jeśli masz pytanie, chcesz się czymś
                podzielić lub napisać kilka słów to tu mnie znajdziesz:
              </p>

              <div className="w-full mt-8">
                <div className="flex items-center space-x-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 max-w-md mx-auto lg:mx-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xl font-semibold text-gray-900">Email</h4>
                    <p className="text-lg text-gray-600">biotywacja@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PRAWA KOLUMNA – FORMULARZ */}
          <div className="lg:col-span-3 bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative flex items-center justify-center">
            <form
              action="https://formspree.io/f/movoyezo"
              method="POST"
              className="space-y-6 w-full"
            >
              <div className="space-y-4">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 font-poppins mb-6">
                  Napisz do mnie
                </h3>

                {/* Imię */}
                <div>
                  <label
                    htmlFor="name-contact"
                    className="block text-lg font-medium text-gray-700 mb-2"
                  >
                    Imię{' '}
                    <span
                      className={`transition-colors duration-300 ${
                        name ? 'text-gray-700' : 'text-red-500'
                      }`}
                    >
                      *
                    </span>
                  </label>
                  <input
                    id="name-contact"
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Twoje imię"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email-contact"
                    className="block text-lg font-medium text-gray-700 mb-2"
                  >
                    Email{' '}
                    <span
                      className={`transition-colors duration-300 ${
                        email ? 'text-gray-700' : 'text-red-500'
                      }`}
                    >
                      *
                    </span>
                  </label>
                  <input
                    id="email-contact"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="twoj@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {/* Wiadomość */}
                <div>
                  <label
                    htmlFor="message-contact"
                    className="block text-lg font-medium text-gray-700 mb-2"
                  >
                    Wiadomość{' '}
                    <span
                      className={`transition-colors duration-300 ${
                        message ? 'text-gray-700' : 'text-red-500'
                      }`}
                    >
                      *
                    </span>
                  </label>
                  <textarea
                    id="message-contact"
                    name="message"
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    placeholder="Opisz jak mogę Ci pomóc..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500"
                  ></textarea>
                </div>

                {/* Zgoda RODO */}
                <div className="flex items-start">
                  <input
                    id="agreement"
                    name="agreement"
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    required
                    className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mt-1"
                  />
                  <div className="ml-3 text-sm">
                    <label htmlFor="agreement" className="text-gray-600">
                      Akceptuję{' '}
                      <Link
                        href="/polityka-prywatnosci"
                        className="font-medium text-primary-600 hover:underline"
                      >
                        Politykę Prywatności
                      </Link>{' '}
                      oraz{' '}
                      <Link
                        href="/polityka-cookies"
                        className="font-medium text-primary-600 hover:underline"
                      >
                        Politykę Cookies
                      </Link>
                      .{' '}
                      <span
                        className={`transition-colors duration-300 ${
                          agreed ? 'text-gray-700' : 'text-red-500'
                        }`}
                      >
                        *
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* PRZYCISK */}
              <button
                type="submit"
                disabled={isButtonDisabled}
                className="group w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white px-10 py-5 rounded-full text-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Wyślij wiadomość
                <Send className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
