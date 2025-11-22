export interface Subject {
  id?: string;
  name: string;
  description: string;
  code: string;
  credits: number;
  prerequisites?: string[];
  tenant_id: string;
}
