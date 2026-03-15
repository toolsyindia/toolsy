import { useState } from "react";
import Head from "next/head";
import { useAuth } from "@/hooks/useAuth";
import { useTools, useAddTool, useUpdateTool, useDeleteTool } from "@/hooks/useTools";
import { toast } from "sonner";
import {
  Pencil, Trash2, Plus, LogOut, LayoutDashboard, Star, TrendingUp,
  Search, MousePointer2, CalendarClock, Ban, Tags, Check, X
} from "lucide-react";

const emptyTool = {
  name: "",
  description: "",
  category: "",
  pricing: "Free",
  featured: false,
  suggested: false,
  link: "",
  icon: "",
  sponsored_until: "",
  click_count: 0,
  tags: "",
};

// ============================================================
// LOGIN FORM
// ============================================================
function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onLogin(email, password);
    } catch (err) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-3xl p-8">
        <h1 className="text-2xl font-black text-white text-center mb-8">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)} required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 outline-none focus:border-primary" />
          <input type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 outline-none focus:border-primary" />
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-primary text-white font-black rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ============================================================
// TOOL FORM MODAL
// ============================================================
function ToolFormModal({ initial, onSubmit, onCancel, submitLabel, featuredCount, categorySuggestedCount }) {
  const [form, setForm] = useState(initial);
  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const canFeature = form.featured || featuredCount < 6;
  const canSuggest = form.suggested || categorySuggestedCount < 3;

  return (
    <div className="fixed inset-0 z-[999] bg-black/80 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-[#0F0F0F] border border-white/10 rounded-3xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black text-white">{submitLabel}</h2>
          <button onClick={onCancel} className="p-2 text-gray-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-400">Name</label>
              <input value={form.name} onChange={(e) => set("name", e.target.value)} required
                placeholder="e.g. ChatGPT"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-600 outline-none focus:border-primary" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-400">Icon (emoji)</label>
              <input value={form.icon} onChange={(e) => set("icon", e.target.value)}
                placeholder="e.g. 🧠"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-600 outline-none focus:border-primary" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-400">Description</label>
            <textarea value={form.description} onChange={(e) => set("description", e.target.value)} required
              placeholder="What does this tool do?" rows={3}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-600 outline-none focus:border-primary resize-none" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-400">Category</label>
              <input value={form.category} onChange={(e) => set("category", e.target.value)} required
                placeholder="e.g. Coding"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-600 outline-none focus:border-primary" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-400">Pricing</label>
              <select value={form.pricing} onChange={(e) => set("pricing", e.target.value)}
                className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-white/10 rounded-xl text-white outline-none focus:border-primary">
                <option value="Free">Free</option>
                <option value="Freemium">Freemium</option>
                <option value="Premium">Premium</option>
              </select>
            </div>
          </div>

          <div className="space-y-2 p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/20">
            <label className="text-sm font-bold text-indigo-400 flex items-center gap-2">
              <Tags className="w-4 h-4" /> Matchmaker Tag (For Quiz)
            </label>
            <select value={form.tags || "none"} onChange={(e) => set("tags", e.target.value === "none" ? "" : e.target.value)}
              className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-indigo-500/20 rounded-xl text-white outline-none focus:border-indigo-500">
              <option value="none">No Tag (Skip in Quiz)</option>
              <option value="video">🎬 Video Editing / Generation</option>
              <option value="code">💻 Coding & Web Dev</option>
              <option value="design">🎨 Design & Images</option>
              <option value="writing">✍️ Writing & Chatbots</option>
              <option value="audio">🎵 Audio & Voice</option>
              <option value="automation">⚙️ Automation & Workflows</option>
              <option value="data">📊 Data & Analytics</option>
              <option value="utility">🛠️ Everyday Utilities</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-400">Link (URL)</label>
            <input value={form.link} onChange={(e) => set("link", e.target.value)} required
              placeholder="https://..."
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-600 outline-none focus:border-primary" />
          </div>

          <div className="space-y-2 p-4 bg-white/5 rounded-xl border border-dashed border-white/10">
            <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
              <CalendarClock className="w-4 h-4 text-primary" /> Sponsorship Expiry Date
            </label>
            <input type="date" value={form.sponsored_until || ""} onChange={(e) => set("sponsored_until", e.target.value)}
              className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-white/10 rounded-xl text-white outline-none focus:border-primary" />
            <p className="text-[10px] text-gray-600">Leave empty for permanent tools.</p>
          </div>

          <div className="space-y-3 p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => canFeature && set("featured", !(form.featured === true || String(form.featured) === "true"))}
                  className={`w-11 h-6 rounded-full transition-all relative ${(form.featured === true || String(form.featured) === "true") ? "bg-primary" : "bg-white/10"} ${!canFeature ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}>
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${(form.featured === true || String(form.featured) === "true") ? "left-5" : "left-0.5"}`} />
                </button>
                <label className="font-bold text-white text-sm">⭐ Featured Slot {featuredCount}/6</label>
              </div>
              {!canFeature && <span className="text-[10px] text-red-500 font-black uppercase">Slots Full</span>}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => canSuggest && set("suggested", !(form.suggested === true || String(form.suggested) === "true"))}
                  className={`w-11 h-6 rounded-full transition-all relative ${(form.suggested === true || String(form.suggested) === "true") ? "bg-blue-500" : "bg-white/10"} ${!canSuggest ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}>
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${(form.suggested === true || String(form.suggested) === "true") ? "left-5" : "left-0.5"}`} />
                </button>
                <label className="font-bold text-white text-sm">📈 Suggested {categorySuggestedCount}/3</label>
              </div>
              {!canSuggest && <span className="text-[10px] text-red-500 font-black uppercase">Limit Reached</span>}
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-white/10">
            <button type="button" onClick={onCancel}
              className="px-5 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white font-bold transition-all">
              Cancel
            </button>
            <button type="submit"
              className="px-5 py-2.5 rounded-xl bg-primary text-white font-black hover:bg-primary/90 transition-all">
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ============================================================
// MAIN CONTROL PANEL
// ============================================================
export default function ControlPanel() {
  const { user, loading: authLoading, signIn, signOut } = useAuth();
  const { data: tools, isLoading } = useTools();
  const addTool = useAddTool();
  const updateTool = useUpdateTool();
  const deleteTool = useDeleteTool();

  const [view, setView] = useState("database");
  const [editingTool, setEditingTool] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  if (authLoading) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center text-gray-500">
      Loading Admin Engine...
    </div>
  );
  if (!user) return <LoginForm onLogin={signIn} />;

  const isSponsorshipActive = (tool, type) => {
    const isMarked = tool[type] === true || String(tool[type]) === "true";
    if (!isMarked) return false;
    if (!tool.sponsored_until) return true;
    const expiryDate = new Date(tool.sponsored_until);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return expiryDate >= today;
  };

  const totalTools = tools?.length || 0;
  const activeFeatured = tools?.filter(t => isSponsorshipActive(t, "featured")).length || 0;
  const activeSuggested = tools?.filter(t => isSponsorshipActive(t, "suggested")).length || 0;
  const totalClicks = tools?.reduce((acc, tool) => acc + (tool.click_count || 0), 0) || 0;

  const featuredTools = tools?.filter(t => isSponsorshipActive(t, "featured")) || [];
  const suggestedTools = tools?.filter(t => isSponsorshipActive(t, "suggested")) || [];
  const premiumSlots = Array.from({ length: 6 }).map((_, i) => featuredTools[i] || null);

  const filteredTools = tools?.filter((tool) =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = async (data) => {
    try {
      const payload = { ...data };
      if (!payload.sponsored_until) payload.sponsored_until = null;
      await addTool.mutateAsync(payload);
      toast.success("Tool added successfully! 🚀");
      setAddOpen(false);
    } catch (err) { toast.error(err.message); }
  };

  const handleEdit = async (data) => {
    if (!editingTool) return;
    try {
      const payload = { ...data };
      if (!payload.sponsored_until) payload.sponsored_until = null;
      await updateTool.mutateAsync({ id: editingTool.id, ...payload });
      toast.success("Tool updated! 🛠️");
      setEditOpen(false);
      setEditingTool(null);
    } catch (err) { toast.error(err.message); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this tool?")) return;
    try {
      await deleteTool.mutateAsync(id);
      toast.success("Tool deleted 🗑️");
    } catch (err) { toast.error(err.message); }
  };

  const toggleField = async (tool, field, newValue) => {
    if (newValue === true) {
      if (field === "featured" && activeFeatured >= 6) return toast.error("Maximum 6 Featured slots allowed!");
      if (field === "suggested") {
        const catCount = tools?.filter(t => t.category === tool.category && isSponsorshipActive(t, "suggested")).length || 0;
        if (catCount >= 3) return toast.error("Maximum 3 suggested tools per category!");
      }
    }
    try {
      await updateTool.mutateAsync({ ...tool, [field]: newValue });
      toast.success(`${field} status updated!`);
    } catch (err) { toast.error(err.message); }
  };

  const handleRevokeAd = async (tool, field) => {
    if (!confirm(`Remove ${tool.name} from ${field} slot?`)) return;
    try {
      await updateTool.mutateAsync({ ...tool, [field]: false });
      toast.success(`${tool.name} removed from ${field} slots!`);
    } catch (err) { toast.error(err.message); }
  };

  return (
    <>
      <Head>
        <title>Toolsy Admin Panel</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8 pt-12">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-black tracking-tighter text-white">Toolsy <span className="text-primary">Admin</span> Hub</h1>
              <p className="text-gray-500 text-sm">Automated sponsorship management and real-time analytics.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setAddOpen(true)}
                className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-black rounded-xl hover:bg-primary/90 transition-all">
                <Plus className="w-5 h-5" /> Add Tool
              </button>
              <button onClick={signOut}
                className="flex items-center gap-2 px-4 py-2.5 border border-white/10 text-gray-400 hover:text-white font-bold rounded-xl transition-all">
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          </div>

          {/* METRICS */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Total Tools", value: totalTools, sub: "Live in Database", color: "text-emerald-500", icon: <LayoutDashboard className="h-4 w-4 text-emerald-500" /> },
              { label: "Traffic", value: totalClicks, sub: "Total Clicks", color: "text-primary", icon: <MousePointer2 className="h-4 w-4 text-primary" /> },
              { label: "Featured Slots", value: `${activeFeatured}/6`, sub: activeFeatured >= 6 ? "SLOTS FULL" : "Premium Slots", color: activeFeatured >= 6 ? "text-red-500" : "text-yellow-500", icon: <Star className={`h-4 w-4 ${activeFeatured >= 6 ? "text-red-500" : "text-yellow-500"}`} /> },
              { label: "Suggested", value: activeSuggested, sub: "Search Ads", color: "text-blue-500", icon: <TrendingUp className="h-4 w-4 text-blue-500" /> },
            ].map((card) => (
              <div key={card.label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">{card.label}</span>
                  {card.icon}
                </div>
                <div className="text-3xl font-black text-white">{card.value}</div>
                <p className={`text-[10px] font-bold mt-1 uppercase ${card.color}`}>{card.sub}</p>
              </div>
            ))}
          </div>

          {/* TABS */}
          <div className="flex gap-4 border-b border-white/10 pb-4">
            <button onClick={() => setView("database")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${view === "database" ? "bg-white/10 text-white" : "text-gray-500 hover:text-white"}`}>
              <LayoutDashboard className="w-4 h-4" /> Full Database
            </button>
            <button onClick={() => setView("ads")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${view === "ads" ? "bg-primary/20 text-primary" : "text-gray-500 hover:text-white"}`}>
              <Star className="w-4 h-4" /> Ad Manager Pro
            </button>
          </div>

          {/* DATABASE VIEW */}
          {view === "database" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 max-w-md bg-white/5 rounded-2xl px-4 py-2 border border-white/10">
                <Search className="h-4 w-4 text-gray-500" />
                <input type="text" placeholder="Filter by name or category..."
                  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-white placeholder:text-gray-600 outline-none w-full text-sm" />
              </div>

              <div className="bg-[#0F0F0F] border border-white/5 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/5">
                      <tr>
                        {["Tool & Traffic", "Category", "Status / Expiry", "Actions"].map((h, i) => (
                          <th key={h} className={`py-4 px-4 text-[10px] font-black uppercase text-gray-500 tracking-widest ${i === 3 ? "text-right" : "text-left"}`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTools?.map((tool) => {
                        const featuredActive = isSponsorshipActive(tool, "featured");
                        const suggestedActive = isSponsorshipActive(tool, "suggested");
                        return (
                          <tr key={tool.id} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl p-2 bg-white/5 rounded-xl border border-white/5">{tool.icon || "⚡"}</span>
                                <div>
                                  <div className="font-bold text-white">{tool.name}</div>
                                  <div className="text-[10px] text-primary font-black uppercase">📈 {tool.click_count || 0} clicks</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-[10px] font-bold uppercase text-gray-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">{tool.category}</span>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-4">
                                  <button onClick={() => toggleField(tool, "featured", !featuredActive)}
                                    className={`w-9 h-5 rounded-full relative transition-all ${featuredActive ? "bg-yellow-500" : "bg-white/10"}`}>
                                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${featuredActive ? "left-4" : "left-0.5"}`} />
                                  </button>
                                  <Star className={`w-3 h-3 ${featuredActive ? "text-yellow-500 fill-yellow-500" : "text-gray-700"}`} />
                                  <button onClick={() => toggleField(tool, "suggested", !suggestedActive)}
                                    className={`w-9 h-5 rounded-full relative transition-all ${suggestedActive ? "bg-blue-500" : "bg-white/10"}`}>
                                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${suggestedActive ? "left-4" : "left-0.5"}`} />
                                  </button>
                                  <TrendingUp className={`w-3 h-3 ${suggestedActive ? "text-blue-500" : "text-gray-700"}`} />
                                </div>
                                {tool.sponsored_until && (
                                  <span className="text-[10px] font-bold text-gray-600 flex items-center gap-1">
                                    <CalendarClock className="w-3 h-3" /> Ends: {new Date(tool.sponsored_until).toLocaleDateString()}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex gap-2 justify-end">
                                <button onClick={() => { setEditingTool(tool); setEditOpen(true); }}
                                  className="p-2 bg-white/5 border border-white/10 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-all">
                                  <Pencil className="h-4 w-4" />
                                </button>
                                <button onClick={() => handleDelete(tool.id)}
                                  className="p-2 bg-white/5 border border-white/10 text-red-500 hover:bg-red-500/10 rounded-lg transition-all">
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ADS VIEW */}
          {view === "ads" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2 mb-4">
                  <Star className="text-yellow-500 fill-yellow-500 w-5 h-5" /> Premium Top 6 Slots
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {premiumSlots.map((tool, index) => tool ? (
                    <div key={tool.id} className="bg-white/5 border border-yellow-500/30 rounded-2xl p-5 shadow-[0_0_15px_rgba(234,179,8,0.1)]">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] font-black uppercase text-yellow-500 tracking-widest">Slot #{index + 1}</span>
                        <span className="text-white bg-white/10 px-2 py-0.5 rounded text-xs font-bold">{tool.click_count || 0} clicks</span>
                      </div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">{tool.icon || "⚡"}</span>
                        <span className="font-bold text-lg text-white truncate">{tool.name}</span>
                      </div>
                      {tool.sponsored_until && (
                        <p className="text-[10px] text-gray-400 flex items-center gap-1 mb-4">
                          <CalendarClock className="w-3 h-3" /> Ends: {new Date(tool.sponsored_until).toLocaleDateString()}
                        </p>
                      )}
                      <button onClick={() => handleRevokeAd(tool, "featured")}
                        className="w-full py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl font-bold text-sm hover:bg-red-500/20 transition-all flex items-center justify-center gap-2">
                        <Ban className="w-4 h-4" /> Revoke Slot
                      </button>
                    </div>
                  ) : (
                    <div key={`empty-${index}`} className="bg-transparent border border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center min-h-[160px]">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mb-2">
                        <span className="text-gray-600 font-bold">{index + 1}</span>
                      </div>
                      <p className="text-sm font-bold text-gray-400">EMPTY SLOT</p>
                      <p className="text-[10px] text-primary mt-1 uppercase tracking-widest">Ready to sell</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <h2 className="text-xl font-black text-white flex items-center gap-2 mb-4">
                  <TrendingUp className="text-blue-500 w-5 h-5" /> Active Category Ads
                </h2>
                {suggestedTools.length === 0 ? (
                  <div className="p-8 text-center text-gray-500 border border-white/10 rounded-2xl bg-white/5">
                    No active category ads running right now.
                  </div>
                ) : (
                  <div className="bg-[#0F0F0F] border border-white/5 rounded-2xl overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-white/5">
                        <tr>
                          {["Tool", "Target Category", "Action"].map((h, i) => (
                            <th key={h} className={`py-3 px-4 text-[10px] font-black uppercase text-gray-500 tracking-widest ${i === 2 ? "text-right" : "text-left"}`}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {suggestedTools.map((tool) => (
                          <tr key={tool.id} className="border-t border-white/5">
                            <td className="py-3 px-4 font-bold text-white">{tool.icon || "⚡"} {tool.name}</td>
                            <td className="py-3 px-4">
                              <span className="text-[10px] font-bold uppercase text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-md">{tool.category}</span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <button onClick={() => handleRevokeAd(tool, "suggested")}
                                className="text-red-500 hover:text-red-400 text-sm font-bold flex items-center gap-1 ml-auto">
                                <Ban className="w-3 h-3" /> Revoke
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {addOpen && (
        <ToolFormModal
          initial={emptyTool}
          onSubmit={handleAdd}
          onCancel={() => setAddOpen(false)}
          submitLabel="Add to Directory"
          featuredCount={activeFeatured}
          categorySuggestedCount={0}
        />
      )}

      {editOpen && editingTool && (
        <ToolFormModal
          initial={editingTool}
          onSubmit={handleEdit}
          onCancel={() => { setEditOpen(false); setEditingTool(null); }}
          submitLabel="Save Changes"
          featuredCount={activeFeatured}
          categorySuggestedCount={tools?.filter(t => t.id !== editingTool.id && t.category === editingTool.category && isSponsorshipActive(t, "suggested")).length || 0}
        />
      )}
    </>
  );
}