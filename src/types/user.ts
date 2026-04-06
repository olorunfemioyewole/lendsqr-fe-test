export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  status: 'active' | 'inactive' | 'pending' | 'blacklisted';
}