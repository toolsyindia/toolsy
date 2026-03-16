import { useState } from "react";
import Link from "next/link";
import { Mail, Menu, X, Shield, FileText, Heart, Copy, Check, Zap } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [copied, setCopied] = useState(false);
  const myUpiId = "8465073056@ybl";

  const handleCopy = () => {
    navigator.clipboard.writeText(myUpiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:40,borderBottom:"1px solid rgba(255,255,255,0.08)",backdropFilter:"blur(20px)",background:"rgba(13,13,13,0.85)" }}>
        <div style={{ maxWidth:"1200px",margin:"0 auto",padding:"0 1.5rem",height:"64px",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
          <Link href="/" style={{ display:"flex",alignItems:"center",gap:"0.625rem",textDecoration:"none" }}>
            <img src="/logo.png" alt="Toolsy Logo" style={{ width:"36px",height:"36px",objectFit:"contain",flexShrink:0 }} />
            <span style={{ fontSize:"1.5rem",fontWeight:700,color:"white",letterSpacing:"-0.02em" }}>Toolsy</span>
          </Link>
          <div className="desktop-nav" style={{ display:"flex",alignItems:"center",gap:"2rem" }}>
            <Link href="/" style={{ color:"#9ca3af",textDecoration:"none",fontSize:"0.875rem",fontWeight:500 }}>Explore Tools</Link>
            <Link href="/advertise" style={{ color:"#9ca3af",textDecoration:"none",fontSize:"0.875rem",fontWeight:500,display:"flex",alignItems:"center",gap:"0.25rem" }}>
              <Zap size={14} color="rgb(124,58,237)" /> Promote Tool
            </Link>
            <Link href="/contact" style={{ color:"#9ca3af",textDecoration:"none",fontSize:"0.875rem",fontWeight:500,display:"flex",alignItems:"center",gap:"0.25rem" }}>
              <Mail size={14} /> Contact
            </Link>
            <button onClick={() => setShowSupport(true)} style={{ display:"flex",alignItems:"center",gap:"0.5rem",padding:"0.5rem 1.25rem",borderRadius:"9999px",background:"rgb(124,58,237)",color:"white",fontWeight:700,fontSize:"0.875rem",border:"none",cursor:"pointer",fontFamily:"inherit" }}>
              <Heart size={14} fill="white" /> Support
            </button>
          </div>
          <div className="mobile-nav" style={{ display:"none",alignItems:"center",gap:"1rem" }}>
            <button onClick={() => setShowSupport(true)} style={{ background:"none",border:"none",cursor:"pointer",padding:"0.25rem" }}>
              <Heart size={22} color="rgb(124,58,237)" fill="rgb(124,58,237)" />
            </button>
            <button onClick={() => setIsOpen(!isOpen)} style={{ background:"none",border:"none",cursor:"pointer",color:"#9ca3af",padding:"0.25rem" }}>
              {isOpen ? <X size={22} color="rgb(124,58,237)" /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {isOpen && (
          <div style={{ borderTop:"1px solid rgba(255,255,255,0.08)",background:"rgba(13,13,13,0.98)",padding:"1.5rem",display:"flex",flexDirection:"column",gap:"1.25rem" }}>
            <Link href="/" onClick={() => setIsOpen(false)} style={{ color:"white",textDecoration:"none",fontWeight:700,fontSize:"1.1rem",display:"flex",alignItems:"center",gap:"0.75rem" }}>
              <img src="/logo.png" alt="Logo" style={{ width:"28px",height:"28px",objectFit:"contain" }} /> Explore Tools
            </Link>
            <Link href="/advertise" onClick={() => setIsOpen(false)} style={{ color:"#9ca3af",textDecoration:"none",fontWeight:600,display:"flex",alignItems:"center",gap:"0.75rem" }}>
              <Zap size={18} color="rgb(124,58,237)" /> Promote Tool
            </Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} style={{ color:"#9ca3af",textDecoration:"none",fontWeight:600,display:"flex",alignItems:"center",gap:"0.75rem" }}>
              <Mail size={18} /> Contact
            </Link>
            <hr style={{ border:"none",borderTop:"1px solid rgba(255,255,255,0.08)" }} />
            <Link href="/privacy" onClick={() => setIsOpen(false)} style={{ color:"#6b7280",textDecoration:"none",fontWeight:500,fontSize:"0.875rem",display:"flex",alignItems:"center",gap:"0.75rem" }}>
              <Shield size={16} /> Privacy Policy
            </Link>
            <Link href="/terms" onClick={() => setIsOpen(false)} style={{ color:"#6b7280",textDecoration:"none",fontWeight:500,fontSize:"0.875rem",display:"flex",alignItems:"center",gap:"0.75rem" }}>
              <FileText size={16} /> Terms of Service
            </Link>
          </div>
        )}
      </nav>

      <style>{`
        @media (min-width: 768px) { .mobile-nav { display: none !important; } .desktop-nav { display: flex !important; } }
        @media (max-width: 767px) { .mobile-nav { display: flex !important; } .desktop-nav { display: none !important; } }
      `}</style>

      {showSupport && (
        <div style={{ position:"fixed",inset:0,zIndex:50,display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem",background:"rgba(0,0,0,0.8)" }}>
          <div style={{ position:"absolute",inset:0 }} onClick={() => setShowSupport(false)} />
          <div style={{ position:"relative",width:"100%",maxWidth:"420px",background:"#0f0f0f",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"1.5rem",padding:"2rem" }}>
            <button onClick={() => setShowSupport(false)} style={{ position:"absolute",top:"1rem",right:"1rem",background:"none",border:"none",cursor:"pointer",color:"#6b7280" }}>
              <X size={20} />
            </button>
            <div style={{ textAlign:"center",marginBottom:"1.5rem" }}>
              <div style={{ width:"64px",height:"64px",margin:"0 auto 1rem",background:"rgba(124,58,237,0.1)",borderRadius:"1rem",display:"flex",alignItems:"center",justifyContent:"center" }}>
                <Heart size={32} color="rgb(124,58,237)" fill="rgb(124,58,237)" />
              </div>
              <h2 style={{ fontSize:"1.5rem",fontWeight:700,color:"white",marginBottom:"0.5rem" }}>Support the Developer</h2>
              <p style={{ color:"#6b7280",fontSize:"0.875rem",lineHeight:1.6 }}>Maintaining a global AI directory requires constant research and infrastructure.</p>
            </div>
            <div style={{ width:"180px",height:"180px",margin:"0 auto 1.5rem",background:"white",borderRadius:"1rem",padding:"0.75rem",display:"flex",alignItems:"center",justifyContent:"center" }}>
              <img src="/qr.png" alt="UPI QR" style={{ width:"100%",height:"100%",objectFit:"contain" }} />
            </div>
            <div style={{ display:"flex",alignItems:"center",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"0.75rem",padding:"0.25rem 0.25rem 0.25rem 1rem" }}>
              <span style={{ flex:1,fontSize:"0.875rem",fontFamily:"monospace",fontWeight:700,color:"white" }}>{myUpiId}</span>
              <button onClick={handleCopy} style={{ display:"flex",alignItems:"center",gap:"0.25rem",padding:"0.5rem 0.875rem",borderRadius:"0.5rem",background:copied?"#10b981":"rgb(124,58,237)",color:"white",border:"none",cursor:"pointer",fontWeight:700,fontSize:"0.8rem",fontFamily:"inherit" }}>
                {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}