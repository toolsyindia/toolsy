import { useState } from "react";
import { Sparkles, Mail, Menu, X, Shield, FileText, PlusCircle } from "lucide-react"; // Added PlusCircle here!
import { Button } from "@/components/ui/button";

export default function Navbar() {
  // This state controls if the "3 lines" menu is open or closed!
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50 backdrop-blur-xl bg-background/60">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Left Side: Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <span className="text-xl font-bold font-display tracking-tight">Toolsy</span>
        </a>

        {/* Desktop Links (Disappears on phones) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="/" className="hover:text-primary transition-colors">Explore Tools</a>
          <a href="/contact" className="hover:text-primary transition-colors flex items-center gap-1.5">
            <Mail className="w-4 h-4" /> Contact
          </a>
          
          {/* Changed "Submit a Tool" to "Tool?" */}
          <Button variant="default" className="h-9 rounded-full px-4 shadow-md shadow-primary/20" asChild>
            <a href="/contact">Tool?</a>
          </Button>
          
          {/* Brand New "Add Tool" Button */}
          <Button variant="secondary" className="h-9 rounded-full px-4 shadow-md" asChild>
            <a href="/admin">Add Tool</a>
          </Button>
        </div>

        {/* Mobile Menu Icon (The 3 Lines - Appears on phones) */}
        <div className="md:hidden flex items-center">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {/* If menu is open, show an X. If closed, show the 3 lines (Menu) */}
            {isOpen ? <X className="w-5 h-5 text-primary" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* The Actual Dropdown Menu (When you click the 3 lines) */}
      {isOpen && (
        <div className="md:hidden glass border-b border-border/50 bg-background/95 px-6 py-6 flex flex-col gap-5 shadow-2xl animate-fade-in">
          <a href="/" className="text-base font-semibold hover:text-primary flex items-center gap-3">
            <Sparkles className="w-5 h-5" /> Explore Tools
          </a>
          
          {/* Updated text to "Tool?" here too */}
          <a href="/contact" className="text-base font-semibold hover:text-primary flex items-center gap-3">
            <Mail className="w-5 h-5" /> Contact / Tool?
          </a>

          {/* Added the new Add Tool link for mobile */}
          <a href="/admin" className="text-base font-semibold text-primary hover:text-primary/80 flex items-center gap-3">
            <PlusCircle className="w-5 h-5" /> Add Tool
          </a>
          
          <hr className="border-border/50" />
          
          {/* Legal Pages in the mobile menu */}
          <a href="/privacy" className="text-sm font-medium text-muted-foreground hover:text-primary flex items-center gap-3">
            <Shield className="w-4 h-4" /> Privacy Policy
          </a>
          <a href="/terms" className="text-sm font-medium text-muted-foreground hover:text-primary flex items-center gap-3">
            <FileText className="w-4 h-4" /> Terms of Service
          </a>
        </div>
      )}
    </nav>
  );
}