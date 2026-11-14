import type { Product } from "./products";
import { products } from "./products";
import { siteAsset } from "../../site";

/**
 * Resolve the try-on asset root dynamically via siteAsset() so it respects
 * NEXT_PUBLIC_BASE_PATH in both development and production on the main domain.
 */
export function getTryOnBasePath(): string {
  return siteAsset("tryon");
}

export const TRYON_BASE_PATH = siteAsset("tryon");

export type TryOnType = "necklace" | "earrings" | "ring" | "bracelet";

export type TryOnAsset = {
  id: string;
  src: string;
  type: TryOnType;
  label: string;
  /**
   * Horizontal visible-span reference in centimetres.  For necklaces this is
   * the width of the piece as worn across the collarbone, not the chain
   * circumference and not a source-image pixel size.
   */
  widthCm: number;
  /** Necklace-specific calibrated worn span. Takes precedence over widthCm. */
  wornWidthCm?: number;
  /** Real chain circumference when the product data exposes it. */
  chainLengthCm?: number;
  /** Optional physical height for hanging pieces such as earrings. */
  heightCm?: number;
  /** Fine tuning expressed in degrees / fractions of the detected anatomy. */
  rotation?: number;
  verticalOffset?: number;
  horizontalOffset?: number;
  /** Optional composite mode for photographic product images. */
  blend?: "multiply";
  /** @deprecated Necklaces are sized from their own visible aspect + worn span. */
  designScale?: number;
};

const asset = (
  id: string,
  type: TryOnType,
  label: string,
  widthCm: number,
  extra: Partial<TryOnAsset> = {}
): TryOnAsset => ({
  id,
  // src is intentionally a bare path — TryOnStudio prefixes it at runtime
  // via getTryOnBasePath() to avoid SSR/client hydration mismatches.
  src: `/products/${id}.png`,
  type,
  label,
  widthCm,
  ...extra,
});

/**
 * Convert a real chain circumference to the horizontal span of the piece when
 * worn.  This is a geometric calibration for a single product's chain length,
 * not a universal necklace width.  Products with known calibration use their
 * explicit `wornWidthCm` instead.
 */
export function estimateWornSpanCm(chainLengthCm: number): number {
  return chainLengthCm * 0.45;
}

export const TRYON_ASSETS: Record<string, TryOnAsset> = {
  // Catalogue sizes: 50 cm chain.
  "necklace-gold-chain": asset(
    "necklace-gold-chain",
    "necklace",
    "Gold chain necklace",
    22.5,
    { wornWidthCm: 22.5, chainLengthCm: 50, verticalOffset: 0.04 }
  ),
  // Catalogue sizes: 45 cm chain.
  "necklace-crown": asset(
    "necklace-crown",
    "necklace",
    "Crown pendant necklace",
    20.25,
    { wornWidthCm: 20.25, chainLengthCm: 45, verticalOffset: 0.03 }
  ),
  // Catalogue sizes: 45 cm chain.
  "necklace-diamond-pendant": asset(
    "necklace-diamond-pendant",
    "necklace",
    "Diamond pendant necklace",
    20.25,
    { wornWidthCm: 20.25, chainLengthCm: 45, verticalOffset: 0.02 }
  ),
  "ring-solitaire": asset(
    "ring-solitaire",
    "ring",
    "Solitaire diamond ring",
    1.9,
    { verticalOffset: 0.02 }
  ),
  "ring-heart": asset(
    "ring-heart",
    "ring",
    "Heart motif ring",
    1.9,
    { verticalOffset: 0.02 }
  ),
  "ring-diamond-band": asset(
    "ring-diamond-band",
    "ring",
    "Diamond band ring",
    1.9,
    { verticalOffset: 0.02 }
  ),
  "bracelet-gold-charms": asset(
    "bracelet-gold-charms",
    "bracelet",
    "Gold charm bracelet",
    6.6
  ),
  "bracelet-silver-chain": asset(
    "bracelet-silver-chain",
    "bracelet",
    "Silver link bracelet",
    6.3
  ),
  "bracelet-heart-band": asset(
    "bracelet-heart-band",
    "bracelet",
    "Gold heart bangle",
    6.1
  ),
  "earrings-gold-drop": asset(
    "earrings-gold-drop",
    "earrings",
    "Gold drop earrings",
    1.2,
    { heightCm: 3.2, verticalOffset: 0.03 }
  ),
  "earrings-pearl-hoop": asset(
    "earrings-pearl-hoop",
    "earrings",
    "Pearl hoop earrings",
    1.6,
    { heightCm: 2.7, verticalOffset: 0.02 }
  ),
  "earrings-bow-jhumka": asset(
    "earrings-bow-jhumka",
    "earrings",
    "Bow jhumka earrings",
    1.8,
    { heightCm: 2.9, verticalOffset: 0.03 }
  ),
};

/**
 * The main catalogue uses editorial photography for its product pages.  Each
 * piece is paired with the closest transparent reference asset for try-on.
 * Several products intentionally share a silhouette when the reference
 * library has no closer match; their name, price and page remain untouched.
 */
