import { getLeads } from "@/lib/mock-data";
import LeadsTable from "@/components/LeadsTable";

export default async function LeadsPage() {
  const leads = getLeads();

  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "new").length;
  const qualifiedLeads = leads.filter((l) => l.status === "qualified").length;
  const convertedLeads = leads.filter((l) => l.status === "converted").length;
  const conversionRate =
    totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;

  const stats = [
    { label: "Total Leads", value: totalLeads, icon: "📋", color: "bg-blue-500" },
    { label: "New", value: newLeads, icon: "🆕", color: "bg-yellow-500" },
    { label: "Qualified", value: qualifiedLeads, icon: "🎯", color: "bg-indigo-500" },
    { label: "Converted", value: convertedLeads, icon: "✅", color: "bg-green-500" },
    { label: "Conversion Rate", value: `${conversionRate}%`, icon: "📈", color: "bg-rose-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
        <p className="mt-1 text-sm text-gray-500">
          Monitor lead generation, qualification, and conversion across the platform.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
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
        <LeadsTable leads={leads} />
      </div>
    </div>
  );
}
