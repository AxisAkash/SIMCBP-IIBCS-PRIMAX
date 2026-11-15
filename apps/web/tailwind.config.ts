import type { Config } from 'tailwindcss';
import { tailwindPreset } from '@simcbp/design-tokens/tailwind-preset';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  // Preset carries the full theme (semantic colors via CSS vars, type, spacing…).
  presets: [tailwindPreset as unknown as Partial<Config>],
};

export default config;
