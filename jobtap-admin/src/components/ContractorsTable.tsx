"use client";

import { useState } from "react";
import type { Contractor } from "@/lib/types";
import StatusBadge from "@/components/StatusBadge";

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  return (
    <span className="flex items-center gap-0.5" title={`${rating} / 5`}>
      {Array.from({ length: fullStars }, (_, i) => (
        <span key={i}>⭐</span>
      ))}
      {hasHalf && <span className="opacity-50">⭐</span>}
      <span className="ml-1 text-xs text-gray-500">{rating}</span>
    </span>
  );
}

export default function ContractorsTable({ contractors }: { contractors: Contractor[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [verifiedFilter, setVerifiedFilter] = useState("all");

  const filtered = contractors.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.specialty.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    const matchesVerified =
      verifiedFilter === "all" ||
      (verifiedFilter === "verified" && c.verified) ||
      (verifiedFilter === "unverified" && !c.verified);
    return matchesSearch && matchesStatus && matchesVerified;
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
            placeholder="Search by name, email, or specialty…"
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
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
        <select
          value={verifiedFilter}
          onChange={(e) => setVerifiedFilter(e.target.value)}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="all">All Verification</option>
          <option value="verified">Verified</option>
          <option value="unverified">Unverified</option>
        </select>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-x-auto rounded-lg border border-gray-100 md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Specialty</th>
              <th className="px-6 py-3">Rating</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Verified</th>
              <th className="px-6 py-3">Jobs Done</th>
              <th className="px-6 py-3">Location</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((c) => (
              <tr key={c.id} className="even:bg-gray-50 hover:bg-blue-50/40">
                <td className="whitespace-nowrap px-6 py-3 font-medium text-gray-900">
                  {c.name}
                </td>
                <td className="whitespace-nowrap px-6 py-3 text-gray-600">{c.email}</td>
                <td className="whitespace-nowrap px-6 py-3 capitalize text-gray-600">
                  {c.specialty}
                </td>
                <td className="whitespace-nowrap px-6 py-3">
                  <StarRating rating={c.rating} />
                </td>
                <td className="whitespace-nowrap px-6 py-3">
                  <StatusBadge status={c.status} />
                </td>
                <td className="whitespace-nowrap px-6 py-3">
                  {c.verified ? (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                      ✓ Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-600">
                      Unverified
                    </span>
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-3 text-gray-600">{c.jobsCompleted}</td>
                <td className="whitespace-nowrap px-6 py-3 text-gray-600">{c.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 md:hidden">
        {filtered.map((c) => (
          <div
            key={c.id}
            className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-gray-900">{c.name}</p>
                <p className="text-sm text-gray-500">{c.email}</p>
              </div>
              <StatusBadge status={c.status} />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-400">Specialty</span>
                <p className="capitalize text-gray-700">{c.specialty}</p>
              </div>
              <div>
                <span className="text-gray-400">Rating</span>
                <p><StarRating rating={c.rating} /></p>
              </div>
              <div>
                <span className="text-gray-400">Jobs Done</span>
                <p className="text-gray-700">{c.jobsCompleted}</p>
              </div>
              <div>
                <span className="text-gray-400">Verified</span>
                <p>{c.verified ? "✓ Yes" : "No"}</p>
              </div>
              <div className="col-span-2">
                <span className="text-gray-400">Location</span>
                <p className="text-gray-700">{c.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-lg border border-gray-100 bg-white py-12 text-center">
          <p className="text-gray-500">No contractors found matching your filters.</p>
        </div>
      )}
    </div>
  );
}
