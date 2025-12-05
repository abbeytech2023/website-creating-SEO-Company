import { formatPrice } from "../utility/utility";

export default function DashboardStats({ products, orders }) {
  const totalRevenue = formatPrice(7000000);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
      {/* Products */}
      <div className="bg-white rounded-xl p-4 md:p-6 shadow text-center">
        <h2 className="text-xl md:text-2xl font-bold text-black">
          {products.length}
        </h2>
        <p className="text-gray-500 text-sm md:text-base">Products</p>
      </div>

      {/* Revenue */}
      <div className="bg-white rounded-xl p-4 md:p-6 shadow text-center">
        <h2 className="text-xl md:text-2xl font-bold text-[#d4af37]">
          {totalRevenue}
        </h2>
        <p className="text-gray-500 text-sm md:text-base">Revenue</p>
      </div>
    </div>
  );
}
