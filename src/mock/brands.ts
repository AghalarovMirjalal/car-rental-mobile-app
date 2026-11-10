import type { Brand, BrandSlug } from "@/types/car";

export const brands: Brand[] = [
  { slug: "lamborghini", name: "Lamborghini", logo: require("@assets/images/brands/lamborghini.png") },
  { slug: "mercedes", name: "Mercedes", logo: require("@assets/images/brands/mercedes.png") },
  { slug: "porsche", name: "Porsche", logo: require("@assets/images/brands/porsche.png") },
  { slug: "bmw", name: "BMW", logo: require("@assets/images/brands/bmw.png") },
  { slug: "ferrari", name: "Ferrari", logo: require("@assets/images/brands/ferrari.png"), fillTile: true },
  { slug: "chevrolet", name: "Chevrolet", logo: require("@assets/images/brands/chevrolet.png") },
  { slug: "lexus", name: "Lexus", logo: require("@assets/images/brands/lexus.png") },
  { slug: "bentley", name: "Bentley", logo: require("@assets/images/brands/bentley.png") },
];

export const getBrand = (slug: BrandSlug) => brands.find((brand) => brand.slug === slug);
