import Head from "next/head";

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Toolsy AI</title>
      </Head>
      {/* Main Background Wrapper */}
      <div style={{ minHeight: "100vh", backgroundColor: "#050505", paddingTop: "6rem", paddingBottom: "4rem", paddingLeft: "1.5rem", paddingRight: "1.5rem", color: "white", fontFamily: "sans-serif" }}>
        
        {/* Premium Dark Content Box */}
        <div style={{ maxWidth: "800px", margin: "0 auto", backgroundColor: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "1.5rem", padding: "3rem" }}>
          
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>Privacy Policy</h1>
          <p style={{ color: "#9ca3af", marginBottom: "2.5rem" }}>Last Updated: March 2026</p>

          <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginTop: "2rem", marginBottom: "1rem" }}>1. Information We Collect</h2>
          <p style={{ color: "#d1d5db", lineHeight: "1.7" }}>We collect basic analytics data (like your IP address and browsing behavior on our site) using standard cookies to improve the Toolsy experience. We do not collect personal data unless you voluntarily submit it via our contact form.</p>

          <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginTop: "2rem", marginBottom: "1rem" }}>2. Affiliate Disclosure (Monetization)</h2>
          <p style={{ color: "#d1d5db", lineHeight: "1.7" }}>Toolsy is a directory of third-party AI tools. We participate in various affiliate marketing programs. This means if you click on a tool link and make a purchase, we may earn a commission at no extra cost to you. This helps keep our directory free to use.</p>

          <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginTop: "2rem", marginBottom: "1rem" }}>3. Third-Party Links</h2>
          <p style={{ color: "#d1d5db", lineHeight: "1.7" }}>Our website contains hundreds of links to external AI tools. We do not control these external websites and are not responsible for their privacy practices. Please read their privacy policies when visiting them.</p>

          <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginTop: "2rem", marginBottom: "1rem" }}>4. Contact Us</h2>
          <p style={{ color: "#d1d5db", lineHeight: "1.7" }}>If you have questions about this privacy policy, please contact us through our Contact Page.</p>
        </div>
      </div>
    </>
  );
}