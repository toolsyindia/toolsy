import Head from "next/head";
import Link from "next/link";
import { Sparkles, Zap, Search, CheckCircle2, Heart } from "lucide-react";

export default function Advertise() {
  return (
    <>
      <Head>
        <title>Advertise on Toolsy | Get Featured on India's Largest AI Hub</title>
        <meta name="description" content="Reach thousands of Indian developers and creators. Get your AI tool featured on Toolsy." />
      </Head>
      <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8 text-xs font-bold text-primary uppercase tracking-widest animate-pulse">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Grow Your AI Tool</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-6 text-white leading-tight">
            Get Featured on India&apos;s <span className="text-primary">Largest</span> AI Hub
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Reach thousands of Indian developers and creators. Stop waiting for SEO and start getting direct clicks today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
          {/* Suggested Search Slot */}
          <div className="group relative bg-[#0F0F0F] border border-white/5 rounded-[2rem] p-8 transition-all hover:border-primary/40 hover:shadow-[0_0_40px_-10px_rgba(var(--primary),0.2)]">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-all" />
            <div className="mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 border border-primary/20 text-primary">
                <Search className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Suggested Search</h2>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-black text-white">₹99</span>
                <span className="text-gray-500 font-bold">/week</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Appear at the very top with a pulsing badge whenever a user searches for keywords matching your tool.
              </p>
              <ul className="space-y-3 mb-8">
                {["Keyword Targeting", "Priority Search Ranking", 'Pulsing "Suggested" Badge', "Instant Activation"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs font-bold text-gray-400">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/contact" className="flex items-center justify-center w-full h-12 rounded-xl bg-white/5 hover:bg-primary text-white border border-white/10 font-bold transition-all">
              Book This Spot
            </Link>
          </div>

          {/* Featured Homepage Slot */}
          <div className="group relative bg-[#0F0F0F] border border-primary/40 rounded-[2rem] p-8 shadow-[0_0_40px_-10px_rgba(var(--primary),0.3)] transition-all">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/20 blur-3xl" />
            <div className="mb-6">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(var(--primary),0.5)] text-white">
                <Zap className="w-6 h-6 fill-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Featured Top 4</h2>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-black text-white">₹300</span>
                <span className="text-gray-500 font-bold">/week</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Get the ultimate visibility with a permanent spot in the Top 4 &quot;Featured&quot; row on our homepage.
              </p>
              <ul className="space-y-3 mb-8">
                {["Highest Visibility", "Homepage Premium Slot", "Premium Glow Effect", "24/7 Placement"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs font-bold text-gray-400">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/contact" className="flex items-center justify-center w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-black shadow-lg shadow-primary/25 transition-all">
              Book This Spot
            </Link>
          </div>
        </div>

        <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
          <Heart className="w-8 h-8 text-primary fill-primary mx-auto mb-4 animate-bounce" />
          <h3 className="text-xl font-bold text-white mb-2">Student-Run & Developer-Focused</h3>
          <p className="text-gray-500 text-sm">
            Every rupee earned goes toward server costs and supporting my family. We only partner with high-quality tools to keep Toolsy a trusted hub.
          </p>
        </div>
      </div>
    </>
  );
}