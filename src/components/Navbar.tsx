import { useState } from "react";
import { Sparkles, Mail, Menu, X, Shield, FileText, Heart, Copy, Check, Zap } from "lucide-react"; 
import { Button } from "@/components/ui/button";

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
      <nav className="fixed top-0 left-0 right-0 z-40 glass border-b border-border/50 backdrop-blur-xl bg-background/60">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo - SIZE REDUCED HERE */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <img 
                src="/logo.png" 
                alt="Toolsy Logo" 
                className="w-full h-full object-contain drop-shadow-2xl" 
              />
            </div>
            <span className="text-2xl md:text-3xl font-bold font-display tracking-tighter">Toolsy</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="/" className="hover:text-primary transition-colors">Explore Tools</a>
            
            {/* NEW: Advertise / Promote Link */}
            <a href="/advertise" className="hover:text-primary transition-colors flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-primary fill-primary/20" /> Promote Tool
            </a>

            <a href="/contact" className="hover:text-primary transition-colors flex items-center gap-1.5">
              <Mail className="w-4 h-4" /> Contact
            </a>

            {/* Support Button */}
            <Button 
              onClick={() => setShowSupport(true)}
              className="h-9 rounded-full px-5 shadow-md shadow-primary/20 bg-gradient-to-r from-primary to-accent hover:scale-105 transition-all flex items-center gap-2 font-bold text-white"
            >
              <Heart className="w-4 h-4 fill-white" /> Support
            </Button>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setShowSupport(true)} className="text-primary p-1 animate-pulse">
              <Heart className="w-6 h-6 fill-primary" />
            </button>
            
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-5 h-5 text-primary" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden glass border-b border-border/50 bg-background/95 px-6 py-6 flex flex-col gap-5 shadow-2xl animate-fade-in text-foreground">
            <a href="/" className="text-xl font-bold hover:text-primary flex items-center gap-4">
              <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
              Explore Tools
            </a>

            {/* Added Promote Tool to Mobile Menu */}
            <a href="/advertise" onClick={() => setIsOpen(false)} className="text-base font-semibold hover:text-primary flex items-center gap-3">
              <Zap className="w-5 h-5 text-primary fill-primary/20" /> Promote Tool
            </a>
            
            <a href="/contact" onClick={() => setIsOpen(false)} className="text-base font-semibold hover:text-primary flex items-center gap-3">
              <Mail className="w-5 h-5" /> Contact
            </a>
            
            <hr className="border-border/50" />
            
            <a href="/privacy" onClick={() => setIsOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-primary flex items-center gap-3">
              <Shield className="w-4 h-4" /> Privacy Policy
            </a>
            <a href="/terms" onClick={() => setIsOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-primary flex items-center gap-3">
              <FileText className="w-4 h-4" /> Terms of Service
            </a>
          </div>
        )}
      </nav>

      {/* UPI Support Modal */}
      {showSupport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          
          <div className="absolute inset-0" onClick={() => setShowSupport(false)} />
          
          <div className="relative w-full max-w-md glass-strong border border-border/50 rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-300">
            
            <button 
              onClick={() => setShowSupport(false)}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-primary fill-primary animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold font-display mb-2">Support the Developer</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                "Maintaining a global AI directory requires constant research and infrastructure. Contributions support the ongoing development and scaling of Toolsy for creators worldwide."
              </p>
            </div>

            <div className="w-52 h-52 mx-auto bg-white rounded-2xl p-4 shadow-inner flex items-center justify-center mb-6 border border-primary/20 overflow-hidden text-black">
              <img src="/qr.png" alt="UPI Support QR" className="w-full h-full object-contain" />
            </div>

            <div className="bg-secondary/50 rounded-xl p-1 flex items-center border border-border/50">
              <div className="flex-1 px-4 text-xs font-mono font-bold text-center truncate text-foreground">
                {myUpiId}
              </div>
              <Button 
                onClick={handleCopy}
                className={`rounded-lg h-9 transition-all ${copied ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'bg-primary text-primary-foreground'}`}
              >
                {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                <span className="text-xs">{copied ? 'Copied!' : 'Copy'}</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}