export interface Tool {
  id: number;
  created_at: string;
  name: string;
  description: string;
  category: string;
  pricing: string;
  featured: boolean;
  suggested: boolean;
  link: string;
  icon: string;
}

export type ToolInsert = Omit<Tool, "id" | "created_at">;
export type ToolUpdate = Partial<ToolInsert>;