export const PRODUCT_TRYON_ASSET: Record<string, string> = {
  "1": "bracelet-gold-charms",
  "2": "bracelet-silver-chain",
  "3": "bracelet-heart-band",
  "4": "bracelet-gold-charms",
  "5": "bracelet-silver-chain",
  "6": "bracelet-gold-charms",
  "7": "bracelet-silver-chain",
  "8": "bracelet-gold-charms",
  "9": "ring-solitaire",
  "10": "ring-heart",
  "11": "ring-diamond-band",
  "12": "necklace-crown",
  "13": "necklace-gold-chain",
  "14": "necklace-diamond-pendant",
  "15": "bracelet-gold-charms",
  "16": "bracelet-silver-chain",
  "17": "bracelet-heart-band",
  "18": "earrings-bow-jhumka",
  "19": "earrings-pearl-hoop",
  "20": "earrings-gold-drop",
};

export function normalizeTryOnType(value: string | undefined | null): TryOnType | null {
  const type = String(value || "").toLowerCase();

  if (
    type.includes("necklace") ||
    type.includes("chain") ||
    type.includes("pendant") ||
    type.includes("choker")
  ) {
    return "necklace";
  }

  if (type.includes("earring")) return "earrings";

  if (type.includes("bracelet") || type.includes("bangle")) {
    return "bracelet";
  }

  if (type.includes("ring")) return "ring";

  return null;
}

export function getProductTryOnType(product: Product | null | undefined): TryOnType | null {
  if (!product) return null;

  return (
    normalizeTryOnType(product.category) ||
    normalizeTryOnType(product.name)
  );
}

function chooseApiTryOnAsset(product: Product): TryOnAsset | null {
  const type = getProductTryOnType(product);
  if (!type) return null;

  const text = `${product.name} ${product.category}`.toLowerCase();
  const keywords: Record<TryOnType, string[]> = {
    necklace: ["diamond pendant", "pendant", "crown", "chain", "necklace"],
    ring: ["solitaire", "diamond", "heart", "band", "ring"],
    bracelet: ["charm", "silver", "heart", "tennis", "bangle", "bracelet"],
    earrings: ["drop", "pearl", "hoop", "bow", "jhumka", "stud", "earring"],
  };

  const candidates = Object.values(TRYON_ASSETS).filter(
    (candidate) => candidate.type === type
  );

  let reference: TryOnAsset | null = null;

  for (const keyword of keywords[type]) {
    const match = candidates.find(
      (candidate) =>
        candidate.id.includes(keyword) ||
        candidate.label.toLowerCase().includes(keyword)
    );
    if (match) {
      reference = match;
      break;
    }
  }

  reference = reference || candidates[0] || null;
  if (!reference) return null;

  if (product.apiImage) {
    // API products often carry their real chain length in specifications.
    // Use it to calibrate this product independently instead of inheriting
    // the reference asset's size.
    const chainLengthCm =
      type === "necklace" ? parseChainLengthCm(product) : null;
    const wornWidthCm =
      type === "necklace"
        ? chainLengthCm
          ? estimateWornSpanCm(chainLengthCm)
          : reference.wornWidthCm ?? reference.widthCm
        : reference.widthCm;

    return {
      ...reference,
      id: `api-${product.id}`,
      src: product.apiImage,
      label: product.name,
      blend: "multiply",
      widthCm: wornWidthCm,
      wornWidthCm: type === "necklace" ? wornWidthCm : reference.wornWidthCm,
      chainLengthCm: chainLengthCm ?? reference.chainLengthCm,
      // A reference image's physical height must never be forced onto a
      // different product's photo.
      heightCm: type === "necklace" ? undefined : reference.heightCm,
    };
  }

  return reference;
}

function parseChainLengthCm(product: Product): number | null {
  const raw = product.specifications?.size;
  if (!raw) return null;

  const match = String(raw).match(/(\d+(?:\.\d+)?)\s*cm/i);
  if (!match) return null;

  const value = Number(match[1]);
  return Number.isFinite(value) && value > 0 ? value : null;
}

export function getTryOnAssetForProduct(
  product: Product | null | undefined
): TryOnAsset | null {
  if (!product) return null;

  if (product.source === "api") {
    return chooseApiTryOnAsset(product);
  }

  const mapped = PRODUCT_TRYON_ASSET[product.id];
  if (mapped && TRYON_ASSETS[mapped]) return TRYON_ASSETS[mapped];

  // Graceful fallback for a future product without an explicit mapping.
  const type = getProductTryOnType(product);
  if (!type) return null;

  const fallback = Object.values(TRYON_ASSETS).find(
    (candidate) => candidate.type === type
  );

  return fallback || null;
}

export function isTryOnSupported(product: Product | null | undefined): boolean {
  return Boolean(getTryOnAssetForProduct(product));
}

export const TRYON_PRODUCTS = products
  .map((product) => ({
    product,
    asset: getTryOnAssetForProduct(product),
  }))
  .filter(
    (entry): entry is { product: Product; asset: TryOnAsset } =>
      Boolean(entry.asset)
  );

/** Model photos — call getTryOnBasePath() at render time to prefix these. */
export const MODEL_IMAGE = "/models/model.jpg";
export const HAND_IMAGE = "/models/hand-display.png";

export function usesHandModel(type: TryOnType | null): boolean {
  return type === "ring" || type === "bracelet";
}
