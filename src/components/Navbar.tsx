import { useState } from "react";
import { Sparkles, Mail, Menu, X, Shield, FileText, Heart, Copy, Check } from "lucide-react"; 
import { Button } from "@/components/ui/button";

export default function Navbar() {
  // Your original menu state
  const [isOpen, setIsOpen] = useState(false);
  
  // New states for the support feature
  const [showSupport, setShowSupport] = useState(false);
  const [copied, setCopied] = useState(false);

  // ✅ Your official UPI ID
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
          
          {/* Left Side: Logo (Your original code) */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <span className="text-xl font-bold font-display tracking-tight">Toolsy</span>
          </a>

          {/* Desktop Links (Your original code + Support Button) */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="/" className="hover:text-primary transition-colors">Explore Tools</a>
            <a href="/contact" className="hover:text-primary transition-colors flex items-center gap-1.5">
              <Mail className="w-4 h-4" /> Contact
            </a>
            
            {/* The "Tool?" button you created */}
            <Button variant="outline" className="h-9 rounded-full px-4 border-primary/20 hover:bg-primary/5" asChild>
              <a href="/contact">Tool?</a>
            </Button>

            {/* Support Button added to desktop */}
            <Button 
              onClick={() => setShowSupport(true)}
              className="h-9 rounded-full px-5 shadow-md shadow-primary/20 bg-gradient-to-r from-primary to-accent hover:scale-105 transition-all flex items-center gap-2 font-bold"
            >
              <Heart className="w-4 h-4 fill-white" /> Support
            </Button>
          </div>

          {/* Mobile Menu Icon (Your original logic) */}
          <div className="md:hidden flex items-center gap-4">
            {/* Added a pulse heart for mobile users to find easily */}
            <button onClick={() => setShowSupport(true)} className="text-primary p-1 animate-pulse">
              <Heart className="w-6 h-6 fill-primary" />
            </button>
            
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-5 h-5 text-primary" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Your original mobile dropdown menu logic */}
        {isOpen && (
          <div className="md:hidden glass border-b border-border/50 bg-background/95 px-6 py-6 flex flex-col gap-5 shadow-2xl animate-fade-in">
            <a href="/" className="text-base font-semibold hover:text-primary flex items-center gap-3">
              <Sparkles className="w-5 h-5" /> Explore Tools
            </a>
            
            <a href="/contact" className="text-base font-semibold hover:text-primary flex items-center gap-3">
              <Mail className="w-5 h-5" /> Contact / Tool?
            </a>
            
            <hr className="border-border/50" />
            
            <a href="/privacy" className="text-sm font-medium text-muted-foreground hover:text-primary flex items-center gap-3">
              <Shield className="w-4 h-4" /> Privacy Policy
            </a>
            <a href="/terms" className="text-sm font-medium text-muted-foreground hover:text-primary flex items-center gap-3">
              <FileText className="w-4 h-4" /> Terms of Service
            </a>
          </div>
        )}
      </nav>

      {/* 💎 THE PREMIUM UPI MODAL 💎 */}
      {showSupport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          
          <div className="absolute inset-0" onClick={() => setShowSupport(false)} />
          
          <div className="relative w-full max-w-md glass-strong border border-border/50 rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-300">
            {/* Close Button */}
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
  I'm a 17-year-old developer and a 2nd-year student 
  coding late into the night to build Toolsy. 
  I'm doing this to support my family and build a future I can be proud of. 
  Your support isn't just a tip; it's a vote of confidence in my journey 
  and my hard work. Thank you for being part of my story! ❤️
</p>
            </div>

            {/* 📸 YOUR REAL PHONEPE QR CODE (qr.png) */}
            <div className="w-52 h-52 mx-auto bg-white rounded-2xl p-4 shadow-inner flex items-center justify-center mb-6 border border-primary/20 overflow-hidden text-black">
              <img 
                src="/qr.png" 
                alt="UPI Support QR" 
                className="w-full h-full object-contain"
              />
            </div>

            {/* Copy UPI Section */}
            <div className="bg-secondary/50 rounded-xl p-1 flex items-center border border-border/50">
              <div className="flex-1 px-4 text-xs font-mono font-bold text-center truncate">
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