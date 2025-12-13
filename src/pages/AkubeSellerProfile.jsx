import { useGetAkubeStores } from "../hooks/useUsers";

export default function AkubeSellerProfile() {
  const { data } = useGetAkubeStores();
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* HEADER */}
      {data && (
        <div className="flex items-center gap-6 mb-8">
          <img
            src={data?.image}
            alt={data?.name}
            className="w-28 h-28 object-cover rounded-xl shadow"
          />

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {data?.businessName}
            </h1>
            <p className="text-gray-500">{data?.location}</p>
            <div className="text-yellow-500 font-semibold mt-1">
              ⭐ {data?.rating}{" "}
              <span className="text-gray-400">({data.reviews} reviews)</span>
            </div>
          </div>
        </div>
      )}

      {/* BIO */}
      <p className="text-gray-700 leading-relaxed mb-6">{data?.description}</p>

      {/* SECTION TITLE */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Available Footwear
      </h2>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {data &&
          data.products?.map((p, i) => (
            <div
              key={i}
              className="border bg-white shadow-sm rounded-xl overflow-hidden hover:shadow-md transition"
            >
              <img
                src={p?.image}
                alt={p?.name}
                className="w-full h-36 object-cover"
              />

              <div className="p-2">
                <p className="font-medium text-sm">{p?.name}</p>
                <p className="font-bold text-indigo-600 text-sm">{p?.price}</p>

                <button className="mt-2 w-full bg-indigo-600 text-white text-sm px-3 py-1 rounded hover:bg-indigo-800">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
