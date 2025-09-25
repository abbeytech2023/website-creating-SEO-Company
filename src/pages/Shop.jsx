import React from "react";
import ProductCard from "../components/ProductCard";
import products from "../data/product";

export default function Shop() {
  return (
    <section className="p-6 grid gap-6 md:grid-cols-3">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </section>
  );
}
