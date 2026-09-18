export interface RestaurantReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  recommendedSauceOrMenu?: string;
}

export interface RestaurantItem {
  id: string;
  name: string;
  category: 'rotary' | 'haidilao' | 'shabu' | 'buffet';
  categoryLabel: string;
  rating: number;
  reviewCount: number;
  address: string;
  distanceKm: number;
  lat: number;
  lng: number;
  priceRange: string;
  businessHours: string;
  phone: string;
  tag: string;
  highlights: string[];
  signatureMenus: Array<{
    name: string;
    price: string;
    description: string;
  }>;
  sauceBarFeature: string;
  reviews: RestaurantReview[];
}
