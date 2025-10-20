export type Pokemon = {
  id: number;
  species: {
    name: string;
    url: string;
  };
  sprites: {
    front_shiny: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
};

export type Item = {
  id: number;
  name: string;
  cost: number;
  category: {
    name: string;
    url: string;
  };
  effect_entries?: Array<{
    effect: string;
    language: {
      name: string;
      url: string;
    };
  }>;
};

export type Location = {
  id: number;
  name: string;
  region?: {
    name: string;
    url: string;
  };
  areas?: Array<{
    name: string;
    url: string;
  }>;
};

export type Berry = {
  id: number;
  name: string;
  growth_time: number;
  max_harvest: number;
  natural_gift_power?: number;
  natural_gift_type?: {
    name: string;
    url: string;
  };
  firmness?: {
    name: string;
    url: string;
  };
};
