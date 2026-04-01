export interface User {
  id: string;
  orgName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  status: 'active' | 'inactive' | 'pending' | 'blacklisted';
}