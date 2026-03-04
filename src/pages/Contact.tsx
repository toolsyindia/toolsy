import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background bg-mesh pt-24 pb-12 px-6">
      <div className="max-w-2xl mx-auto glass-strong rounded-2xl p-8 md:p-12 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
            <Mail className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold font-display mb-2">Partner with Toolsy</h1>
          <p className="text-muted-foreground">Want to feature your AI tool or report a bug? Reach out to us below.</p>
        </div>

        {/* WEB3FORMS MAGIC HAPPENS HERE */}
        <form action="https://api.web3forms.com/submit" method="POST" className="space-y-6">
          
          {/* YOUR LIVE ACCESS KEY */}
          <input type="hidden" name="access_key" value="4f5dbcb8-62c1-4393-8d55-1904ead87017" />
          
          {/* This bounces them back to your homepage after sending */}
          <input type="hidden" name="redirect" value="https://toolsyai.xyz" />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input id="name" name="name" placeholder="John Doe" className="bg-background/50" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" placeholder="hello@startup.com" className="bg-background/50" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" name="subject" placeholder="e.g., Featured Listing Inquiry" className="bg-background/50" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" placeholder="Tell us about your tool..." className="min-h-[150px] bg-background/50" required />
          </div>
          <Button type="submit" className="w-full h-12 text-lg font-semibold">
            <MessageSquare className="w-4 h-4 mr-2" /> Send Message
          </Button>
        </form>

      </div>
    </div>
  );
}