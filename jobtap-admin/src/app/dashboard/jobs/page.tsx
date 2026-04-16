import { getJobs } from "@/lib/mock-data";
import JobsTable from "@/components/JobsTable";

export default async function JobsPage() {
  const jobs = getJobs();

  const totalJobs = jobs.length;
  const openJobs = jobs.filter((j) => j.status === "open").length;
  const inProgressJobs = jobs.filter((j) => j.status === "in_progress").length;
  const completedJobs = jobs.filter((j) => j.status === "completed").length;

  const stats = [
    { label: "Total Jobs", value: totalJobs, icon: "💼", color: "bg-blue-500" },
    { label: "Open", value: openJobs, icon: "📂", color: "bg-yellow-500" },
    { label: "In Progress", value: inProgressJobs, icon: "🔄", color: "bg-indigo-500" },
    { label: "Completed", value: completedJobs, icon: "✅", color: "bg-green-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Jobs</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track and manage all jobs across the platform.
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
        <JobsTable jobs={jobs} />
      </div>
    </div>
  );
}
