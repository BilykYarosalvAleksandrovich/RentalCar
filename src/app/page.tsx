import Link from "next/link";

export default function Home() {
  return (
    <main className="relative h-[calc(100vh-70px)] w-full overflow-hidden">
      {/* Фонове зображення */}
      <img
        src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070"
        className="absolute inset-0 w-full h-full object-cover"
        alt="Hero Car"
      />

      {/* Оверлей та текст */}
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white text-5xl md:text-7xl font-bold mb-6">
          Find your perfect rental car
        </h1>
        <p className="text-gray-200 text-lg md:text-xl mb-10 max-w-2xl">
          Reliable and budget-friendly rentals for any journey. Experience the
          freedom of the road.
        </p>
        <Link
          href="/catalog"
          className="bg-[#3470FF] hover:bg-[#0B44CD] text-white px-12 py-4 rounded-xl text-xl font-semibold transition-all cursor-pointer shadow-lg"
        >
          View Catalog
        </Link>
      </div>
    </main>
  );
}
