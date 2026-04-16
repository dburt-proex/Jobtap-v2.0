import type {
  Contractor,
  Homeowner,
  Job,
  Lead,
  DashboardStats,
} from "./types";

const contractors: Contractor[] = [
  {
    id: "ctr_001",
    name: "Mike Johnson",
    email: "mike.johnson@email.com",
    phone: "(555) 201-1001",
    specialty: "plumbing",
    rating: 4.8,
    status: "active",
    verified: true,
    jobsCompleted: 127,
    location: "Austin, TX",
    createdAt: "2023-06-15T10:00:00Z",
  },
  {
    id: "ctr_002",
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    phone: "(555) 201-1002",
    specialty: "electrical",
    rating: 4.9,
    status: "active",
    verified: true,
    jobsCompleted: 98,
    location: "Denver, CO",
    createdAt: "2023-07-22T10:00:00Z",
  },
  {
    id: "ctr_003",
    name: "James Rodriguez",
    email: "james.rodriguez@email.com",
    phone: "(555) 201-1003",
    specialty: "hvac",
    rating: 4.6,
    status: "active",
    verified: true,
    jobsCompleted: 85,
    location: "Phoenix, AZ",
    createdAt: "2023-08-10T10:00:00Z",
  },
  {
    id: "ctr_004",
    name: "Emily Watson",
    email: "emily.watson@email.com",
    phone: "(555) 201-1004",
    specialty: "roofing",
    rating: 4.7,
    status: "active",
    verified: true,
    jobsCompleted: 64,
    location: "Nashville, TN",
    createdAt: "2023-09-05T10:00:00Z",
  },
  {
    id: "ctr_005",
    name: "David Kim",
    email: "david.kim@email.com",
    phone: "(555) 201-1005",
    specialty: "painting",
    rating: 4.5,
    status: "inactive",
    verified: true,
    jobsCompleted: 43,
    location: "Portland, OR",
    createdAt: "2023-10-18T10:00:00Z",
  },
  {
    id: "ctr_006",
    name: "Carlos Rivera",
    email: "carlos.rivera@email.com",
    phone: "(555) 201-1006",
    specialty: "landscaping",
    rating: 4.4,
    status: "active",
    verified: false,
    jobsCompleted: 31,
    location: "San Antonio, TX",
    createdAt: "2024-01-12T10:00:00Z",
  },
  {
    id: "ctr_007",
    name: "Amanda Foster",
    email: "amanda.foster@email.com",
    phone: "(555) 201-1007",
    specialty: "carpentry",
    rating: 4.8,
    status: "active",
    verified: true,
    jobsCompleted: 72,
    location: "Charlotte, NC",
    createdAt: "2023-11-03T10:00:00Z",
  },
  {
    id: "ctr_008",
    name: "Robert Taylor",
    email: "robert.taylor@email.com",
    phone: "(555) 201-1008",
    specialty: "general",
    rating: 4.3,
    status: "pending",
    verified: false,
    jobsCompleted: 12,
    location: "Columbus, OH",
    createdAt: "2024-02-28T10:00:00Z",
  },
];

const homeowners: Homeowner[] = [
  {
    id: "hmw_001",
    name: "Jennifer Adams",
    email: "jennifer.adams@email.com",
    phone: "(555) 301-2001",
    address: "1234 Oak Lane, Austin, TX 78701",
    jobsPosted: 5,
    createdAt: "2023-08-01T10:00:00Z",
  },
  {
    id: "hmw_002",
    name: "Thomas Wright",
    email: "thomas.wright@email.com",
    phone: "(555) 301-2002",
    address: "567 Maple Ave, Denver, CO 80202",
    jobsPosted: 3,
    createdAt: "2023-09-15T10:00:00Z",
  },
  {
    id: "hmw_003",
    name: "Lisa Nguyen",
    email: "lisa.nguyen@email.com",
    phone: "(555) 301-2003",
    address: "890 Pine St, Phoenix, AZ 85001",
    jobsPosted: 4,
    createdAt: "2023-10-20T10:00:00Z",
  },
  {
    id: "hmw_004",
    name: "Marcus Brown",
    email: "marcus.brown@email.com",
    phone: "(555) 301-2004",
    address: "2345 Elm Dr, Nashville, TN 37201",
    jobsPosted: 2,
    createdAt: "2024-01-05T10:00:00Z",
  },
  {
    id: "hmw_005",
    name: "Rachel Green",
    email: "rachel.green@email.com",
    phone: "(555) 301-2005",
    address: "678 Birch Rd, Portland, OR 97201",
    jobsPosted: 1,
    createdAt: "2024-02-10T10:00:00Z",
  },
  {
    id: "hmw_006",
    name: "Daniel Park",
    email: "daniel.park@email.com",
    phone: "(555) 301-2006",
    address: "910 Cedar Blvd, Charlotte, NC 28201",
    jobsPosted: 3,
    createdAt: "2024-03-01T10:00:00Z",
  },
];

