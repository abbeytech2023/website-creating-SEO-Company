import React from "react";
import ProductCard from "../components/ProductCard";
import products from "../data/product";
import { useGetShoes } from "../hooks/useProducts";
import { useGetSlippers } from "../hooks/useProducts";

export default function Shoes() {
  const { data: shoes } = useGetShoes();

  const coverwear = shoes || [];

  return (
    <section className="p-6 grid gap-6 md:grid-cols-3">
      {coverwear &&
        coverwear.map((p) => <ProductCard key={p.id} product={p} />)}
    </section>
  );
}
