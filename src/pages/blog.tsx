import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import sanityClient from "../sanityClient";
import { Calendar, ArrowDown } from "lucide-react"; // Usunąłem Search z importów

// 1. Definicja typu
interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: { asset?: { url: string } };
  publishedAt: string;
  body?: any[];
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);

  // 2. Pobieranie danych
  useEffect(() => {
    sanityClient
      .fetch(`
        *[_type == "post"] | order(publishedAt desc) {
          _id,
          title,
          slug,
          mainImage{ asset->{url} },
          publishedAt,
          body
        }
      `)
      .then((data) => setPosts(data))
      .catch((err) => console.error("Błąd pobierania postów:", err));
  }, []);

  // Reset licznika przy wyszukiwaniu
  useEffect(() => {
    setVisibleCount(9);
  }, [search]);

  // 3. Funkcje pomocnicze
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("pl-PL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const makeExcerpt = (body: any[] | undefined, limit = 150) => {
    if (!body || !Array.isArray(body)) return "";
    const text = body
      .filter((b) => b._type === "block")
      .map((b) => b.children?.map((c: any) => c.text).join(" "))
      .join(" ");
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  // 4. Logika filtrowania
  const filteredPosts = search
    ? posts.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      )
    : posts;

  const visiblePosts = filteredPosts.slice(0, visibleCount);

  return (
    <section className="min-h-screen py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- NAGŁÓWEK --- */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-poppins">
            Blog <span className="text-blue-600">Biotywacji</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Praktyczne artykuły oparte na nauce i psychologii.
          </p>
        </div>

        {/* --- WYSZUKIWARKA (BEZ LUPY, Z ODSTĘPEM) --- */}
        <div className="max-w-md mx-auto mb-20 relative">
          <input
            type="text"
            placeholder="Szukaj artykułów..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            // ZMIANA: pl-4 to jest dokładnie 1rem odstępu
            className="block w-full pl-4 pr-4 py-4 border border-gray-300 rounded-full 
                       text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       shadow-sm transition-all"
          />
        </div>

        {/* --- SIATKA POSTÓW --- */}
        {/* Gap-10 zapewnia ładny odstęp między kafelkami */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {visiblePosts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="group flex flex-col bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              {/* KONTENER ZDJĘCIA - SZTYWNA WYSOKOŚĆ */}
              <div className="relative h-64 w-full bg-gray-100 overflow-hidden">
                {post.mainImage?.asset?.url ? (
                  <Image
                    src={post.mainImage.asset.url}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    Brak zdjęcia
                  </div>
                )}
              </div>

              {/* TREŚĆ KAFELKA */}
              <div className="flex flex-col flex-grow p-6">
                {/* Data */}
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  {formatDate(post.publishedAt)}
                </div>

                {/* Tytuł */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>

                {/* Skrót tekstu */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                  {makeExcerpt(post.body)}
                </p>

                {/* Przycisk */}
                <div className="mt-auto">
                  <span className="text-blue-600 font-semibold text-sm group-hover:underline decoration-2 underline-offset-4">
                    Czytaj dalej →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* --- KOMUNIKAT O BRAKU WYNIKÓW --- */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Brak wyników dla: "{search}"</p>
            <button
              onClick={() => setSearch("")}
              className="mt-2 text-blue-600 font-semibold hover:underline"
            >
              Wyczyść
            </button>
          </div>
        )}

        {/* --- PRZYCISK ZAŁADUJ WIĘCEJ --- */}
        {visibleCount < filteredPosts.length && (
          <div className="text-center mt-16">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="inline-flex items-center px-8 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
            >
              Załaduj więcej
              <ArrowDown className="ml-2 h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}