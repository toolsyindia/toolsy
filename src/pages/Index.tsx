import { useState, useMemo } from "react";
import { useTools } from "@/hooks/useTools";
import { Input } from "@/components/ui/input";
import { 
  Search, Sparkles, Lightbulb, ArrowRight, Star, Zap, ExternalLink 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const { data: tools, isLoading } = useTools();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [priceFilter, setPriceFilter] = useState("All");
  const [displayLimit, setDisplayLimit] = useState(12);

  // --- 🏷️ CATEGORY LOGIC (KEPT EXACTLY THE SAME) ---
  const categories = useMemo(() => {
    if (!tools) return [];
    return ["All", ...new Set(tools.map((t) => t.category))].sort();
  }, [tools]);

  const filtered = useMemo(() => {
    if (!tools) return [];
    let result = tools;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }
    if (activeCategory && activeCategory !== "All") {
      result = result.filter((t) => t.category === activeCategory);
    }
    if (priceFilter !== "All") {
      result = result.filter((t) => t.pricing && t.pricing.toLowerCase() === priceFilter.toLowerCase());
    }
    return result; 
  }, [tools, search, activeCategory, priceFilter]);

  const featured = filtered.filter((t) => t.featured === true || String(t.featured) === "true");
  const suggested = filtered.filter((t) => (t.suggested === true || String(t.suggested) === "true") && !featured.includes(t));
  const rest = filtered.filter((t) => !featured.includes(t) && !suggested.includes(t));
  const visibleRest = rest.slice(0, displayLimit);

  return (
    <div className="min-h-screen bg-[#050505] text-foreground">
      {/* Hero Section */}
      {/* SPACING FIX: Tighter padding on mobile (pt-6, pb-4), but kept your original PC padding */}
      <section className="relative pt-12 md:pt-28 pb-4 md:pb-12 px-6 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] md:h-[500px] bg-primary/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto">
          
          {/* MODIFIED: Added "hidden md:inline-flex" to remove this badge on mobile only */}
          <div className="hidden md:inline-flex items-center gap-2 px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-white/5 border border-white/10 mb-4 md:mb-8 text-[10px] md:text-xs font-medium text-primary uppercase tracking-widest">
            <Sparkles className="h-3 w-3" />
            <span>Premium AI Tools Directory</span>
          </div>
          
          {/* RESTORED: Your original text-4xl on mobile, text-7xl on PC */}
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-4 md:mb-6 text-white leading-[1.1]">
            Toolsy: India's <span className="text-primary">Largest</span> AI Hub
          </h1>
          
          {/* RESTORED: Your original text size and layout for the paragraph */}
          <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto mb-6 md:mb-12">
            Discover the best AI tools to supercharge your workflow. curated daily for developers, designers, and creators.
          </p>
        </div>
      </section>

      {/* Search & Categories Section */}
      {/* SPACING FIX: Removed negative margin, kept tight on mobile (mb-6) */}
      <section className="px-4 md:px-6 max-w-5xl mx-auto relative z-10 mb-6 md:mb-20">
        <div className="p-1.5 md:p-2 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl">
          <div className="relative flex items-center pr-2">
            <Search className="absolute left-4 md:left-6 h-4 md:h-5 w-4 md:w-5 text-muted-foreground" />
            {/* RESTORED: Your original text-base on mobile */}
            <Input
              placeholder="Search AI tools (e.g. 'coding', 'video', 'free')..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 md:pl-16 h-12 md:h-16 bg-transparent border-0 text-white text-base md:text-lg focus-visible:ring-0 placeholder:text-gray-600"
            />
            {/* RESTORED: Your original text-xs on mobile */}
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

          {/* Categories List */}
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

      {/* Grid Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-20 md:pb-32 space-y-12 md:space-y-20 relative z-10">
        {isLoading ? (
          <div className="text-center py-20 text-primary animate-pulse font-bold uppercase tracking-widest text-sm md:text-base">Syncing Database...</div>
        ) : (
          <>
            {featured.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6 md:mb-10">
                  <div className="h-8 md:h-10 w-1 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
                  {/* RESTORED: Your original text-2xl on mobile */}
                  <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Featured Tools</h2>
                </div>
                <ToolGrid tools={featured} />
              </section>
            )}

            {suggested.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6 md:mb-10">
                   <div className="h-8 md:h-10 w-1 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
                   <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Trending Now</h2>
                </div>
                <ToolGrid tools={suggested} />
              </section>
            )}

            {visibleRest.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6 md:mb-10">
                   <div className="h-8 md:h-10 w-1 bg-zinc-700 rounded-full" />
                   <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Explore Collection</h2>
                </div>
                <ToolGrid tools={visibleRest} />
              </section>
            )}

            {rest.length > displayLimit && (
              <div className="flex justify-center pt-8 md:pt-12">
                {/* RESTORED: Your original button size on mobile */}
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

// --- 🔥 PRO TOOL CARD DESIGN 🔥 ---

function ToolGrid({ tools }: { tools: any[] }) {
  return (
    <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tools.map((tool) => (
        <div key={tool.id} className="group relative bg-[#0F0F0F] border border-white/5 rounded-3xl md:rounded-[2rem] p-5 md:p-7 transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_40px_-10px_rgba(var(--primary),0.2)] hover:-translate-y-2 flex flex-col h-full overflow-hidden">
          
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 blur-[60px] group-hover:bg-primary/10 transition-all" />

          <div className="flex justify-between items-start mb-4 md:mb-6">
            {/* RESTORED: Your original icon sizing */}
            <div className="text-4xl md:text-5xl p-3 md:p-4 bg-white/5 rounded-xl md:rounded-2xl border border-white/5 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
              {tool.icon || "⚡"}
            </div>
            {tool.pricing && (
              <Badge className="bg-primary/10 text-primary border-primary/20 text-[9px] md:text-[10px] uppercase font-bold tracking-widest px-2.5 md:px-3 py-1 rounded-full">
                {tool.pricing}
              </Badge>
            )}
          </div>
          
          {/* RESTORED: Your original text-xl on mobile */}
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 tracking-tight group-hover:text-primary transition-colors line-clamp-1">
            {tool.name}
          </h3>
          
          {/* RESTORED: Your original text-xs on mobile */}
          <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-6 md:mb-8 line-clamp-3 flex-grow group-hover:text-gray-400">
            {tool.description}
          </p>
          
          <div className="pt-4 md:pt-6 border-t border-white/5 mt-auto flex items-center justify-between">
            {/* RESTORED: Your original text size for the category badge */}
            <span className="text-[9px] md:text-[10px] font-black text-zinc-600 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-md">
              {tool.category}
            </span>
            <a 
              href={tool.link?.startsWith('http') ? tool.link : `https://${tool.link}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 md:gap-2 bg-white/5 hover:bg-primary text-white text-[10px] md:text-xs font-bold py-2 md:py-2.5 px-4 md:px-5 rounded-lg md:rounded-xl transition-all border border-white/10 hover:border-primary"
            >
              Visit <ArrowRight className="h-3 md:h-4 w-3 md:w-4" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Index;

