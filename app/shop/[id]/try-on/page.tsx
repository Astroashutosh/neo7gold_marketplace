import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { fetchApiProducts, getProductById } from "../../data/api";
import TryOnClient from "./TryOnClient";

type TryOnPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateStaticParams() {
  const catalogue = await fetchApiProducts();
  return catalogue.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({
  params,
}: TryOnPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: "Virtual Try-On | Neos7",
    };
  }

  return {
    title: `Try On ${product.name} | Neos7 Virtual Atelier`,
    description: `Preview ${product.name} on the Neos7 studio model or with live camera tracking.`,
  };
}

export default async function TryOnPage({ params }: TryOnPageProps) {
  const { id } = await params;

  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const catalogue = await fetchApiProducts();
  const products = catalogue.some((item) => item.id === product.id)
    ? catalogue
    : [product, ...catalogue];

  return <TryOnClient product={product} catalog={products} />;
}
