export interface User {
  id?: string;
  name?: string;
  firstnames: string;
  lastnames: string;
  shortname: string;
  code?: string | null;
  ci: string;
  image_url?: string | null;
  address?: string | null;
  phone?: string | null;
  email: string;
  password: string;
  gender: "M" | "F";
  birthdate?: Date | null;
  role_id: number;
  lms_id?: string | null;
  tenant_id?: string;
}
