"use client";

import { useState } from "react";
import type { Homeowner } from "@/lib/types";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function HomeownersTable({ homeowners }: { homeowners: Homeowner[] }) {
  const [search, setSearch] = useState("");

  const filtered = homeowners.filter((h) => {
    const q = search.toLowerCase();
    return (
      h.name.toLowerCase().includes(q) ||
      h.email.toLowerCase().includes(q) ||
      h.address.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative max-w-md">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search by name, email, or address…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-x-auto rounded-lg border border-gray-100 md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Address</th>
              <th className="px-6 py-3">Jobs Posted</th>
              <th className="px-6 py-3">Member Since</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((h) => (
              <tr key={h.id} className="even:bg-gray-50 hover:bg-blue-50/40">
                <td className="whitespace-nowrap px-6 py-3 font-medium text-gray-900">
                  {h.name}
                </td>
                <td className="whitespace-nowrap px-6 py-3 text-gray-600">{h.email}</td>
                <td className="whitespace-nowrap px-6 py-3 text-gray-600">{h.phone}</td>
                <td className="px-6 py-3 text-gray-600">{h.address}</td>
                <td className="whitespace-nowrap px-6 py-3 text-gray-600">{h.jobsPosted}</td>
                <td className="whitespace-nowrap px-6 py-3 text-gray-600">
                  {formatDate(h.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 md:hidden">
        {filtered.map((h) => (
          <div
            key={h.id}
            className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm"
          >
            <p className="font-medium text-gray-900">{h.name}</p>
            <p className="text-sm text-gray-500">{h.email}</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-400">Phone</span>
                <p className="text-gray-700">{h.phone}</p>
              </div>
              <div>
                <span className="text-gray-400">Jobs Posted</span>
                <p className="text-gray-700">{h.jobsPosted}</p>
              </div>
              <div className="col-span-2">
                <span className="text-gray-400">Address</span>
                <p className="text-gray-700">{h.address}</p>
              </div>
              <div className="col-span-2">
                <span className="text-gray-400">Member Since</span>
                <p className="text-gray-700">{formatDate(h.createdAt)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-lg border border-gray-100 bg-white py-12 text-center">
          <p className="text-gray-500">No homeowners found matching your search.</p>
        </div>
      )}
    </div>
  );
}
