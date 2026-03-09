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
      <section className="relative pt-28 pb-12 px-6 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 text-xs font-medium text-primary uppercase tracking-widest">
            <Sparkles className="h-3 w-3" />
            <span>Premium AI Tools Directory</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-white leading-[1.1]">
            Toolsy: India's <span className="text-primary">Largest</span> AI Hub
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
            Discover the best AI tools to supercharge your workflow. curated daily for developers, designers, and creators.
          </p>
        </div>
      </section>

      {/* Search & Categories Section (FIXED SCROLLBAR) */}
      <section className="px-6 max-w-5xl mx-auto relative z-10 mb-20">
        <div className="p-2 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl">
          <div className="relative flex items-center pr-2">
            <Search className="absolute left-6 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search AI tools (e.g. 'coding', 'video', 'free')..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-16 h-16 bg-transparent border-0 text-white text-lg focus-visible:ring-0 placeholder:text-gray-600"
            />
            <select 
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="bg-zinc-800 text-white text-sm font-bold px-4 py-3 rounded-2xl outline-none border border-white/5 cursor-pointer"
            >
              <option value="All">All Prices</option>
              <option value="Free">Free</option>
              <option value="Freemium">Freemium</option>
              <option value="Premium">Paid</option>
            </select>
          </div>

          {/* Categories List - Clean and no scrollbar */}
          <div className="flex gap-2 overflow-x-auto p-4 no-scrollbar border-t border-white/5 mt-2">
            <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat === "All" ? null : cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all border ${
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
      <div className="max-w-7xl mx-auto px-6 pb-32 space-y-20 relative z-10">
        {isLoading ? (
          <div className="text-center py-20 text-primary animate-pulse font-bold uppercase tracking-widest">Syncing Database...</div>
        ) : (
          <>
            {featured.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-10">
                  <div className="h-10 w-1 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
                  <h2 className="text-3xl font-bold text-white tracking-tight">Featured Tools</h2>
                </div>
                <ToolGrid tools={featured} />
              </section>
            )}

            {suggested.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-10">
                   <div className="h-10 w-1 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
                   <h2 className="text-3xl font-bold text-white tracking-tight">Trending Now</h2>
                </div>
                <ToolGrid tools={suggested} />
              </section>
            )}

            {visibleRest.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-10">
                   <div className="h-10 w-1 bg-zinc-700 rounded-full" />
                   <h2 className="text-3xl font-bold text-white tracking-tight">Explore Collection</h2>
                </div>
                <ToolGrid tools={visibleRest} />
              </section>
            )}

            {rest.length > displayLimit && (
              <div className="flex justify-center pt-12">
                <Button onClick={() => setDisplayLimit(p => p + 12)} size="lg" variant="outline" className="h-14 px-10 rounded-2xl bg-white/5 border-white/10 hover:bg-primary/20 hover:text-white transition-all">
                  Load More Tools <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// --- 🔥 PRO TOOL CARD DESIGN (FIXED GLOW & BUTTONS) 🔥 ---

function ToolGrid({ tools }: { tools: any[] }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tools.map((tool) => (
        <div key={tool.id} className="group relative bg-[#0F0F0F] border border-white/5 rounded-[2rem] p-7 transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_40px_-10px_rgba(var(--primary),0.2)] hover:-translate-y-2 flex flex-col h-full overflow-hidden">
          
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 blur-[60px] group-hover:bg-primary/10 transition-all" />

          <div className="flex justify-between items-start mb-6">
            <div className="text-5xl p-4 bg-white/5 rounded-2xl border border-white/5 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
              {tool.icon || "⚡"}
            </div>
            {tool.pricing && (
              <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">
                {tool.pricing}
              </Badge>
            )}
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-primary transition-colors line-clamp-1">
            {tool.name}
          </h3>
          
          <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3 flex-grow group-hover:text-gray-400">
            {tool.description}
          </p>
          
          <div className="pt-6 border-t border-white/5 mt-auto flex items-center justify-between">
            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-md">
              {tool.category}
            </span>
            <a 
              href={tool.link?.startsWith('http') ? tool.link : `https://${tool.link}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 bg-white/5 hover:bg-primary text-white text-xs font-bold py-2.5 px-5 rounded-xl transition-all border border-white/10 hover:border-primary"
            >
              Visit <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Index;
