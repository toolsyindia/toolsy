import { useState, useMemo } from "react";
import { useTools } from "@/hooks/useTools";
import { Input } from "@/components/ui/input";
import { 
  Search, Sparkles, Lightbulb, ArrowRight, Star, Zap, ExternalLink 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client"; // 🔥 IMPORTED SUPABASE FOR TRACKING

const Index = () => {
  const { data: tools, isLoading } = useTools();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [priceFilter, setPriceFilter] = useState("All");
  const [displayLimit, setDisplayLimit] = useState(12);

  const categories = useMemo(() => {
    if (!tools) return [];
    return ["All", ...new Set(tools.map((t) => t.category))].sort();
  }, [tools]);

  // 🔥 NEW FEATURE: CLICK TRACKING LOGIC
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

  // 🔥 PRESERVED: Expiry Logic
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

    if (activeCategory && activeCategory !== "All") {
      result = result.filter((t) => t.category === activeCategory);
    }
    if (priceFilter !== "All") {
      result = result.filter((t) => t.pricing && t.pricing.toLowerCase() === priceFilter.toLowerCase());
    }
    
    return result; 
  }, [tools, search, activeCategory, priceFilter]);



  const featured = filtered.filter((t) => isSponsorshipActive(t, 'featured'));



  const rest = filtered.filter((t) => !featured.includes(t));
  const visibleRest = rest.slice(0, displayLimit);

  return (
    <div className="min-h-screen bg-[#050505] text-foreground">


      <section className="relative pt-24 md:pt-28 pb-4 md:pb-12 px-6 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] md:h-[500px] bg-primary/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto">


          <div className="hidden md:inline-flex items-center gap-2 px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-white/5 border border-white/10 mb-4 md:mb-8 text-[10px] md:text-xs font-medium text-primary uppercase tracking-widest">
            <Sparkles className="h-3 w-3" />
            <span>Premium AI Tools Directory</span>
          </div>


          <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-4 md:mb-6 text-white leading-[1.1]">
            Toolsy: India's <span className="text-primary">Largest</span> AI Hub
          </h1>


          <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto mb-6 md:mb-12">
            Discover the best AI tools to supercharge your workflow. curated daily for developers, designers, and creators.
          </p>
        </div>
      </section>



      <section className="px-4 md:px-6 max-w-5xl mx-auto relative z-10 mb-6 md:mb-20">
        <div className="p-1.5 md:p-2 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl">
          <div className="relative flex items-center pr-2">
            <Search className="absolute left-4 md:left-6 h-4 md:h-5 w-4 md:w-5 text-muted-foreground" />
            <Input


              placeholder="Search AI tools (e.g. 'coding', 'video', 'free')..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 md:pl-16 h-12 md:h-16 bg-transparent border-0 text-white text-base md:text-lg focus-visible:ring-0 placeholder:text-gray-600"
            />


            <select 
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="bg-zinc-800 text-white text-xs md:text-sm font-bold px-3 md:px-4 py-2 md:py-3 rounded-xl md:rounded-2xl outline-none border border-white/5 cursor-pointer"
            >
              <option value="All">All Prices</option>
              <option value="Free">Free</option>
              <option value="Freemium">Freemium</option>
              <option value="Premium">Paid</option>
            </select>
          </div>



          <div className="flex gap-2 overflow-x-auto p-2 md:p-4 no-scrollbar border-t border-white/5 mt-1 md:mt-2">
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



      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-20 md:pb-32 space-y-12 md:space-y-20 relative z-10">
        {isLoading ? (
          <div className="text-center py-20 text-primary animate-pulse font-bold uppercase tracking-widest text-sm md:text-base">Syncing Database...</div>
        ) : (
          <>


            {featured.length > 0 && !search && (
              <section>
                <div className="flex items-center gap-3 mb-6 md:mb-10">
                  <div className="h-8 md:h-10 w-1 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Featured Tools</h2>
                </div>
                {/* 🔥 Added onVisit handler */}
                <ToolGrid tools={featured} isSearch={false} checkActive={isSponsorshipActive} onVisit={trackClick} />
              </section>
            )}



            {visibleRest.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6 md:mb-10">
                   <div className="h-8 md:h-10 w-1 bg-zinc-700 rounded-full" />
                   <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                     {search ? "Search Results" : "Explore Collection"}
                   </h2>
                </div>
                {/* 🔥 Added onVisit handler */}
                <ToolGrid tools={visibleRest} isSearch={!!search} checkActive={isSponsorshipActive} onVisit={trackClick} />
              </section>
            )}

            {rest.length > displayLimit && (
              <div className="flex justify-center pt-8 md:pt-12">



                <Button onClick={() => setDisplayLimit(p => p + 12)} size="lg" variant="outline" className="h-12 md:h-14 px-8 md:px-10 rounded-xl md:rounded-2xl bg-white/5 border-white/10 hover:bg-primary/20 hover:text-white transition-all text-sm md:text-base">
                  Load More Tools <ArrowRight className="ml-2 h-4 md:h-5 w-4 md:w-5" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// 🔥 UPDATED ToolGrid PROPS
function ToolGrid({ tools, isSearch, checkActive, onVisit }: { tools: any[], isSearch: boolean, checkActive: any, onVisit: (id: string, clicks: number) => void }) {
  return (
    <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tools.map((tool) => {
        const showSuggested = isSearch && checkActive(tool, 'suggested');
        const showFeaturedGlow = !isSearch && checkActive(tool, 'featured');
        
        return (
          <div key={tool.id} className={`group relative bg-[#0F0F0F] border rounded-3xl md:rounded-[2rem] p-5 md:p-7 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full overflow-hidden ${(showSuggested || showFeaturedGlow) ? 'border-primary/40 shadow-[0_0_40px_-10px_rgba(var(--primary),0.2)]' : 'border-white/5 hover:border-primary/40'}`}>
            
            <div className={`absolute -top-24 -right-24 w-48 h-48 blur-[60px] transition-all ${(showSuggested || showFeaturedGlow) ? 'bg-primary/20' : 'bg-primary/5 group-hover:bg-primary/10'}`} />

            <div className="flex justify-between items-start mb-4 md:mb-6">
              <div className="text-4xl md:text-5xl p-3 md:p-4 bg-white/5 rounded-xl md:rounded-2xl border border-white/5 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
                {tool.icon || "⚡"}
              </div>
              <div className="flex flex-col items-end gap-2">
                {tool.pricing && (
                  <Badge className="bg-white/10 text-gray-300 border-white/5 text-[9px] md:text-[10px] uppercase font-bold tracking-widest px-2.5 md:px-3 py-1 rounded-full">
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
            
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 tracking-tight group-hover:text-primary transition-colors line-clamp-1">
              {tool.name}
            </h3>
            
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-6 md:mb-8 line-clamp-3 flex-grow group-hover:text-gray-400">
              {tool.description}
            </p>
            
            <div className="pt-4 md:pt-6 border-t border-white/5 mt-auto flex items-center justify-between">
              <span className="text-[9px] md:text-[10px] font-black text-zinc-600 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-md">
                {tool.category}
              </span>
              <a 
                href={tool.link?.startsWith('http') ? tool.link : `https://${tool.link}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={() => onVisit(tool.id, tool.click_count || 0)} // 🔥 TRACKS THE CLICK ON CLICK
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

