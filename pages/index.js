import { useState, useMemo, useEffect } from "react";
import Head from "next/head";
import { useTools } from "@/hooks/useTools";
import { supabase } from "@/lib/supabase";
import {
  Search, Sparkles, ArrowRight, Star, Bookmark, BookmarkCheck,
  LayoutGrid, Gift, ChevronDown, Check, Target, User, Lightbulb,
  X, SlidersHorizontal
} from "lucide-react";

// ============================================================
// QUIZ OVERLAY
// ============================================================
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
      "Video Editing": "video",
      "Coding & Websites": "code",
      "Design & Images": "design",
      "Writing Content": "writing",
      "Audio & Music": "audio",
      "Automation": "automation",
      "Data & Analytics": "data",
      "Useful Utilities": "utility",
    };
    const tagToSearch = tagMap[answers.problem] || "";

    if (email.trim() !== "") {
      try {
        await fetch("https://script.google.com/macros/s/AKfycbzf2hzxyEqdbOshBuRBti6wmYjHX4yc8BAGqgRmzQnv-p9QKNm73KA-ZH-cpathXc3K4w/exec", {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, ...answers }),
        });
      } catch (error) {
        console.error("Failed to send to Google Sheets:", error);
      }
    }
    onComplete(tagToSearch);
  };

  return (
    <div className="fixed inset-0 z-[999] bg-[#F9FAFB] overflow-y-auto flex flex-col items-center justify-start md:justify-center p-6 pt-16 pb-24 animate-in fade-in duration-500">
      <div className="fixed top-0 left-0 w-full h-1.5 bg-gray-200 z-[1000]">
        <div className="h-full bg-indigo-500 transition-all duration-500 ease-out" style={{ width: `${(step / 3) * 100}%` }} />
      </div>

      <div className="w-full max-w-xl flex flex-col my-auto">
        {step === 0 && (
          <div className="animate-in slide-in-from-bottom-4 duration-500 w-full">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-indigo-100 rounded-full text-indigo-600"><Target className="w-8 h-8" /></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center mb-2 tracking-tight">What is your goal today?</h2>
            <p className="text-gray-500 text-center mb-8">Let&apos;s find the exact AI tools you need.</p>
            <div className="space-y-4">
              {["Make Money", "Save Time", "Just Exploring"].map((opt) => (
                <button key={opt} onClick={() => handleAnswer("goal", opt, 1)}
                  className="w-full p-5 text-left bg-white border-2 border-gray-100 rounded-2xl hover:border-indigo-500 hover:bg-indigo-50 text-gray-800 font-bold text-lg transition-all active:scale-[0.98] shadow-sm hover:shadow-md">
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="animate-in slide-in-from-right-8 duration-500 w-full">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-indigo-100 rounded-full text-indigo-600"><User className="w-8 h-8" /></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center mb-2 tracking-tight">Who are you?</h2>
            <p className="text-gray-500 text-center mb-8">This helps us personalize your tool stack.</p>
            <div className="space-y-4">
              {["Content Creator", "Developer / Student", "Business Owner"].map((opt) => (
                <button key={opt} onClick={() => handleAnswer("role", opt, 2)}
                  className="w-full p-5 text-left bg-white border-2 border-gray-100 rounded-2xl hover:border-indigo-500 hover:bg-indigo-50 text-gray-800 font-bold text-lg transition-all active:scale-[0.98] shadow-sm hover:shadow-md">
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in slide-in-from-right-8 duration-500 w-full">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-indigo-100 rounded-full text-indigo-600"><Lightbulb className="w-8 h-8" /></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center mb-2 tracking-tight">What is your biggest struggle?</h2>
            <p className="text-gray-500 text-center mb-8">Pick your headache, we will fix it.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-8 md:pb-0">
              {["Video Editing", "Writing Content", "Coding & Websites", "Design & Images", "Audio & Music", "Automation", "Data & Analytics", "Useful Utilities"].map((opt) => (
                <button key={opt} onClick={() => handleAnswer("problem", opt, 3)}
                  className="w-full p-4 text-left bg-white border-2 border-gray-100 rounded-2xl hover:border-indigo-500 hover:bg-indigo-50 text-gray-800 font-bold text-sm md:text-base transition-all active:scale-[0.98] shadow-sm hover:shadow-md">
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in zoom-in-95 duration-700 ease-out w-full bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-indigo-100 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-b from-indigo-50 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex p-4 rounded-full bg-indigo-50 text-indigo-600 mb-6 shadow-inner">
                <Sparkles className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">Match Found! 🎯</h2>
              <h3 className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-5 leading-snug">
                We found the best AI tools that fix your exact problem.
              </h3>
              <p className="text-gray-500 mb-8 max-w-sm mx-auto font-medium">
                Enter your email to see your matches and get notified whenever the best new AI tools are added.
              </p>
              <div className="flex flex-col gap-4">
                <input type="email" placeholder="Your email address" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 font-medium text-lg focus:outline-none focus:border-indigo-500 focus:bg-white transition-all placeholder:text-gray-400" />
                <button onClick={handleFinish}
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-black text-lg rounded-xl shadow-[0_10px_30px_rgba(79,70,229,0.3)] transition-all hover:-translate-y-1 active:scale-95 flex justify-center items-center gap-2 group">
                  Show Matches <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {step < 3 && (
        <button onClick={onSkip}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 text-gray-400 font-medium hover:text-gray-600 transition-colors flex items-center gap-1 bg-[#F9FAFB] px-4 py-2 rounded-full shadow-sm md:shadow-none z-[1000]">
          Skip to explore all tools <ArrowRight className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};

// ============================================================
// TOOL GRID
// ============================================================
function ToolGrid({ tools, isSearch, checkActive, onVisit, savedIds, onToggleSave }) {
  return (
    <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tools.map((tool) => {
        const showSuggested = isSearch && checkActive(tool, "suggested");
        const showFeaturedGlow = !isSearch && checkActive(tool, "featured");
        const isSaved = savedIds.includes(String(tool.id));

        return (
          <div key={tool.id}
            className={`group relative bg-[#0F0F0F] border rounded-3xl md:rounded-[2rem] p-5 md:p-7 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full overflow-hidden ${(showSuggested || showFeaturedGlow) ? "border-primary/40 shadow-[0_0_40px_-10px_rgba(var(--primary),0.2)]" : "border-white/5 hover:border-primary/40"}`}>
            <div className={`absolute -top-24 -right-24 w-48 h-48 blur-[60px] transition-all ${(showSuggested || showFeaturedGlow) ? "bg-primary/20" : "bg-primary/5 group-hover:bg-primary/10"}`} />

            <div className="flex justify-between items-start mb-4 md:mb-5 z-10">
              <div className="text-4xl md:text-5xl p-3 md:p-4 bg-white/5 rounded-xl md:rounded-2xl border border-white/5 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
                {tool.icon || "⚡"}
              </div>
              <div className="flex flex-col items-end gap-2">
                <button onClick={() => onToggleSave(String(tool.id))}
                  className={`p-2.5 rounded-full border transition-all duration-300 active:scale-75 ${isSaved ? "bg-primary/20 border-primary/50 text-primary shadow-[0_0_15px_rgba(var(--primary),0.3)]" : "bg-white/5 border-white/10 text-gray-500 hover:text-white hover:bg-white/10 hover:rotate-12"}`}>
                  {isSaved ? <BookmarkCheck className="w-4 h-4 scale-110" /> : <Bookmark className="w-4 h-4" />}
                </button>
                {tool.pricing && (
                  <span className="bg-white/10 text-gray-300 border border-white/5 text-[9px] md:text-[10px] uppercase font-bold tracking-widest px-2.5 md:px-3 py-1 rounded-full mt-1">
                    {tool.pricing}
                  </span>
                )}
              </div>
            </div>

            <div className="mb-3 z-10 flex">
              <span className="text-[9px] md:text-[10px] font-black text-zinc-400 uppercase tracking-widest bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
                {tool.category}
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 tracking-tight group-hover:text-primary transition-colors line-clamp-1 z-10">
              {tool.name}
            </h3>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-6 md:mb-8 line-clamp-3 flex-grow group-hover:text-gray-400 z-10">
              {tool.description}
            </p>

            <div className="pt-4 md:pt-5 border-t border-white/5 mt-auto z-10 w-full">
              <a href={tool.link?.startsWith("http") ? tool.link : `https://${tool.link}`}
                target="_blank" rel="noopener noreferrer"
                onClick={() => onVisit(tool.id, tool.click_count || 0)}
                className="flex items-center justify-center w-full gap-2 bg-white/5 hover:bg-primary text-white text-[11px] md:text-sm font-bold py-3 px-4 rounded-xl transition-all border border-white/10 hover:border-primary shadow-sm">
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
  );
}

// ============================================================
// MAIN PAGE
// ============================================================
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
    if (saved) {
      try { setSavedToolIds(JSON.parse(saved)); } catch (e) { }
    }
    const quizCompleted = localStorage.getItem("toolsy_quiz_done");
    if (!quizCompleted) {
      const timer = setTimeout(() => setShowQuiz(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleQuizComplete = (tag) => {
    if (tag) setQuizFilterTag(tag);
    setShowQuiz(false);
    localStorage.setItem("toolsy_quiz_done", "true");
  };

  const handleQuizSkip = () => {
    setShowQuiz(false);
    localStorage.setItem("toolsy_quiz_done", "true");
  };

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
    try {
      await supabase.from("tools").update({ click_count: (currentClicks || 0) + 1 }).eq("id", toolId);
    } catch (error) {
      console.error("Error tracking click:", error);
    }
  };

  const isSponsorshipActive = (tool, type) => {
    const isMarked = tool[type] === true || String(tool[type]) === "true";
    if (!isMarked) return false;
    if (!tool.sponsored_until) return true;
    const expiryDate = new Date(tool.sponsored_until);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return expiryDate >= today;
  };

  const filtered = useMemo(() => {
    if (!tools) return [];
    let result = [...tools];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
      result.sort((a, b) => {
        const aSug = isSponsorshipActive(a, "suggested");
        const bSug = isSponsorshipActive(b, "suggested");
        return aSug === bSug ? 0 : aSug ? -1 : 1;
      });
    }

    if (activeCategory && activeCategory !== "All") {
      result = result.filter(t => t.category === activeCategory);
    }

    if (activeTab === "free") {
      result = result.filter(t => t.pricing?.toLowerCase() === "free");
    } else if (activeTab === "saved") {
      result = result.filter(t => savedToolIds.includes(String(t.id)));
    }

    if (pricingFilter !== "All") {
      result = result.filter(t => t.pricing?.toLowerCase() === pricingFilter.toLowerCase());
    }

    if (quizFilterTag) {
      result = result.filter(t => t.tags?.toLowerCase().includes(quizFilterTag.toLowerCase()));
    }

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
        <meta name="keywords" content="AI tools, best AI tools, AI directory, artificial intelligence tools, free AI tools, AI for creators, AI for developers" />
        <meta property="og:title" content="Toolsy AI | Discover The Best AI Tools" />
        <meta property="og:description" content="The internet's best curated AI tools directory. Find the perfect AI tool for your needs." />
        <meta property="og:url" content="https://toolsyai.xyz" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://toolsyai.xyz" />
      </Head>

      {showQuiz && <QuizOverlay onComplete={handleQuizComplete} onSkip={handleQuizSkip} />}

      <div className="min-h-screen bg-[#050505] text-white transition-all duration-700">

        {/* HERO */}
        <section className="relative pt-24 md:pt-28 pb-4 md:pb-12 px-6 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] md:h-[500px] bg-primary/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="hidden md:inline-flex items-center gap-2 px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-white/5 border border-white/10 mb-4 md:mb-8 text-[10px] md:text-xs font-medium text-primary uppercase tracking-widest">
              <Sparkles className="h-3 w-3" />
              <span>Premium AI Tools Directory</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-4 md:mb-6 text-white leading-[1.1]">
              Discover the <span className="text-primary">Best</span> AI Tools
            </h1>
            <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto mb-6 md:mb-12">
              Stop wasting hours on Google. We curate the internet&apos;s most powerful tools for developers, designers, and creators.
            </p>
          </div>
        </section>

        {/* SEARCH & FILTERS */}
        <section className="px-4 md:px-6 max-w-5xl mx-auto relative z-30 mb-6 md:mb-10">
          <div className="flex flex-col gap-4 md:gap-5">
            <div className="flex w-full gap-2 relative">
              <div className="relative flex-1 flex items-center bg-[#1A1A1A] border border-white/10 hover:border-white/20 transition-all rounded-xl md:rounded-2xl overflow-hidden shadow-inner">
                <Search className="absolute left-4 h-4 md:h-5 w-4 md:w-5 text-gray-500" />
                <input
                  placeholder="Search AI tools (e.g. 'coding', 'video')..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-11 md:pl-12 h-12 md:h-14 w-full bg-transparent border-0 text-white text-sm md:text-base outline-none placeholder:text-gray-500"
                />
              </div>

              <div className="relative shrink-0">
                <button onClick={() => setIsPricingOpen(!isPricingOpen)}
                  className="flex items-center justify-center w-12 md:w-auto md:px-5 h-12 md:h-14 bg-[#1A1A1A] hover:bg-white/10 border border-white/10 rounded-xl md:rounded-2xl transition-all shadow-inner group">
                  <SlidersHorizontal className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  <span className="hidden md:block ml-2 text-sm font-bold text-gray-300 group-hover:text-white transition-colors">
                    {pricingFilter === "All" ? "Filters" : pricingFilter}
                  </span>
                </button>

                {isPricingOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-[#0F0F0F] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden z-[100]">
                    {["All", "Free", "Freemium", "Premium"].map((price) => (
                      <button key={price}
                        onClick={() => { setPricingFilter(price); setIsPricingOpen(false); }}
                        className={`w-full flex items-center justify-between px-4 py-3.5 text-sm font-bold transition-all border-b border-white/5 last:border-0 ${pricingFilter === price ? "bg-primary/10 text-primary" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}>
                        {price === "All" ? "Any Price" : price}
                        {pricingFilter === price && <Check className="w-4 h-4 text-primary" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="w-full flex gap-2 overflow-x-auto pb-3 custom-scrollbar">
              <style>{`
                .custom-scrollbar::-webkit-scrollbar { height: 5px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.3); }
                @media (max-width: 768px) {
                  .custom-scrollbar::-webkit-scrollbar { display: none; }
                  .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                }
              `}</style>
              {categories.map((cat) => (
                <button key={cat}
                  onClick={() => setActiveCategory(cat === "All" ? null : cat)}
                  className={`shrink-0 px-4 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-bold whitespace-nowrap transition-all border ${
                    (activeCategory === cat) || (cat === "All" && activeCategory === null)
                      ? "bg-primary text-white border-primary shadow-[0_0_15px_rgba(var(--primary),0.3)]"
                      : "bg-[#1A1A1A] text-gray-400 border-white/10 hover:bg-white/10 hover:text-white"
                  }`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* TABS */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8 relative z-10">
          <div className="flex w-full bg-[#1A1A1A] md:bg-transparent p-1 md:p-0 rounded-2xl md:rounded-none md:border-b border-white/10 md:pb-4 gap-1 md:gap-4">
            <button onClick={() => setActiveTab("all")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-3 md:px-6 rounded-xl transition-all duration-300 ${activeTab === "all" ? "bg-white/10 text-white shadow-md border border-white/10" : "text-gray-500 hover:text-gray-300"}`}>
              <LayoutGrid className="w-4 h-4" />
              <span className="font-bold text-[11px] md:text-sm whitespace-nowrap">All Tools</span>
            </button>
            <button onClick={() => setActiveTab("free")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-3 md:px-6 rounded-xl transition-all duration-300 ${activeTab === "free" ? "bg-emerald-500/10 text-emerald-400 shadow-md border border-emerald-500/20" : "text-gray-500 hover:text-gray-300"}`}>
              <Gift className="w-4 h-4" />
              <span className="font-bold text-[11px] md:text-sm whitespace-nowrap">Free</span>
            </button>
            <button onClick={() => setActiveTab("saved")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-3 md:px-6 rounded-xl transition-all duration-300 ${activeTab === "saved" ? "bg-primary/10 text-primary shadow-md border border-primary/20" : "text-gray-500 hover:text-gray-300"}`}>
              <div className="relative">
                <Bookmark className="w-4 h-4" />
                {savedToolIds.length > 0 && (
                  <span className="absolute -top-1.5 -right-2 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-[8px] text-white font-black shadow-lg">
                    {savedToolIds.length}
                  </span>
                )}
              </div>
              <span className="font-bold text-[11px] md:text-sm whitespace-nowrap">Saved</span>
            </button>
          </div>
        </div>

        {/* TOOLS GRID */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 pb-20 md:pb-32 space-y-12 md:space-y-20 relative z-10">
          {isLoading ? (
            <div className="text-center py-20 text-primary animate-pulse font-bold uppercase tracking-widest text-sm md:text-base">Syncing Database...</div>
          ) : (
            <>
              {activeTab === "all" && featured.length > 0 && !search && !quizFilterTag && (
                <section>
                  <div className="flex items-center gap-3 mb-6 md:mb-10">
                    <div className="h-8 md:h-10 w-1 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Featured Tools</h2>
                  </div>
                  <ToolGrid tools={featured} isSearch={false} checkActive={isSponsorshipActive} onVisit={trackClick} savedIds={savedToolIds} onToggleSave={toggleSaveTool} />
                </section>
              )}

              {visibleRest.length > 0 ? (
                <section>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-10">
                    <div className="flex items-center gap-3">
                      <div className="h-8 md:h-10 w-1 bg-zinc-700 rounded-full" />
                      <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                        {quizFilterTag ? "Your Personalized AI Stack" : activeTab === "saved" ? "Your Bookmarks" : activeTab === "free" ? "Free Tools" : search ? "Search Results" : "Explore Collection"}
                      </h2>
                    </div>
                    {quizFilterTag && (
                      <button onClick={clearQuizFilter} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-gray-400 hover:text-white text-sm font-bold transition-all">
                        Clear Matchmaker Filter <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <ToolGrid tools={visibleRest} isSearch={!!search || !!quizFilterTag} checkActive={isSponsorshipActive} onVisit={trackClick} savedIds={savedToolIds} onToggleSave={toggleSaveTool} />
                </section>
              ) : (
                <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/5">
                  <Bookmark className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">No exact matches found</h3>
                  <p className="text-gray-500">We couldn&apos;t find a tool with those specific tags right now.</p>
                  <button onClick={clearQuizFilter} className="mt-6 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:scale-105 transition-transform">
                    View All Tools
                  </button>
                </div>
              )}

              {rest.length > displayLimit && (
                <div className="flex justify-center pt-8 md:pt-12">
                  <button onClick={() => setDisplayLimit(p => p + 12)}
                    className="h-12 md:h-14 px-8 md:px-10 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 hover:bg-primary/20 hover:text-white transition-all duration-300 hover:-translate-y-1 text-sm md:text-base font-bold text-gray-300 flex items-center gap-2">
                    Load More Tools <ArrowRight className="h-4 md:h-5 w-4 md:w-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}