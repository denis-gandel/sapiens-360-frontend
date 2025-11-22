export interface Course {
  id?: string;
  name: string;
  description?: string;
  code: string;
  period: number;
  program_id: string;
  subjects?: string[];
  tenant_id: string;
}
