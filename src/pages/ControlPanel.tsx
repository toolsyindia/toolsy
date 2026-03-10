import { useState, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useTools, useAddTool, useUpdateTool, useDeleteTool } from "@/hooks/useTools";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge"; // 🔥 ADDED THIS BADGE IMPORT
import { toast } from "sonner";
import { Pencil, Trash2, Plus, LogOut, LayoutDashboard, Star, TrendingUp, Search, IndianRupee, MousePointer2, CalendarClock } from "lucide-react"; 
import type { Tool } from "@/types/tool";

const emptyTool = {
  name: "",
  description: "",
  category: "",
  pricing: "Free" as string,
  featured: false,
  suggested: false,
  link: "",
  icon: "",
  sponsored_until: "",
  click_count: 0,
};

function LoginForm({ onLogin }: { onLogin: (email: string, password: string) => Promise<void> }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onLogin(email, password);
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 pt-28 flex items-center justify-center">
      <Card className="w-full max-w-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <Button type="submit" className="w-full font-bold" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function ToolForm({ 
  initial, 
  onSubmit, 
  onCancel, 
  submitLabel,
  featuredCount,
  categorySuggestedCount
}: { 
  initial: any; 
  onSubmit: (data: any) => void; 
  onCancel: () => void; 
  submitLabel: string;
  featuredCount: number;
  categorySuggestedCount: number;
}) {
  const [form, setForm] = useState(initial);
  const set = (key: string, value: any) => setForm((f) => ({ ...f, [key]: value }));

  const canFeature = form.featured || featuredCount < 6;
  const canSuggest = form.suggested || categorySuggestedCount < 3;

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="space-y-5 max-h-[80vh] overflow-y-auto px-1">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Name</Label>
          <Input value={form.name} onChange={(e) => set("name", e.target.value)} required placeholder="e.g. ChatGPT" />
        </div>
        <div className="space-y-2">
          <Label>Icon (emoji)</Label>
          <Input value={form.icon} onChange={(e) => set("icon", e.target.value)} placeholder="e.g. 🧠" />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea value={form.description} onChange={(e) => set("description", e.target.value)} required placeholder="What does this tool do?" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Category</Label>
          <Input value={form.category} onChange={(e) => set("category", e.target.value)} required placeholder="e.g. Coding" />
        </div>
        <div className="space-y-2">
          <Label>Pricing</Label>
          <Select value={form.pricing} onValueChange={(v) => set("pricing", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Free">Free</SelectItem>
              <SelectItem value="Freemium">Freemium</SelectItem>
              <SelectItem value="Premium">Premium</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Link (URL)</Label>
        <Input value={form.link} onChange={(e) => set("link", e.target.value)} required placeholder="https://..." />
      </div>

      <div className="space-y-2 p-4 bg-muted/30 rounded-lg border border-dashed text-foreground">
        <Label className="flex items-center gap-2"><CalendarClock className="w-4 h-4 text-primary" /> Sponsorship Expiry Date</Label>
        <Input type="date" value={form.sponsored_until || ""} onChange={(e) => set("sponsored_until", e.target.value)} className="bg-background" />
        <p className="text-[10px] text-muted-foreground mt-1">Leave empty for permanent (Unsponsored) tools.</p>
      </div>

      <div className="grid gap-4 p-4 bg-muted/50 rounded-lg border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Switch 
              disabled={!canFeature}
              checked={form.featured === true || String(form.featured) === "true"} 
              onCheckedChange={(v) => set("featured", v)} 
            />
            <Label className={`font-semibold ${!canFeature ? 'text-muted-foreground' : 'cursor-pointer text-foreground'}`}>
              ⭐ Featured Slot {featuredCount}/6
            </Label>
          </div>
          {!canFeature && <span className="text-[10px] text-red-500 font-bold uppercase tracking-tighter">Slots Full</span>}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Switch 
              disabled={!canSuggest}
              checked={form.suggested === true || String(form.suggested) === "true"} 
              onCheckedChange={(v) => set("suggested", v)} 
            />
            <Label className={`font-semibold ${!canSuggest ? 'text-muted-foreground' : 'cursor-pointer text-foreground'}`}>
              📈 Suggested In Category {categorySuggestedCount}/3
            </Label>
          </div>
          {!canSuggest && <span className="text-[10px] text-red-500 font-bold uppercase tracking-tighter">Limit Reached</span>}
        </div>
      </div>

      <div className="flex gap-3 justify-end pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit" className="font-bold">{submitLabel}</Button>
      </div>
    </form>
  );
}

export default function ControlPanel() {
  const { user, loading: authLoading, signIn, signOut } = useAuth();
  const { data: tools, isLoading } = useTools();
  const addTool = useAddTool();
  const updateTool = useUpdateTool();
  const deleteTool = useDeleteTool();
  
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  if (authLoading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground pt-28">Loading Admin Engine...</div>;
  if (!user) return <LoginForm onLogin={signIn} />;

  const isSponsorshipActive = (tool: any, type: 'featured' | 'suggested') => {
    const isMarked = tool[type] === true || String(tool[type]) === "true";
    if (!isMarked) return false;
    if (!tool.sponsored_until) return true;
    const expiryDate = new Date(tool.sponsored_until);
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    return expiryDate >= today;
  };

  const totalTools = tools?.length || 0;
  const activeFeatured = tools?.filter(t => isSponsorshipActive(t, 'featured')).length || 0;
  const activeSuggested = tools?.filter(t => isSponsorshipActive(t, 'suggested')).length || 0;
  const totalClicks = tools?.reduce((acc, tool) => acc + (tool.click_count || 0), 0) || 0;
  const estimatedWeeklyRevenue = (activeFeatured * 300) + (activeSuggested * 99);

  const filteredTools = tools?.filter((tool) => 
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = async (data: any) => {
    try {
      await addTool.mutateAsync(data);
      toast.success("Tool added successfully! 🚀");
      setAddOpen(false);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleEdit = async (data: any) => {
    if (!editingTool) return;
    try {
      await updateTool.mutateAsync({ id: editingTool.id, ...data });
      toast.success("Tool updated! 🛠️");
      setEditOpen(false);
      setEditingTool(null);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this tool?")) return;
    try {
      await deleteTool.mutateAsync(id);
      toast.success("Tool deleted 🗑️");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const toggleField = async (tool: Tool, field: "featured" | "suggested", newValue: boolean) => {
    if (newValue === true) {
      if (field === "featured" && activeFeatured >= 6) {
        return toast.error("Maximum 6 Featured slots allowed!");
      }
      if (field === "suggested") {
        const catCount = tools?.filter(t => t.category === tool.category && isSponsorshipActive(t, 'suggested')).length || 0;
        if (catCount >= 3) return toast.error("Maximum 3 suggested tools per category!");
      }
    }

    try {
      const updatedTool = { ...tool, [field]: newValue };
      await updateTool.mutateAsync(updatedTool);
      toast.success(`${field} status updated!`);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-foreground p-4 md:p-8 pt-24 md:pt-32">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-white">Toolsy <span className="text-primary">Admin</span> Hub</h1>
            <p className="text-gray-500 text-sm">Automated sponsorship management and real-time analytics.</p>
          </div>
          <div className="flex gap-3">
            <Dialog open={addOpen} onOpenChange={setAddOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-white font-black px-6">
                  <Plus className="mr-2 h-5 w-5" /> Add Tool
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg sm:max-w-xl bg-background border-border/50">
                <DialogHeader><DialogTitle className="text-2xl font-black text-foreground">Add New AI Tool</DialogTitle></DialogHeader>
                <ToolForm 
                  initial={emptyTool} 
                  onSubmit={handleAdd} 
                  onCancel={() => setAddOpen(false)} 
                  submitLabel="Add to Directory"
                  featuredCount={activeFeatured}
                  categorySuggestedCount={0}
                />
              </DialogContent>
            </Dialog>
            <Button variant="outline" className="border-white/10 text-gray-400 hover:text-white" onClick={signOut}>
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-white/5 border-white/10 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-black uppercase text-gray-500 tracking-widest">Active Revenue</CardTitle>
              <IndianRupee className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-white">₹{estimatedWeeklyRevenue}</div>
              <p className="text-[10px] text-emerald-500 font-bold mt-1 uppercase">Estimated Weekly</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-black uppercase text-gray-500 tracking-widest">Traffic</CardTitle>
              <MousePointer2 className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-white">{totalClicks}</div>
              <p className="text-[10px] text-primary font-bold mt-1 uppercase">Total Clicks</p>
            </CardContent>
          </Card>

          <Card className={`bg-white/5 border-white/10 ${activeFeatured >= 6 ? 'border-red-500/30' : ''}`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-black uppercase text-gray-500 tracking-widest">Featured Slots</CardTitle>
              <Star className={`h-4 w-4 ${activeFeatured >= 6 ? 'text-red-500' : 'text-yellow-500'}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-white">{activeFeatured}<span className="text-gray-600 text-lg">/6</span></div>
              <p className={`text-[10px] font-bold mt-1 ${activeFeatured >= 6 ? 'text-red-500' : 'text-yellow-500 uppercase'}`}>
                {activeFeatured >= 6 ? 'SLOTS FULL' : 'Premium Slots'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-black uppercase text-gray-500 tracking-widest">Suggested</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-white">{activeSuggested}</div>
              <p className="text-[10px] text-blue-500 font-bold mt-1 uppercase">Search Ads</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4 max-w-md bg-white/5 rounded-2xl p-1 px-4 border border-white/10">
            <Search className="h-4 w-4 text-gray-500" />
            <Input 
              type="text" 
              placeholder="Filter by name or category..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-0 focus-visible:ring-0 text-white placeholder:text-gray-600"
            />
          </div>

          <Card className="bg-[#0F0F0F] border-white/5 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-white/5">
                  <TableRow className="border-white/5 hover:bg-transparent">
                    <TableHead className="text-gray-400 font-black uppercase text-[10px] tracking-widest py-4">Tool & Traffic</TableHead>
                    <TableHead className="text-gray-400 font-black uppercase text-[10px] tracking-widest">Category</TableHead>
                    <TableHead className="text-gray-400 font-black uppercase text-[10px] tracking-widest">Status / Expiry</TableHead>
                    <TableHead className="text-right text-gray-400 font-black uppercase text-[10px] tracking-widest">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTools?.map((tool) => {
                    const featuredActive = isSponsorshipActive(tool, 'featured');
                    const suggestedActive = isSponsorshipActive(tool, 'suggested');

                    return (
                      <TableRow key={tool.id} className="border-white/5 hover:bg-white/[0.02] transition-colors">
                        <TableCell className="py-4">
                          <div className="flex items-center gap-4">
                            <span className="text-2xl p-2 bg-white/5 rounded-xl border border-white/5">{tool.icon || "⚡"}</span>
                            <div className="flex flex-col">
                              <span className="font-bold text-white text-base">{tool.name}</span>
                              <span className="text-[10px] text-primary font-black uppercase tracking-widest">📈 {tool.click_count || 0} clicks</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-white/5 border-white/10 text-gray-400 text-[10px] uppercase font-bold tracking-tight px-2 py-0.5">
                            {tool.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <Switch checked={featuredActive} onCheckedChange={(v) => toggleField(tool, "featured", v)} />
                                <Star className={`w-3 h-3 ${featuredActive ? 'text-yellow-500 fill-yellow-500' : 'text-gray-700'}`} />
                              </div>
                              <div className="flex items-center gap-2">
                                <Switch checked={suggestedActive} onCheckedChange={(v) => toggleField(tool, "suggested", v)} />
                                <TrendingUp className={`w-3 h-3 ${suggestedActive ? 'text-blue-500' : 'text-gray-700'}`} />
                              </div>
                            </div>
                            {tool.sponsored_until && (
                              <span className="text-[10px] font-bold text-gray-600 flex items-center gap-1">
                                <CalendarClock className="w-3 h-3" /> Ends: {new Date(tool.sponsored_until).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button size="icon" variant="outline" className="bg-white/5 border-white/10 text-blue-500 hover:bg-blue-500/10" onClick={() => { setEditingTool(tool); setEditOpen(true); }}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="outline" className="bg-white/5 border-white/10 text-red-500 hover:bg-red-500/10" onClick={() => handleDelete(tool.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>

        <Dialog open={editOpen} onOpenChange={(o) => { setEditOpen(o); if (!o) setEditingTool(null); }}>
          <DialogContent className="max-w-lg sm:max-w-xl bg-background border-border/50">
            <DialogHeader><DialogTitle className="text-2xl font-black text-foreground">Edit Tool & Ads</DialogTitle></DialogHeader>
            {editingTool && (
              <ToolForm
                initial={editingTool}
                featuredCount={activeFeatured}
                categorySuggestedCount={tools?.filter(t => t.id !== editingTool.id && t.category === editingTool.category && isSponsorshipActive(t, 'suggested')).length || 0}
                onSubmit={handleEdit}
                onCancel={() => { setEditOpen(false); setEditingTool(null); }}
                submitLabel="Save Changes"
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
