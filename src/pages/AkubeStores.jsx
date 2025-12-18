// src/components/ShoemakersDirectory.jsx
import { Link } from "react-router-dom";
import { useGetAkubeStores } from "../hooks/useUsers";
import SpinnerMini from "../components/SpinnerMini";

export default function AkubeStores() {
  const { data } = useGetAkubeStores();

  return (
    <>
      <h1 className="text-3xl md:text-4xl text-center mt-7 font-extrabold text-[#0B0B0B] tracking-tight">
        <span className=" px-3 py-1  inline-block">AKUBE STORES</span>
      </h1>

      {!data && (
        <div className="h-screen  flex items-center">
          <SpinnerMini />
        </div>
      )}

      {data && (
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 p-6">
          {data?.map((maker) => (
            <Link
              to={`/akube-stores/${maker.id}`}
              key={maker.id}
              className="h-[50%] shadow-sm  hover:shadow-lg transition"
            >
              <img
                src={maker.image}
                alt={maker.name}
                className="w-full h-70 object-cover rounded-lg mb-3"
              />
              <h2 className="mt-5 font-semibold text-xl uppercase">
                {maker.businessName}
              </h2>
              <p className="text-gray-black mb-5">{maker.state}</p>
              <p className="text-gray-800 font-medium mt-2">
                ⭐ {maker.rating} / 5.0
              </p>
              <p className="text-gray-700 mb-4 text-sm">
                {maker.products} products
              </p>

              <Link
                to={`/akube-stores/${maker.id}`}
                className="mt-8 bg-black text-white py-2 px-4 rounded-lg w-full"
              >
                View Shop →
              </Link>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
