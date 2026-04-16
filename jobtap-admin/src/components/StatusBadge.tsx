const statusColors: Record<string, string> = {
  // Green
  completed: "bg-green-100 text-green-800",
  converted: "bg-green-100 text-green-800",
  verified: "bg-green-100 text-green-800",
  active: "bg-green-100 text-green-800",
  // Blue
  in_progress: "bg-blue-100 text-blue-800",
  assigned: "bg-blue-100 text-blue-800",
  qualified: "bg-blue-100 text-blue-800",
  contacted: "bg-blue-100 text-blue-800",
  // Yellow
  open: "bg-yellow-100 text-yellow-800",
  new: "bg-yellow-100 text-yellow-800",
  pending: "bg-yellow-100 text-yellow-800",
  // Red
  cancelled: "bg-red-100 text-red-800",
  lost: "bg-red-100 text-red-800",
  suspended: "bg-red-100 text-red-800",
};

const defaultColor = "bg-gray-100 text-gray-800";

export default function StatusBadge({ status }: { status: string }) {
  const colorClasses = statusColors[status.toLowerCase()] ?? defaultColor;
  const label = status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${colorClasses}`}
    >
      {label}
    </span>
  );
}
