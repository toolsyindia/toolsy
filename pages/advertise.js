import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Sparkles, Zap, Search, CheckCircle2, Heart } from "lucide-react";

export default function Advertise() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(null);

  return (
    <>
      <Head>
        <title>Advertise on Toolsy | Get Featured on India's Largest AI Hub</title>
        <meta name="description" content="Reach thousands of Indian developers and creators. Get your AI tool featured on Toolsy." />
      </Head>
      
      <div style={{ minHeight: "100vh", backgroundColor: "#050505", color: "white", padding: "8rem 1.5rem 5rem", boxSizing: "border-box", fontFamily: "'Inter', sans-serif" }}>
        
        {/* HERO SECTION */}
        <div style={{ maxWidth: "64rem", margin: "0 auto", textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.375rem 1rem", borderRadius: "9999px", backgroundColor: "rgba(139, 92, 246, 0.1)", border: "1px solid rgba(139, 92, 246, 0.2)", marginBottom: "2rem", fontSize: "0.75rem", fontWeight: 700, color: "#8b5cf6", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            <Sparkles size={14} />
            <span>Grow Your AI Tool</span>
          </div>
          
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 900, letterSpacing: "-0.04em", marginBottom: "1.5rem", color: "white", lineHeight: 1.1 }}>
            Get Featured on India&apos;s <span style={{ color: "#8b5cf6" }}>Largest</span> AI Hub
          </h1>
          
          <p style={{ color: "#9ca3af", fontSize: "clamp(1rem, 2vw, 1.125rem)", maxWidth: "42rem", margin: "0 auto", lineHeight: 1.6 }}>
            Reach thousands of Indian developers and creators. Stop waiting for SEO and start getting direct clicks today.
          </p>
        </div>

        {/* PRICING GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", maxWidth: "56rem", margin: "0 auto 5rem" }}>
          
          {/* Suggested Search Slot */}
          <div 
            onMouseOver={() => setHoveredCard('suggested')}
            onMouseOut={() => setHoveredCard(null)}
            style={{ position: "relative", backgroundColor: "#0F0F0F", border: `1px solid ${hoveredCard === 'suggested' ? "rgba(139, 92, 246, 0.4)" : "rgba(255,255,255,0.05)"}`, borderRadius: "2rem", padding: "2rem", boxSizing: "border-box", overflow: "hidden", transition: "all 0.3s", transform: hoveredCard === 'suggested' ? "translateY(-5px)" : "translateY(0)" }}
          >
            <div style={{ position: "absolute", top: "-3rem", right: "-3rem", width: "8rem", height: "8rem", backgroundColor: `rgba(139, 92, 246, ${hoveredCard === 'suggested' ? "0.1" : "0.05"})`, filter: "blur(40px)", borderRadius: "50%", transition: "all 0.3s" }} />
            
            <div style={{ marginBottom: "1.5rem", position: "relative", zIndex: 1 }}>
              <div style={{ width: "3rem", height: "3rem", backgroundColor: "rgba(139, 92, 246, 0.1)", borderRadius: "1rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem", border: "1px solid rgba(139, 92, 246, 0.2)", color: "#8b5cf6" }}>
                <Search size={24} />
              </div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "white", marginBottom: "0.5rem" }}>Suggested Search</h2>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginBottom: "1rem" }}>
                <span style={{ fontSize: "2.5rem", fontWeight: 900, color: "white" }}>₹99</span>
                <span style={{ color: "#6b7280", fontWeight: 700 }}>/week</span>
              </div>
              <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                Appear at the very top with a pulsing badge whenever a user searches for keywords matching your tool.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {["Keyword Targeting", "Priority Search Ranking", 'Pulsing "Suggested" Badge', "Instant Activation"].map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", fontWeight: 700, color: "#9ca3af" }}>
                    <CheckCircle2 size={16} color="#8b5cf6" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <Link 
              href="/contact" 
              onMouseOver={() => setHoveredBtn('suggested')}
              onMouseOut={() => setHoveredBtn(null)}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "3rem", borderRadius: "0.75rem", backgroundColor: hoveredBtn === 'suggested' ? "#8b5cf6" : "rgba(255,255,255,0.05)", color: "white", border: hoveredBtn === 'suggested' ? "1px solid #8b5cf6" : "1px solid rgba(255,255,255,0.1)", fontWeight: 700, textDecoration: "none", transition: "all 0.2s", position: "relative", zIndex: 1, boxSizing: "border-box" }}
            >
              Book This Spot
            </Link>
          </div>

          {/* Featured Homepage Slot */}
          <div 
            onMouseOver={() => setHoveredCard('featured')}
            onMouseOut={() => setHoveredCard(null)}
            style={{ position: "relative", backgroundColor: "#0F0F0F", border: "1px solid rgba(139, 92, 246, 0.4)", borderRadius: "2rem", padding: "2rem", boxShadow: "0 0 40px -10px rgba(139, 92, 246, 0.3)", boxSizing: "border-box", overflow: "hidden", transition: "all 0.3s", transform: hoveredCard === 'featured' ? "translateY(-5px)" : "translateY(0)" }}
          >
            <div style={{ position: "absolute", top: "-3rem", right: "-3rem", width: "8rem", height: "8rem", backgroundColor: "rgba(139, 92, 246, 0.2)", filter: "blur(40px)", borderRadius: "50%" }} />
            
            <div style={{ marginBottom: "1.5rem", position: "relative", zIndex: 1 }}>
              <div style={{ width: "3rem", height: "3rem", backgroundColor: "#8b5cf6", borderRadius: "1rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem", boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)", color: "white" }}>
                <Zap size={24} fill="white" />
              </div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "white", marginBottom: "0.5rem" }}>Featured Top 4</h2>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginBottom: "1rem" }}>
                <span style={{ fontSize: "2.5rem", fontWeight: 900, color: "white" }}>₹300</span>
                <span style={{ color: "#6b7280", fontWeight: 700 }}>/week</span>
              </div>
              <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                Get the ultimate visibility with a permanent spot in the Top 4 &quot;Featured&quot; row on our homepage.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {["Highest Visibility", "Homepage Premium Slot", "Premium Glow Effect", "24/7 Placement"].map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", fontWeight: 700, color: "#9ca3af" }}>
                    <CheckCircle2 size={16} color="#8b5cf6" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <Link 
              href="/contact" 
              onMouseOver={() => setHoveredBtn('featured')}
              onMouseOut={() => setHoveredBtn(null)}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "3rem", borderRadius: "0.75rem", backgroundColor: hoveredBtn === 'featured' ? "#7c3aed" : "#8b5cf6", color: "white", fontWeight: 900, textDecoration: "none", boxShadow: "0 10px 15px -3px rgba(139, 92, 246, 0.25)", transition: "all 0.2s", position: "relative", zIndex: 1, boxSizing: "border-box" }}
            >
              Book This Spot
            </Link>
          </div>
          
        </div>

        {/* FOOTER BANNER */}
        <div style={{ maxWidth: "42rem", margin: "0 auto", backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "1.5rem", padding: "2rem", textAlign: "center", boxSizing: "border-box" }}>
          <Heart size={32} color="#8b5cf6" fill="#8b5cf6" style={{ margin: "0 auto 1rem" }} />
          <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "white", marginBottom: "0.5rem" }}>Student-Run & Developer-Focused</h3>
          <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: 1.6 }}>
            Every rupee earned goes toward server costs and supporting my family. We only partner with high-quality tools to keep Toolsy a trusted hub.
          </p>
        </div>
        
      </div>
    </>
  );
}