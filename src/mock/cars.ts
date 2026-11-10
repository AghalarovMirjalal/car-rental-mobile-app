import type { Car, CarFeature } from "@/types/car";

const defaultFeatures: CarFeature[] = [
  { id: "speed", icon: "speed", label: "Top speed", value: "280 km/h" },
  { id: "wifi", icon: "wifi", label: "Wifi", value: "Available" },
  { id: "seats", icon: "seats", label: "Seats", value: "4" },
  { id: "sensor", icon: "sensor", label: "Sensor", value: "Available" },
  { id: "bluetooth", icon: "bluetooth", label: "Bluetooth", value: "4.0" },
  { id: "doors", icon: "doors", label: "Doors", value: "4" },
];

const withFeatures = (overrides: Partial<Record<CarFeature["id"], string>> = {}) =>
  defaultFeatures.map((feature) => ({ ...feature, value: overrides[feature.id] ?? feature.value }));

export const cars: Car[] = [
  {
    id: "audi-q7",
    brand: "audi",
    brandName: "Audi",
    model: "Q7",
    image: require("@assets/images/cars/audi-q7.png"),
    price: 14.99,
    pricePerDay: 24.99,
    rating: 4.8,
    isHotDeal: true,
    features: withFeatures({ speed: "250 km/h", seats: "7", doors: "5" }),
  },
  {
    id: "bmw-x5",
    brand: "bmw",
    brandName: "BMW",
    model: "X5",
    image: require("@assets/images/cars/bmw-x5.png"),
    price: 14.99,
    pricePerDay: 24.99,
    rating: 4.8,
    features: withFeatures(),
  },
  {
    id: "bmw-x7",
    brand: "bmw",
    brandName: "BMW",
    model: "X7",
    image: require("@assets/images/cars/bmw-x7.png"),
    price: 14.99,
    pricePerDay: 26.99,
    rating: 4.7,
    features: withFeatures({ speed: "250 km/h", seats: "7", doors: "5" }),
  },
  {
    id: "bmw-i4",
    brand: "bmw",
    brandName: "BMW",
    model: "i4",
    image: require("@assets/images/cars/bmw-i4.png"),
    price: 14.99,
    pricePerDay: 22.99,
    rating: 4.9,
    features: withFeatures({ speed: "225 km/h", seats: "5", bluetooth: "5.0" }),
  },
  {
    id: "bmw-m3",
    brand: "bmw",
    brandName: "BMW",
    model: "M3",
    image: require("@assets/images/cars/bmw-m3.png"),
    price: 14.99,
    pricePerDay: 29.99,
    rating: 4.9,
    features: withFeatures({ speed: "290 km/h", seats: "5" }),
  },
];

export const hotDeals = cars.filter((car) => car.isHotDeal);

export const getCarById = (id: string) => cars.find((car) => car.id === id);

export const getCarsByBrand = (slug: string | null) =>
  slug ? cars.filter((car) => car.brand === slug) : cars;
