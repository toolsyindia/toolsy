import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tool, ToolInsert, ToolUpdate } from "@/types/tool";

export function useTools() {
  return useQuery({
    queryKey: ["tools"],
    queryFn: async () => {
      const { data, error } = await supabase.from("tools").select("*");
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
        .eq("featured", true);
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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tools"] }),
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
