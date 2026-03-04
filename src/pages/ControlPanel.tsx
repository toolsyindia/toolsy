import { useState } from "react";
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
import { toast } from "sonner";
import { Pencil, Trash2, Plus, LogOut, LayoutDashboard, Star, TrendingUp } from "lucide-react"; // Added new icons for the Pro Dashboard!
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
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
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

function ToolForm({ initial, onSubmit, onCancel, submitLabel }: { initial: typeof emptyTool; onSubmit: (data: typeof emptyTool) => void; onCancel: () => void; submitLabel: string; }) {
  const [form, setForm] = useState(initial);
  const set = (key: string, value: any) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="space-y-5">
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
      <div className="flex gap-8 p-4 bg-muted/50 rounded-lg border">
        <div className="flex items-center gap-3">
          <Switch checked={form.featured} onCheckedChange={(v) => set("featured", v)} />
          <Label className="font-semibold cursor-pointer">⭐ Featured</Label>
        </div>
        <div className="flex items-center gap-3">
          <Switch checked={form.suggested} onCheckedChange={(v) => set("suggested", v)} />
          <Label className="font-semibold cursor-pointer">📈 Suggested</Label>
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

  if (authLoading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading Admin Engine...</div>;
  if (!user) return <LoginForm onLogin={signIn} />;

  const handleAdd = async (data: typeof emptyTool) => {
    try {
      await addTool.mutateAsync(data);
      toast.success("Tool added successfully! 🚀");
      setAddOpen(false);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleEdit = async (data: typeof emptyTool) => {
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

  const toggleField = async (tool: Tool, field: "featured" | "suggested") => {
    try {
      await updateTool.mutateAsync({ id: tool.id, [field]: !tool[field] });
      toast.success(`${field} status updated!`);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // --- PRO DASHBOARD STATS LOGIC ---
  const totalTools = tools?.length || 0;
  const featuredTools = tools?.filter(t => t.featured).length || 0;
  const suggestedTools = tools?.filter(t => t.suggested).length || 0;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Toolsy Control Panel</h1>
            <p className="text-muted-foreground">Manage your AI empire and toggle features live.</p>
          </div>
          <div className="flex gap-3">
            <Dialog open={addOpen} onOpenChange={setAddOpen}>
              <DialogTrigger asChild>
                {/* UPGRADED ADD TOOL BUTTON */}
                <Button size="lg" className="shadow-lg shadow-primary/20 font-bold">
                  <Plus className="mr-2 h-5 w-5" /> Add New Tool
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg sm:max-w-xl">
                <DialogHeader><DialogTitle className="text-2xl">Add New Tool</DialogTitle></DialogHeader>
                <ToolForm initial={emptyTool} onSubmit={handleAdd} onCancel={() => setAddOpen(false)} submitLabel="Publish Tool" />
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="lg" onClick={signOut}>
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </div>
        </div>

        {/* PRO STATS CARDS */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Live Tools</CardTitle>
              <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-3xl font-bold">{totalTools}</div></CardContent>
          </Card>
          <Card className="shadow-sm border-primary/20 bg-primary/5">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-primary">Featured (Ad Spots)</CardTitle>
              <Star className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent><div className="text-3xl font-bold text-primary">{featuredTools}</div></CardContent>
          </Card>
          <Card className="shadow-sm border-blue-500/20 bg-blue-500/5">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-blue-500">Suggested (Trending)</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent><div className="text-3xl font-bold text-blue-500">{suggestedTools}</div></CardContent>
          </Card>
        </div>

        {/* TOOL DATABASE TABLE */}
        {isLoading ? (
          <div className="text-center py-10 text-muted-foreground animate-pulse">Loading database...</div>
        ) : tools && tools.length > 0 ? (
          <Card className="shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-[300px]">Tool</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Pricing</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead>Suggested</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tools.map((tool) => (
                    <TableRow key={tool.id} className="hover:bg-muted/30">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {tool.icon && (
                            <span className="text-2xl bg-muted p-2 rounded-md" role="img" aria-label="icon">
                              {tool.icon}
                            </span>
                          )}
                          <div className="flex flex-col">
                            <span className="font-bold text-base">{tool.name}</span>
                            <span className="text-xs text-muted-foreground truncate w-48">{tool.link}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell><span className="bg-secondary px-2 py-1 rounded-md text-xs font-medium">{tool.category}</span></TableCell>
                      <TableCell><span className="text-sm font-medium">{tool.pricing}</span></TableCell>
                      <TableCell>
                        <Switch checked={tool.featured} onCheckedChange={() => toggleField(tool, "featured")} />
                      </TableCell>
                      <TableCell>
                        <Switch checked={tool.suggested} onCheckedChange={() => toggleField(tool, "suggested")} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button size="icon" variant="outline" className="h-8 w-8 text-blue-500 hover:text-blue-600" onClick={() => { setEditingTool(tool); setEditOpen(true); }}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="outline" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(tool.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        ) : (
          <div className="text-center py-20 border-2 border-dashed rounded-xl border-muted-foreground/20">
            <h3 className="text-xl font-bold mb-2">Your database is empty!</h3>
            <p className="text-muted-foreground mb-6">Click the button above to add your first AI tool.</p>
          </div>
        )}

        {/* EDIT TOOL MODAL */}
        <Dialog open={editOpen} onOpenChange={(o) => { setEditOpen(o); if (!o) setEditingTool(null); }}>
          <DialogContent className="max-w-lg sm:max-w-xl">
            <DialogHeader><DialogTitle className="text-2xl">Edit Tool</DialogTitle></DialogHeader>
            {editingTool && (
              <ToolForm
                initial={{
                  name: editingTool.name,
                  description: editingTool.description,
                  category: editingTool.category,
                  pricing: editingTool.pricing,
                  featured: editingTool.featured,
                  suggested: editingTool.suggested,
                  link: editingTool.link,
                  icon: editingTool.icon,
                }}
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



