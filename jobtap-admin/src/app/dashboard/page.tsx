import { getDashboardStats, getJobs, getLeads, getContractors } from "@/lib/mock-data";
import StatusBadge from "@/components/StatusBadge";

export default async function DashboardPage() {
  const stats = getDashboardStats();
  const jobs = getJobs().slice(-5).reverse();
  const leads = getLeads().slice(-5).reverse();
  const contractors = getContractors();

  const contractorMap = new Map(contractors.map((c) => [c.id, c.name]));

  const statCards = [
    { label: "Total Contractors", value: stats.totalContractors, icon: "👷", color: "bg-blue-500", trend: "+12%" },
    { label: "Total Homeowners", value: stats.totalHomeowners, icon: "🏠", color: "bg-emerald-500", trend: "+8%" },
    { label: "Active Jobs", value: stats.activeJobs, icon: "💼", color: "bg-violet-500", trend: "+5%" },
    { label: "Total Leads", value: stats.totalLeads, icon: "📋", color: "bg-amber-500", trend: "+18%" },
    { label: "Revenue", value: `$${stats.revenue.toLocaleString()}`, icon: "💰", color: "bg-teal-500", trend: "+22%" },
    { label: "Conversion Rate", value: `${stats.conversionRate}%`, icon: "📈", color: "bg-rose-500", trend: "+3%" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{card.label}</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{card.value}</p>
              </div>
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.color} text-lg text-white`}>
                {card.icon}
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1">
              <span className="text-sm font-medium text-green-600">{card.trend}</span>
              <span className="text-xs text-gray-400">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Recent Jobs */}
        <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Jobs</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-xs font-medium tracking-wide text-gray-500 uppercase">
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 hidden sm:table-cell">Homeowner</th>
                  <th className="px-6 py-3 hidden md:table-cell">Contractor</th>
                  <th className="px-6 py-3 hidden lg:table-cell">Budget</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-3 font-medium text-gray-900">{job.title}</td>
                    <td className="px-6 py-3">
                      <StatusBadge status={job.status} />
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 text-gray-600 hidden sm:table-cell">{job.homeownerName}</td>
                    <td className="whitespace-nowrap px-6 py-3 text-gray-600 hidden md:table-cell">
                      {job.contractorName ?? "—"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 text-gray-600 hidden lg:table-cell">
                      ${job.budget.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Leads */}
        <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Leads</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-xs font-medium tracking-wide text-gray-500 uppercase">
                  <th className="px-6 py-3">Contractor</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 hidden sm:table-cell">Homeowner</th>
                  <th className="px-6 py-3 hidden md:table-cell">Job</th>
                  <th className="px-6 py-3 hidden lg:table-cell">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-3 font-medium text-gray-900">{lead.contractorName}</td>
                    <td className="px-6 py-3">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 text-gray-600 hidden sm:table-cell">{lead.homeownerName}</td>
                    <td className="whitespace-nowrap px-6 py-3 text-gray-600 hidden md:table-cell">{lead.jobTitle}</td>
                    <td className="whitespace-nowrap px-6 py-3 text-gray-600 hidden lg:table-cell">
                      ${lead.value.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
