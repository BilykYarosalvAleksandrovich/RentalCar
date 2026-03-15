"use client";
import { useVehicleStore } from "@/store/useVehicleStore";
import { useState } from "react";

const BRANDS = [
  "Buick",
  "Volvo",
  "HUMMER",
  "Subaru",
  "Mitsubishi",
  "Nissan",
  "Lincoln",
  "GMC",
  "Hyundai",
  "MINI",
];
const PRICES = ["30", "40", "50", "60", "70", "80"];

export default function Filters({ onSearch }: { onSearch: () => void }) {
  const { filters, setFilter } = useVehicleStore();

  return (
    <div className="flex flex-wrap items-end gap-[18px] mb-[50px] justify-center">
      {/* Brand Select */}
      <div className="flex flex-col">
        <label className="text-[14px] font-medium text-[#8A8A89] mb-2">
          Car brand
        </label>
        <select
          value={filters.brand}
          onChange={(e) => setFilter({ brand: e.target.value })}
          className="w-[224px] h-[48px] bg-[#F7F7FB] rounded-[14px] px-[18px] text-[18px] font-medium outline-none cursor-pointer appearance-none"
          style={{
            backgroundImage:
              'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20fill%3D%22%23121417%22%20d%3D%22M5%207l5%205%205-5z%22/%3E%3C/svg%3E")',
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 18px center",
          }}
        >
          <option value="">Choose a brand</option>
          {BRANDS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* Price Select */}
      <div className="flex flex-col">
        <label className="text-[14px] font-medium text-[#8A8A89] mb-2">
          Price/ 1 hour
        </label>
        <select
          value={filters.price}
          onChange={(e) => setFilter({ price: e.target.value })}
          className="w-[125px] h-[48px] bg-[#F7F7FB] rounded-[14px] px-[18px] text-[18px] font-medium outline-none cursor-pointer appearance-none"
          style={{
            backgroundImage:
              'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20fill%3D%22%23121417%22%20d%3D%22M5%207l5%205%205-5z%22/%3E%3C/svg%3E")',
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 18px center",
          }}
        >
          <option value="">To $</option>
          {PRICES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* Mileage Inputs */}
      <div className="flex flex-col">
        <label className="text-[14px] font-medium text-[#8A8A89] mb-2">
          Car mileage / km
        </label>
        <div className="flex">
          <input
            type="text"
            placeholder="From"
            value={filters.minMileage}
            onChange={(e) => setFilter({ minMileage: e.target.value })}
            className="w-[160px] h-[48px] bg-[#F7F7FB] rounded-l-[14px] border-r border-[rgba(18,20,23,0.05)] px-[18px] text-[18px] font-medium outline-none"
          />
          <input
            type="text"
            placeholder="To"
            value={filters.maxMileage}
            onChange={(e) => setFilter({ maxMileage: e.target.value })}
            className="w-[160px] h-[48px] bg-[#F7F7FB] rounded-r-[14px] px-[18px] text-[18px] font-medium outline-none"
          />
        </div>
      </div>

      {/* Search Button */}
      <button
        onClick={onSearch}
        className="h-[48px] px-[44px] bg-[#3470FF] hover:bg-[#0B44CD] text-white rounded-[12px] font-semibold text-[14px] transition-colors cursor-pointer"
      >
        Search
      </button>
    </div>
  );
}
