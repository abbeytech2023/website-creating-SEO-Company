import { formatPrice } from "../utility/utility";
import SpinnerMini from "./SpinnerMini";

export default function DashboardProducts({ products }) {
  return (
    <div className="mb-2">
      <h2 className="text-2xl font-serif ">Your Products</h2>

      <div>
        {!products && (
          <div className="h-screen flex items-center">
            <SpinnerMini />
          </div>
        )}
      </div>

      {products && (
        <div className="grid grid-cols-2  md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-xl shadow">
              <img
                src={p?.image}
                className="rounded-lg  mb-3 w-full h-[50%] object-cover"
              />
              <p className="font-semibold text-black uppercase">{p.name}</p>
              <p className="w-[32rem] text-[indigo] font-bold">
                {formatPrice(p.price)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
