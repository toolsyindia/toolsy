import { useState, useMemo, useEffect, useRef } from "react";
import Head from "next/head";
import { useTools } from "@/hooks/useTools";
import { supabase } from "@/lib/supabase";
import {
  Search, Sparkles, ArrowRight, Bookmark, BookmarkCheck,
  LayoutGrid, Gift, Check, Target, User, Lightbulb,
  X, SlidersHorizontal, ChevronLeft, ChevronRight
} from "lucide-react";

import AICrab from '../components/AICrab'; 

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

function SkeletonGrid() {
  return (
    <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))" }}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
        <div key={i} className="skeleton-card" style={{ background: "#161616", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "1.25rem", padding: "1.5rem", display: "flex", flexDirection: "column", minHeight: "280px", boxSizing: "border-box" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
            <div style={{ width: "3.5rem", height: "3.5rem", background: "rgba(255,255,255,0.05)", borderRadius: "0.75rem" }} />
            <div style={{ width: "60px", height: "24px", background: "rgba(255,255,255,0.05)", borderRadius: "9999px" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, gap: "0.75rem" }}>
            <div style={{ width: "40%", height: "12px", background: "rgba(255,255,255,0.05)", borderRadius: "4px" }} />
            <div style={{ width: "80%", height: "20px", background: "rgba(255,255,255,0.08)", borderRadius: "4px" }} />
            <div style={{ width: "100%", height: "12px", background: "rgba(255,255,255,0.03)", borderRadius: "4px", marginTop: "0.5rem" }} />
            <div style={{ width: "90%", height: "12px", background: "rgba(255,255,255,0.03)", borderRadius: "4px" }} />
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.25rem", marginTop: "1.5rem" }}>
            <div style={{ width: "100%", height: "40px", background: "rgba(255,255,255,0.05)", borderRadius: "0.75rem" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ToolGrid({ tools, isSearch, checkActive, onVisit, savedIds, onToggleSave }) {
  return (
    <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))" }}>
      {tools.map((tool) => {
        const isHighlighted = (isSearch && checkActive(tool, "suggested")) || (!isSearch && checkActive(tool, "featured"));
        const isSaved = savedIds.includes(String(tool.id));
        return (
          <div key={tool.id}
            style={{ position: "relative", background: "#161616", border: `1px solid ${isHighlighted ? "rgba(139, 92, 246, 0.5)" : "rgba(255,255,255,0.08)"}`, borderRadius: "1.25rem", padding: "1.5rem", transition: "transform 0.25s, border-color 0.25s", display: "flex", flexDirection: "column", overflow: "hidden", boxSizing: "border-box" }}
            onMouseOver={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.6)"; }}
            onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = isHighlighted ? "rgba(139, 92, 246, 0.5)" : "rgba(255,255,255,0.08)"; }}>
            
            <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "140px", height: "140px", borderRadius: "50%", background: `rgba(139, 92, 246, ${isHighlighted ? "0.15" : "0.03"})`, filter: "blur(40px)", pointerEvents: "none" }} />
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem", position: "relative", zIndex: 1, boxSizing: "border-box" }}>
              <div style={{ fontSize: "2.25rem", padding: "0.625rem", background: "rgba(255,255,255,0.03)", borderRadius: "0.75rem", border: "1px solid rgba(255,255,255,0.05)", lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>{tool.icon || "⚡"}</div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem" }}>
                <button onClick={() => onToggleSave(String(tool.id))} style={{ padding: "0.5rem", borderRadius: "50%", border: `1px solid ${isSaved ? "rgba(139, 92, 246, 0.5)" : "rgba(255,255,255,0.1)"}`, background: isSaved ? "rgba(139, 92, 246, 0.15)" : "rgba(255,255,255,0.04)", color: isSaved ? "#8b5cf6" : "#6b7280", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
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
              <a href={tool.link?.startsWith("http") ? tool.link : `https://${tool.link}`} target="_blank" rel="noopener noreferrer" onClick={() => onVisit(tool.id, tool.click_count || 0)}
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
  );
}

export default function Home() {
  const { data: tools, isLoading } = useTools();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [displayLimit, setDisplayLimit] = useState(12);
  const [activeTab, setActiveTab] = useState("all");
  const [savedToolIds, setSavedToolIds] = useState([]);
  const [pricingFilter, setPricingFilter] = useState("All");
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [quizFilterTag, setQuizFilterTag] = useState(null);
  
  // CTO FIX: VIP Export Modal State
  const [showVipModal, setShowVipModal] = useState(false);

  const toolsRef = useRef(null);
  const categoryScrollRef = useRef(null);

  const scrollCategories = (direction) => {
    if (categoryScrollRef.current) {
      const scrollAmount = direction === "left" ? -250 : 250;
      categoryScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("toolsy_saved");
    if (saved) { try { setSavedToolIds(JSON.parse(saved)); } catch (e) { } }
  }, []);

  const clearQuizFilter = () => setQuizFilterTag(null);
  
  // CTO FIX: Smart Bookmarker Logic
  const toggleSaveTool = (id) => {
    setSavedToolIds((prev) => {
      const isAdding = !prev.includes(id);
      const newSaved = isAdding ? [...prev, id] : prev.filter(tId => tId !== id);
      localStorage.setItem("toolsy_saved", JSON.stringify(newSaved));
      
      // If they just saved their 3rd tool, trigger the VIP Export Modal!
      if (isAdding && newSaved.length === 3) {
        const hasSeenVip = localStorage.getItem("toolsy_vip_shown");
        if (!hasSeenVip) {
          setTimeout(() => setShowVipModal(true), 600); // Small delay so it feels natural
          localStorage.setItem("toolsy_vip_shown", "true"); // Never bug them twice
        }
      }
      return newSaved;
    });
  };

  const categories = useMemo(() => {
    if (!tools) return [];
    return ["All", ...new Set(tools.map((t) => t.category))].sort();
  }, [tools]);

  const trackClick = async (toolId, currentClicks) => {
    try { await supabase.from("tools").update({ click_count: (currentClicks || 0) + 1 }).eq("id", toolId); }
    catch (error) { console.error("Error:", error); }
  };

  const isSponsorshipActive = (tool, type) => {
    const isMarked = tool[type] === true || String(tool[type]) === "true";
    if (!isMarked) return false;
    if (!tool.sponsored_until) return true;
    const expiryDate = new Date(tool.sponsored_until);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    return expiryDate >= today;
  };

  const filtered = useMemo(() => {
    if (!tools) return [];
    let result = [...tools];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(t => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
      result.sort((a, b) => { const aSug = isSponsorshipActive(a, "suggested"); const bSug = isSponsorshipActive(b, "suggested"); return aSug === bSug ? 0 : aSug ? -1 : 1; });
    }
    if (activeCategory && activeCategory !== "All") result = result.filter(t => t.category === activeCategory);
    if (activeTab === "free") result = result.filter(t => t.pricing?.toLowerCase() === "free");
    else if (activeTab === "saved") result = result.filter(t => savedToolIds.includes(String(t.id)));
    if (pricingFilter !== "All") result = result.filter(t => t.pricing?.toLowerCase() === pricingFilter.toLowerCase());
    if (quizFilterTag) result = result.filter(t => t.tags?.toLowerCase().includes(quizFilterTag.toLowerCase()));
    return result;
  }, [tools, search, activeCategory, activeTab, savedToolIds, pricingFilter, quizFilterTag]);

  const featured = filtered.filter(t => isSponsorshipActive(t, "featured"));
  const rest = filtered.filter(t => !featured.includes(t));
  const visibleRest = rest.slice(0, displayLimit);

  return (
    <>
      <Head>
        <title>Toolsy AI | Discover The Best AI Tools & Websites (Updated Daily)</title>
        <meta name="description" content="Stop wasting hours on Google. Toolsy curates the internet's most powerful AI tools for developers, designers, and creators. Updated daily." />
        <meta name="keywords" content="AI tools, best AI tools, AI directory, artificial intelligence tools, free AI tools" />
        <meta property="og:title" content="Toolsy AI | Discover The Best AI Tools" />
        <meta property="og:description" content="The internet's best curated AI tools directory." />
        <meta property="og:url" content="https://toolsyai.xyz" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://toolsyai.xyz" />
      </Head>

      <style>{`
        @media (max-width: 480px) { .filter-label { display: none !important; } }
        ::-webkit-scrollbar { display: none; }
        @media (max-width: 768px) { .desktop-arrow { display: none !important; } }
        @keyframes skeleton-pulse { 0% { opacity: 0.4; } 50% { opacity: 1; } 100% { opacity: 0.4; } }
        .skeleton-card { animation: skeleton-pulse 1.5s ease-in-out infinite; }
      `}</style>

      {/* CTO FIX: VIP Export Modal */}
      {showVipModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1050, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', padding: '1rem' }}>
          <div style={{ background: '#0d0d0d', border: '1px solid rgba(255, 102, 0, 0.3)', padding: '2.5rem 2rem', borderRadius: '24px', width: '100%', maxWidth: '420px', textAlign: 'center', boxShadow: '0 20px 60px rgba(255,102,0,0.15)', position: 'relative' }}>
            <button onClick={() => setShowVipModal(false)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', color: '#6b7280', cursor: 'pointer' }}><X size={20} /></button>
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem', filter: 'drop-shadow(0 4px 10px rgba(255,102,0,0.4))' }}>🦀</div>
            <h3 style={{ color: 'white', fontSize: '1.6rem', fontWeight: 900, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Sick Stack! 🔥</h3>
            <p style={{ color: '#a1a1aa', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>You just saved your 3rd tool. Want me to email your custom VIP list to you so you never lose it?</p>
            <input type="email" placeholder="Your best email..." style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid #333', background: '#161616', color: 'white', marginBottom: '12px', outline: 'none', fontFamily: 'inherit' }} onFocus={e=>e.target.style.borderColor='#ff6600'} onBlur={e=>e.target.style.borderColor='#333'} />
            <button onClick={() => setShowVipModal(false)} style={{ width: '100%', padding: '14px', background: '#ff6600', color: '#000', fontWeight: 900, border: 'none', borderRadius: '12px', cursor: 'pointer', marginBottom: '12px', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><ArrowRight size={18} /> Send My VIP List</button>
            <button onClick={() => setShowVipModal(false)} style={{ width: '100%', padding: '10px', background: 'transparent', color: '#6b7280', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '14px' }}>No thanks, I'm good</button>
          </div>
        </div>
      )}

      <div style={{ minHeight: "100vh", background: "#0d0d0d", color: "white" }}>

        <section style={{ position: "relative", paddingTop: "5rem", paddingBottom: "1rem", textAlign: "center", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "700px", height: "450px", background: "radial-gradient(ellipse at 50% 0%, rgba(var(--primary),0.15) 0%, transparent 65%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: "820px", margin: "0 auto", padding: "0 1rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", padding: "0.3rem 0.75rem", borderRadius: "9999px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", marginBottom: "1.25rem", maxWidth: "100%" }}>
              <Sparkles size={11} color="rgb(var(--primary))" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: "10px", fontWeight: 600, color: "rgb(var(--primary))", textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>Premium AI Tools Directory</span>
            </div>
            
            <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(3.5rem, 10vw, 6.5rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "1.25rem", color: "white" }}>
              Discover the <br />
              <span style={{ color: "rgb(var(--primary))" }}>Best</span> AI Tools
            </h1>
            
            <p style={{ color: "#6b7280", fontSize: "clamp(0.85rem, 2.5vw, 1.1rem)", maxWidth: "540px", margin: "0 auto 2rem", lineHeight: 1.6 }}>
              Stop wasting hours on Google. We curate the internet&apos;s most powerful tools for developers, designers, and creators.
            </p>
          </div>
        </section>

        <section style={{ maxWidth: "880px", margin: "0 auto", padding: "0 1rem 1.5rem" }}>
          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <div style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", gap: "0.75rem", background: "#121212", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1rem", padding: "0 1.25rem", height: "3.5rem", transition: "border-color 0.2s" }}
                 onFocusCapture={e => e.currentTarget.style.borderColor = "rgb(var(--primary))"}
                 onBlurCapture={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}>
              <Search size={18} color="#6b7280" style={{ flexShrink: 0 }} />
              <input placeholder="Search AI tools (e.g. 'coding', 'video')..." value={search} onChange={(e) => setSearch(e.target.value)}
                style={{ flex: 1, minWidth: 0, background: "transparent", border: "none", outline: "none", color: "white", fontSize: "1rem", fontFamily: "inherit", height: "100%" }} />
            </div>
            <div style={{ position: "relative", flexShrink: 0 }}>
              <button onClick={() => setIsPricingOpen(!isPricingOpen)}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem", height: "3.5rem", padding: "0 1.25rem", background: "#121212", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1rem", color: "#9ca3af", cursor: "pointer", fontWeight: 700, fontSize: "0.95rem", fontFamily: "inherit", whiteSpace: "nowrap", transition: "all 0.2s" }}
                onMouseOver={e => { e.currentTarget.style.borderColor = "rgb(var(--primary))"; e.currentTarget.style.color = "white"; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#9ca3af"; }}>
                <SlidersHorizontal size={18} />
                <span className="filter-label" style={{ fontSize: "0.95rem" }}>{pricingFilter === "All" ? "Filters" : pricingFilter}</span>
              </button>
              {isPricingOpen && (
                <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, width: "175px", background: "#111", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1rem", overflow: "hidden", zIndex: 100, boxShadow: "0 20px 60px rgba(0,0,0,0.8)" }}>
                  {["All", "Free", "Freemium", "Premium"].map((price) => (
                    <button key={price} onClick={() => { setPricingFilter(price); setIsPricingOpen(false); }}
                      style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.825rem 1rem", fontSize: "0.875rem", fontWeight: 700, background: pricingFilter === price ? "rgba(var(--primary),0.1)" : "transparent", color: pricingFilter === price ? "rgb(var(--primary))" : "#9ca3af", border: "none", borderBottom: "1px solid rgba(255,255,255,0.05)", cursor: "pointer", fontFamily: "inherit" }}>
                      {price === "All" ? "Any Price" : price}
                      {pricingFilter === price && <Check size={13} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div style={{ position: "relative", display: "flex", alignItems: "center", marginBottom: "1rem" }}>
            <button className="desktop-arrow" onClick={() => scrollCategories("left")} style={{ position: "absolute", left: "-15px", zIndex: 10, background: "#161616", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "50%", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.8)", transition: "all 0.2s" }}
              onMouseOver={e => { e.currentTarget.style.background = "rgb(var(--primary))"; e.currentTarget.style.borderColor = "rgb(var(--primary))"; }}
              onMouseOut={e => { e.currentTarget.style.background = "#161616"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}>
              <ChevronLeft size={20} />
            </button>
            <div ref={categoryScrollRef} style={{ display: "flex", flexWrap: "nowrap", gap: "0.6rem", overflowX: "auto", paddingBottom: "0.5rem", scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch", width: "100%", padding: "0 1.5rem", scrollBehavior: "smooth" }}>
              {categories.map((cat) => {
                if (cat === "website builder") return null;
                const isActive = (activeCategory === cat) || (cat === "All" && activeCategory === null);
                const displayCat = cat === "All" ? "🎯 All Goals" : (categoryMap[cat] || cat);
                return (
                  <button key={cat} onClick={() => setActiveCategory(cat === "All" ? null : cat)}
                    style={{ flexShrink: 0, flexGrow: 0, padding: "0.6rem 1.25rem", borderRadius: "9999px", fontSize: "0.875rem", fontWeight: 700, whiteSpace: "nowrap", cursor: "pointer", fontFamily: "inherit", background: isActive ? "rgb(var(--primary))" : "#161616", color: isActive ? "white" : "#a1a1aa", border: `1px solid ${isActive ? "rgb(var(--primary))" : "rgba(255,255,255,0.08)"}`, transition: "all 0.2s" }}
                    onMouseOver={e => { if(!isActive) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "white"; } }}
                    onMouseOut={e => { if(!isActive) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#a1a1aa"; } }}>
                    {displayCat}
                  </button>
                );
              })}
            </div>
            <button className="desktop-arrow" onClick={() => scrollCategories("right")} style={{ position: "absolute", right: "-15px", zIndex: 10, background: "#161616", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "50%", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.8)", transition: "all 0.2s" }}
              onMouseOver={e => { e.currentTarget.style.background = "rgb(var(--primary))"; e.currentTarget.style.borderColor = "rgb(var(--primary))"; }}
              onMouseOut={e => { e.currentTarget.style.background = "#161616"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}>
              <ChevronRight size={20} />
            </button>
          </div>
        </section>

        <div style={{ width: "100%", display: "flex", justifyContent: "center", padding: "0 1rem 2.5rem" }}>
          <div style={{ maxWidth: "100%", overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch", padding: "0.25rem" }}>
            <div style={{ display: "inline-flex", gap: "0.25rem", background: "#121212", border: "1px solid rgba(255,255,255,0.08)", padding: "0.35rem", borderRadius: "1rem", flexWrap: "nowrap", boxShadow: "0 4px 20px -10px rgba(0,0,0,0.5)" }}>
              {[{ id: "all", label: "All Tools", icon: <LayoutGrid size={16} /> }, { id: "free", label: "Free", icon: <Gift size={16} /> }, { id: "saved", label: "Saved", icon: <Bookmark size={16} /> }].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 1.25rem", borderRadius: "0.75rem", border: "none", cursor: "pointer", fontWeight: 700, fontSize: "0.9rem", fontFamily: "inherit", transition: "all 0.2s ease", background: isActive ? "rgba(255,255,255,0.12)" : "transparent", color: isActive ? "white" : "#808080", boxShadow: isActive ? "0 2px 10px rgba(0,0,0,0.2)" : "none", whiteSpace: "nowrap" }}
                    onMouseOver={e => { if(!isActive) { e.currentTarget.style.color = "white"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; } }}
                    onMouseOut={e => { if(!isActive) { e.currentTarget.style.color = "#808080"; e.currentTarget.style.background = "transparent"; } }}>
                    {tab.icon} {tab.label}
                    {tab.id === "saved" && savedToolIds.length > 0 && (
                      <span style={{ background: "rgb(var(--primary))", color: "white", fontSize: "10px", fontWeight: 900, padding: "2px 6px", borderRadius: "9999px", marginLeft: "0.25rem" }}>{savedToolIds.length}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div ref={toolsRef} style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 1rem 5rem", scrollMarginTop: "100px" }}>
          {isLoading ? (
            <SkeletonGrid />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              {activeTab === "all" && featured.length > 0 && !search && !quizFilterTag && (
                <section>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                    <div style={{ width: "3px", height: "1.75rem", background: "rgb(var(--primary))", borderRadius: "9999px" }} />
                    <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "white", letterSpacing: "-0.02em" }}>Featured Tools</h2>
                  </div>
                  <ToolGrid tools={featured} isSearch={false} checkActive={isSponsorshipActive} onVisit={trackClick} savedIds={savedToolIds} onToggleSave={toggleSaveTool} />
                </section>
              )}
              {visibleRest.length > 0 ? (
                <section>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.75rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{ width: "3px", height: "1.75rem", background: "#3f3f46", borderRadius: "9999px" }} />
                      <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "white", letterSpacing: "-0.02em" }}>
                        {quizFilterTag ? "🔥 Your Custom VIP Stack" : activeTab === "saved" ? "Your Bookmarks" : activeTab === "free" ? "Free Tools" : search ? "Search Results" : "Explore Collection"}
                      </h2>
                    </div>
                    {quizFilterTag && (
                      <button onClick={clearQuizFilter} style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.45rem 0.9rem", borderRadius: "0.7rem", border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#9ca3af", cursor: "pointer", fontWeight: 700, fontSize: "0.8rem", fontFamily: "inherit" }}>
                        Clear Filter <X size={13} />
                      </button>
                    )}
                  </div>
                  <ToolGrid tools={visibleRest} isSearch={!!search || !!quizFilterTag} checkActive={isSponsorshipActive} onVisit={trackClick} savedIds={savedToolIds} onToggleSave={toggleSaveTool} />
                </section>
              ) : (
                /* CTO FIX: The Lost Crab UI! */
                <div style={{ textAlign: "center", padding: "6rem 1rem", border: "1px dashed rgba(255, 102, 0, 0.2)", borderRadius: "1.5rem", background: "rgba(255, 102, 0, 0.02)" }}>
                  <div style={{ fontSize: "56px", marginBottom: "1rem", filter: "drop-shadow(0 0 15px rgba(255,102,0,0.3))" }}>🦀❓</div>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "white", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>The Crab is confused...</h3>
                  <p style={{ color: "#9ca3af", marginBottom: "2rem", fontSize: "1rem", maxWidth: "400px", margin: "0 auto 2rem", lineHeight: "1.6" }}>
                    I searched the whole internet but couldn't find <span style={{ color: "white", fontWeight: "bold" }}>"{search}"</span>. Want to explore our trending tools instead?
                  </p>
                  <button onClick={() => { setSearch(""); clearQuizFilter(); setActiveTab("all"); }} style={{ padding: "0.875rem 1.75rem", background: "rgba(255,102,0,0.1)", color: "#ff6600", fontWeight: 800, borderRadius: "1rem", border: "1px solid rgba(255,102,0,0.3)", cursor: "pointer", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: "0.5rem", transition: "all 0.2s" }} onMouseOver={e=>{e.currentTarget.style.background="#ff6600"; e.currentTarget.style.color="#000"}} onMouseOut={e=>{e.currentTarget.style.background="rgba(255,102,0,0.1)"; e.currentTarget.style.color="#ff6600"}}>
                    Reset & Explore Tools <ArrowRight size={16} />
                  </button>
                </div>
              )}
              {rest.length > displayLimit && (
                <div style={{ textAlign: "center" }}>
                  <button onClick={() => setDisplayLimit(p => p + 12)}
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.825rem 2rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.875rem", color: "#d1d5db", fontWeight: 700, fontSize: "0.875rem", cursor: "pointer", fontFamily: "inherit" }}
                    onMouseOver={e => { e.currentTarget.style.background = "rgba(var(--primary),0.12)"; e.currentTarget.style.color = "white"; }}
                    onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#d1d5db"; }}>
                    Load More Tools <ArrowRight size={15} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <AICrab onComplete={(tag) => {
          setQuizFilterTag(tag);
          setTimeout(() => {
            toolsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 150);
        }} />

      </div>
    </>
  );
}