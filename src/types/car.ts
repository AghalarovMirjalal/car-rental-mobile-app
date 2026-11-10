export type BrandSlug =
  | "lamborghini"
  | "mercedes"
  | "porsche"
  | "bmw"
  | "ferrari"
  | "chevrolet"
  | "lexus"
  | "bentley"
  | "audi";

export interface Brand {
  slug: BrandSlug;
  name: string;
  /** Local asset (`require(...)`). */
  logo: number;
  /** Some logos (Ferrari) fill the whole tile in the design. */
  fillTile?: boolean;
}

export type FeatureIcon = "speed" | "wifi" | "seats" | "sensor" | "bluetooth" | "doors";

export interface CarFeature {
  id: string;
  icon: FeatureIcon;
  label: string;
  value: string;
}

export interface Car {
  id: string;
  brand: BrandSlug;
  brandName: string;
  model: string;
  /** Local asset (`require(...)`). */
  image: number;
  /** Price shown on catalog cards. */
  price: number;
  /** Price per day shown on the details / booking screen. */
  pricePerDay: number;
  rating: number;
  isHotDeal?: boolean;
  features: CarFeature[];
}
