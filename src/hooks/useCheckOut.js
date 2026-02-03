// import { supabase } from "../services/supabaseClients";
// export async function useCheckout(cart, user) {
//   if (cart.length === 0) {
//     throw new Error("Cart is empty");
//   }

//   // 1. Calculate total
//   const totalAmount = cart.reduce(
//     (sum, item) => sum + item.price * item.qty,
//     0
//   );

//   console.log(totalAmount);

//   // 2. Create order
//   const { data: order, error: orderError } = await supabase
//     .from("orders")
//     .insert({
//       uid: user ? user.id : null, // guest allowed
//       totalAmount: totalAmount,
//       status: "pending",
//     })
//     .select()
//     .single();

//   console.log(order);

//   if (orderError) throw orderError;

//   // 3. Prepare order items
//   const orderItems = cart.map((item) => ({
//     order_id: order.id,
//     product_id: item.id,
//     product_name: item.name,
//     price: item.price,
//     quantity: item.qty,
//     vendor_id: item.vendor_id,
//   }));

//   console.log(orderItems);

//   // 4. Insert order items
//   const { error: itemsError } = await supabase
//     .from("order-items")
//     .insert(orderItems);

//   if (itemsError) throw itemsError;

//   return { order, orderItems };
// }

// hooks/useCheckout.js
import { supabase } from "../services/supabaseClients";

export function useCheckout() {
  const checkout = async ({ user, cart }) => {
    console.log(user);

    if (!user?.id) {
      throw new Error("User is required");
    }

    if (!cart || cart.length === 0) {
      throw new Error("Cart is empty");
    }

    const totalAmount = cart.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    console.log(totalAmount);

    // 2. Create order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        uid: user ? user.id : null, // guest allowed
        totalAmount: totalAmount,
        status: "pending",
      })
      .select()
      .single();

    if (orderError) {
      throw new Error(orderError.message);
    }

    // 3. Create order items
    const orderItems = cart.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
    }));

    const { error: itemsError } = await supabase
      .from("order-items")
      .insert(orderItems);

    if (itemsError) {
      throw new Error(itemsError.message);
    }
  };

  return { checkout };
}
