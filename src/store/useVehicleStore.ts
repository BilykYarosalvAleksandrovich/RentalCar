import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Car } from "@/types/car";

interface VehicleState {
  vehicles: Car[];
  favorites: string[];
  filters: {
    brand: string;
    price: string;
    minMileage: string;
    maxMileage: string;
  };
  setVehicles: (data: Car[], append: boolean) => void;
  resetVehicles: () => void;
  toggleFavorite: (id: string) => void;
  setFilter: (newFilters: any) => void;
}

export const useVehicleStore = create<VehicleState>()(
  persist(
    (set) => ({
      vehicles: [], // Початковий стан - завжди масив
      favorites: [],
      filters: { brand: "", price: "", minMileage: "", maxMileage: "" },
      setVehicles: (data, append) =>
        set((state) => ({
          // Перевіряємо, чи 'data' є масивом перед записом
          vehicles: append
            ? [...state.vehicles, ...(Array.isArray(data) ? data : [])]
            : Array.isArray(data)
            ? data
            : [],
        })),
      resetVehicles: () => set({ vehicles: [] }),
      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((i) => i !== id)
            : [...state.favorites, id],
        })),
      setFilter: (newFilters) =>
        set((state) => ({ filters: { ...state.filters, ...newFilters } })),
    }),
    {
      name: "rental-storage",
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);
