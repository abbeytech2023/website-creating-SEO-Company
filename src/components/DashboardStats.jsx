import { formatPrice } from "../utility/utility";

export default function DashboardStats({ products, orders }) {
  // const totalRevenue = orders.reduce(
  //   (sum, o) => sum + Number(o.total_amount),
  //   0
  // );
  const totalRevenue = formatPrice(7000000);

  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-xl p-6 shadow text-center">
        <h2 className="text-2xl font-bold text-black">{products.length}</h2>
        <p className="text-gray-500">Products</p>
      </div>
      {/* <div className="bg-white rounded-xl p-6 shadow text-center">
        <h2 className="text-2xl font-bold text-black">{orders.length}</h2>
        <p className="text-gray-500">Orders</p>
      </div> */}
      <div className="bg-white rounded-xl p-6 shadow text-center">
        <h2 className="text-2xl font-bold text-[#d4af37]">{totalRevenue}</h2>
        <p className="text-gray-500">Revenue</p>
      </div>
    </div>
  );
}
