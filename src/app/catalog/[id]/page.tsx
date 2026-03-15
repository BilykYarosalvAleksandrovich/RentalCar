"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/services/api";
import { Car } from "@/types/car";
import { toast } from "react-hot-toast";

export default function CarDetailsPage() {
  const { id } = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const res = await api.get(`/cars/${id}`);
        setCar(res.data);
      } catch (error) {
        console.error("Помилка завантаження деталей:", error);
        toast.error("Could not load car details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCarDetails();
  }, [id]);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    // Імітація успішної відправки
    toast.success("Car successfully rented! We will contact you soon.", {
      duration: 5000,
      position: "top-right",
      style: {
        borderRadius: "12px",
        background: "#3470FF",
        color: "#fff",
      },
    });
    // Тут можна додати очищення форми або редирект
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3470FF]"></div>
      </div>
    );

  if (!car)
    return (
      <div className="text-center py-20 text-gray-500 font-medium">
        Car not found.
      </div>
    );

  return (
    <main className="max-w-[1184px] mx-auto px-4 py-10 flex flex-col md:flex-row gap-10">
      {/* Ліва частина: Зображення */}
      <div className="w-full md:w-1/2">
        <img
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-[500px] object-cover rounded-[14px]"
        />
      </div>

      {/* Права частина: Інфо та Форма */}
      <div className="w-full md:w-1/2 flex flex-col">
        <h1 className="text-[32px] font-semibold text-[#121417] mb-2">
          {car.brand} <span className="text-[#3470FF]">{car.model}</span>,{" "}
          {car.year}
        </h1>

        <p className="text-[16px] leading-[24px] text-[rgba(18,20,23,0.5)] mb-6">
          {car.description}
        </p>

        {/* Форма бронювання */}
        <div className="bg-[#F7F7FB] p-8 rounded-[20px] mt-auto">
          <h3 className="text-[20px] font-semibold mb-2">Book your car now</h3>
          <p className="text-[14px] text-[rgba(18,20,23,0.5)] mb-6">
            Enter your details and we will call you back.
          </p>

          <form onSubmit={handleBooking} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              required
              className="w-full h-[48px] px-[18px] bg-white rounded-[12px] outline-none text-[16px] border border-transparent focus:border-[#3470FF] transition-all"
            />
            <input
              type="tel"
              placeholder="Phone number"
              required
              className="w-full h-[48px] px-[18px] bg-white rounded-[12px] outline-none text-[16px] border border-transparent focus:border-[#3470FF] transition-all"
            />
            <input
              type="date"
              required
              className="w-full h-[48px] px-[18px] bg-white rounded-[12px] outline-none text-[16px] border border-transparent focus:border-[#3470FF] transition-all"
            />

            <button
              type="submit"
              className="w-full h-[48px] mt-2 bg-[#3470FF] hover:bg-[#0B44CD] text-white rounded-[12px] font-semibold text-[16px] transition-colors cursor-pointer"
            >
              Send Request
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
