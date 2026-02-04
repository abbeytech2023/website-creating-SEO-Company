import { formatPrice } from "../utility/utility";
import { Link } from "react-router-dom";
import { useCartContext } from "../hooks/useCartContext";

export default function Cart() {
  const { cart, removeFromCart, clearCart, addToCart } = useCartContext();
  console.log(cart);

  const total = cart.reduce((sum, item) => {
    const price = parseFloat(item.price);

    return sum + price * item.qty; // multiply by qty
  }, 0);

  if (cart.length === 0) {
    return (
      <section className="p-6 text-center ">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty 🛒</h2>
        <Link
          to="/shop"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Go Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Shopping Cart</h2>
      <div className="space-y-6">
        {cart.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white shadow p-4 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <Link
                to={`/productdetails/${item.id} `}
                className="min-w-[8ren] w-[7rem]"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className=" object-cover h-20 w-full rounded-md"
                />
              </Link>
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-blue-600 font-bold">
                  {formatPrice(item.price)}
                </p>

                {/* SHOW QUANTITY HERE */}
                {/* <p className="text-gray-700">
                  Qty: <span className="font-semibold">{item.qty}</span>
                </p> */}

                <div className="flex items-center gap-3">
                  <span className="text-gray-700">Qty:</span>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>

                  <span className="font-semibold">{item.qty}</span>

                  <button
                    onClick={() => addToCart(item)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>

                {/* SUBTOTAL PER ITEM */}
                <p className="font-semibold text-green-600">
                  Subtotal:{" "}
                  {formatPrice((parseFloat(item.price) * item.qty).toFixed(2))}
                </p>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className=" text-[0.7rem] text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Order Summary</h3>

        <p className="mb-2">
          Items:{" "}
          <span className="font-medium">
            {cart.reduce((sum, item) => sum + item.qty, 0)} {/* total qty */}
          </span>
        </p>

        <p className="mb-4">
          Total:{" "}
          <span className="font-bold text-blue-600">
            {formatPrice(total.toFixed(2))}
          </span>
        </p>

        <div className="flex space-x-4">
          <button
            onClick={clearCart}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Clear Cart
          </button>
          <Link
            to="/checkout"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </section>
  );
}
