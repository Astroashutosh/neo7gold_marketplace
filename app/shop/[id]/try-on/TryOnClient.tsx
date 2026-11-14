"use client";

import dynamic from "next/dynamic";
import type { Product } from "../../data/products";

const TryOnStudio = dynamic(() => import("./TryOnStudio"), { ssr: false });

export default function TryOnClient({
  product,
  catalog,
}: {
  product: Product;
  catalog?: Product[];
}) {
  return <TryOnStudio product={product} catalog={catalog} />;
}
