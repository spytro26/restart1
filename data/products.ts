export type ProductPreset = {
  name: string;
  cpAboveFreezing: number; // kJ/kg·K
  respirationWattsPerTonne: number; // W/Tonne
  hasRespiration: boolean;
};

export const PRODUCT_PRESETS: ProductPreset[] = [
  { name: 'Custom', cpAboveFreezing: 4.1, respirationWattsPerTonne: 50, hasRespiration: true },
  
  // Dairy Products
  { name: 'Butter', cpAboveFreezing: 2.4, respirationWattsPerTonne: 0, hasRespiration: false },
  { name: 'Cheese Fat', cpAboveFreezing: 2.8, respirationWattsPerTonne: 0, hasRespiration: false },
  { name: 'Cheese Lean', cpAboveFreezing: 3.2, respirationWattsPerTonne: 0, hasRespiration: false },
  { name: 'Curd', cpAboveFreezing: 3.6, respirationWattsPerTonne: 0, hasRespiration: false },
  { name: 'Margarine', cpAboveFreezing: 2.5, respirationWattsPerTonne: 0, hasRespiration: false },
  { name: 'Milk', cpAboveFreezing: 3.9, respirationWattsPerTonne: 0, hasRespiration: false },
  { name: 'Dairy Mean Value', cpAboveFreezing: 3.2, respirationWattsPerTonne: 0, hasRespiration: false },
  
  // Fish & Seafood
  { name: 'Fish', cpAboveFreezing: 3.7, respirationWattsPerTonne: 0, hasRespiration: false },
  { name: 'Fish Mean Value', cpAboveFreezing: 3.6, respirationWattsPerTonne: 0, hasRespiration: false },
  { name: 'Sea Fish Fat', cpAboveFreezing: 3.4, respirationWattsPerTonne: 0, hasRespiration: false },
  { name: 'Sea Fish Lean', cpAboveFreezing: 3.8, respirationWattsPerTonne: 0, hasRespiration: false },
  { name: 'Sea Fish Smoked', cpAboveFreezing: 3.2, respirationWattsPerTonne: 0, hasRespiration: false },
  { name: 'Shell Fish', cpAboveFreezing: 3.9, respirationWattsPerTonne: 0, hasRespiration: false },
  
  // Fruits
  { name: 'Pineapple', cpAboveFreezing: 3.8, respirationWattsPerTonne: 120, hasRespiration: true },
  { name: 'Apple', cpAboveFreezing: 3.6, respirationWattsPerTonne: 250, hasRespiration: true },
  { name: 'Apricots', cpAboveFreezing: 3.7, respirationWattsPerTonne: 180, hasRespiration: true },
  { name: 'Banana', cpAboveFreezing: 3.6, respirationWattsPerTonne: 350, hasRespiration: true },
  { name: 'Cherries', cpAboveFreezing: 3.5, respirationWattsPerTonne: 200, hasRespiration: true },
  { name: 'Grapes', cpAboveFreezing: 3.4, respirationWattsPerTonne: 150, hasRespiration: true },
  { name: 'Mangoes', cpAboveFreezing: 3.7, respirationWattsPerTonne: 300, hasRespiration: true },
  { name: 'Fruit Mean Value', cpAboveFreezing: 3.6, respirationWattsPerTonne: 200, hasRespiration: true },
  { name: 'Melons', cpAboveFreezing: 3.9, respirationWattsPerTonne: 100, hasRespiration: true },
  { name: 'Pears', cpAboveFreezing: 3.5, respirationWattsPerTonne: 180, hasRespiration: true },
  { name: 'Strawberries', cpAboveFreezing: 3.8, respirationWattsPerTonne: 280, hasRespiration: true },
  
  // Other Food Items
  { name: 'Beer', cpAboveFreezing: 3.9, respirationWattsPerTonne: 0, hasRespiration: false },
  { name: 'Bread', cpAboveFreezing: 2.8, respirationWattsPerTonne: 0, hasRespiration: false },
  { name: 'Chocolate', cpAboveFreezing: 1.8, respirationWattsPerTonne: 0, hasRespiration: false },
  { name: 'Cut Flowers', cpAboveFreezing: 3.7, respirationWattsPerTonne: 400, hasRespiration: true },
  { name: 'Dough', cpAboveFreezing: 3.2, respirationWattsPerTonne: 0, hasRespiration: false },
  { name: 'Eggs', cpAboveFreezing: 3.1, respirationWattsPerTonne: 0, hasRespiration: false },
  { name: 'Ice', cpAboveFreezing: 4.2, respirationWattsPerTonne: 0, hasRespiration: false },
  
  // Meat & Poultry
  { name: 'Meat', cpAboveFreezing: 3.35, respirationWattsPerTonne: 0, hasRespiration: false },
  { name: 'Chicken', cpAboveFreezing: 3.4, respirationWattsPerTonne: 0, hasRespiration: false },
  { name: 'Pig Fat', cpAboveFreezing: 2.8, respirationWattsPerTonne: 0, hasRespiration: false },
  { name: 'Pig Lean', cpAboveFreezing: 3.6, respirationWattsPerTonne: 0, hasRespiration: false },
  
  // Vegetables
  { name: 'Beans', cpAboveFreezing: 3.2, respirationWattsPerTonne: 180, hasRespiration: true },
  { name: 'Cabbage', cpAboveFreezing: 3.9, respirationWattsPerTonne: 140, hasRespiration: true },
  { name: 'Carrots', cpAboveFreezing: 3.6, respirationWattsPerTonne: 160, hasRespiration: true },
  { name: 'Cucumber', cpAboveFreezing: 4.0, respirationWattsPerTonne: 110, hasRespiration: true },
  { name: 'Lettuce', cpAboveFreezing: 4.0, respirationWattsPerTonne: 200, hasRespiration: true },
  { name: 'Mushroom', cpAboveFreezing: 3.8, respirationWattsPerTonne: 300, hasRespiration: true },
  { name: 'Onions', cpAboveFreezing: 3.7, respirationWattsPerTonne: 120, hasRespiration: true },
  { name: 'Peas', cpAboveFreezing: 3.4, respirationWattsPerTonne: 250, hasRespiration: true },
  { name: 'Potato', cpAboveFreezing: 3.5, respirationWattsPerTonne: 120, hasRespiration: true },
  { name: 'Roots', cpAboveFreezing: 3.5, respirationWattsPerTonne: 150, hasRespiration: true },
  { name: 'Sweet Potato', cpAboveFreezing: 3.4, respirationWattsPerTonne: 140, hasRespiration: true },
  { name: 'Tomatoes', cpAboveFreezing: 3.9, respirationWattsPerTonne: 200, hasRespiration: true },
];

export const PRODUCT_PRESET_MAP = PRODUCT_PRESETS.reduce<Record<string, ProductPreset>>(
  (acc, p) => {
    acc[p.name] = p;
    return acc;
  },
  {}
);
