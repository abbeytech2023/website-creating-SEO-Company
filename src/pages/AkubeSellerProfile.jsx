import { Link, useParams } from "react-router-dom";
import { useGetAkubeStores } from "../hooks/useUsers";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClients";
import { formatPrice } from "../utility/utility";
import { useCartContext } from "../hooks/useCartContext";
import toast from "react-hot-toast";
import { capitalize } from "../utility/utility";

export default function AkubeSellerProfile() {
  const { id } = useParams();
  const { addToCart } = useCartContext();

  const [data, setData] = useState();
  const [product, setProduct] = useState();

  useEffect(() => {
    const fetchSellerProfile = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();
      console.log(data);

      if (error) console.log(error);

      if (data) setData(data);

      const { data: footwears } = await supabase
        .from("Footwear")
        .select("*")
        .eq("uid", data?.uid);

      if (error) console.log(error);

      if (footwears) setProduct(footwears);
    };

    fetchSellerProfile();
  }, []);

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
              {capitalize(data?.businessName)}
            </h1>
            <p className="text-gray-500">{capitalize(data?.storeAddress)}</p>
            {/* <div className="text-yellow-500 font-semibold mt-1">
              ⭐ {data?.rating}{" "}
              <span className="text-gray-400">({data.reviews} reviews)</span>
            </div> */}
          </div>
        </div>
      )}

      {/* BIO */}
      <p className="text-gray-700 leading-relaxed mb-6">{data?.bio}</p>

      {/* SECTION TITLE */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Available Footwear
      </h2>

      {/* PRODUCTS GRID */}
      <>
        {product?.length === 0 && (
          <p className="text-center h-2/3 mt-16 text-2xl">
            This Store currently has no product for display
          </p>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {product &&
            product?.map((p, i) => (
              <div
                key={i}
                className=" bg-white shadow-sm rounded-xl overflow-hidden hover:shadow-md transition"
              >
                <Link to={`/productdetails/${p.id}`}>
                  <img
                    src={p?.image}
                    alt={p?.name}
                    className="w-full h-36 object-cover"
                  />
                </Link>

                <div className="p-2">
                  <p className="font-medium text-sm uppercase">{p?.name}</p>
                  <p className="font-bold text-indigo-600 text-sm">
                    {formatPrice(p?.price)}
                  </p>

                  <button
                    onClick={() => {
                      console.log("red");

                      addToCart(p);
                      toast.success("product added to cart");
                    }}
                    className="mt-2 w-full bg-indigo-600 cursor-pointer text-white text-sm px-3 py-1 rounded hover:bg-indigo-800"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
        </div>
      </>
    </div>
  );
}
