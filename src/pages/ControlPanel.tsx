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
import { Pencil, Trash2, Plus, LogOut } from "lucide-react";
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
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
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
}: {
  initial: typeof emptyTool;
  onSubmit: (data: typeof emptyTool) => void;
  onCancel: () => void;
  submitLabel: string;
}) {
  const [form, setForm] = useState(initial);

  const set = (key: string, value: any) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="space-y-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Name</Label>
          <Input value={form.name} onChange={(e) => set("name", e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label>Icon (emoji)</Label>
          <Input value={form.icon} onChange={(e) => set("icon", e.target.value)} />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea value={form.description} onChange={(e) => set("description", e.target.value)} required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Category</Label>
          <Input value={form.category} onChange={(e) => set("category", e.target.value)} required />
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
        <Label>Link</Label>
        <Input value={form.link} onChange={(e) => set("link", e.target.value)} required />
      </div>
      <div className="flex gap-6">
        <div className="flex items-center gap-2">
          <Switch checked={form.featured} onCheckedChange={(v) => set("featured", v)} />
          <Label>Featured</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch checked={form.suggested} onCheckedChange={(v) => set("suggested", v)} />
          <Label>Suggested</Label>
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">{submitLabel}</Button>
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

  if (authLoading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;
  if (!user) return <LoginForm onLogin={signIn} />;

  const handleAdd = async (data: typeof emptyTool) => {
    try {
      await addTool.mutateAsync(data);
      toast.success("Tool added");
      setAddOpen(false);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleEdit = async (data: typeof emptyTool) => {
    if (!editingTool) return;
    try {
      await updateTool.mutateAsync({ id: editingTool.id, ...data });
      toast.success("Tool updated");
      setEditOpen(false);
      setEditingTool(null);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this tool?")) return;
    try {
      await deleteTool.mutateAsync(id);
      toast.success("Tool deleted");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const toggleField = async (tool: Tool, field: "featured" | "suggested") => {
    try {
      await updateTool.mutateAsync({ id: tool.id, [field]: !tool[field] });
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Toolsy Admin</h1>
          <div className="flex gap-2">
            <Dialog open={addOpen} onOpenChange={setAddOpen}>
              <DialogTrigger asChild>
                <Button><Plus className="mr-1 h-4 w-4" /> Add Tool</Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader><DialogTitle>Add New Tool</DialogTitle></DialogHeader>
                <ToolForm initial={emptyTool} onSubmit={handleAdd} onCancel={() => setAddOpen(false)} submitLabel="Add Tool" />
              </DialogContent>
            </Dialog>
            <Button variant="outline" onClick={signOut}><LogOut className="mr-1 h-4 w-4" /> Sign Out</Button>
          </div>
        </div>

        {isLoading && <p className="text-muted-foreground">Loading tools...</p>}

        {tools && (
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tool</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Pricing</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Suggested</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tools.map((tool) => (
                  <TableRow key={tool.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {tool.icon && <span>{tool.icon}</span>}
                        <span className="font-medium">{tool.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{tool.category}</TableCell>
                    <TableCell>{tool.pricing}</TableCell>
                    <TableCell>
                      <Switch checked={tool.featured} onCheckedChange={() => toggleField(tool, "featured")} />
                    </TableCell>
                    <TableCell>
                      <Switch checked={tool.suggested} onCheckedChange={() => toggleField(tool, "suggested")} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-1 justify-end">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => {
                            setEditingTool(tool);
                            setEditOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => handleDelete(tool.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <Dialog open={editOpen} onOpenChange={(o) => { setEditOpen(o); if (!o) setEditingTool(null); }}>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Edit Tool</DialogTitle></DialogHeader>
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
