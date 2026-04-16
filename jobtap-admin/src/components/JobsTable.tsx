"use client";

import { useState, useMemo } from "react";
import type { Job } from "@/lib/types";
import StatusBadge from "@/components/StatusBadge";

function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString()}`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function JobsTable({ jobs }: { jobs: Job[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.category))).sort(),
    [jobs]
  );

  const filtered = jobs.filter((j) => {
    const q = search.toLowerCase();
    const matchesSearch =
      j.title.toLowerCase().includes(q) ||
      j.category.toLowerCase().includes(q) ||
      j.homeownerName.toLowerCase().includes(q) ||
      (j.contractorName?.toLowerCase().includes(q) ?? false);
    const matchesStatus = statusFilter === "all" || j.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || j.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
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
            placeholder="Search by title, category, homeowner, or contractor…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="open">Open</option>
          <option value="assigned">Assigned</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-x-auto rounded-lg border border-gray-100 md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Homeowner</th>
              <th className="px-6 py-3">Contractor</th>
              <th className="px-6 py-3">Budget</th>
              <th className="px-6 py-3">Location</th>
              <th className="px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((j) => (
              <tr key={j.id} className="even:bg-gray-50 hover:bg-blue-50/40">
                <td className="whitespace-nowrap px-6 py-3 font-medium text-gray-900">
                  {j.title}
                </td>
                <td className="whitespace-nowrap px-6 py-3 capitalize text-gray-600">
                  {j.category}
                </td>
                <td className="whitespace-nowrap px-6 py-3">
                  <StatusBadge status={j.status} />
                </td>
                <td className="whitespace-nowrap px-6 py-3 text-gray-600">
                  {j.homeownerName}
                </td>
                <td className="whitespace-nowrap px-6 py-3 text-gray-600">
                  {j.contractorName ?? "—"}
                </td>
                <td className="whitespace-nowrap px-6 py-3 text-gray-600">
                  {formatCurrency(j.budget)}
                </td>
                <td className="whitespace-nowrap px-6 py-3 text-gray-600">{j.location}</td>
                <td className="whitespace-nowrap px-6 py-3 text-gray-600">
                  {formatDate(j.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 md:hidden">
        {filtered.map((j) => (
          <div
            key={j.id}
            className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-gray-900">{j.title}</p>
                <p className="text-sm capitalize text-gray-500">{j.category}</p>
              </div>
              <StatusBadge status={j.status} />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-400">Homeowner</span>
                <p className="text-gray-700">{j.homeownerName}</p>
              </div>
              <div>
                <span className="text-gray-400">Contractor</span>
                <p className="text-gray-700">{j.contractorName ?? "—"}</p>
              </div>
              <div>
                <span className="text-gray-400">Budget</span>
                <p className="text-gray-700">{formatCurrency(j.budget)}</p>
              </div>
              <div>
                <span className="text-gray-400">Location</span>
                <p className="text-gray-700">{j.location}</p>
              </div>
              <div className="col-span-2">
                <span className="text-gray-400">Date</span>
                <p className="text-gray-700">{formatDate(j.createdAt)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-lg border border-gray-100 bg-white py-12 text-center">
          <p className="text-gray-500">No jobs found matching your filters.</p>
        </div>
      )}
    </div>
  );
}
