import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tool } from "@/types/tool";

export function useTools() {
  return useQuery({
    queryKey: ["tools"],
    queryFn: async () => {
      // 🚀 UPGRADE: Added ordering so newest tools always show up at the top!
      const { data, error } = await supabase.from("tools").select("*").order("id", { ascending: false });
      if (error) throw error;
      return data as Tool[];
    },
  });
}

export function useFeaturedTools() {
  return useQuery({
    queryKey: ["tools", "featured"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tools")
        .select("*")
        .eq("featured", true)
        .order("id", { ascending: false });
      if (error) throw error;
      return data as Tool[];
    },
  });
}

export function useAddTool() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (tool: Omit<Tool, "id" | "created_at">) => {
      const { data, error } = await supabase.from("tools").insert(tool).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tools"] }),
  });
}

export function useUpdateTool() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Tool> & { id: number }) => {
      const { data, error } = await supabase.from("tools").update(updates).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    
    // 🚀 THE MAGIC: OPTIMISTIC UPDATES
    // This forces the UI to change instantly without waiting for the database to reply!
    onMutate: async (newTool) => {
      // 1. Cancel any outgoing refetches so they don't overwrite our instant update
      await queryClient.cancelQueries({ queryKey: ["tools"] });

      // 2. Snapshot the previous value just in case something breaks
      const previousTools = queryClient.getQueryData(["tools"]);

      // 3. Optimistically update the cache with the new switch value
      queryClient.setQueryData(["tools"], (old: any) => {
        if (!old) return [];
        return old.map((t: any) => (t.id === newTool.id ? { ...t, ...newTool } : t));
      });

      // 4. Return context in case we need to roll back
      return { previousTools };
    },
    
    // If the database fails, this rolls the switch back to its real state
    onError: (err, newTool, context) => {
      if (context?.previousTools) {
        queryClient.setQueryData(["tools"], context.previousTools);
      }
    },
    
    // Always refetch in the background to ensure 100% perfect sync
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tools"] });
    },
  });
}

export function useDeleteTool() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase.from("tools").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tools"] }),
  });
}

