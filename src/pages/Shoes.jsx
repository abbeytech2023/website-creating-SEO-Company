import React from "react";
import ProductCard from "../components/ProductCard";
import { useGetShoes } from "../hooks/useProducts";
import SpinnerMini from "../components/SpinnerMini";

export default function Shoes() {
  const { data: shoes } = useGetShoes();

  console.log(shoes);

  if (!shoes) return <SpinnerMini />;

  return (
    <>
      <section className="p-6 grid gap-6 md:grid-cols-3">
        {shoes && shoes?.map((p) => <ProductCard key={p?.id} product={p} />)}
      </section>
    </>
  );
}
