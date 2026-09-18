export type BrothType = 'mala' | 'clear' | 'tomato' | 'mushroom' | 'shabu';

export interface FlavorProfile {
  nutty: number;   // 고소함
  spicy: number;   // 매콤함
  savory: number;  // 감칠맛
  mala: number;    // 마라/얼얼함
  sweet: number;   // 달콤함
  tangy: number;   // 산미/상큼함
}

export interface SauceIngredientAmount {
  ingredientId: string;
  name: string;
  amount: string;
  spoons: number;
  tip?: string;
}

export interface SauceRecipe {
  id: string;
  name: string;
  subtitle: string;
  originType: 'haidilao' | 'rotary' | 'traditional' | 'custom' | 'k-style';
  originLabel: string;
  badge?: string;
  imageUrl?: string;
  visualDescription?: string;
  broths: BrothType[];
  flavor: FlavorProfile;
  ingredients: SauceIngredientAmount[];
  proTip: string;
  recommendPairing: string;
  isCustom?: boolean;
  createdAt?: string;
}

export interface IngredientItem {
  id: string;
  name: string;
  shortName?: string;
  category: 'meat' | 'seafood' | 'veg' | 'tofu' | 'noodle' | 'special';
  cookTimeSeconds: number;
  cookTimeLabel: string;
  quickTip: string;
  proGuide: string;
  warning?: string;
  bestSauceId?: string;
}

export interface SecretHack {
  id: string;
  title: string;
  tag: string;
  place: '하이디라오' | '집/밀키트' | '회전훠궈' | '마라탕';
  summary: string;
  steps: string[];
  chefTip: string;
}

export interface AvailableIngredient {
  id: string;
  name: string;
  shortName?: string;
  category: 'base' | 'oil' | 'fresh' | 'sauce' | 'topping';
  categoryLabel: string;
  color: string;
  flavorImpact: Partial<FlavorProfile>;
  description?: string;
  appearance?: string;
  usageTip?: string;
}
