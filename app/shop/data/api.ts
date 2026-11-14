import { products as fallbackProducts, type Product } from "./products";
import { siteAsset } from "../../site";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const PRODUCTS_API_URL = `${API_BASE}/api/frontend/products`;
export const CATEGORIES_API_URL = `${API_BASE}/api/frontend/categories`;

type ApiCategory = {
  id?: number;
  name?: string;
  slug?: string;
};

type ApiProduct = {
  id?: number | string;
  title?: string;
  slug?: string;
  sku?: string | null;
  price?: string | number | null;
  compare_at_price?: string | number | null;
  condition?: string | null;
  in_stock?: boolean;
  stock_quantity?: number | null;
  image?: string | null;
  images?: string[] | null;
  category?: ApiCategory | null;
  description?: string | null;
  short_description?: string | null;
  tags?: string[] | null;
};

function titleCase(value: string): string {
  return value
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function normalizeCategory(input?: string | null): string {
  const value = String(input || "").toLowerCase();

  if (value.includes("ring") || value.includes("solitaire")) return "Rings";
  if (
    value.includes("necklace") ||
    value.includes("chain") ||
    value.includes("pendant") ||
    value.includes("choker")
  ) {
    return "Necklaces";
  }
  if (
    value.includes("bracelet") ||
    value.includes("bangle") ||
    value.includes("tennis")
  ) {
    return "Bracelets";
  }
  if (value.includes("earring") || value.includes("jhumka") || value.includes("stud")) {
    return "Earrings";
  }

  return input ? titleCase(input) : "Jewellery";
}

function normalizeImageUrl(url?: string | null): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//")) {
    return url;
  }
  if (url.startsWith("/storage/") || url.startsWith("storage/")) {
    const clean = url.replace(/^\/+/, "");
    return `${API_BASE}/${clean}`;
  }
  return siteAsset(url);
}

function fallbackImageFor(product: ApiProduct): string {
  const text = `${product.title || ""} ${product.category?.name || ""} ${
    product.category?.slug || ""
  }`.toLowerCase();

  if (text.includes("ring") || text.includes("solitaire")) {
    return siteAsset("ring23.jpg");
  }
  if (
    text.includes("necklace") ||
    text.includes("chain") ||
    text.includes("pendant")
  ) {
    return siteAsset("necklace.jpg");
  }
  if (text.includes("earring") || text.includes("jhumka") || text.includes("stud")) {
    return siteAsset("earing.jpg");
  }
  if (text.includes("bracelet") || text.includes("bangle") || text.includes("tennis")) {
    return siteAsset("jewelary1.jpg");
  }

  return siteAsset("jew.png");
}

function imageList(product: ApiProduct): string[] {
  const images = Array.isArray(product.images)
    ? product.images.filter((img): img is string => Boolean(img)).map(normalizeImageUrl)
    : [];
  if (images.length) return images;
  if (product.image) return [normalizeImageUrl(product.image)];
  return [fallbackImageFor(product)];
}