const jobs: Job[] = [
  {
    id: "job_001",
    title: "Kitchen Sink Replacement",
    description:
      "Need to replace an old kitchen sink with a new double-basin stainless steel model including faucet installation.",
    category: "plumbing",
    status: "completed",
    homeownerId: "hmw_001",
    homeownerName: "Jennifer Adams",
    contractorId: "ctr_001",
    contractorName: "Mike Johnson",
    budget: 1200,
    location: "Austin, TX",
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-25T10:00:00Z",
  },
  {
    id: "job_002",
    title: "Panel Upgrade to 200A",
    description:
      "Upgrade main electrical panel from 100A to 200A service to support additional circuits for home office and EV charger.",
    category: "electrical",
    status: "in_progress",
    homeownerId: "hmw_002",
    homeownerName: "Thomas Wright",
    contractorId: "ctr_002",
    contractorName: "Sarah Chen",
    budget: 3500,
    location: "Denver, CO",
    createdAt: "2024-02-05T10:00:00Z",
    updatedAt: "2024-03-01T10:00:00Z",
  },
  {
    id: "job_003",
    title: "AC Unit Installation",
    description:
      "Install a new 3-ton central air conditioning unit to replace failing system. Includes ductwork inspection.",
    category: "hvac",
    status: "assigned",
    homeownerId: "hmw_003",
    homeownerName: "Lisa Nguyen",
    contractorId: "ctr_003",
    contractorName: "James Rodriguez",
    budget: 5800,
    location: "Phoenix, AZ",
    createdAt: "2024-02-18T10:00:00Z",
    updatedAt: "2024-02-28T10:00:00Z",
  },
  {
    id: "job_004",
    title: "Roof Leak Repair",
    description:
      "Fix multiple leaks around chimney flashing and valley areas. Some shingles need replacement.",
    category: "roofing",
    status: "open",
    homeownerId: "hmw_004",
    homeownerName: "Marcus Brown",
    contractorId: null,
    contractorName: null,
    budget: 2200,
    location: "Nashville, TN",
    createdAt: "2024-03-05T10:00:00Z",
    updatedAt: "2024-03-05T10:00:00Z",
  },
  {
    id: "job_005",
    title: "Exterior House Painting",
    description:
      "Full exterior repaint of a two-story colonial. Includes scraping, priming, and two coats of premium paint.",
    category: "painting",
    status: "open",
    homeownerId: "hmw_005",
    homeownerName: "Rachel Green",
    contractorId: null,
    contractorName: null,
    budget: 4500,
    location: "Portland, OR",
    createdAt: "2024-03-10T10:00:00Z",
    updatedAt: "2024-03-10T10:00:00Z",
  },
  {
    id: "job_006",
    title: "Backyard Patio Landscaping",
    description:
      "Design and install a flagstone patio with built-in fire pit, including drainage and lighting.",
    category: "landscaping",
    status: "in_progress",
    homeownerId: "hmw_001",
    homeownerName: "Jennifer Adams",
    contractorId: "ctr_006",
    contractorName: "Carlos Rivera",
    budget: 7500,
    location: "Austin, TX",
    createdAt: "2024-02-20T10:00:00Z",
    updatedAt: "2024-03-12T10:00:00Z",
  },
  {
    id: "job_007",
    title: "Custom Built-in Bookshelves",
    description:
      "Build floor-to-ceiling built-in bookshelves for a home library. White oak with adjustable shelving.",
    category: "carpentry",
    status: "completed",
    homeownerId: "hmw_006",
    homeownerName: "Daniel Park",
    contractorId: "ctr_007",
    contractorName: "Amanda Foster",
    budget: 3200,
    location: "Charlotte, NC",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-02-10T10:00:00Z",
  },
  {
    id: "job_008",
    title: "Bathroom Remodel",
    description:
      "Full master bathroom renovation including new tile, vanity, walk-in shower, and plumbing updates.",
    category: "general",
    status: "assigned",
    homeownerId: "hmw_003",
    homeownerName: "Lisa Nguyen",
    contractorId: "ctr_008",
    contractorName: "Robert Taylor",
    budget: 12000,
    location: "Phoenix, AZ",
    createdAt: "2024-03-01T10:00:00Z",
    updatedAt: "2024-03-08T10:00:00Z",
  },
  {
    id: "job_009",
    title: "Water Heater Replacement",
    description:
      "Replace 40-gallon gas water heater with new energy-efficient tankless unit.",
    category: "plumbing",
    status: "cancelled",
    homeownerId: "hmw_002",
    homeownerName: "Thomas Wright",
    contractorId: "ctr_001",
    contractorName: "Mike Johnson",
    budget: 2800,
    location: "Denver, CO",
    createdAt: "2024-02-12T10:00:00Z",
    updatedAt: "2024-02-20T10:00:00Z",
  },
  {
    id: "job_010",
    title: "Deck Construction",
    description:
      "Build a 400 sq ft composite deck with railing and stairs off the back of the house.",
    category: "carpentry",
    status: "open",
    homeownerId: "hmw_004",
    homeownerName: "Marcus Brown",
    contractorId: null,
    contractorName: null,
    budget: 9500,
    location: "Nashville, TN",
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-15T10:00:00Z",
  },
];

