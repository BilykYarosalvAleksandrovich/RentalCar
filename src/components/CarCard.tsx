"use client";
import { useEffect, useState } from "react";
import { Car } from "@/types/car";
import { useVehicleStore } from "@/store/useVehicleStore";
import Link from "next/link";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function CarCard({ car }: { car: Car }) {
  const { toggleFavorite, favorites } = useVehicleStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isFavorite = isClient && favorites.includes(car.id);

  // Форматування пробігу: 5858 -> 5 858
  const formattedMileage =
    car.mileage?.toLocaleString("uk-UA").replace(/,/g, " ") || "0";

  // Розбиваємо адресу (якщо вона приходить рядком "City, Country")
  // Для ТЗ часто використовують статику, якщо бекенд не дає розбивки
  const location = "Kyiv, Ukraine";
  const [city, country] = location.split(", ");

  return (
    <div className="flex flex-col h-full w-full bg-white">
      {/* Контейнер зображення */}
      <div className="relative w-full h-[268px] mb-[14px] overflow-hidden rounded-[14px] bg-[#F3F3F2]">
        <img
          src={car.img || "https://via.placeholder.com/400x268"}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => toggleFavorite(car.id)}
          className="absolute top-3 right-3 text-[18px] cursor-pointer z-10 p-1"
        >
          {isFavorite ? (
            <FaHeart className="text-[#3470FF]" />
          ) : (
            <FaRegHeart className="text-white/80 hover:text-white transition-colors" />
          )}
        </button>
      </div>

      {/* Заголовок та Ціна */}
      <div className="flex justify-between items-center mb-2 pr-2">
        <h2 className="text-[16px] font-medium leading-[24px] text-[#121417] truncate">
          {car.brand} <span className="text-[#3470FF]">{car.model}</span>,{" "}
          {car.year}
        </h2>
        <span className="text-[16px] font-medium leading-[24px] text-[#121417]">
          ${car.rentalPrice}
        </span>
      </div>

      {/* Характеристики (Перший рядок) */}
      <div className="flex flex-wrap gap-y-1 text-[12px] leading-[18px] text-[rgba(18,20,23,0.5)] mb-1">
        <span className="after:content-['|'] after:mx-1.5 after:text-[rgba(18,20,23,0.1)] last:after:content-['']">
          {city}
        </span>
        <span className="after:content-['|'] after:mx-1.5 after:text-[rgba(18,20,23,0.1)] last:after:content-['']">
          {country}
        </span>
        <span className="after:content-['|'] after:mx-1.5 after:text-[rgba(18,20,23,0.1)] last:after:content-['']">
          Luxury Car Rentals
        </span>
      </div>

      {/* Характеристики (Другий рядок) */}
      <div className="flex flex-wrap gap-y-1 text-[12px] leading-[18px] text-[rgba(18,20,23,0.5)] mb-7">
        <span className="after:content-['|'] after:mx-1.5 after:text-[rgba(18,20,23,0.1)] last:after:content-['']">
          SUV
        </span>
        <span className="after:content-['|'] after:mx-1.5 after:text-[rgba(18,20,23,0.1)] last:after:content-['']">
          {car.brand}
        </span>
        <span className="after:content-['|'] after:mx-1.5 after:text-[rgba(18,20,23,0.1)] last:after:content-['']">
          {car.id.slice(0, 4)}
        </span>
        <span className="after:content-['|'] after:mx-1.5 after:text-[rgba(18,20,23,0.1)] last:after:content-['']">
          {formattedMileage} km
        </span>
      </div>

      {/* Кнопка */}
      <Link
        href={`/catalog/${car.id}`}
        className="mt-auto w-full h-[44px] flex items-center justify-center bg-[#3470FF] hover:bg-[#0B44CD] text-white rounded-[12px] text-[14px] font-semibold transition-colors cursor-pointer"
      >
        Read more
      </Link>
    </div>
  );
}
