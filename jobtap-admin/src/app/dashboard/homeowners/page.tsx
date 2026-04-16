import { getHomeowners } from "@/lib/mock-data";
import HomeownersTable from "@/components/HomeownersTable";

export default async function HomeownersPage() {
  const homeowners = getHomeowners();

  const totalHomeowners = homeowners.length;
  const totalJobsPosted = homeowners.reduce((sum, h) => sum + h.jobsPosted, 0);

  const stats = [
    { label: "Total Homeowners", value: totalHomeowners, icon: "🏠", color: "bg-emerald-500" },
    { label: "Total Jobs Posted", value: totalJobsPosted, icon: "📋", color: "bg-blue-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Homeowners</h1>
        <p className="mt-1 text-sm text-gray-500">
          View and manage all registered homeowners on the platform.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.color} text-lg text-white`}
              >
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <HomeownersTable homeowners={homeowners} />
      </div>
    </div>
  );
}
