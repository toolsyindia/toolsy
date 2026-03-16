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
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-white/10 backdrop-blur-xl bg-[#050505]/80">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <img src="/logo.png" alt="Toolsy Logo" style={{ width: "32px", height: "32px", objectFit: "contain" }} />
            </div>
            <span className="text-2xl md:text-3xl font-bold tracking-tighter text-white">Toolsy</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link href="/" className="hover:text-primary transition-colors">Explore Tools</Link>
            <Link href="/advertise" className="hover:text-primary transition-colors flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-primary" /> Promote Tool
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors flex items-center gap-1.5">
              <Mail className="w-4 h-4" /> Contact
            </Link>
            <button
              onClick={() => setShowSupport(true)}
              className="h-9 rounded-full px-5 shadow-md bg-gradient-to-r from-primary to-violet-600 hover:scale-105 transition-all flex items-center gap-2 font-bold text-white">
              <Heart className="w-4 h-4 fill-white" /> Support
            </button>
          </div>

          {/* Mobile Icons */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setShowSupport(true)} className="text-primary p-1 animate-pulse">
              <Heart className="w-6 h-6 fill-primary" />
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-400 hover:text-white transition-colors">
              {isOpen ? <X className="w-5 h-5 text-primary" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden border-b border-white/10 bg-[#050505]/95 px-6 py-6 flex flex-col gap-5 shadow-2xl">
            <Link href="/" onClick={() => setIsOpen(false)} className="text-xl font-bold text-white hover:text-primary flex items-center gap-4">
              <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
              Explore Tools
            </Link>
            <Link href="/advertise" onClick={() => setIsOpen(false)} className="text-base font-semibold text-gray-400 hover:text-primary flex items-center gap-3">
              <Zap className="w-5 h-5 text-primary" /> Promote Tool
            </Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="text-base font-semibold text-gray-400 hover:text-primary flex items-center gap-3">
              <Mail className="w-5 h-5" /> Contact
            </Link>
            <hr className="border-white/10" />
            <Link href="/privacy" onClick={() => setIsOpen(false)} className="text-sm font-medium text-gray-500 hover:text-primary flex items-center gap-3">
              <Shield className="w-4 h-4" /> Privacy Policy
            </Link>
            <Link href="/terms" onClick={() => setIsOpen(false)} className="text-sm font-medium text-gray-500 hover:text-primary flex items-center gap-3">
              <FileText className="w-4 h-4" /> Terms of Service
            </Link>
          </div>
        )}
      </nav>

      {/* UPI Support Modal */}
      {showSupport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setShowSupport(false)} />
          <div className="relative w-full max-w-md bg-[#0F0F0F] border border-white/10 rounded-3xl p-8 shadow-2xl">
            <button onClick={() => setShowSupport(false)}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-primary fill-primary animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Support the Developer</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Maintaining a global AI directory requires constant research and infrastructure. Contributions support the ongoing development and scaling of Toolsy for creators worldwide.
              </p>
            </div>
            <div className="w-52 h-52 mx-auto bg-white rounded-2xl p-4 shadow-inner flex items-center justify-center mb-6 border border-primary/20 overflow-hidden">
              <img src="/qr.png" alt="UPI Support QR" className="w-full h-full object-contain" />
            </div>
            <div className="bg-white/5 rounded-xl p-1 flex items-center border border-white/10">
              <div className="flex-1 px-4 text-xs font-mono font-bold text-center truncate text-white">
                {myUpiId}
              </div>
              <button onClick={handleCopy}
                className={`rounded-lg h-9 px-3 flex items-center gap-1 transition-all text-white text-xs font-bold ${copied ? "bg-emerald-500" : "bg-primary"}`}>
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}