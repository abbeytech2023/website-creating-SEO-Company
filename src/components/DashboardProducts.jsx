import { formatPrice } from "../utility/utility";

export default function DashboardProducts({ products }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-serif mb-4">Your Products</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-xl shadow p-4">
            <img
              src={p?.image}
              className="rounded-lg mb-3 w-full h-40 object-cover"
            />
            <p className="font-semibold text-black">{p.name}</p>
            <p className="text-[#d4af37] font-bold">{formatPrice(p.price)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
