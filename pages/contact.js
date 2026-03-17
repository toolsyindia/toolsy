import { useState } from "react";
import Head from "next/head";
import { Mail, MessageSquare, Loader2, Zap, Shield, Clock, ChevronDown } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);
  const [inquiryType, setInquiryType] = useState("");

  const inputStyle = (name) => ({
    width: "100%",
    padding: "0.875rem 1rem",
    background: focused === name ? "rgba(124,58,237,0.05)" : "rgba(255,255,255,0.03)",
    border: `1px solid ${focused === name ? "rgba(124,58,237,0.6)" : "rgba(255,255,255,0.08)"}`,
    borderRadius: "0.75rem",
    color: "white",
    fontSize: "0.9rem",
    outline: "none",
    fontFamily: "'Inter', sans-serif",
    transition: "all 0.2s",
    boxSizing: "border-box",
    boxShadow: focused === name ? "0 0 0 3px rgba(124,58,237,0.1)" : "none",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      inquiryType: formData.get("inquiryType"),
      toolName: formData.get("toolName"),
      message: formData.get("message"),
    };
    try {
      await fetch("https://script.google.com/macros/s/AKfycbwzrgV1NW5n92EkG6C4_-nOsy4mgw11M2ZF42kqCyxz8b-0Wxk3pE3BxwbGOzr3dZs/exec", {
        method: "POST", mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      toast.success("Message sent! We'll get back to you soon. 🚀");
      e.target.reset();
      setInquiryType("");
    } catch (error) {
      toast.error("Failed to send. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inquiryOptions = [
    { value: "sponsorship", label: "💎 Sponsorship / Featured Listing" },
    { value: "submit", label: "🛠️ Submit My AI Tool" },
    { value: "partnership", label: "🤝 Partnership / Collab" },
    { value: "feedback", label: "💬 Feedback / Suggestion" },
    { value: "support", label: "🔧 Support / Bug Report" },
    { value: "other", label: "📩 Other" },
  ];

  const isSponsorshipOrSubmit = inquiryType === "sponsorship" || inquiryType === "submit";

  return (
    <>
      <Head>
        <title>Contact Toolsy | Partner With Us</title>
        <meta name="description" content="Get in touch with Toolsy for sponsorships, tool submissions, partnerships or support." />
      </Head>

      <div style={{ minHeight: "100vh", background: "#0d0d0d", padding: "7rem 1.25rem 5rem", boxSizing: "border-box", fontFamily: "'Inter', sans-serif" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <div style={{ width: "52px", height: "52px", margin: "0 auto 1.25rem", background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)", borderRadius: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Mail size={24} color="rgb(124,58,237)" />
            </div>
            <h1 style={{ fontSize: "clamp(1.75rem, 5vw, 2.25rem)", fontWeight: 900, color: "white", letterSpacing: "-0.03em", marginBottom: "0.75rem" }}>
              Let&apos;s Work Together
            </h1>
            <p style={{ color: "#6b7280", fontSize: "0.9rem", lineHeight: 1.65, maxWidth: "380px", margin: "0 auto" }}>
              Whether you want to feature your tool, collaborate, or just say hi — we read every message.
            </p>
          </div>

          {/* Trust signals */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem", marginBottom: "2rem" }}>
            {[
              { icon: <Clock size={14} />, text: "2hr response for sponsorships" },
              { icon: <Shield size={14} />, text: "Your data is never sold" },
              { icon: <Zap size={14} />, text: "Live within 24 hours" },
            ].map((item) => (
              <div key={item.text} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "0.875rem", padding: "0.75rem", textAlign: "center", boxSizing: "border-box" }}>
                <div style={{ color: "rgb(124,58,237)", display: "flex", justifyContent: "center", marginBottom: "0.375rem" }}>{item.icon}</div>
                <div style={{ fontSize: "10px", color: "#6b7280", fontWeight: 600, lineHeight: 1.4 }}>{item.text}</div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "1.5rem", padding: "2rem", boxSizing: "border-box" }}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>

              {/* Name + Email row */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#9ca3af", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Your Name</label>
                  <input name="name" placeholder="Sai Kumar" required style={inputStyle("name")}
                    onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#9ca3af", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Email Address</label>
                  <input name="email" type="email" placeholder="hello@yourcompany.com" required style={inputStyle("email")}
                    onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
                </div>
              </div>

              {/* Inquiry Type */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#9ca3af", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Inquiry Type</label>
                <div style={{ position: "relative" }}>
                  <select name="inquiryType" required value={inquiryType} onChange={(e) => setInquiryType(e.target.value)}
                    onFocus={() => setFocused("inquiry")} onBlur={() => setFocused(null)}
                    style={{ ...inputStyle("inquiry"), appearance: "none", WebkitAppearance: "none", cursor: "pointer", paddingRight: "2.5rem" }}>
                    <option value="" disabled style={{ background: "#111" }}>Select inquiry type...</option>
                    {inquiryOptions.map((opt) => (
                      <option key={opt.value} value={opt.value} style={{ background: "#111" }}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} color="#6b7280" style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                </div>
              </div>

              {/* Tool Name — only show for sponsorship or submit */}
              {isSponsorshipOrSubmit && (
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#9ca3af", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {inquiryType === "sponsorship" ? "Tool Name & Website" : "Tool Name & Website"}
                  </label>
                  <input name="toolName" placeholder="e.g. Jasper AI — jasper.ai" style={inputStyle("toolName")}
                    onFocus={() => setFocused("toolName")} onBlur={() => setFocused(null)} />
                </div>
              )}

              {/* Sponsorship info box */}
              {inquiryType === "sponsorship" && (
                <div style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: "0.875rem", padding: "1rem", boxSizing: "border-box" }}>
                  <p style={{ fontSize: "12px", color: "#a78bfa", fontWeight: 600, margin: "0 0 0.5rem" }}>💎 Current Sponsorship Slots</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                      <span style={{ color: "#9ca3af" }}>Suggested in Search</span>
                      <span style={{ color: "white", fontWeight: 700 }}>₹499/week</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                      <span style={{ color: "#9ca3af" }}>Featured on Homepage</span>
                      <span style={{ color: "white", fontWeight: 700 }}>₹999/week</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Message */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#9ca3af", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Message</label>
                <textarea name="message" rows={4} required
                  placeholder={
                    inquiryType === "sponsorship" ? "Tell us about your tool, target audience, and which slot you're interested in..." :
                    inquiryType === "submit" ? "Tell us about your tool — what it does, who it's for, and why it should be on Toolsy..." :
                    "Write your message here..."
                  }
                  style={{ ...inputStyle("message"), resize: "vertical", minHeight: "110px" }}
                  onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} />
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", width: "100%", padding: "0.875rem", background: loading ? "rgba(124,58,237,0.5)" : "rgb(124,58,237)", color: "white", fontWeight: 900, fontSize: "0.95rem", borderRadius: "0.75rem", border: "none", cursor: loading ? "not-allowed" : "pointer", fontFamily: "'Inter', sans-serif", transition: "all 0.2s", boxShadow: "0 8px 25px rgba(124,58,237,0.25)", boxSizing: "border-box" }}>
                {loading ? <><Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> Sending...</> : <><MessageSquare size={18} /> Send Message</>}
              </button>

              <p style={{ textAlign: "center", fontSize: "11px", color: "#4b5563", margin: 0 }}>
                🔒 We typically respond to sponsorship inquiries within 2 hours. All other messages within 24 hours.
              </p>

            </form>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </>
  );
}