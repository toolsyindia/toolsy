import { useState, useMemo, useRef, useEffect } from "react";
import { useTools } from "@/hooks/useTools";
import { Input } from "@/components/ui/input";
import { 
  Search, Sparkles, Lightbulb, ArrowRight, Star, Zap, 
  ExternalLink, MessageSquare, Send, X 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { data: tools, isLoading, error } = useTools();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);


  const [priceFilter, setPriceFilter] = useState("All");

  
  const [displayLimit, setDisplayLimit] = useState(12);

  // --- 🧠 AI Chat State ---
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hey! I'm Toolsy AI. Need help finding a specific tool?" }
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleAiChat = async () => {
    if (!aiInput.trim() || chatLoading) return;
    
    const userMsg = { role: 'user', content: aiInput };
    setMessages(prev => [...prev, userMsg]);
    setAiInput("");
    setChatLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: aiInput }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Error connecting to my brain. Try again later!" }]);
    } finally {
      setChatLoading(false);
    }
  };

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
    <div className="min-h-screen bg-background bg-mesh">
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[60px] md:blur-[120px] opacity-50" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6 text-sm text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Premium AI Tools Directory</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-display tracking-tight mb-4 text-white">
            <span className="gradient-text">Toolsy: India's Largest AI Tools Hub</span>
          </h1>



        </div>
      </section>

      {/* Search Section */}
      <section className="px-6 pb-8 max-w-3xl mx-auto relative z-10">
        <div className="relative glass-strong rounded-2xl overflow-hidden flex items-center pr-3 border border-white/10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search AI tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 h-14 bg-transparent border-0 text-white focus-visible:ring-0"
          />
          <select 
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="bg-secondary text-xs font-bold px-3 py-2 rounded-lg outline-none text-white border border-white/10"
          >
            <option value="All">All Prices</option>
            <option value="Free">Free</option>
            <option value="Freemium">Freemium</option>
            <option value="Premium">Premium</option>
          </select>
        </div>
      </section>

      {/* Grid Content */}
      <div className="max-w-6xl mx-auto px-6 pb-20 relative z-10">



        {featured.length > 0 && (
          <section className="mb-14">
            <SectionTitle icon={<Star className="h-5 w-5 text-yellow-400" />} title="Featured AI Tools" />
            <ToolGrid tools={featured} />
          </section>
        )}




        {suggested.length > 0 && (
          <section className="mb-14">
            <SectionTitle icon={<Lightbulb className="h-5 w-5 text-primary" />} title="Suggested AI Resources" />
            <ToolGrid tools={suggested} />
          </section>
        )}




        {visibleRest.length > 0 && (
          <section className="mb-14">
            <SectionTitle icon={<Zap className="h-5 w-5 text-muted-foreground" />} title="Explore All Tools" />
            <ToolGrid tools={visibleRest} />
          </section>
        )}

        {rest.length > displayLimit && (
          <div className="flex justify-center pt-8">
            <Button onClick={() => setDisplayLimit(p => p + 12)} variant="outline" className="glass-strong">
              Show More AI Tools <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* AI Chat Button & Window */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {isAiOpen && (
          <div className="mb-4 w-80 md:w-96 glass-strong rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-primary/20 bg-black">
            <div className="p-4 bg-primary/10 border-b border-primary/20 flex justify-between items-center text-white">
              <div className="flex items-center gap-2 font-bold text-sm">
                <Sparkles className="h-4 w-4 text-primary" /> Toolsy AI
              </div>
              <button onClick={() => setIsAiOpen(false)}><X className="h-4 w-4" /></button>
            </div>
            <div className="h-80 overflow-y-auto p-4 space-y-4 text-sm text-white">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 rounded-xl ${msg.role === 'user' ? 'bg-primary' : 'bg-zinc-800'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <div className="p-3 border-t border-white/10 flex gap-2">
              <Input 
                value={aiInput} 
                onChange={(e) => setAiInput(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && handleAiChat()}
                placeholder="Ask Toolsy..." 
                className="bg-transparent text-white"
              />
              <Button onClick={handleAiChat} disabled={chatLoading} size="icon"><Send className="h-4 w-4" /></Button>
            </div>
          </div>
        )}
        <Button onClick={() => setIsAiOpen(!isAiOpen)} className="rounded-full w-14 h-14 shadow-xl">
          {isAiOpen ? <X /> : <MessageSquare />}
        </Button>
      </div>



    </div>
  );
};

// --- HELPER COMPONENTS ---
function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-6 text-white">
      {icon} <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );
}




function ToolGrid({ tools }: { tools: any[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => (
        <div key={tool.id} className="p-6 rounded-2xl bg-zinc-900 border border-white/5 text-white">
          <div className="text-3xl mb-4">{tool.icon || "🔧"}</div>
          <h3 className="text-lg font-bold mb-2">{tool.name}</h3>
          <p className="text-sm text-gray-400 mb-4">{tool.description}</p>
          <a href={tool.link} target="_blank" className="text-primary flex items-center gap-2 text-sm">
            Visit Tool <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      ))}
    </div>
  );
}

export default Index; // THIS WAS THE MISSING LINE
