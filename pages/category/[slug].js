import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ArrowRight, ArrowLeft, Bookmark, BookmarkCheck } from "lucide-react";

// Generate slug from name
export function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// Get all categories for static generation
export async function getStaticPaths() {
  const { data } = await supabase.from("tools").select("category");
  const categories = [...new Set(data?.map((t) => t.category) || [])];
  const paths = categories.map((cat) => ({
    params: { slug: slugify(cat) },
  }));
  return { paths, fallback: "blocking" };
}

// Get tools for this category at build time
export async function getStaticProps({ params }) {
  const { data: allTools } = await supabase.from("tools").select("*");
  const categories = [...new Set(allTools?.map((t) => t.category) || [])];

  // Find matching category
  const matchedCategory = categories.find(
    (cat) => slugify(cat) === params.slug
  );

  if (!matchedCategory) return { notFound: true };

  const tools = allTools?.filter((t) => t.category === matchedCategory) || [];

  return {
    props: {
      tools,
      categoryName: matchedCategory,
      allCategories: categories,
    },
    revalidate: 3600, // Rebuild every hour
  };
}

export default function CategoryPage({ tools, categoryName, allCategories }) {
  const router = useRouter();
  const [savedToolIds, setSavedToolIds] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("toolsy_saved");
    if (saved) {
      try { setSavedToolIds(JSON.parse(saved)); } catch (e) { }
    }
  }, []);

  const toggleSaveTool = (id) => {
    setSavedToolIds((prev) => {
      const newSaved = prev.includes(String(id))
        ? prev.filter((tId) => tId !== String(id))
        : [...prev, String(id)];
      localStorage.setItem("toolsy_saved", JSON.stringify(newSaved));
      return newSaved;
    });
  };

  const trackClick = async (toolId, currentClicks) => {
    try {
      await supabase.from("tools").update({ click_count: (currentClicks || 0) + 1 }).eq("id", toolId);
    } catch (error) {
      console.error("Error tracking click:", error);
    }
  };

  const freeCount = tools.filter((t) => t.pricing?.toLowerCase() === "free").length;

  return (
    <>
      <Head>
        <title>{categoryName} AI Tools | Best {categoryName} Tools in 2026 - Toolsy</title>
        <meta name="description" content={`Discover the best ${categoryName} AI tools in 2026. Browse ${tools.length} curated ${categoryName} tools including ${freeCount} free options. Updated daily on Toolsy.`} />
        <meta name="keywords" content={`${categoryName} AI tools, best ${categoryName} tools, free ${categoryName} AI, AI ${categoryName} 2026`} />
        <meta property="og:title" content={`Best ${categoryName} AI Tools 2026 - Toolsy`} />
        <meta property="og:description" content={`Browse ${tools.length} curated ${categoryName} AI tools. Find the perfect tool for your needs.`} />
        <meta property="og:url" content={`https://toolsyai.xyz/category/${slugify(categoryName)}`} />
        <link rel="canonical" href={`https://toolsyai.xyz/category/${slugify(categoryName)}`} />
      </Head>

      <div className="min-h-screen bg-[#050505] text-white">

        {/* HERO */}
        <section className="relative pt-28 pb-10 px-6 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="relative z-10 max-w-4xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-white text-sm font-bold mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to All Tools
            </Link>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-white">
              Best <span className="text-primary">{categoryName}</span> AI Tools
            </h1>
            <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto mb-4">
              {tools.length} curated {categoryName} tools — including {freeCount} free options. Updated daily.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
                {tools.length} Tools
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                {freeCount} Free
              </span>
            </div>
          </div>
        </section>

        {/* OTHER CATEGORIES */}
        <section className="px-4 md:px-6 max-w-6xl mx-auto mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
            <style>{`
              .custom-scrollbar::-webkit-scrollbar { height: 4px; }
              .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); border-radius: 10px; }
              .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 10px; }
              @media (max-width: 768px) {
                .custom-scrollbar::-webkit-scrollbar { display: none; }
                .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
              }
            `}</style>
            {allCategories.map((cat) => (
              <Link key={cat} href={`/category/${slugify(cat)}`}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                  cat === categoryName
                    ? "bg-primary text-white border-primary"
                    : "bg-[#1A1A1A] text-gray-400 border-white/10 hover:bg-white/10 hover:text-white"
                }`}>
                {cat}
              </Link>
            ))}
          </div>
        </section>

        {/* TOOLS GRID */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-20">
          <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tools.map((tool) => {
              const isSaved = savedToolIds.includes(String(tool.id));
              return (
                <div key={tool.id}
                  className="group relative bg-[#0F0F0F] border border-white/5 hover:border-primary/40 rounded-3xl md:rounded-[2rem] p-5 md:p-7 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full overflow-hidden">
                  <div className="absolute -top-24 -right-24 w-48 h-48 blur-[60px] bg-primary/5 group-hover:bg-primary/10 transition-all" />

                  {/* Top Row */}
                  <div className="flex justify-between items-start mb-4 z-10">
                    <div className="text-4xl md:text-5xl p-3 md:p-4 bg-white/5 rounded-xl md:rounded-2xl border border-white/5 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
                      {tool.icon || "⚡"}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button onClick={() => toggleSaveTool(tool.id)}
                        className={`p-2.5 rounded-full border transition-all duration-300 active:scale-75 ${isSaved ? "bg-primary/20 border-primary/50 text-primary" : "bg-white/5 border-white/10 text-gray-500 hover:text-white hover:bg-white/10"}`}>
                        {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                      {tool.pricing && (
                        <span className="bg-white/10 text-gray-300 border border-white/5 text-[9px] md:text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full">
                          {tool.pricing}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Category tag */}
                  <div className="mb-3 z-10">
                    <span className="text-[9px] md:text-[10px] font-black text-zinc-400 uppercase tracking-widest bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
                      {tool.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-primary transition-colors line-clamp-1 z-10">
                    {tool.name}
                  </h2>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-6 line-clamp-3 flex-grow group-hover:text-gray-400 z-10">
                    {tool.description}
                  </p>

                  {/* CTA Button */}
                  <div className="pt-4 border-t border-white/5 mt-auto z-10">
                    <a href={tool.link?.startsWith("http") ? tool.link : `https://${tool.link}`}
                      target="_blank" rel="noopener noreferrer"
                      onClick={() => trackClick(tool.id, tool.click_count || 0)}
                      className="flex items-center justify-center w-full gap-2 bg-white/5 hover:bg-primary text-white text-[11px] md:text-sm font-bold py-3 px-4 rounded-xl transition-all border border-white/10 hover:border-primary">
                      {tool.pricing?.toLowerCase() === "free" ? "Claim Free Tool" :
                        tool.pricing?.toLowerCase() === "freemium" ? "Start for Free" :
                        tool.pricing?.toLowerCase() === "premium" ? "Get Official Tool" : "Visit Website"}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SEO FOOTER TEXT */}
        <section className="max-w-4xl mx-auto px-6 pb-20 text-center">
          <div className="border-t border-white/5 pt-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Find the Best {categoryName} AI Tools
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mx-auto">
              Toolsy curates the best {categoryName} AI tools updated daily. Whether you need free or premium {categoryName} tools, we have you covered. Browse our full directory of {allCategories.length}+ categories and discover the perfect AI tool for your workflow.
            </p>
            <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
              {allCategories.slice(0, 6).map((cat) => (
                <Link key={cat} href={`/category/${slugify(cat)}`}
                  className="text-xs text-gray-500 hover:text-primary transition-colors font-bold">
                  {cat} Tools →
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}