const leads: Lead[] = [
  {
    id: "lead_001",
    contractorId: "ctr_001",
    contractorName: "Mike Johnson",
    homeownerId: "hmw_001",
    homeownerName: "Jennifer Adams",
    jobId: "job_001",
    jobTitle: "Kitchen Sink Replacement",
    status: "converted",
    source: "platform_match",
    value: 1200,
    createdAt: "2024-01-10T12:00:00Z",
  },
  {
    id: "lead_002",
    contractorId: "ctr_002",
    contractorName: "Sarah Chen",
    homeownerId: "hmw_002",
    homeownerName: "Thomas Wright",
    jobId: "job_002",
    jobTitle: "Panel Upgrade to 200A",
    status: "qualified",
    source: "search",
    value: 3500,
    createdAt: "2024-02-05T14:00:00Z",
  },
  {
    id: "lead_003",
    contractorId: "ctr_003",
    contractorName: "James Rodriguez",
    homeownerId: "hmw_003",
    homeownerName: "Lisa Nguyen",
    jobId: "job_003",
    jobTitle: "AC Unit Installation",
    status: "contacted",
    source: "referral",
    value: 5800,
    createdAt: "2024-02-18T09:00:00Z",
  },
  {
    id: "lead_004",
    contractorId: "ctr_004",
    contractorName: "Emily Watson",
    homeownerId: "hmw_004",
    homeownerName: "Marcus Brown",
    jobId: "job_004",
    jobTitle: "Roof Leak Repair",
    status: "new",
    source: "platform_match",
    value: 2200,
    createdAt: "2024-03-05T11:00:00Z",
  },
  {
    id: "lead_005",
    contractorId: "ctr_005",
    contractorName: "David Kim",
    homeownerId: "hmw_005",
    homeownerName: "Rachel Green",
    jobId: "job_005",
    jobTitle: "Exterior House Painting",
    status: "new",
    source: "search",
    value: 4500,
    createdAt: "2024-03-10T16:00:00Z",
  },
  {
    id: "lead_006",
    contractorId: "ctr_007",
    contractorName: "Amanda Foster",
    homeownerId: "hmw_006",
    homeownerName: "Daniel Park",
    jobId: "job_007",
    jobTitle: "Custom Built-in Bookshelves",
    status: "converted",
    source: "referral",
    value: 3200,
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "lead_007",
    contractorId: "ctr_006",
    contractorName: "Carlos Rivera",
    homeownerId: "hmw_001",
    homeownerName: "Jennifer Adams",
    jobId: "job_006",
    jobTitle: "Backyard Patio Landscaping",
    status: "qualified",
    source: "platform_match",
    value: 7500,
    createdAt: "2024-02-20T08:00:00Z",
  },
  {
    id: "lead_008",
    contractorId: "ctr_001",
    contractorName: "Mike Johnson",
    homeownerId: "hmw_002",
    homeownerName: "Thomas Wright",
    jobId: "job_009",
    jobTitle: "Water Heater Replacement",
    status: "lost",
    source: "search",
    value: 2800,
    createdAt: "2024-02-12T15:00:00Z",
  },
];

// --- Export functions ---

export function getContractors(): Contractor[] {
  return contractors;
}

export function getContractor(id: string): Contractor | undefined {
  return contractors.find((c) => c.id === id);
}

export function getHomeowners(): Homeowner[] {
  return homeowners;
}

export function getHomeowner(id: string): Homeowner | undefined {
  return homeowners.find((h) => h.id === id);
}

export function getJobs(): Job[] {
  return jobs;
}

export function getJob(id: string): Job | undefined {
  return jobs.find((j) => j.id === id);
}

export function getLeads(): Lead[] {
  return leads;
}

export function getDashboardStats(): DashboardStats {
  const activeJobs = jobs.filter((j) =>
    ["open", "assigned", "in_progress"].includes(j.status)
  ).length;

  const convertedLeads = leads.filter((l) => l.status === "converted");
  const revenue = convertedLeads.reduce((sum, l) => sum + l.value, 0);
  const conversionRate =
    leads.length > 0
      ? Math.round((convertedLeads.length / leads.length) * 100)
      : 0;

  return {
    totalContractors: contractors.length,
    totalHomeowners: homeowners.length,
    totalJobs: jobs.length,
    totalLeads: leads.length,
    activeJobs,
    revenue,
    newUsersThisMonth: 4,
    conversionRate,
  };
}
