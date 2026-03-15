import { useState } from "react";
import Head from "next/head";
import { Mail, MessageSquare, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [loading, setLoading] = useState(false);

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

  return (
    <>
      <Head>
        <title>Contact Toolsy | Partner With Us</title>
        <meta name="description" content="Want to feature your AI tool or report a bug? Reach out to the Toolsy team." />
      </Head>
      <div className="min-h-screen bg-[#050505] pt-24 pb-12 px-6">
        <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Partner with Toolsy</h1>
            <p className="text-gray-500">Want to feature your AI tool or report a bug? Reach out to us below.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400">Your Name</label>
                <input id="name" name="name" placeholder="John Doe" required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-600 outline-none focus:border-primary" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400">Email Address</label>
                <input id="email" name="email" type="email" placeholder="hello@startup.com" required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-600 outline-none focus:border-primary" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-400">Subject</label>
              <input id="subject" name="subject" placeholder="e.g., Featured Listing Inquiry" required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-600 outline-none focus:border-primary" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-400">Message</label>
              <textarea id="message" name="message" placeholder="Tell us about your tool..." rows={5} required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-600 outline-none focus:border-primary resize-none" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-black text-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : <><MessageSquare className="w-4 h-4" /> Send Message</>}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}