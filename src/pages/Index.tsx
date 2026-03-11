import { useState, useMemo, useEffect } from "react";
import { useTools } from "@/hooks/useTools";
import { Input } from "@/components/ui/input";
import { 
  Search, Sparkles, ArrowRight, Star, TrendingUp, Bookmark, BookmarkCheck, LayoutGrid, Gift, ChevronDown, Check 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client"; 

const Index = () => {
  const { data: tools, isLoading } = useTools();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [displayLimit, setDisplayLimit] = useState(12);
  
  // 🔥 NEW: 3-TAB SYSTEM STATE
  const [activeTab, setActiveTab] = useState<"all" | "free" | "saved">("all");
  
  // 🔥 NEW: SAVED TOOLS LOGIC
  const [savedToolIds, setSavedToolIds] = useState<string[]>([]);

  // 🔥 NEW: CUSTOM PREMIUM PRICING DROPDOWN STATE
  const [pricingFilter, setPricingFilter] = useState<string>("All");
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  // Load saved tools from local storage when page loads
  useEffect(() => {
    const saved = localStorage.getItem("toolsy_saved");
    if (saved) {
      try {
        setSavedToolIds(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved tools");
      }
    }
  }, []);

  // Toggle Save Tool
  const toggleSaveTool = (id: string) => {
    setSavedToolIds((prev) => {
      const isSaved = prev.includes(id);
      const newSaved = isSaved ? prev.filter(tId => tId !== id) : [...prev, id];
      localStorage.setItem("toolsy_saved", JSON.stringify(newSaved));
      return newSaved;
    });
  };

  const categories = useMemo(() => {
    if (!tools) return [];
    return ["All", ...new Set(tools.map((t) => t.category))].sort();
  }, [tools]);

  const trackClick = async (toolId: string, currentClicks: number) => {
    try {
      await supabase
        .from('tools')
        .update({ click_count: (currentClicks || 0) + 1 })
        .eq('id', toolId);
    } catch (error) {
      console.error("Error tracking click:", error);
    }
  };

  const isSponsorshipActive = (tool: any, type: 'featured' | 'suggested') => {
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

    // 1. Apply Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );

      result.sort((a, b) => {
        const aSug = isSponsorshipActive(a, 'suggested');
        const bSug = isSponsorshipActive(b, 'suggested');
        return aSug === bSug ? 0 : aSug ? -1 : 1;
      });
    }

    // 2. Apply Category
    if (activeCategory && activeCategory !== "All") {
      result = result.filter((t) => t.category === activeCategory);
    }

    // 3. APPLY TAB FILTER (All, Free, Saved)
    if (activeTab === "free") {
      result = result.filter((t) => t.pricing && t.pricing.toLowerCase() === "free");
    } else if (activeTab === "saved") {
      result = result.filter((t) => savedToolIds.includes(String(t.id)));
    }

    // 🔥 4. APPLY CUSTOM PRICING DROPDOWN FILTER
    if (pricingFilter !== "All") {
      result = result.filter((t) => t.pricing && t.pricing.toLowerCase() === pricingFilter.toLowerCase());
    }
    
    return result; 
  }, [tools, search, activeCategory, activeTab, savedToolIds, pricingFilter]);

  const featured = filtered.filter((t) => isSponsorshipActive(t, 'featured'));

  const rest = filtered.filter((t) => !featured.includes(t));
  const visibleRest = rest.slice(0, displayLimit);

  return (
    <div className="min-h-screen bg-[#050505] text-foreground">

      {/* HERO SECTION */}
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
            Discover the best AI tools to supercharge your workflow. curated daily for developers, designers, and creators.
          </p>
        </div>
      </section>

      {/* SEARCH AND FILTERS SECTION */}
      <section className="px-4 md:px-6 max-w-5xl mx-auto relative z-30 mb-6 md:mb-12">
        <div className="rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col">
          
          <div className="flex flex-col md:flex-row items-center w-full relative">
            {/* Search Input */}
            <div className="relative flex-1 flex items-center w-full">
              <Search className="absolute left-4 md:left-6 h-4 md:h-5 w-4 md:w-5 text-muted-foreground" />
              <Input
                placeholder="Search AI tools (e.g. 'coding', 'video', 'free')..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 md:pl-16 h-14 md:h-16 w-full bg-transparent border-0 text-white text-base md:text-lg focus-visible:ring-0 placeholder:text-gray-600 rounded-none md:rounded-tl-3xl md:rounded-bl-none"
              />
            </div>

            {/* 🔥 NEW: CUSTOM PREMIUM DROPDOWN */}
            <div className="relative w-full md:w-auto px-3 pb-3 md:p-0 md:pr-4 flex justify-end md:border-l border-white/10">
              <button
                onClick={() => setIsPricingOpen(!isPricingOpen)}
                className="flex items-center justify-between w-full md:w-44 gap-2 px-4 h-12 bg-[#1A1A1A] hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold text-white transition-all shadow-inner"
              >
                <span className="text-gray-300">
                  {pricingFilter === "All" ? "Pricing: All" : pricingFilter}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isPricingOpen ? "rotate-180" : ""}`} />
              </button>

              {/* The Dropdown Menu */}
              {isPricingOpen && (
                <div className="absolute top-full right-3 md:right-4 mt-2 w-[calc(100%-24px)] md:w-48 bg-[#0F0F0F] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2">
                  {["All", "Free", "Freemium", "Premium"].map((price) => (
                    <button
                      key={price}
                      onClick={() => {
                        setPricingFilter(price);
                        setIsPricingOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3.5 text-sm font-bold transition-all border-b border-white/5 last:border-0 ${
                        pricingFilter === price 
                          ? "bg-primary/10 text-primary" 
                          : "text-gray-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {price === "All" ? "Any Price" : price}
                      {pricingFilter === price && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto p-2 md:p-4 no-scrollbar border-t border-white/5">
            <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat === "All" ? null : cat)}
                className={`px-4 md:px-5 py-2 md:py-2.5 rounded-lg md:rounded-xl text-xs md:text-sm font-semibold whitespace-nowrap transition-all border ${
                  (activeCategory === cat) || (cat === "All" && activeCategory === null)
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/25"
                    : "bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 🔥 UPGRADED 3-TAB SYSTEM (MOBILE OPTIMIZED APP UI) */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8 relative z-10">
        <div className="flex w-full justify-between md:justify-start gap-2 md:gap-4 border-b border-white/10 pb-4">
          
          {/* ALL TOOLS TAB */}
          <button 
            onClick={() => setActiveTab("all")} 
            className={`group flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-2 flex-1 md:flex-none py-3 md:px-6 rounded-2xl md:rounded-xl transition-all duration-300 active:scale-95 ${
              activeTab === "all" 
                ? "bg-white/10 text-white border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)] translate-y-0" 
                : "text-gray-500 bg-transparent hover:text-white hover:bg-white/5 hover:-translate-y-1"
            }`}
          >
            <LayoutGrid className={`w-5 h-5 md:w-4 md:h-4 transition-transform duration-300 ${activeTab === "all" ? "scale-110" : "group-hover:scale-110"}`} />
            <span className="font-black uppercase tracking-widest text-[10px] md:text-sm">All Tools</span>
          </button>

          {/* FREE TOOLS TAB */}
          <button 
            onClick={() => setActiveTab("free")} 
            className={`group flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-2 flex-1 md:flex-none py-3 md:px-6 rounded-2xl md:rounded-xl transition-all duration-300 active:scale-95 ${
              activeTab === "free" 
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)] translate-y-0" 
                : "text-gray-500 bg-transparent hover:text-white hover:bg-white/5 hover:-translate-y-1"
            }`}
          >
            <Gift className={`w-5 h-5 md:w-4 md:h-4 transition-transform duration-300 ${activeTab === "free" ? "scale-110" : "group-hover:scale-110"}`} />
            <span className="font-black uppercase tracking-widest text-[10px] md:text-sm">100% Free</span>
          </button>

          {/* SAVED TOOLS TAB */}
          <button 
            onClick={() => setActiveTab("saved")} 
            className={`group flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-2 flex-1 md:flex-none py-3 md:px-6 rounded-2xl md:rounded-xl transition-all duration-300 active:scale-95 ${
              activeTab === "saved" 
                ? "bg-primary/20 text-primary border border-primary/30 shadow-[0_0_20px_rgba(var(--primary),0.2)] translate-y-0" 
                : "text-gray-500 bg-transparent hover:text-white hover:bg-white/5 hover:-translate-y-1"
            }`}
          >
            <div className="relative">
              <Bookmark className={`w-5 h-5 md:w-4 md:h-4 transition-transform duration-300 ${activeTab === "saved" ? "scale-110 fill-primary/20" : "group-hover:scale-110"}`} />
              {/* App-style notification dot */}
              {savedToolIds.length > 0 && (
                <span className="absolute -top-1.5 -right-2 md:-top-2 md:-right-3 flex h-3.5 w-3.5 md:h-4 md:w-4 items-center justify-center rounded-full bg-primary text-[8px] md:text-[9px] text-white font-black shadow-lg">
                  {savedToolIds.length}
                </span>
              )}
            </div>
            <span className="font-black uppercase tracking-widest text-[10px] md:text-sm">Saved</span>
          </button>

        </div>
      </div>

      {/* TOOLS GRID */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-20 md:pb-32 space-y-12 md:space-y-20 relative z-10">
        {isLoading ? (
          <div className="text-center py-20 text-primary animate-pulse font-bold uppercase tracking-widest text-sm md:text-base">Syncing Database...</div>
        ) : (
          <>
            {/* FEATURED TOOLS (Only show on 'All Tools' tab if no search) */}
            {activeTab === "all" && featured.length > 0 && !search && (
              <section>
                <div className="flex items-center gap-3 mb-6 md:mb-10">
                  <div className="h-8 md:h-10 w-1 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Featured Tools</h2>
                </div>
                <ToolGrid 
                  tools={featured} 
                  isSearch={false} 
                  checkActive={isSponsorshipActive} 
                  onVisit={trackClick} 
                  savedIds={savedToolIds} 
                  onToggleSave={toggleSaveTool} 
                />
              </section>
            )}

            {/* MAIN RESULTS OR EMPTY STATE */}
            {visibleRest.length > 0 ? (
              <section>
                <div className="flex items-center gap-3 mb-6 md:mb-10">
                   <div className="h-8 md:h-10 w-1 bg-zinc-700 rounded-full" />
                   <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                     {activeTab === "saved" ? "Your Bookmarks" : activeTab === "free" ? "Free Tools" : search ? "Search Results" : "Explore Collection"}
                   </h2>
                </div>
                <ToolGrid 
                  tools={visibleRest} 
                  isSearch={!!search} 
                  checkActive={isSponsorshipActive} 
                  onVisit={trackClick}
                  savedIds={savedToolIds} 
                  onToggleSave={toggleSaveTool} 
                />
              </section>
            ) : (
              // EMPTY STATE FOR SAVED TAB
              activeTab === "saved" && (
                <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/5 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
                  <Bookmark className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">No tools saved yet</h3>
                  <p className="text-gray-500">Click the bookmark icon on any tool to save it for later.</p>
                  <Button onClick={() => setActiveTab("all")} className="mt-6 font-bold bg-primary text-white transition-transform hover:scale-105">Explore Tools</Button>
                </div>
              )
            )}

            {/* LOAD MORE BUTTON */}
            {rest.length > displayLimit && (
              <div className="flex justify-center pt-8 md:pt-12">
                <Button onClick={() => setDisplayLimit(p => p + 12)} size="lg" variant="outline" className="h-12 md:h-14 px-8 md:px-10 rounded-xl md:rounded-2xl bg-white/5 border-white/10 hover:bg-primary/20 hover:text-white transition-all duration-300 hover:-translate-y-1 text-sm md:text-base">
                  Load More Tools <ArrowRight className="ml-2 h-4 md:h-5 w-4 md:w-5" />
                </Button>
              </div>
            )}
            
            {/* GLOBAL SUPPORT SECTION */}
            <section className="pt-20 border-t border-white/5">
              <div className="max-w-3xl mx-auto p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 text-center backdrop-blur-sm">
                <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-6">
                  <Star className="w-6 h-6 fill-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight">
                  Help Us Keep <span className="text-primary">Toolsy</span> Alive
                </h2>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 max-w-xl mx-auto">
                  Toolsy is a global mission to map the AI universe. If our curated hub saved you time or money, consider fueling our next update. Your support helps us stay 100% independent and ad-free.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" className="rounded-2xl h-12 px-8 border-white/10 hover:bg-white/5 text-white font-bold" onClick={() => window.open('YOUR_PAYMENT_OR_COFFEE_LINK', '_blank')}>
                    ☕ Fuel the Mission
                  </Button>
                  <Button variant="ghost" className="rounded-2xl h-12 px-8 text-gray-500 hover:text-white" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    Back to Top
                  </Button>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

// 🔥 UPDATED ToolGrid PROPS TO INCLUDE SAVED STATE
function ToolGrid({ 
  tools, 
  isSearch, 
  checkActive, 
  onVisit, 
  savedIds, 
  onToggleSave 
}: { 
  tools: any[], 
  isSearch: boolean, 
  checkActive: any, 
  onVisit: (id: string, clicks: number) => void,
  savedIds: string[],
  onToggleSave: (id: string) => void
}) {
  return (
    <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tools.map((tool) => {
        const showSuggested = isSearch && checkActive(tool, 'suggested');
        const showFeaturedGlow = !isSearch && checkActive(tool, 'featured');
        // 🛠️ FIXED: Force tool.id to be a string
        const isSaved = savedIds.includes(String(tool.id));
        
        return (
          <div key={tool.id} className={`group relative bg-[#0F0F0F] border rounded-3xl md:rounded-[2rem] p-5 md:p-7 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full overflow-hidden ${(showSuggested || showFeaturedGlow) ? 'border-primary/40 shadow-[0_0_40px_-10px_rgba(var(--primary),0.2)]' : 'border-white/5 hover:border-primary/40'}`}>
            
            <div className={`absolute -top-24 -right-24 w-48 h-48 blur-[60px] transition-all ${(showSuggested || showFeaturedGlow) ? 'bg-primary/20' : 'bg-primary/5 group-hover:bg-primary/10'}`} />

            <div className="flex justify-between items-start mb-4 md:mb-6 z-10">
              <div className="text-4xl md:text-5xl p-3 md:p-4 bg-white/5 rounded-xl md:rounded-2xl border border-white/5 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
                {tool.icon || "⚡"}
              </div>
              
              <div className="flex flex-col items-end gap-2">
                {/* 🔥 BOOKMARK BUTTON */}
                <button 
                  onClick={() => onToggleSave(String(tool.id))}
                  className={`p-2.5 rounded-full border transition-all duration-300 active:scale-75 ${isSaved ? 'bg-primary/20 border-primary/50 text-primary shadow-[0_0_15px_rgba(var(--primary),0.3)]' : 'bg-white/5 border-white/10 text-gray-500 hover:text-white hover:bg-white/10 hover:rotate-12'}`}
                  title={isSaved ? "Remove from Saved" : "Save Tool"}
                >
                  {isSaved ? <BookmarkCheck className="w-4 h-4 scale-110" /> : <Bookmark className="w-4 h-4" />}
                </button>

                {tool.pricing && (
                  <Badge className="bg-white/10 text-gray-300 border-white/5 text-[9px] md:text-[10px] uppercase font-bold tracking-widest px-2.5 md:px-3 py-1 rounded-full mt-1">
                    {tool.pricing}
                  </Badge>
                )}

                {showSuggested && (
                  <Badge className="bg-primary text-white border-0 text-[9px] md:text-[10px] uppercase font-black tracking-widest px-2.5 md:px-3 py-1 rounded-full animate-pulse shadow-[0_0_15px_rgba(var(--primary),0.5)]">
                    Suggested
                  </Badge>
                )}
              </div>
            </div>
            
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 tracking-tight group-hover:text-primary transition-colors line-clamp-1 z-10">
              {tool.name}
            </h3>
            
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-6 md:mb-8 line-clamp-3 flex-grow group-hover:text-gray-400 z-10">
              {tool.description}
            </p>
            
            <div className="pt-4 md:pt-6 border-t border-white/5 mt-auto flex items-center justify-between z-10">
              <span className="text-[9px] md:text-[10px] font-black text-zinc-600 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-md">
                {tool.category}
              </span>
              <a 
                href={tool.link?.startsWith('http') ? tool.link : `https://${tool.link}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={() => onVisit(tool.id, tool.click_count || 0)} 
                className="flex items-center gap-1.5 md:gap-2 bg-white/5 hover:bg-primary text-white text-[10px] md:text-xs font-bold py-2 md:py-2.5 px-4 md:px-5 rounded-lg md:rounded-xl transition-all border border-white/10 hover:border-primary"
              >
                Visit <ArrowRight className="h-3 md:h-4 w-3 md:w-4" />
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Index;
