import { useState, useEffect } from "react";
import { supabase } from "../services/supabaseClients";
import { useAuthContext } from "../hooks/useAuthContext";
import DashboardHeader from "../components/DashboardHeader";
import DashboardStats from "../components/DashboardStats";
import DashboardProducts from "../components/DashboardProducts";
import DashboardOrders from "../components/DashboardOrders";
import DashboardProfile from "../components/DashboardProfile";

export default function Dashboard() {
  const [vendor, setVendor] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const {user} = useAuthContext()
  // console.log(user);

  useEffect(() => {
    async function fetchVendorData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      // Get vendor info
      const { data: vendorData } = await supabase
        .from("users")
        .select("*")
        .eq("uid", user.id)
        .single();

      setVendor(vendorData);
      console.log(vendorData);

      // Get products
      const { data: productsData } = await supabase
        .from("Footwear")
        .select("*")
        .eq("uid", vendorData?.uid);

      setProducts(productsData);

      // Get orders
      const { data: ordersData } = await supabase
        .from("orders")
        .select("*")
        .eq("vendor_id", vendorData.id);

      setOrders(ordersData);

      // setLoading(false);
    }

    fetchVendorData();
  }, []);

  // if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#faf7f2] p-4">
      {/* HEADER */}
      <DashboardHeader vendor={vendor} />

      {/* STATS */}
      {/* <DashboardStats products={products} orders={orders} /> */}
      <DashboardStats products={products} />

      {/* ACTIONS / PROFILE */}
      <DashboardProfile vendor={vendor} />

      {/* PRODUCTS */}
      <DashboardProducts products={products} />

      {/* ORDERS */}
      {/* <DashboardOrders orders={orders} /> */}
    </div>
  );
}
