export interface User {
  id: number;
  avatar: Avatar | null;
  name: string;
  email: string;
  is_active: boolean;
  type: string;
  created: string;
  modified: string;
  role: string;
}

interface Avatar {
  id: number;
  high: string;
  medium: string;
  low: string;
}
