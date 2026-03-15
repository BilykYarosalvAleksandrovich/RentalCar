"use client";

import { useEffect, useState, useCallback } from "react";
import api from "@/services/api";
import { useVehicleStore } from "@/store/useVehicleStore";
import CarCard from "@/components/CarCard";
import Filters from "@/components/Filters";

export default function Catalog() {
  const { vehicles, setVehicles, resetVehicles, filters } = useVehicleStore();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchCars = useCallback(
    async (p: number, isNew: boolean) => {
      setLoading(true);
      try {
        // Формуємо параметри запиту згідно з документацією API
        const params: any = {
          page: p,
          limit: 12,
        };

        if (filters.brand) params.brand = filters.brand;
        if (filters.price) params.price = filters.price;
        if (filters.minMileage) params.minMileage = filters.minMileage;
        if (filters.maxMileage) params.maxMileage = filters.maxMileage;

        const res = await api.get("/cars", { params });

        // Перевіряємо структуру даних (масив або об'єкт з масивом)
        const incomingData = Array.isArray(res.data)
          ? res.data
          : res.data.cars || [];

        // Якщо прийшло менше машин, ніж ліміт — ховаємо кнопку Load More
        if (incomingData.length < 12) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }

        setVehicles(incomingData, !isNew);
      } catch (e) {
        console.error("Помилка завантаження даних:", e);
        if (isNew) setVehicles([], false);
      } finally {
        setLoading(false);
      }
    },
    [filters, setVehicles]
  );

  // Початкове завантаження при переході на сторінку
  useEffect(() => {
    if (vehicles.length === 0) {
      fetchCars(1, true);
    }
  }, [fetchCars, vehicles.length]);

  // Функція для кнопки Search
  const handleSearch = () => {
    resetVehicles();
    setPage(1);
    fetchCars(1, true);
  };

  // Функція для кнопки Load More
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchCars(nextPage, false);
  };

  return (
    <main className="max-w-[1184px] mx-auto px-4 py-8 md:py-12">
      {/* Секція фільтрів */}
      <Filters onSearch={handleSearch} />

      {/* Сітка автомобілів */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-[29px] gap-y-[50px]">
        {Array.isArray(vehicles) && vehicles.length > 0
          ? vehicles.map((car) => <CarCard key={car.id} car={car} />)
          : !loading && (
              <div className="col-span-full text-center py-20">
                <p className="text-gray-500 text-lg">
                  No cars found matching your criteria.
                </p>
              </div>
            )}
      </div>

      {/* Спінер завантаження */}
      {loading && (
        <div className="flex justify-center my-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#3470FF]"></div>
        </div>
      )}

      {/* Кнопка Load More */}
      {!loading && hasMore && vehicles.length > 0 && (
        <div className="flex justify-center mt-20">
          <button
            onClick={handleLoadMore}
            className="text-[#3470FF] font-medium text-[16px] leading-[24px] underline hover:text-[#0B44CD] transition-colors cursor-pointer"
          >
            Load More
          </button>
        </div>
      )}
    </main>
  );
}
