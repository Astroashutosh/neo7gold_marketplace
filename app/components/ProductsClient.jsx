"use client";

import dynamic from "next/dynamic";

const Products = dynamic(() => import("./Products"), {
  ssr: false,
});

export default Products;
