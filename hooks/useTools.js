import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export function useTools() {
  return useQuery({
    queryKey: ["tools"],
    queryFn: async () => {
      const { data, error } = await supabase.from("tools").select("*").order("id", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useAddTool() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (tool) => {
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
    mutationFn: async ({ id, ...updates }) => {
      const { data, error } = await supabase.from("tools").update(updates).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onMutate: async (newTool) => {
      await queryClient.cancelQueries({ queryKey: ["tools"] });
      const previousTools = queryClient.getQueryData(["tools"]);
      queryClient.setQueryData(["tools"], (old) => {
        if (!old) return [];
        return old.map((t) => (t.id === newTool.id ? { ...t, ...newTool } : t));
      });
      return { previousTools };
    },
    onError: (err, newTool, context) => {
      if (context?.previousTools) {
        queryClient.setQueryData(["tools"], context.previousTools);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tools"] });
    },
  });
}

export function useDeleteTool() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("tools").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tools"] }),
  });
}