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
  name: "", description: "", category: "", pricing: "Free",
  featured: false, suggested: false, link: "", icon: "",
  sponsored_until: "", click_count: 0, tags: "",
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
    try { await onLogin(email, password); } 
    catch (err) { toast.error(err.message || "Login failed"); } 
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#050505", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", fontFamily: "'Outfit', 'Inter', sans-serif" }}>
      <div style={{ width: "100%", maxWidth: "400px", backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "1.5rem", padding: "2.5rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 900, color: "white", textAlign: "center", marginBottom: "2rem" }}>Admin Login</h1>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="admin-input" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="admin-input" />
          <button type="submit" disabled={loading} style={{ width: "100%", padding: "1rem", backgroundColor: "#8b5cf6", color: "white", fontWeight: 900, borderRadius: "0.75rem", border: "none", cursor: loading ? "not-allowed" : "pointer", marginTop: "0.5rem", transition: "opacity 0.2s" }}>
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

  const labelStyle = { fontSize: "0.85rem", fontWeight: 700, color: "#9ca3af", display: "block", marginBottom: "0.5rem" };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 999, backgroundColor: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ width: "100%", maxWidth: "600px", backgroundColor: "#0F0F0F", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1.5rem", padding: "2rem", maxHeight: "90vh", overflowY: "auto" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 900, color: "white" }}>{submitLabel}</h2>
          <button type="button" onClick={onCancel} style={{ background: "transparent", border: "none", color: "#6b7280", cursor: "pointer" }}><X size={20} /></button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={labelStyle}>Name</label>
              <input value={form.name} onChange={(e) => set("name", e.target.value)} required placeholder="e.g. ChatGPT" className="admin-input" />
            </div>
            <div>
              <label style={labelStyle}>Icon (emoji)</label>
              <input value={form.icon} onChange={(e) => set("icon", e.target.value)} placeholder="e.g. 🧠" className="admin-input" />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Description</label>
            <textarea value={form.description} onChange={(e) => set("description", e.target.value)} required placeholder="What does this tool do?" rows={3} className="admin-input" style={{ resize: "none" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={labelStyle}>Category</label>
              <input value={form.category} onChange={(e) => set("category", e.target.value)} required placeholder="e.g. Coding" className="admin-input" />
            </div>
            <div>
              <label style={labelStyle}>Pricing</label>
              <select value={form.pricing} onChange={(e) => set("pricing", e.target.value)} className="admin-input">
                <option value="Free">Free</option>
                <option value="Freemium">Freemium</option>
                <option value="Premium">Premium</option>
              </select>
            </div>
          </div>

          <div style={{ backgroundColor: "rgba(99, 102, 241, 0.05)", padding: "1rem", borderRadius: "1rem", border: "1px solid rgba(99, 102, 241, 0.2)" }}>
            <label style={{ ...labelStyle, color: "#818cf8", display: "flex", alignItems: "center", gap: "0.5rem" }}><Tags size={16} /> Matchmaker Tag</label>
            <select value={form.tags || "none"} onChange={(e) => set("tags", e.target.value === "none" ? "" : e.target.value)} className="admin-input" style={{ borderColor: "rgba(99, 102, 241, 0.2)" }}>
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

          <div>
            <label style={labelStyle}>Link (URL)</label>
            <input value={form.link} onChange={(e) => set("link", e.target.value)} required placeholder="https://..." className="admin-input" />
          </div>

          <div style={{ backgroundColor: "rgba(255,255,255,0.03)", padding: "1rem", borderRadius: "1rem", border: "1px dashed rgba(255,255,255,0.1)" }}>
            <label style={{ ...labelStyle, display: "flex", alignItems: "center", gap: "0.5rem" }}><CalendarClock size={16} color="#8b5cf6" /> Sponsorship Expiry Date</label>
            <input type="date" value={form.sponsored_until || ""} onChange={(e) => set("sponsored_until", e.target.value)} className="admin-input" />
          </div>

          <div style={{ backgroundColor: "rgba(255,255,255,0.03)", padding: "1.25rem", borderRadius: "1rem", border: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", gap: "1rem" }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <button type="button" onClick={() => canFeature && set("featured", !(form.featured === true || String(form.featured) === "true"))} style={{ width: "3rem", height: "1.5rem", borderRadius: "9999px", position: "relative", backgroundColor: (form.featured === true || String(form.featured) === "true") ? "#8b5cf6" : "rgba(255,255,255,0.1)", border: "none", cursor: canFeature ? "pointer" : "not-allowed", opacity: canFeature ? 1 : 0.5 }}>
                  <span style={{ position: "absolute", top: "2px", left: (form.featured === true || String(form.featured) === "true") ? "calc(100% - 22px)" : "2px", width: "20px", height: "20px", backgroundColor: "white", borderRadius: "50%", transition: "all 0.2s" }} />
                </button>
                <span style={{ fontWeight: 700, color: "white", fontSize: "0.9rem" }}>⭐ Featured Slot {featuredCount}/6</span>
              </div>
              {!canFeature && <span style={{ fontSize: "0.65rem", fontWeight: 900, color: "#ef4444", textTransform: "uppercase" }}>Slots Full</span>}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <button type="button" onClick={() => canSuggest && set("suggested", !(form.suggested === true || String(form.suggested) === "true"))} style={{ width: "3rem", height: "1.5rem", borderRadius: "9999px", position: "relative", backgroundColor: (form.suggested === true || String(form.suggested) === "true") ? "#3b82f6" : "rgba(255,255,255,0.1)", border: "none", cursor: canSuggest ? "pointer" : "not-allowed", opacity: canSuggest ? 1 : 0.5 }}>
                  <span style={{ position: "absolute", top: "2px", left: (form.suggested === true || String(form.suggested) === "true") ? "calc(100% - 22px)" : "2px", width: "20px", height: "20px", backgroundColor: "white", borderRadius: "50%", transition: "all 0.2s" }} />
                </button>
                <span style={{ fontWeight: 700, color: "white", fontSize: "0.9rem" }}>📈 Suggested {categorySuggestedCount}/3</span>
              </div>
              {!canSuggest && <span style={{ fontSize: "0.65rem", fontWeight: 900, color: "#ef4444", textTransform: "uppercase" }}>Limit Reached</span>}
            </div>

          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <button type="button" onClick={onCancel} style={{ padding: "0.75rem 1.25rem", borderRadius: "0.75rem", backgroundColor: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "#9ca3af", fontWeight: 700, cursor: "pointer" }}>Cancel</button>
            <button type="submit" style={{ padding: "0.75rem 1.25rem", borderRadius: "0.75rem", backgroundColor: "#8b5cf6", border: "none", color: "white", fontWeight: 900, cursor: "pointer" }}>{submitLabel}</button>
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

  if (authLoading) return <div style={{ minHeight: "100vh", backgroundColor: "#050505", display: "flex", alignItems: "center", justifyContent: "center", color: "#6b7280" }}>Loading Admin Engine...</div>;
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
    try { await deleteTool.mutateAsync(id); toast.success("Tool deleted 🗑️"); } 
    catch (err) { toast.error(err.message); }
  };

  const toggleField = async (tool, field, newValue) => {
    if (newValue === true) {
      if (field === "featured" && activeFeatured >= 6) return toast.error("Maximum 6 Featured slots allowed!");
      if (field === "suggested") {
        const catCount = tools?.filter(t => t.category === tool.category && isSponsorshipActive(t, "suggested")).length || 0;
        if (catCount >= 3) return toast.error("Maximum 3 suggested tools per category!");
      }
    }
    try { await updateTool.mutateAsync({ ...tool, [field]: newValue }); toast.success(`${field} status updated!`); } 
    catch (err) { toast.error(err.message); }
  };

  const handleRevokeAd = async (tool, field) => {
    if (!confirm(`Remove ${tool.name} from ${field} slot?`)) return;
    try { await updateTool.mutateAsync({ ...tool, [field]: false }); toast.success(`${tool.name} removed!`); } 
    catch (err) { toast.error(err.message); }
  };

  return (
    <>
      <Head>
        <title>Toolsy Admin Panel</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <style>{`
        .admin-input { width: 100%; padding: 0.75rem 1rem; background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 0.75rem; color: white; outline: none; font-family: inherit; font-size: 0.95rem; box-sizing: border-box; transition: border-color 0.2s; }
        .admin-input:focus { border-color: #8b5cf6; }
        .admin-btn { padding: 0.6rem 1.25rem; border-radius: 0.75rem; font-weight: 700; display: inline-flex; align-items: center; gap: 0.5rem; cursor: pointer; border: none; font-family: inherit; transition: opacity 0.2s; }
        .admin-btn:hover { opacity: 0.8; }
        .admin-table-th { padding: 1rem; font-size: 0.65rem; font-weight: 900; text-transform: uppercase; color: #6b7280; letter-spacing: 0.1em; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .admin-table-td { padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); }
      `}</style>

      <div style={{ minHeight: "100vh", backgroundColor: "#050505", color: "white", padding: "6rem 1.5rem 2rem", fontFamily: "'Outfit', 'Inter', sans-serif", boxSizing: "border-box" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem" }}>

          {/* HEADER */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
            <div>
              <h1 style={{ fontSize: "2rem", fontWeight: 900, letterSpacing: "-0.02em", margin: 0 }}>Toolsy <span style={{ color: "#8b5cf6" }}>Admin</span> Hub</h1>
              <p style={{ color: "#6b7280", fontSize: "0.9rem", margin: "0.25rem 0 0 0" }}>Automated sponsorship management.</p>
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button onClick={() => setAddOpen(true)} className="admin-btn" style={{ backgroundColor: "#8b5cf6", color: "white" }}>
                <Plus size={18} /> Add Tool
              </button>
              <button onClick={signOut} className="admin-btn" style={{ backgroundColor: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "#9ca3af" }}>
                <LogOut size={18} /> Sign Out
              </button>
            </div>
          </div>

          {/* METRICS */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            {[
              { label: "Total Tools", value: totalTools, sub: "Live in Database", color: "#10b981", icon: <LayoutDashboard size={16} color="#10b981" /> },
              { label: "Traffic", value: totalClicks, sub: "Total Clicks", color: "#8b5cf6", icon: <MousePointer2 size={16} color="#8b5cf6" /> },
              { label: "Featured Slots", value: `${activeFeatured}/6`, sub: activeFeatured >= 6 ? "SLOTS FULL" : "Premium Slots", color: activeFeatured >= 6 ? "#ef4444" : "#eab308", icon: <Star size={16} color={activeFeatured >= 6 ? "#ef4444" : "#eab308"} /> },
              { label: "Suggested", value: activeSuggested, sub: "Search Ads", color: "#3b82f6", icon: <TrendingUp size={16} color="#3b82f6" /> },
            ].map((card, i) => (
              <div key={i} style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "1rem", padding: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "0.65rem", fontWeight: 900, textTransform: "uppercase", color: "#6b7280", letterSpacing: "0.1em" }}>{card.label}</span>
                  {card.icon}
                </div>
                <div style={{ fontSize: "2rem", fontWeight: 900 }}>{card.value}</div>
                <div style={{ fontSize: "0.65rem", fontWeight: 900, textTransform: "uppercase", color: card.color, marginTop: "0.25rem" }}>{card.sub}</div>
              </div>
            ))}
          </div>

          {/* TABS */}
          <div style={{ display: "flex", gap: "0.5rem", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "1rem" }}>
            <button onClick={() => setView("database")} className="admin-btn" style={{ backgroundColor: view === "database" ? "rgba(255,255,255,0.1)" : "transparent", color: view === "database" ? "white" : "#6b7280" }}>
              <LayoutDashboard size={16} /> Full Database
            </button>
            <button onClick={() => setView("ads")} className="admin-btn" style={{ backgroundColor: view === "ads" ? "rgba(139, 92, 246, 0.15)" : "transparent", color: view === "ads" ? "#8b5cf6" : "#6b7280" }}>
              <Star size={16} /> Ad Manager Pro
            </button>
          </div>

          {/* DATABASE VIEW */}
          {view === "database" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", maxWidth: "300px", backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.75rem", padding: "0.5rem 1rem" }}>
                <Search size={16} color="#6b7280" />
                <input type="text" placeholder="Filter by name..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ background: "transparent", border: "none", color: "white", outline: "none", width: "100%", fontFamily: "inherit" }} />
              </div>

              <div style={{ backgroundColor: "#0F0F0F", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "1rem", overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead style={{ backgroundColor: "rgba(255,255,255,0.02)" }}>
                    <tr>
                      <th className="admin-table-th">Tool & Traffic</th>
                      <th className="admin-table-th">Category</th>
                      <th className="admin-table-th">Status</th>
                      <th className="admin-table-th" style={{ textAlign: "right" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTools?.map((tool) => {
                      const featuredActive = isSponsorshipActive(tool, "featured");
                      const suggestedActive = isSponsorshipActive(tool, "suggested");
                      return (
                        <tr key={tool.id}>
                          <td className="admin-table-td">
                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                              <span style={{ fontSize: "1.5rem", padding: "0.5rem", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "0.5rem", border: "1px solid rgba(255,255,255,0.05)" }}>{tool.icon || "⚡"}</span>
                              <div>
                                <div style={{ fontWeight: 700 }}>{tool.name}</div>
                                <div style={{ fontSize: "0.65rem", color: "#8b5cf6", fontWeight: 900, textTransform: "uppercase" }}>📈 {tool.click_count || 0} clicks</div>
                              </div>
                            </div>
                          </td>
                          <td className="admin-table-td">
                            <span style={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", color: "#9ca3af", backgroundColor: "rgba(255,255,255,0.05)", padding: "0.25rem 0.5rem", borderRadius: "0.25rem", border: "1px solid rgba(255,255,255,0.1)" }}>{tool.category}</span>
                          </td>
                          <td className="admin-table-td">
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <button onClick={() => toggleField(tool, "featured", !featuredActive)} style={{ width: "2rem", height: "1.2rem", borderRadius: "9999px", position: "relative", backgroundColor: featuredActive ? "#eab308" : "rgba(255,255,255,0.1)", border: "none", cursor: "pointer" }}>
                                  <span style={{ position: "absolute", top: "2px", left: featuredActive ? "calc(100% - 16px)" : "2px", width: "14px", height: "14px", backgroundColor: "white", borderRadius: "50%", transition: "all 0.2s" }} />
                                </button>
                                <Star size={14} color={featuredActive ? "#eab308" : "#4b5563"} fill={featuredActive ? "#eab308" : "none"} />
                                
                                <button onClick={() => toggleField(tool, "suggested", !suggestedActive)} style={{ width: "2rem", height: "1.2rem", borderRadius: "9999px", position: "relative", backgroundColor: suggestedActive ? "#3b82f6" : "rgba(255,255,255,0.1)", border: "none", cursor: "pointer", marginLeft: "0.5rem" }}>
                                  <span style={{ position: "absolute", top: "2px", left: suggestedActive ? "calc(100% - 16px)" : "2px", width: "14px", height: "14px", backgroundColor: "white", borderRadius: "50%", transition: "all 0.2s" }} />
                                </button>
                                <TrendingUp size={14} color={suggestedActive ? "#3b82f6" : "#4b5563"} />
                              </div>
                              {tool.sponsored_until && (
                                <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "#6b7280", display: "flex", alignItems: "center", gap: "0.25rem" }}><CalendarClock size={10} /> Ends: {new Date(tool.sponsored_until).toLocaleDateString()}</span>
                              )}
                            </div>
                          </td>
                          <td className="admin-table-td" style={{ textAlign: "right" }}>
                            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                              <button onClick={() => { setEditingTool(tool); setEditOpen(true); }} style={{ padding: "0.5rem", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.5rem", color: "#3b82f6", cursor: "pointer" }}><Pencil size={16} /></button>
                              <button onClick={() => handleDelete(tool.id)} style={{ padding: "0.5rem", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.5rem", color: "#ef4444", cursor: "pointer" }}><Trash2 size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ADS VIEW */}
          {view === "ads" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <div>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 900, display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}><Star color="#eab308" fill="#eab308" size={20} /> Premium Top 6 Slots</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}>
                  {premiumSlots.map((tool, index) => tool ? (
                    <div key={tool.id} style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(234, 179, 8, 0.3)", borderRadius: "1rem", padding: "1.25rem", boxShadow: "0 0 20px rgba(234, 179, 8, 0.05)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                        <span style={{ fontSize: "0.65rem", fontWeight: 900, color: "#eab308", textTransform: "uppercase", letterSpacing: "0.1em" }}>Slot #{index + 1}</span>
                        <span style={{ fontSize: "0.75rem", fontWeight: 700, backgroundColor: "rgba(255,255,255,0.1)", padding: "0.1rem 0.4rem", borderRadius: "0.25rem" }}>{tool.click_count || 0} clicks</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                        <span style={{ fontSize: "2rem" }}>{tool.icon || "⚡"}</span>
                        <span style={{ fontSize: "1.25rem", fontWeight: 700 }}>{tool.name}</span>
                      </div>
                      <button onClick={() => handleRevokeAd(tool, "featured")} style={{ width: "100%", padding: "0.5rem", backgroundColor: "rgba(239, 68, 68, 0.1)", color: "#ef4444", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "0.5rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}><Ban size={14} /> Revoke Slot</button>
                    </div>
                  ) : (
                    <div key={`empty-${index}`} style={{ border: "1px dashed rgba(255,255,255,0.2)", borderRadius: "1rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "150px" }}>
                      <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.5rem", fontWeight: 700, color: "#6b7280" }}>{index + 1}</div>
                      <span style={{ fontSize: "0.85rem", fontWeight: 900, color: "#9ca3af" }}>EMPTY SLOT</span>
                      <span style={{ fontSize: "0.65rem", fontWeight: 900, color: "#8b5cf6", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.25rem" }}>Ready to sell</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {addOpen && <ToolFormModal initial={emptyTool} onSubmit={handleAdd} onCancel={() => setAddOpen(false)} submitLabel="Add to Directory" featuredCount={activeFeatured} categorySuggestedCount={0} />}
      {editOpen && editingTool && <ToolFormModal initial={editingTool} onSubmit={handleEdit} onCancel={() => { setEditOpen(false); setEditingTool(null); }} submitLabel="Save Changes" featuredCount={activeFeatured} categorySuggestedCount={tools?.filter(t => t.id !== editingTool.id && t.category === editingTool.category && isSponsorshipActive(t, "suggested")).length || 0} />}
    </>
  );
}