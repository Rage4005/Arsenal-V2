export interface SystemRequirements {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  storage: string;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  coverImage: string;
  bannerImage: string;
  trailerVideo?: string;
  systemRequirements?: {
    minimum: SystemRequirements;
    recommended: SystemRequirements;
  };
  releaseDate: string;
  developer: string;
  publisher: string;
  categories: string[];
  platform: string[];
}

export interface CartItem extends Game {
  quantity: number;
}
