import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import SingleShoes from "./pages/SingleShoes";
import Cart from "./pages/Cart";
import AkubeStores from "./pages/AkubeStores";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import OrdersPage from "./pages/OrderManagement";
import AkubeSellerProfile from "./pages/AkubeSellerProfile";
import Slippers from "./pages/Slippers";
import Signup from "./pages/Signup";
// import ShoemakersDirectory from "./pages/ShoeMakers.Jsx";
import ShoemakersDirectory from "./pages/ShoemakerDirectory";
import ShoemakerProfile from "./pages/ShoeMakerProfile";
import Login from "./pages/Login";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shoemakers" element={<ShoemakersDirectory />} />
          <Route path="/shoe-maker-profile" element={<ShoemakerProfile />} />
          <Route
            path="/akube-seller-profile"
            element={<AkubeSellerProfile />}
          />
          <Route path="/akube-stores" element={<AkubeStores />} />
          <Route path="/slippers" element={<Slippers />} />
          <Route path="/singleshoes/:id" element={<SingleShoes />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="orderpage" element={<OrdersPage />} />
        </Routes>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
