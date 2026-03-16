import { useState, useMemo, useEffect } from "react";
import Head from "next/head";
import { useTools } from "@/hooks/useTools";
import { supabase } from "@/lib/supabase";
import {
  Search, Sparkles, ArrowRight, Bookmark, BookmarkCheck,
  LayoutGrid, Gift, Check, Target, User, Lightbulb,
  X, SlidersHorizontal
} from "lucide-react";

const QuizOverlay = ({ onComplete, onSkip }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ goal: "", role: "", problem: "" });
  const [email, setEmail] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  const handleAnswer = (key, value, nextStep) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    setStep(nextStep);
  };

  const handleFinish = async () => {
    const tagMap = {
      "Video Editing": "video", "Coding & Websites": "code",
      "Design & Images": "design", "Writing Content": "writing",
      "Audio & Music": "audio", "Automation": "automation",
      "Data & Analytics": "data", "Useful Utilities": "utility",
    };
    const tagToSearch = tagMap[answers.problem] || "";
    if (email.trim() !== "") {
      try {
        await fetch("https://script.google.com/macros/s/AKfycbzf2hzxyEqdbOshBuRBti6wmYjHX4yc8BAGqgRmzQnv-p9QKNm73KA-ZH-cpathXc3K4w/exec", {
          method: "POST", mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, ...answers }),
        });
      } catch (error) { console.error("Failed:", error); }
    }
    onComplete(tagToSearch);
  };

  const qBtn = { padding: "1.25rem", textAlign: "left", background: "white", border: "2px solid #f3f4f6", borderRadius: "1rem", color: "#1f2937", fontWeight: 700, fontSize: "1rem", cursor: "pointer", width: "100%", fontFamily: "inherit", transition: "border-color 0.2s" };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 999, background: "#F9FAFB", overflowY: "auto", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "4px", background: "#e5e7eb", zIndex: 1000 }}>
        <div style={{ height: "100%", background: "rgb(var(--primary))", width: `${(step / 3) * 100}%`, transition: "width 0.5s ease" }} />
      </div>
      <div style={{ width: "100%", maxWidth: "480px" }}>
        {step === 0 && (
          <div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
              <div style={{ padding: "1rem", background: "rgba(var(--primary),0.1)", borderRadius: "50%", color: "rgb(var(--primary))" }}><Target size={32} /></div>
            </div>
            <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "#111", textAlign: "center", marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>What is your goal today?</h2>
            <p style={{ color: "#6b7280", textAlign: "center", marginBottom: "2rem" }}>Let&apos;s find the exact AI tools you need.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {["Make Money", "Save Time", "Just Exploring"].map((opt) => (
                <button key={opt} onClick={() => handleAnswer("goal", opt, 1)} style={qBtn}
                  onMouseOver={e => e.currentTarget.style.borderColor = "rgb(var(--primary))"}
                  onMouseOut={e => e.currentTarget.style.borderColor = "#f3f4f6"}>{opt}</button>
              ))}
            </div>
          </div>
        )}
        {step === 1 && (
          <div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
              <div style={{ padding: "1rem", background: "rgba(var(--primary),0.1)", borderRadius: "50%", color: "rgb(var(--primary))" }}><User size={32} /></div>
            </div>
            <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "#111", textAlign: "center", marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>Who are you?</h2>
            <p style={{ color: "#6b7280", textAlign: "center", marginBottom: "2rem" }}>This helps us personalize your tool stack.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {["Content Creator", "Developer / Student", "Business Owner"].map((opt) => (
                <button key={opt} onClick={() => handleAnswer("role", opt, 2)} style={qBtn}
                  onMouseOver={e => e.currentTarget.style.borderColor = "rgb(var(--primary))"}
                  onMouseOut={e => e.currentTarget.style.borderColor = "#f3f4f6"}>{opt}</button>
              ))}
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
              <div style={{ padding: "1rem", background: "rgba(var(--primary),0.1)", borderRadius: "50%", color: "rgb(var(--primary))" }}><Lightbulb size={32} /></div>
            </div>
            <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "#111", textAlign: "center", marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>What&apos;s your biggest struggle?</h2>
            <p style={{ color: "#6b7280", textAlign: "center", marginBottom: "2rem" }}>Pick your headache, we will fix it.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.625rem" }}>
              {["Video Editing", "Writing Content", "Coding & Websites", "Design & Images", "Audio & Music", "Automation", "Data & Analytics", "Useful Utilities"].map((opt) => (
                <button key={opt} onClick={() => handleAnswer("problem", opt, 3)} style={{ ...qBtn, fontSize: "0.875rem", padding: "1rem" }}
                  onMouseOver={e => e.currentTarget.style.borderColor = "rgb(var(--primary))"}
                  onMouseOut={e => e.currentTarget.style.borderColor = "#f3f4f6"}>{opt}</button>
              ))}
            </div>
          </div>
        )}
        {step === 3 && (
          <div style={{ background: "white", padding: "2.5rem", borderRadius: "1.5rem", boxShadow: "0 25px 50px rgba(0,0,0,0.12)", border: "1px solid #e0e7ff", textAlign: "center" }}>
            <div style={{ display: "inline-flex", padding: "1rem", borderRadius: "50%", background: "rgba(var(--primary),0.1)", color: "rgb(var(--primary))", marginBottom: "1.5rem" }}><Sparkles size={32} /></div>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 900, color: "#111", marginBottom: "0.75rem" }}>Match Found! 🎯</h2>
            <p style={{ fontSize: "1rem", fontWeight: 700, color: "rgb(var(--primary))", marginBottom: "1rem" }}>We found the best AI tools for your exact problem.</p>
            <p style={{ color: "#6b7280", marginBottom: "1.5rem", fontSize: "0.875rem" }}>Enter your email to see your matches.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <input type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)}
                style={{ padding: "1rem 1.5rem", background: "#f9fafb", border: "2px solid #e5e7eb", borderRadius: "0.75rem", fontSize: "1rem", outline: "none", color: "#111", fontFamily: "inherit" }} />
              <button onClick={handleFinish} style={{ padding: "1rem", background: "rgb(var(--primary))", color: "white", fontWeight: 900, fontSize: "1rem", borderRadius: "0.75rem", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", fontFamily: "inherit" }}>
                Show Matches <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
      {step < 3 && (
        <button onClick={onSkip} style={{ position: "fixed", bottom: "1.5rem", left: "50%", transform: "translateX(-50%)", color: "#9ca3af", background: "#F9FAFB", padding: "0.5rem 1.25rem", borderRadius: "9999px", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.875rem", fontFamily: "inherit" }}>
          Skip to explore all tools <ArrowRight size={12} />
        </button>
      )}
    </div>
  );
};

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
              <span style={{ fontSize: "0.65rem", fontWeight: 800, color: "#8b5cf6", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem", display: "block" }}>{tool.category}</span>
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
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("toolsy_saved");
    if (saved) { try { setSavedToolIds(JSON.parse(saved)); } catch (e) { } }
    const quizCompleted = localStorage.getItem("toolsy_quiz_done");
    if (!quizCompleted) {
      const timer = setTimeout(() => setShowQuiz(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleQuizComplete = (tag) => { if (tag) setQuizFilterTag(tag); setShowQuiz(false); localStorage.setItem("toolsy_quiz_done", "true"); };
  const handleQuizSkip = () => { setShowQuiz(false); localStorage.setItem("toolsy_quiz_done", "true"); };
  const clearQuizFilter = () => setQuizFilterTag(null);
  const toggleSaveTool = (id) => {
    setSavedToolIds((prev) => {
      const newSaved = prev.includes(id) ? prev.filter(tId => tId !== id) : [...prev, id];
      localStorage.setItem("toolsy_saved", JSON.stringify(newSaved));
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

      {showQuiz && <QuizOverlay onComplete={handleQuizComplete} onSkip={handleQuizSkip} />}

      <style>{`
        @media (max-width: 480px) { .filter-label { display: none !important; } }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#0d0d0d", color: "white" }}>

        {/* HERO SECTION UPGRADE - BIGGER, TIGHTER TEXT LIKE THE OLD DESIGN */}
        <section style={{ position: "relative", paddingTop: "5rem", paddingBottom: "1rem", textAlign: "center", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "700px", height: "450px", background: "radial-gradient(ellipse at 50% 0%, rgba(var(--primary),0.15) 0%, transparent 65%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: "820px", margin: "0 auto", padding: "0 1rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", padding: "0.3rem 0.75rem", borderRadius: "9999px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", marginBottom: "1.25rem", maxWidth: "100%" }}>
              <Sparkles size={11} color="rgb(var(--primary))" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: "10px", fontWeight: 600, color: "rgb(var(--primary))", textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>Premium AI Tools Directory</span>
            </div>
            
            {/* UPDATED FONT SETTINGS: Heavier, tighter letter spacing, much larger clamp */}
            {/* RESTORED PREMIUM SAAS FONT: Cleaner weight, better spacing, exact line breaks */}
            <h1 style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1.25rem", color: "white" }}>
              Discover the <br />
              <span style={{ color: "rgb(var(--primary))" }}>Best</span> AI Tools
            </h1>
            
            <p style={{ color: "#6b7280", fontSize: "clamp(0.85rem, 2.5vw, 1.1rem)", maxWidth: "540px", margin: "0 auto 2rem", lineHeight: 1.6 }}>
              Stop wasting hours on Google. We curate the internet&apos;s most powerful tools for developers, designers, and creators.
            </p>
          </div>
        </section>

        {/* SEARCH & FILTERS UPGRADE - WIDER SEARCH BAR */}
        <section style={{ maxWidth: "880px", margin: "0 auto", padding: "0 1rem 1.5rem" }}>
          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem" }}>
            {/* UPDATED SEARCH BAR: Taller, wider, premium background and glowing border on focus */}
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

          {/* CATEGORIES UPGRADE - STRICT SINGLE LINE, BETTER PADDING, PREMIUM HOVER */}
          <div style={{ display: "flex", flexWrap: "nowrap", gap: "0.6rem", overflowX: "auto", paddingBottom: "1rem", scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}>
            {categories.map((cat) => {
              const isActive = (activeCategory === cat) || (cat === "All" && activeCategory === null);
              return (
                <button key={cat} onClick={() => setActiveCategory(cat === "All" ? null : cat)}
                  style={{ flexShrink: 0, flexGrow: 0, padding: "0.6rem 1.25rem", borderRadius: "9999px", fontSize: "0.875rem", fontWeight: 700, whiteSpace: "nowrap", cursor: "pointer", fontFamily: "inherit", background: isActive ? "rgb(var(--primary))" : "#161616", color: isActive ? "white" : "#a1a1aa", border: `1px solid ${isActive ? "rgb(var(--primary))" : "rgba(255,255,255,0.08)"}`, transition: "all 0.2s" }}
                  onMouseOver={e => { if(!isActive) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "white"; } }}
                  onMouseOut={e => { if(!isActive) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#a1a1aa"; } }}>
                  {cat}
                </button>
              );
            })}
          </div>
        </section>

        {/* TABS */}
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 1rem 1.25rem", overflowX: "auto" }}>
          <div style={{ display: "inline-flex", gap: "0.2rem", background: "#1a1a1a", padding: "0.25rem", borderRadius: "0.875rem", flexWrap: "nowrap" }}>
            {[{ id: "all", label: "All Tools", icon: <LayoutGrid size={14} /> }, { id: "free", label: "Free", icon: <Gift size={14} /> }, { id: "saved", label: "Saved", icon: <Bookmark size={14} /> }].map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                style={{ display: "flex", alignItems: "center", gap: "0.375rem", padding: "0.55rem 1rem", borderRadius: "0.6rem", border: "none", cursor: "pointer", fontWeight: 700, fontSize: "0.8rem", fontFamily: "inherit", transition: "all 0.2s", background: activeTab === tab.id ? "rgba(255,255,255,0.08)" : "transparent", color: activeTab === tab.id ? "white" : "#6b7280" }}>
                {tab.icon} {tab.label}
                {tab.id === "saved" && savedToolIds.length > 0 && (
                  <span style={{ background: "rgb(var(--primary))", color: "white", fontSize: "9px", fontWeight: 900, padding: "1px 5px", borderRadius: "9999px" }}>{savedToolIds.length}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* TOOLS */}
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 1rem 5rem" }}>
          {isLoading ? (
            <div style={{ textAlign: "center", padding: "5rem 0", color: "rgb(var(--primary))", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.875rem" }}>Syncing Database...</div>
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
                        {quizFilterTag ? "Your Personalized AI Stack" : activeTab === "saved" ? "Your Bookmarks" : activeTab === "free" ? "Free Tools" : search ? "Search Results" : "Explore Collection"}
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
                <div style={{ textAlign: "center", padding: "4rem 1rem", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: "1.5rem", background: "rgba(255,255,255,0.02)" }}>
                  <Bookmark size={36} color="#3f3f46" style={{ margin: "0 auto 1rem" }} />
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "white", marginBottom: "0.5rem" }}>No matches found</h3>
                  <p style={{ color: "#6b7280", marginBottom: "1.25rem", fontSize: "0.875rem" }}>We couldn&apos;t find a tool with those tags right now.</p>
                  <button onClick={clearQuizFilter} style={{ padding: "0.7rem 1.5rem", background: "rgb(var(--primary))", color: "white", fontWeight: 700, borderRadius: "0.75rem", border: "none", cursor: "pointer", fontFamily: "inherit" }}>View All Tools</button>
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
      </div>
    </>
  );
}