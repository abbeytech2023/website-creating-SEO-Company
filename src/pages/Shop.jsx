import React from "react";
import ProductCard from "../components/ProductCard";
import { useGetShoes } from "../hooks/useProducts";
import { useGetSlippers } from "../hooks/useProducts";

export default function Shop() {
  const { data: shoes } = useGetShoes();
  const { data: slippers } = useGetSlippers();

  const coverwear = shoes || [];
  const palm = slippers || [];

  const footwear = [...palm, ...coverwear];

  console.log(footwear);

  return (
    <section className="p-6 grid gap-6 md:grid-cols-3">
      {footwear && footwear.map((p) => <ProductCard key={p.id} product={p} />)}
    </section>
  );
}
