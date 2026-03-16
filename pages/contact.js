import { useState } from "react";
import Head from "next/head";
import { Mail, MessageSquare, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [btnHover, setBtnHover] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };
    try {
      await fetch("https://script.google.com/macros/s/AKfycbwzrgV1NW5n92EkG6C4_-nOsy4mgw11M2ZF42kqCyxz8b-0Wxk3pE3BxwbGOzr3dZs/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      toast.success("Message sent successfully! 🚀");
      e.target.reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const labelStyle = {
    fontSize: "0.875rem",
    fontWeight: 700,
    color: "#9ca3af",
    display: "block",
    marginBottom: "0.5rem"
  };

  return (
    <>
      <Head>
        <title>Contact Toolsy | Partner With Us</title>
        <meta name="description" content="Want to feature your AI tool or report a bug? Reach out to the Toolsy team." />
      </Head>

      {/* Injecting CSS specifically for the input focus states & placeholders */}
      <style>{`
        .toolsy-input {
          width: 100%;
          padding: 0.875rem 1.25rem;
          background-color: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 0.875rem;
          color: white;
          outline: none;
          font-family: inherit;
          font-size: 0.95rem;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }
        .toolsy-input::placeholder {
          color: #4b5563;
        }
        .toolsy-input:focus {
          border-color: #8b5cf6;
          background-color: rgba(255, 255, 255, 0.05);
          box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1);
        }
      `}</style>

      <div style={{ minHeight: "100vh", backgroundColor: "#050505", paddingTop: "8rem", paddingBottom: "5rem", paddingLeft: "1.5rem", paddingRight: "1.5rem", boxSizing: "border-box", fontFamily: "'Inter', sans-serif" }}>
        
        <div style={{ maxWidth: "42rem", margin: "0 auto", backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "2rem", padding: "clamp(2rem, 6vw, 3.5rem)", boxSizing: "border-box", boxShadow: "0 20px 40px -20px rgba(0,0,0,0.5)" }}>
          
          {/* HEADER */}
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            {/* FIXED: justify-content -> justifyContent */}
            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "3.5rem", height: "3.5rem", borderRadius: "1rem", backgroundColor: "rgba(139, 92, 246, 0.1)", color: "#8b5cf6", marginBottom: "1.25rem", border: "1px solid rgba(139, 92, 246, 0.2)" }}>
              <Mail size={24} style={{ margin: "auto" }} />
            </div>
            <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "white", marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>Partner with Toolsy</h1>
            <p style={{ color: "#6b7280", fontSize: "1rem", lineHeight: 1.6 }}>Want to feature your AI tool or report a bug? Reach out to us below.</p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            
            {/* 2-Column Grid for Name & Email */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
              <div>
                <label htmlFor="name" style={labelStyle}>Your Name</label>
                <input id="name" name="name" placeholder="John Doe" required className="toolsy-input" />
              </div>
              <div>
                <label htmlFor="email" style={labelStyle}>Email Address</label>
                <input id="email" name="email" type="email" placeholder="hello@startup.com" required className="toolsy-input" />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" style={labelStyle}>Subject</label>
              <input id="subject" name="subject" placeholder="e.g., Featured Listing Inquiry" required className="toolsy-input" />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" style={labelStyle}>Message</label>
              <textarea id="message" name="message" placeholder="Tell us about your tool..." rows={5} required className="toolsy-input" style={{ resize: "vertical", minHeight: "120px" }} />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              onMouseOver={() => setBtnHover(true)}
              onMouseOut={() => setBtnHover(false)}
              style={{ 
                width: "100%", 
                height: "3.5rem", 
                borderRadius: "1rem", 
                backgroundColor: loading ? "#6d28d9" : (btnHover ? "#7c3aed" : "#8b5cf6"), 
                color: "white", 
                fontWeight: 900, 
                fontSize: "1.1rem", 
                border: "none", 
                cursor: loading ? "not-allowed" : "pointer", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                gap: "0.5rem", 
                transition: "all 0.2s",
                marginTop: "0.5rem",
                boxShadow: "0 10px 20px -5px rgba(139, 92, 246, 0.3)"
              }}
            >
              {loading ? (
                <><Loader2 size={20} className="animate-spin" /> Sending...</>
              ) : (
                <><MessageSquare size={20} /> Send Message</>
              )}
            </button>

          </form>
        </div>
      </div>
    </>
  );
}