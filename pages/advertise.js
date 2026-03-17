import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Sparkles, Zap, Search, CheckCircle2, Heart, TrendingUp } from "lucide-react";

export default function Advertise() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(null);

  return (
    <>
      <Head>
        <title>Advertise on Toolsy | Get Your AI Tool Discovered</title>
        <meta name="description" content="Feature your AI tool on Toolsy and get discovered by developers, creators and founders actively searching for AI tools." />
      </Head>

      <div style={{ minHeight: "100vh", background: "#0d0d0d", color: "white", padding: "7rem 1.25rem 5rem", boxSizing: "border-box", fontFamily: "'Inter', sans-serif" }}>

        {/* HERO */}
        <div style={{ maxWidth: "56rem", margin: "0 auto", textAlign: "center", marginBottom: "3.5rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 1rem", borderRadius: "9999px", background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)", marginBottom: "1.5rem", fontSize: "11px", fontWeight: 700, color: "#a78bfa", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            <Sparkles size={12} />
            <span>Grow Your AI Tool</span>
          </div>

          <h1 style={{ fontSize: "clamp(1.875rem, 6vw, 3.75rem)", fontWeight: 900, letterSpacing: "-0.04em", marginBottom: "1.25rem", color: "white", lineHeight: 1.05 }}>
            Put Your AI Tool In Front of{" "}
            <span style={{ color: "rgb(124,58,237)" }}>People Who Actually Use AI</span>
          </h1>

          <p style={{ color: "#9ca3af", fontSize: "clamp(0.875rem, 2vw, 1.05rem)", maxWidth: "38rem", margin: "0 auto 2rem", lineHeight: 1.65 }}>
            Every Toolsy visitor is a developer, creator or founder actively searching for AI tools — not a casual browser. Get in front of the right people.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "2.5rem", flexWrap: "wrap" }}>
            {[{ number: "100+", label: "Curated Tools" }, { number: "15+", label: "Categories" }, { number: "Growing", label: "Daily Traffic" }].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "white" }}>{stat.number}</div>
                <div style={{ fontSize: "10px", color: "#6b7280", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* PRICING CARDS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 290px), 1fr))", gap: "1.25rem", maxWidth: "50rem", margin: "0 auto 3rem" }}>

          {/* Suggested */}
          <div onMouseOver={() => setHoveredCard("suggested")} onMouseOut={() => setHoveredCard(null)}
            style={{ position: "relative", background: "#111", border: `1px solid ${hoveredCard === "suggested" ? "rgba(124,58,237,0.5)" : "rgba(255,255,255,0.07)"}`, borderRadius: "1.5rem", padding: "1.75rem", overflow: "hidden", transition: "all 0.3s", transform: hoveredCard === "suggested" ? "translateY(-4px)" : "translateY(0)", boxSizing: "border-box" }}>
            <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "120px", height: "120px", background: "rgba(124,58,237,0.06)", filter: "blur(35px)", borderRadius: "50%" }} />

            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "9999px", padding: "3px 10px", marginBottom: "1.25rem" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981" }} />
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#10b981" }}>8 slots available</span>
            </div>

            <div style={{ width: "2.75rem", height: "2.75rem", background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: "0.875rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem", color: "rgb(124,58,237)" }}>
              <Search size={22} />
            </div>

            <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "white", marginBottom: "0.375rem" }}>Suggested in Search</h2>
            <p style={{ color: "#6b7280", fontSize: "0.8rem", lineHeight: 1.6, marginBottom: "1rem" }}>
              Your tool appears at the top with a special badge whenever someone searches for keywords matching your category.
            </p>

            <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginBottom: "1.25rem" }}>
              <span style={{ fontSize: "2.5rem", fontWeight: 900, color: "white", letterSpacing: "-0.03em" }}>₹499</span>
              <span style={{ color: "#6b7280", fontWeight: 600, fontSize: "0.875rem" }}>/week</span>
            </div>

            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {["Keyword-based targeting", "Top of search results", "Pulsing Suggested badge", "Instant activation"].map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.775rem", fontWeight: 600, color: "#9ca3af" }}>
                  <CheckCircle2 size={14} color="rgb(124,58,237)" /> {item}
                </li>
              ))}
            </ul>

            <Link href="/contact" onMouseOver={() => setHoveredBtn("suggested")} onMouseOut={() => setHoveredBtn(null)}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", padding: "0.75rem", borderRadius: "0.75rem", background: hoveredBtn === "suggested" ? "rgb(124,58,237)" : "rgba(255,255,255,0.05)", color: "white", border: `1px solid ${hoveredBtn === "suggested" ? "rgb(124,58,237)" : "rgba(255,255,255,0.1)"}`, fontWeight: 700, fontSize: "0.875rem", textDecoration: "none", transition: "all 0.2s", boxSizing: "border-box" }}>
              Book This Spot →
            </Link>
          </div>

          {/* Featured */}
          <div onMouseOver={() => setHoveredCard("featured")} onMouseOut={() => setHoveredCard(null)}
            style={{ position: "relative", background: "#111", border: "1px solid rgba(124,58,237,0.4)", borderRadius: "1.5rem", padding: "1.75rem", boxShadow: "0 0 40px -10px rgba(124,58,237,0.2)", overflow: "hidden", transition: "all 0.3s", transform: hoveredCard === "featured" ? "translateY(-4px)" : "translateY(0)", boxSizing: "border-box" }}>
            <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "140px", height: "140px", background: "rgba(124,58,237,0.12)", filter: "blur(40px)", borderRadius: "50%" }} />

            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: "9999px", padding: "3px 10px", marginBottom: "1.25rem" }}>
              <TrendingUp size={11} color="rgb(124,58,237)" />
              <span style={{ fontSize: "11px", fontWeight: 700, color: "rgb(124,58,237)" }}>Most Popular · Only 6 slots total</span>
            </div>

            <div style={{ width: "2.75rem", height: "2.75rem", background: "rgb(124,58,237)", borderRadius: "0.875rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem", boxShadow: "0 0 20px rgba(124,58,237,0.4)", color: "white" }}>
              <Zap size={22} fill="white" />
            </div>

            <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "white", marginBottom: "0.375rem" }}>Featured on Homepage</h2>
            <p style={{ color: "#6b7280", fontSize: "0.8rem", lineHeight: 1.6, marginBottom: "1rem" }}>
              Your tool gets a premium spot in the Featured section — the first thing every visitor sees when they land on Toolsy.
            </p>

            <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginBottom: "1.25rem" }}>
              <span style={{ fontSize: "2.5rem", fontWeight: 900, color: "white", letterSpacing: "-0.03em" }}>₹999</span>
              <span style={{ color: "#6b7280", fontWeight: 600, fontSize: "0.875rem" }}>/week</span>
            </div>

            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {["Maximum homepage visibility", "Premium glow card effect", "Above all other tools", "24/7 placement"].map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.775rem", fontWeight: 600, color: "#9ca3af" }}>
                  <CheckCircle2 size={14} color="rgb(124,58,237)" /> {item}
                </li>
              ))}
            </ul>

            <Link href="/contact" onMouseOver={() => setHoveredBtn("featured")} onMouseOut={() => setHoveredBtn(null)}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", padding: "0.75rem", borderRadius: "0.75rem", background: hoveredBtn === "featured" ? "#6d28d9" : "rgb(124,58,237)", color: "white", fontWeight: 900, fontSize: "0.875rem", textDecoration: "none", boxShadow: "0 8px 25px rgba(124,58,237,0.25)", transition: "all 0.2s", boxSizing: "border-box" }}>
              Book This Spot →
            </Link>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div style={{ maxWidth: "50rem", margin: "0 auto 3rem" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "white", textAlign: "center", marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>How it works</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))", gap: "0.875rem" }}>
            {[
              { step: "01", title: "Contact us", desc: "Fill the contact form with your tool details and chosen slot" },
              { step: "02", title: "We review", desc: "We verify your tool quality — we only feature tools we'd genuinely use" },
              { step: "03", title: "Go live", desc: "Your tool gets featured within 24 hours of confirmation" },
            ].map((item) => (
              <div key={item.step} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "1rem", padding: "1.25rem", boxSizing: "border-box" }}>
                <div style={{ fontSize: "10px", fontWeight: 800, color: "rgb(124,58,237)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>{item.step}</div>
                <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "white", marginBottom: "0.375rem" }}>{item.title}</div>
                <div style={{ fontSize: "0.75rem", color: "#6b7280", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ maxWidth: "36rem", margin: "0 auto", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "1.5rem", padding: "1.75rem", textAlign: "center", boxSizing: "border-box" }}>
          <Heart size={26} color="rgb(124,58,237)" fill="rgb(124,58,237)" style={{ margin: "0 auto 0.75rem" }} />
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "white", marginBottom: "0.5rem" }}>Built by a solo founder, for founders</h3>
          <p style={{ color: "#6b7280", fontSize: "0.8rem", lineHeight: 1.65, margin: 0 }}>
            Toolsy is independently run — no investors, no middlemen. Every sponsorship directly supports the platform. We only partner with tools we genuinely believe in.
          </p>
        </div>

      </div>
    </>
  );
}