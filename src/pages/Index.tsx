import { useState, useMemo } from "react";
import { useTools } from "@/hooks/useTools";
import { Input } from "@/components/ui/input";
import { Search, Sparkles, Lightbulb, ArrowRight, Star, Zap, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { data: tools, isLoading, error } = useTools();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // SPEED HACK: Only show 12 tools at first on mobile
  const [displayLimit, setDisplayLimit] = useState(12);

  const categories = useMemo(() => {
    if (!tools) return [];
    return [...new Set(tools.map((t) => t.category))].sort();
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
    if (activeCategory) {
      result = result.filter((t) => t.category === activeCategory);
    }

    // SPEED HACK: Slice the result so the phone doesn't render 100 cards at once
    return result.slice(0, displayLimit); 
  }, [tools, search, activeCategory, displayLimit]);

  const featured = filtered.filter((t) => t.featured);
  const suggested = filtered.filter((t) => t.suggested);
  const rest = filtered.filter((t) => !t.featured && !t.suggested);

  return (
    <div className="min-h-screen bg-background bg-mesh">
      {/* Hero */}
      <section className="relative pt-20 pb-12 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[60px] md:blur-[120px] opacity-50" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6 text-sm text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Premium AI Tools Directory</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-display tracking-tight mb-4">
            <span className="gradient-text">Toolsy</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
            Discover the best AI tools in one place
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="px-6 pb-8 max-w-2xl mx-auto relative z-10">
        <div className="relative group">
          <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 opacity-0 group-focus-within:opacity-100 blur-sm transition-opacity duration-500" />
          <div className="relative glass-strong rounded-2xl overflow-hidden">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              placeholder="Search AI tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-14 bg-transparent border-0 text-base focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="px-6 pb-10 max-w-6xl mx-auto relative z-10">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeCategory === null
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "glass text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "glass text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>
      )}

      <div className="max-w-6xl mx-auto px-6 pb-20 relative z-10">
        {isLoading && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass rounded-2xl p-6 animate-pulse h-[280px]">
                <div className="w-14 h-14 bg-secondary rounded-xl mb-4" />
                <div className="h-5 bg-secondary rounded w-1/2 mb-3" />
                <div className="h-4 bg-secondary rounded w-full mb-2" />
                <div className="h-4 bg-secondary rounded w-2/3" />
              </div>
            ))}
          </div>
        )}
        {/* --- ADD THIS BUTTON FOR MOBILE USERS --- */}
        {tools && tools.length > displayLimit && (
          <div className="flex justify-center pb-12">
            <Button 
              onClick={() => setDisplayLimit(prev => prev + 12)}
              variant="outline"
              className="glass-strong px-8 h-12 rounded-xl hover:scale-105 transition-all font-semibold"
            >
              Show More AI Tools
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
        {error && <p className="text-destructive text-center">Error: {error.message}</p>}

        {/* Featured */}
        {featured.length > 0 && (
          <section className="mb-14 animate-fade-in">
            <SectionTitle icon={<Star className="h-5 w-5 text-yellow-400" />} title="Featured Tools" />
            <ToolGrid tools={featured} />
          </section>
        )}

        {/* Suggested */}
        {suggested.length > 0 && (
          <section className="mb-14 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <SectionTitle icon={<Lightbulb className="h-5 w-5 text-primary" />} title="Suggested Tools" />
            <ToolGrid tools={suggested} />
          </section>
        )}

        {/* All Tools */}
        {rest.length > 0 && (
          <section className="mb-14 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <SectionTitle icon={<Zap className="h-5 w-5 text-muted-foreground" />} title="All Tools" />
            <ToolGrid tools={rest} />
          </section>
        )}

        {tools && filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No tools found.</p>
            <p className="text-muted-foreground/60 text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>


      <footer className="border-t border-border/50 py-8 px-6 text-center">
        <p className="text-sm text-muted-foreground/60">© 2026 Toolsy. All rights reserved.</p>
      </footer>
    </div>
  );
};

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-6">
      {icon}
      <h2 className="text-xl font-semibold font-display">{title}</h2>
    </div>
  );
}

function PricingBadge({ pricing }: { pricing: string }) {
  if (pricing === "Free") {
    return (
      <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
        {pricing}
      </span>
    );
  }
  if (pricing === "Premium") {
    return (
      <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-lg bg-gradient-to-r from-yellow-500/15 to-amber-500/15 text-amber-400 border border-amber-500/25">
        {pricing}
      </span>
    );
  }
  // Freemium
  return (
    <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-lg bg-gradient-to-r from-purple-500/15 to-fuchsia-500/15 text-purple-400 border border-purple-500/25">
      {pricing}
    </span>
  );
}

function ToolGrid({ tools }: { tools: any[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool: any, i: number) => (
        <div
          key={tool.id}
          className="group relative flex flex-col rounded-2xl opacity-0 animate-fade-in"
          style={{ animationDelay: `${i * 0.05}s` }}
        >
          {/* Glow border */}
          <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-primary/20 via-border/40 to-accent/20 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />

          {/* Card body */}
          <div className="relative flex flex-col flex-1 rounded-2xl bg-card/70 backdrop-blur-xl p-6 group-hover:-translate-y-1 transition-transform duration-400 ease-out">
            {/* Tags */}
            {(tool.featured || tool.suggested) && (
              <div className="absolute top-4 right-4 flex gap-1.5">
                {tool.featured && (
                  <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
                    <Star className="h-2.5 w-2.5 fill-yellow-400" /> Featured
                  </span>
                )}
                {tool.suggested && (
                  <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    <Lightbulb className="h-2.5 w-2.5" /> Suggested
                  </span>
                )}
              </div>
            )}

            {/* Icon */}
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-secondary/80 border border-border/50 text-3xl mb-4 group-hover:scale-105 transition-transform duration-300">
              {tool.icon || "🔧"}
            </div>

            {/* Name */}
            <h3 className="text-lg font-bold font-display mb-1.5 group-hover:text-primary transition-colors duration-300 pr-20">
              {tool.name}
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
              {tool.description}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-secondary text-secondary-foreground">
                {tool.category}
              </span>
              <PricingBadge pricing={tool.pricing} />
            </div>

            {/* Visit Button */}
            <a
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full h-11 rounded-xl text-sm font-semibold bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-md shadow-primary/15 group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300"
            >
              Visit Tool
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Index;
