export interface AdminDashboardType {
  id: number;
  label: string;
  icon: string;
  count: number;
}
export interface Admin {
  name: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'DOCTOR'
}