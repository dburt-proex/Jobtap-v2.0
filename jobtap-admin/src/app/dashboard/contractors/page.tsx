import { getContractors } from "@/lib/mock-data";
import ContractorsTable from "@/components/ContractorsTable";

export default async function ContractorsPage() {
  const contractors = getContractors();

  const totalContractors = contractors.length;
  const verifiedCount = contractors.filter((c) => c.verified).length;
  const avgRating =
    contractors.length > 0
      ? (contractors.reduce((sum, c) => sum + c.rating, 0) / contractors.length).toFixed(1)
      : "0";
  const totalJobsCompleted = contractors.reduce((sum, c) => sum + c.jobsCompleted, 0);

  const stats = [
    { label: "Total Contractors", value: totalContractors, icon: "👷", color: "bg-blue-500" },
    { label: "Verified", value: verifiedCount, icon: "✅", color: "bg-green-500" },
    { label: "Average Rating", value: avgRating, icon: "⭐", color: "bg-amber-500" },
    { label: "Total Jobs Completed", value: totalJobsCompleted, icon: "🔧", color: "bg-violet-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Contractors</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage and monitor all registered contractors on the platform.
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
        <ContractorsTable contractors={contractors} />
      </div>
    </div>
  );
}
