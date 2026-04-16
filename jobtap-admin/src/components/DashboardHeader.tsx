"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/contractors": "Contractors",
  "/dashboard/homeowners": "Homeowners",
  "/dashboard/jobs": "Jobs",
  "/dashboard/leads": "Leads",
};

export default function DashboardHeader() {
  const pathname = usePathname();
  const [initials, setInitials] = useState("");
  const [userName, setUserName] = useState("");

  const title = pageTitles[pathname] ?? "Dashboard";

  useEffect(() => {
    fetch("/api/auth/session")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.user?.name) {
          setUserName(data.user.name);
          setInitials(
            data.user.name
              .split(" ")
              .map((w: string) => w[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)
          );
        }
      })
      .catch(() => {});
  }, []);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6">
      {/* Left spacer for mobile hamburger */}
      <div className="flex items-center gap-4">
        <div className="w-8 md:hidden" />
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      </div>

      {/* User info */}
      <div className="flex items-center gap-3">
        <span className="hidden text-sm text-gray-600 sm:block">{userName}</span>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-sm font-semibold text-white">
          {initials}
        </div>
      </div>
    </header>
  );
}
