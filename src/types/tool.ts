export interface Tool {
  id: number;
  name: string;
  description: string;
  category: string;
  pricing: string;
  featured: boolean;
  suggested: boolean;
  link: string;
  icon?: string;
  // 🔥 ADD THESE TWO LINES BELOW
  click_count?: number;
  sponsored_until?: string;
  created_at?: string;
}

export type ToolInsert = Omit<Tool, "id" | "created_at">;
export type ToolUpdate = Partial<ToolInsert>;
