export interface Institute {
  id?: string;
  name: string;
  subdomain: string;
  location: string;
  logo?: string | null;
  email: string;
  phone: string;
  foundation_date: Date;
  start_date: Date;
  end_date: Date;
  type_id: number;
  nature_id: number;
  period_id: number;
  country_id: number;
  state_id: number;
  city_id: number;
  district_id?: number | null;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}
