import Head from "next/head";

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service | Toolsy AI</title>
      </Head>
      {/* Main Background Wrapper */}
      <div style={{ minHeight: "100vh", backgroundColor: "#050505", paddingTop: "6rem", paddingBottom: "4rem", paddingLeft: "1.5rem", paddingRight: "1.5rem", color: "white", fontFamily: "sans-serif" }}>
        
        {/* Premium Dark Content Box */}
        <div style={{ maxWidth: "800px", margin: "0 auto", backgroundColor: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "1.5rem", padding: "3rem" }}>
          
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>Terms of Service</h1>
          <p style={{ color: "#9ca3af", marginBottom: "2.5rem" }}>Last Updated: March 2026</p>

          <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginTop: "2rem", marginBottom: "1rem" }}>1. Acceptance of Terms</h2>
          <p style={{ color: "#d1d5db", lineHeight: "1.7" }}>By accessing and using Toolsy, you accept and agree to be bound by the terms and provision of this agreement.</p>

          <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginTop: "2rem", marginBottom: "1rem" }}>2. Accuracy of Information</h2>
          <p style={{ color: "#d1d5db", lineHeight: "1.7" }}>Toolsy indexes thousands of AI tools. While we strive to keep our information updated, AI tool prices, features, and availability change rapidly. We do not guarantee the accuracy of pricing or descriptions on this site. Always verify on the official tool's website.</p>

          <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginTop: "2rem", marginBottom: "1rem" }}>3. Prohibited Conduct</h2>
          <p style={{ color: "#d1d5db", lineHeight: "1.7" }}>You are prohibited from using automated scripts, bots, or scrapers to extract data, tool lists, or contact information from Toolsy. We reserve the right to block any IP address engaging in data scraping.</p>

          <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginTop: "2rem", marginBottom: "1rem" }}>4. Intellectual Property</h2>
          <p style={{ color: "#d1d5db", lineHeight: "1.7" }}>All tool logos, names, and trademarks belong to their respective owners. Toolsy claims no ownership over the third-party AI tools listed in our directory.</p>
        </div>
      </div>
    </>
  );
}