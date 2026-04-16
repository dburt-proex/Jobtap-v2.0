export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
}

export interface Contractor {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  rating: number;
  status: "active" | "inactive" | "pending";
  verified: boolean;
  jobsCompleted: number;
  location: string;
  createdAt: string;
}

export interface Homeowner {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  jobsPosted: number;
  createdAt: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "open" | "assigned" | "in_progress" | "completed" | "cancelled";
  homeownerId: string;
  homeownerName: string;
  contractorId: string | null;
  contractorName: string | null;
  budget: number;
  location: string;
  createdAt: string;
  updatedAt: string;
}

export interface Lead {
  id: string;
  contractorId: string;
  contractorName: string;
  homeownerId: string;
  homeownerName: string;
  jobId: string;
  jobTitle: string;
  status: "new" | "contacted" | "qualified" | "converted" | "lost";
  source: string;
  value: number;
  createdAt: string;
}

export interface DashboardStats {
  totalContractors: number;
  totalHomeowners: number;
  totalJobs: number;
  totalLeads: number;
  activeJobs: number;
  revenue: number;
  newUsersThisMonth: number;
  conversionRate: number;
}

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: string;
}
