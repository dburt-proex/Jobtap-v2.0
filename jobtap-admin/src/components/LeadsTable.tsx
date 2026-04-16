"use client";

import { useState } from "react";
import type { Lead } from "@/lib/types";
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

export default function LeadsTable({ leads }: { leads: Lead[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = leads.filter((l) => {
    const q = search.toLowerCase();
    const matchesSearch =
      l.contractorName.toLowerCase().includes(q) ||
      l.homeownerName.toLowerCase().includes(q) ||
      l.jobTitle.toLowerCase().includes(q);
    const matchesStatus = statusFilter === "all" || l.status === statusFilter;
    return matchesSearch && matchesStatus;
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
            placeholder="Search by contractor, homeowner, or job…"
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
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="converted">Converted</option>
          <option value="lost">Lost</option>
        </select>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-x-auto rounded-lg border border-gray-100 md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
              <th className="px-6 py-3">Contractor</th>
              <th className="px-6 py-3">Homeowner</th>
              <th className="px-6 py-3">Job</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Source</th>
              <th className="px-6 py-3">Value</th>
              <th className="px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((l) => (
              <tr key={l.id} className="even:bg-gray-50 hover:bg-blue-50/40">
                <td className="whitespace-nowrap px-6 py-3 font-medium text-gray-900">
                  {l.contractorName}
                </td>
                <td className="whitespace-nowrap px-6 py-3 text-gray-600">
                  {l.homeownerName}
                </td>
                <td className="whitespace-nowrap px-6 py-3 text-gray-600">{l.jobTitle}</td>
                <td className="whitespace-nowrap px-6 py-3">
                  <StatusBadge status={l.status} />
                </td>
                <td className="whitespace-nowrap px-6 py-3 capitalize text-gray-600">
                  {l.source.replace(/_/g, " ")}
                </td>
                <td className="whitespace-nowrap px-6 py-3 text-gray-600">
                  {formatCurrency(l.value)}
                </td>
                <td className="whitespace-nowrap px-6 py-3 text-gray-600">
                  {formatDate(l.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 md:hidden">
        {filtered.map((l) => (
          <div
            key={l.id}
            className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-gray-900">{l.contractorName}</p>
                <p className="text-sm text-gray-500">{l.jobTitle}</p>
              </div>
              <StatusBadge status={l.status} />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-400">Homeowner</span>
                <p className="text-gray-700">{l.homeownerName}</p>
              </div>
              <div>
                <span className="text-gray-400">Source</span>
                <p className="capitalize text-gray-700">{l.source.replace(/_/g, " ")}</p>
              </div>
              <div>
                <span className="text-gray-400">Value</span>
                <p className="text-gray-700">{formatCurrency(l.value)}</p>
              </div>
              <div>
                <span className="text-gray-400">Date</span>
                <p className="text-gray-700">{formatDate(l.createdAt)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-lg border border-gray-100 bg-white py-12 text-center">
          <p className="text-gray-500">No leads found matching your filters.</p>
        </div>
      )}
    </div>
  );
}
