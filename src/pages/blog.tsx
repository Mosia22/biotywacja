import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import sanityClient from "../sanityClient";
import { Calendar } from "lucide-react";

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
      .then(setPosts)
      .catch(console.error);
  }, []);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("pl-PL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const makeExcerpt = (body: any[] | undefined, n = 200) => {
    if (!body) return "";
    const text = body
      .filter((b) => b._type === "block")
      .map((b) => b.children?.map((c: any) => c.text).join(" "))
      .join(" ");
    return text.length > n ? text.slice(0, n) + "…" : text;
  };

  const filtered = search
    ? posts.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      )
    : posts;

  return (
    <section className="relative min-h-screen py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">

      {/* BEZ RANDOM — STAŁE, BEZPIECZNE DEKORACJE */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-24 left-10 w-10 h-10 rounded-full bg-primary-400/20 animate-float" />
        <div className="absolute top-1/3 right-20 w-16 h-16 rounded-full bg-purple-400/20 animate-float" />
        <div className="absolute bottom-32 left-1/4 w-14 h-14 rounded-full bg-blue-400/20 animate-float" />
        <div className="absolute bottom-10 right-1/3 w-12 h-12 rounded-full bg-emerald-400/20 animate-float" />
      </div>

      {/* NAGŁÓWEK */}
      <div className="relative max-w-4xl mx-auto px-6 text-center mb-16">
        <h1 className="text-5xl font-bold font-poppins text-gray-900 mb-6">
          Blog{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">
            Biotywacji
          </span>
        </h1>

        <p className="mb-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Praktyczne artykuły oparte na nauce i psychologii, które pomogą Ci
          podejmować mądrzejsze decyzje i rozwijać się konsekwentnie.
        </p>
      </div>

      {/* WYSZUKIWARKA */}
      <div className="relative max-w-lg mx-auto px-6 mb-16">
        <input
          type="search"
          placeholder="  Szukaj artykułów…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full py-4 pl-6 pr-6 text-lg border-2 border-gray-200 rounded-full
                     shadow-sm focus:ring-2 focus:ring-primary-500 bg-white/90"
        />
      </div>

      {/* LISTA POSTÓW */}
      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {filtered.map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug.current}`}
            className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all overflow-hidden"
          >
            <div className="relative h-48 w-full rounded-2xl overflow-hidden">
              {post.mainImage?.asset?.url ? (
                <Image
                  src={post.mainImage.asset.url}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 mb-2 font-poppins">
                {post.title}
              </h3>

              <p className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                <Calendar className="w-4 h-4" />
                {formatDate(post.publishedAt)}
              </p>

              <p className="text-gray-700 text-sm leading-relaxed">
                {makeExcerpt(post.body)}
              </p>
            </div>
          </Link>
        ))}

        {filtered.length === 0 && (
          <p className="col-span-full text-center text-gray-500 text-lg">
            Brak artykułów pasujących do wyszukania.
          </p>
        )}
      </div>
    </section>
  );
}
