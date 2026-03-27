import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ArrowRight, ArrowLeft, Bookmark, BookmarkCheck } from "lucide-react";

// --- CTO FIX: The Category Cheat Code Map ---
const categoryMap = {
  "Audio Generator": "🎙️ Get Studio Quality Sound",
  "Automation Tool": "⚙️ Put Your Work on Autopilot",
  "Chatbot & Research": "🧠 Learn & Research 10x Faster",
  "Coding Assistant": "💻 Build Apps in Minutes",
  "Data Tool": "📊 Analyze Data Like a Pro",
  "Image Generator": "🎨 Create Pro Graphics & Art",
  "Useful Utility": "⚡ Daily Life Hacks",
  "Video Generator": "📈 Create Viral Reels",
  "Website Builder": "🚀 Launch Your Business Today",
  "website builder": "🚀 Launch Your Business Today",
  "Writing Tool": "✍️ Write Perfect Posts & Emails"
};

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

  // Translate the DB category to the Premium Goal for human eyes
  const displayCategoryName = categoryMap[categoryName] || categoryName;

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

      <style>{`
        ::-webkit-scrollbar { display: none; }
      `}</style>

      {/* CTO FIX: Main wrapper converted to inline styles to match index.js perfectly */}
      <div style={{ minHeight: "100vh", backgroundColor: "#050505", color: "white", fontFamily: "sans-serif" }}>

        {/* HERO */}
        <section style={{ position: "relative", paddingTop: "7rem", paddingBottom: "2.5rem", paddingLeft: "1.5rem", paddingRight: "1.5rem", textAlign: "center", overflow: "hidden" }}>
          
          {/* Subtle Glow Background */}
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: "800px", height: "300px", background: "radial-gradient(ellipse at 50% 0%, rgba(139, 92, 246, 0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
          
          <div style={{ position: "relative", zIndex: 10, maxWidth: "56rem", margin: "0 auto" }}>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#6b7280", fontSize: "0.875rem", fontWeight: 700, marginBottom: "1.5rem", textDecoration: "none", transition: "color 0.2s" }}
              onMouseOver={e => e.currentTarget.style.color = "white"}
              onMouseOut={e => e.currentTarget.style.color = "#6b7280"}>
              <ArrowLeft size={16} /> Back to All Tools
            </Link>
            
            <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: "1rem", lineHeight: 1.1 }}>
              Best <span style={{ color: "#8b5cf6" }}>{displayCategoryName}</span> AI Tools
            </h1>
            
            <p style={{ color: "#9ca3af", fontSize: "clamp(0.875rem, 2vw, 1.125rem)", maxWidth: "42rem", margin: "0 auto 1.5rem", lineHeight: 1.6 }}>
              {tools.length} curated {displayCategoryName} tools — including {freeCount} free options. Updated daily.
            </p>
            
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
              <span style={{ padding: "0.3rem 0.8rem", borderRadius: "9999px", background: "rgba(139, 92, 246, 0.1)", border: "1px solid rgba(139, 92, 246, 0.2)", color: "#8b5cf6", fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                {tools.length} Tools
              </span>
              <span style={{ padding: "0.3rem 0.8rem", borderRadius: "9999px", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)", color: "#34d399", fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                {freeCount} Free
              </span>
            </div>
          </div>
        </section>

        {/* OTHER CATEGORIES TABS */}
        <section style={{ padding: "0 1.5rem", maxWidth: "72rem", margin: "0 auto 2.5rem" }}>
          <div style={{ display: "flex", gap: "0.6rem", overflowX: "auto", paddingBottom: "0.5rem", scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}>
            {allCategories.map((cat) => {
              if (cat === "website builder") return null; // Hide duplicate DB entry
              
              const displayCat = categoryMap[cat] || cat;
              const isActive = cat === categoryName;
              
              return (
                <Link key={cat} href={`/category/${slugify(cat)}`}
                  style={{ flexShrink: 0, padding: "0.6rem 1.25rem", borderRadius: "9999px", fontSize: "0.875rem", fontWeight: 700, whiteSpace: "nowrap", textDecoration: "none", fontFamily: "inherit", background: isActive ? "rgb(139, 92, 246)" : "#161616", color: isActive ? "white" : "#a1a1aa", border: `1px solid ${isActive ? "rgb(139, 92, 246)" : "rgba(255,255,255,0.08)"}`, transition: "all 0.2s" }}
                  onMouseOver={e => { if(!isActive) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "white"; } }}
                  onMouseOut={e => { if(!isActive) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#a1a1aa"; } }}>
                  {displayCat}
                </Link>
              );
            })}
          </div>
        </section>

        {/* TOOLS GRID - Exact match to Homepage */}
        <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 1.5rem 5rem" }}>
          <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))" }}>
            {tools.map((tool) => {
              const isSaved = savedToolIds.includes(String(tool.id));
              return (
                <div key={tool.id}
                  style={{ position: "relative", background: "#161616", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "1.25rem", padding: "1.5rem", transition: "transform 0.25s, border-color 0.25s", display: "flex", flexDirection: "column", overflow: "hidden", boxSizing: "border-box" }}
                  onMouseOver={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.6)"; }}
                  onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}>
                  
                  <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "140px", height: "140px", borderRadius: "50%", background: "rgba(139, 92, 246, 0.03)", filter: "blur(40px)", pointerEvents: "none" }} />
                  
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem", position: "relative", zIndex: 1, boxSizing: "border-box" }}>
                    <div style={{ fontSize: "2.25rem", padding: "0.625rem", background: "rgba(255,255,255,0.03)", borderRadius: "0.75rem", border: "1px solid rgba(255,255,255,0.05)", lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>{tool.icon || "⚡"}</div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem" }}>
                      <button onClick={() => toggleSaveTool(tool.id)} style={{ padding: "0.5rem", borderRadius: "50%", border: `1px solid ${isSaved ? "rgba(139, 92, 246, 0.5)" : "rgba(255,255,255,0.1)"}`, background: isSaved ? "rgba(139, 92, 246, 0.15)" : "rgba(255,255,255,0.04)", color: isSaved ? "#8b5cf6" : "#6b7280", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {isSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                      </button>
                      {tool.pricing && <span style={{ background: "rgba(255,255,255,0.05)", color: "#a1a1aa", border: "1px solid rgba(255,255,255,0.08)", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", padding: "0.25rem 0.5rem", borderRadius: "9999px" }}>{tool.pricing}</span>}
                    </div>
                  </div>
                  
                  <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, position: "relative", zIndex: 1, boxSizing: "border-box" }}>
                    <span style={{ fontSize: "0.65rem", fontWeight: 800, color: "#8b5cf6", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem", display: "block" }}>
                      {categoryMap[tool.category] || tool.category}
                    </span>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "white", marginBottom: "0.5rem", letterSpacing: "-0.01em", lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tool.name}</h3>
                    <p style={{ color: "#a1a1aa", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "1.5rem", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{tool.description}</p>
                  </div>
                  
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.25rem", position: "relative", zIndex: 1, boxSizing: "border-box", marginTop: "auto" }}>
                    <a href={tool.link?.startsWith("http") ? tool.link : `https://${tool.link}`} target="_blank" rel="noopener noreferrer" onClick={() => trackClick(tool.id, tool.click_count || 0)}
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", width: "100%", background: "rgba(255,255,255,0.03)", color: "white", fontSize: "0.85rem", fontWeight: 700, padding: "0.75rem 1rem", borderRadius: "0.75rem", border: "1px solid rgba(255,255,255,0.08)", textDecoration: "none", transition: "all 0.2s", boxSizing: "border-box" }}
                      onMouseOver={e => { e.currentTarget.style.background = "#8b5cf6"; e.currentTarget.style.borderColor = "#8b5cf6"; }}
                      onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}>
                      {tool.pricing?.toLowerCase() === "free" ? "Claim Free Tool" : tool.pricing?.toLowerCase() === "freemium" ? "Start for Free" : tool.pricing?.toLowerCase() === "premium" ? "Get Official Tool" : "Visit Website"}
                      <ArrowRight size={14} />
                    </a>
                  </div>
                  
                </div>
              );
            })}
          </div>
        </section>

        {/* SEO FOOTER TEXT */}
        <section style={{ maxWidth: "56rem", margin: "0 auto", padding: "0 1.5rem 5rem", textAlign: "center" }}>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "3rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "white", marginBottom: "1rem" }}>
              Find the Best {displayCategoryName} AI Tools
            </h2>
            <p style={{ color: "#9ca3af", fontSize: "0.875rem", lineHeight: 1.6, maxWidth: "42rem", margin: "0 auto" }}>
              Toolsy curates the best {displayCategoryName} AI tools updated daily. Whether you need free or premium tools, we have you covered. Browse our full directory of {allCategories.length}+ categories and discover the perfect AI tool for your workflow.
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
              {allCategories.slice(0, 6).map((cat) => {
                if (cat === "website builder") return null;
                const displayCat = categoryMap[cat] || cat;
                return (
                  <Link key={cat} href={`/category/${slugify(cat)}`}
                    style={{ fontSize: "0.75rem", color: "#6b7280", fontWeight: 700, textDecoration: "none", transition: "color 0.2s" }}
                    onMouseOver={e => e.currentTarget.style.color = "#8b5cf6"}
                    onMouseOut={e => e.currentTarget.style.color = "#6b7280"}>
                    {displayCat} →
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}