function specificationsFor(product: ApiProduct): Product["specifications"] {
  const tags = Array.isArray(product.tags) ? product.tags.filter(Boolean) : [];
  const text = [
    product.title,
    product.description,
    product.short_description,
    ...tags,
  ]
    .filter(Boolean)
    .join(" ");

  const specifications: NonNullable<Product["specifications"]> = {};

  if (product.condition) {
    specifications.condition = titleCase(product.condition);
  }

  const weight =
    tags.find((tag) => /\b(grams?|gm)\b/i.test(tag)) ||
    text.match(/[\d.]+\s*(?:grams?|gm)\b/i)?.[0];
  if (weight) specifications.weight = weight;

  const carat = text.match(/(\d+(?:\.\d+)?)\s*ct\b/i);
  if (carat) specifications.carat = `${carat[1]} ct`;

  if (/diamond/i.test(text)) specifications.gemstone = "Diamond";
  else if (/pearl/i.test(text)) specifications.gemstone = "Pearl";
  else if (/ruby/i.test(text)) specifications.gemstone = "Ruby";
  else if (/emerald/i.test(text)) specifications.gemstone = "Emerald";
  else if (/sapphire/i.test(text)) specifications.gemstone = "Sapphire";

  const purity =
    tags.find((tag) => /fine gold|karat|\b\d{2}k\b|999\.9/i.test(tag)) ||
    text.match(/\b(?:18|22|24)k\b|999\.9|fine gold/gi)?.[0];
  if (purity) specifications.purity = purity.toUpperCase();

  if (/white gold/i.test(text)) specifications.color = "White Gold";
  else if (/rose gold/i.test(text)) specifications.color = "Rose Gold";
  else if (/yellow gold|\bgold\b/i.test(text)) specifications.color = "Yellow Gold";

  if (/certif|assay|zurich|igi/i.test(text)) {
    specifications.certification = "Certified";
  }

  // Chain/bracelet lengths are used to calibrate try-on independently per
  // product. Store the first explicit centimetre measurement in the text.
  const size =
    tags.find((tag) => /\d+(?:\.\d+)?\s*cm\b/i.test(tag)) ||
    text.match(/\b(\d+(?:\.\d+)?)\s*cm\b/i)?.[0];
  if (size) specifications.size = size;

  return Object.keys(specifications).length ? specifications : undefined;
}

export function mapApiProduct(product: ApiProduct): Product {
  const id = String(product.id ?? product.slug ?? "");
  const inStock =
    product.in_stock ??
    (typeof product.stock_quantity === "number"
      ? product.stock_quantity > 0
      : true);
  const apiImages = Array.isArray(product.images)
    ? product.images.filter(Boolean)
    : [];
  const apiImage = apiImages[0] || product.image || undefined;

  return {
    id,
    name: product.title || "Neos7 Jewellery",
    sku: product.sku || `NG-${id.padStart(3, "0")}`,
    price: Number(product.price) || 0,
    category:
      titleCase(product.category?.name || product.category?.slug || "") ||
      "Jewellery",
    availability: inStock ? "In Stock" : "Out of Stock",
    rating: 0,
    reviews: 0,
    seller: "Neos7 Gold Joaillerie",
    images: imageList(product),
    description:
      product.description || product.short_description || undefined,
    specifications: specificationsFor(product),
    source: "api",
    apiSlug: product.slug,
    apiImage,
  };
}

function unwrap(payload: unknown): ApiProduct[] {
  if (Array.isArray(payload)) return payload as ApiProduct[];
  if (payload && typeof payload === "object") {
    const data = (payload as { data?: unknown }).data;
    if (Array.isArray(data)) return data as ApiProduct[];
    if (data && typeof data === "object" && !Array.isArray(data)) {
      return [data as ApiProduct];
    }
  }
  return [];
}

export async function fetchApiProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE}/api/frontend/products`, {
      cache: "no-store",
    });
    if (!response.ok) return fallbackProducts;

    const payload = await response.json();
    const mapped = unwrap(payload).map(mapApiProduct).filter(Boolean);
    return mapped.length ? mapped : fallbackProducts;
  } catch {
    return fallbackProducts;
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  const key = String(id || "").trim();
  if (!key) return null;

  try {
    const response = await fetch(
      `${API_BASE}/api/frontend/products/${encodeURIComponent(key)}`,
      { cache: "no-store" }
    );
    if (response.ok) {
      const payload = await response.json();
      const list = unwrap(payload);
      const product = list.find(
        (item) =>
          String(item.id) === key ||
          item.slug === key ||
          String(item.slug) === key
      );
      if (product) return mapApiProduct(product);
    }
  } catch {
    // Fall through to the catalogue lookup below.
  }

  const catalogue = await fetchApiProducts();
  const match = catalogue.find(
    (item) => item.id === key || item.apiSlug === key
  );
  if (match) return match;

  return fallbackProducts.find((item) => item.id === key) ?? null;
}
