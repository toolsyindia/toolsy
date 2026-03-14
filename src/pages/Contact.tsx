import { useState } from "react"; // 🔥 Added useState
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, Loader2 } from "lucide-react"; // 🔥 Added Loader icon
import { toast } from "sonner"; // Assuming you use sonner for notifications

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      // 🚀 Your NEW Unlimited Google Sheets URL
      await fetch("https://script.google.com/macros/s/AKfycbwzrgV1NW5n92EkG6C4_-nOsy4mgw11M2ZF42kqCyxz8b-0Wxk3pE3BxwbGOzr3dZs/exec", {
        method: "POST",
        mode: "no-cors", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      toast.success("Message sent successfully! 🚀");
      (e.target as HTMLFormElement).reset(); // Clear the form
    } catch (error) {
      console.error("Error!", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

        {/* 🔥 UPDATED FORM: Now uses onSubmit instead of action */}
        <form onSubmit={handleSubmit} className="space-y-6">
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
          
          <Button type="submit" className="w-full h-12 text-lg font-semibold" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...
              </>
            ) : (
              <>
                <MessageSquare className="w-4 h-4 mr-2" /> Send Message
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}