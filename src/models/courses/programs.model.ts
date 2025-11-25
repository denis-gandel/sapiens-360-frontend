export interface Program {
  id?: string;
  name: string;
  description?: string | null;
  code: string;
  degree_type?: string | null;
  duration_type?: string | null;
  periods: number;
  tenant_id: string;
}
