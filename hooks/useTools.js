import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function useTools() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTools = async () => {
      const { data: tools, error } = await supabase
        .from("tools")
        .select("*");
      
      if (!error) setData(tools);
      setIsLoading(false);
    };

    fetchTools();
  }, []);

  return { data, isLoading };
}