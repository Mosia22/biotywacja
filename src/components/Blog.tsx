// src/components/BlogSection.tsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import sanityClient from '../sanityClient';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: { asset: { url: string } };
  body?: any[];
  publishedAt: string;
}

const BlogSection = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    sanityClient
      .fetch(
        `
        *[_type == "post"] | order(publishedAt desc)[0...6] {
          _id,
          title,
          slug,
          mainImage{ asset->{url} },
          body,
          publishedAt
        }
      `
      )
      .then((data) => setPosts(data))
      .catch(console.error);
  }, []);

  if (posts.length === 0) return null;

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const extractSnippet = (body: any[] | undefined) => {
    if (!body || !Array.isArray(body)) return '';
    const text = body
      .filter((b) => b._type === 'block')
      .map((b) => b.children.map((c: any) => c.text).join(''))
      .join(' ');

    return text.length > 200 ? text.slice(0, 200) + '…' : text;
  };

  // Logika karuzeli
  const isCarousel = posts.length > 3;

  const next = () => {
    if (isCarousel) {
      setIndex((prev) => (prev + 1) % posts.length);
    }
  };

  const prev = () => {
    if (isCarousel) {
      setIndex((prev) => (prev - 1 + posts.length) % posts.length);
    }
  };

  // Decyzja co wyświetlamy: jeśli mało postów, to wszystkie. Jeśli dużo, to wycinek z karuzeli.
  const displayedPosts = isCarousel
    ? [0, 1, 2].map((offset) => posts[(index + offset) % posts.length])
    : posts;

  return (
    <section
      id="blog"
      className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden"
    >
      {/* TŁO & KÓŁKA */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute top-0 left-0 w-full h-32 opacity-10"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="url(#waveBlog1)"
          ></path>
          <defs>
            <linearGradient id="waveBlog1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute top-20 left-20 w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 opacity-20 animate-float"></div>
        <div className="absolute bottom-32 right-28 w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-400 opacity-20 animate-float"></div>
        <div className="absolute top-40 right-36 w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 opacity-20 animate-float"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* NAGŁÓWEK */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 font-poppins leading-tight mb-4">
            Najnowsze wpisy z{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">
              Bloga
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Krótka dawka wiedzy, inspiracji i nauki. Oparte na psychologii,
            neurobiologii i realnych doświadczeniach.
          </p>
        </div>

        {/* KONTENER POSTÓW */}
        <div className="relative w-full flex justify-center items-center">
          
          {/* Strzałka lewa - tylko jeśli jest karuzela */}
          {isCarousel && (
            <button
              onClick={prev}
              className="hidden md:flex absolute -left-4 lg:-left-12 top-1/2 -translate-y-1/2 bg-white shadow-xl p-4 rounded-full hover:scale-110 transition z-10"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
          )}

          {/* KAFELKI - Grid responsywny */}
          {/* Używamy flex na desktopie, żeby ładnie wyśrodkować jeśli postów jest mniej niż 3 */}
          <div className={`w-full grid grid-cols-1 gap-10 ${
            posts.length < 3 
              ? 'md:flex md:justify-center' // Jeśli mało postów, centrujemy flexem
              : 'md:grid-cols-3'            // Jeśli 3 lub karuzela, klasyczny grid
          }`}>
            {displayedPosts.map((post, idx) => {
              const snippet = extractSnippet(post.body);
              // Key używamy _id, a przy karuzeli dodajemy index renderowania, żeby uniknąć konfliktów przy szybkim przewijaniu
              return (
                <Link
                  key={`${post._id}-${idx}`}
                  href={`/blog/${post.slug.current}`}
                  className={`group bg-white rounded-3xl shadow-2xl p-6 flex flex-col hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] ${
                    posts.length < 3 ? 'md:w-1/3' : '' // Jeśli flex, nadajemy szerokość
                  }`}
                >
                  <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-6 shadow-lg">
                    {post.mainImage?.asset?.url ? (
                      <Image
                        src={post.mainImage.asset.url}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                        Brak zdjęcia
                      </div>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.publishedAt)}
                  </p>

                  <p className="text-gray-700 text-base leading-relaxed mb-6 line-clamp-3 flex-grow">
                    {snippet}
                  </p>

                  <span className="inline-block border border-primary-600 text-primary-600 px-6 py-3 rounded-full font-semibold text-sm group-hover:bg-primary-600 group-hover:text-white transition-all w-fit mt-auto">
                    Czytaj dalej
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Strzałka prawa - tylko jeśli jest karuzela */}
          {isCarousel && (
            <button
              onClick={next}
              className="hidden md:flex absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 bg-white shadow-xl p-4 rounded-full hover:scale-110 transition z-10"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          )}
        </div>

        <div className="text-center mt-20">
          <Link
            href="/blog"
            className="group inline-block bg-gradient-to-r from-primary-600 to-purple-600 text-white px-12 py-5 rounded-full text-xl font-semibold hover:from-primary-700 hover:to-purple-700 transition-all shadow-xl hover:scale-105"
          >
            Zobacz wszystkie posty
            <ArrowRight className="inline-block ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;