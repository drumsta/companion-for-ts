// https://windicss.org/guide/configuration.html
import { defineConfig } from 'windicss/helpers';
import type { FullConfig } from 'windicss/types/interfaces';

export default defineConfig({
  attributify: true,
  darkMode: 'class',
  extract: {
    include: ['./*.{ts,vue}', './components/*.{ts,vue}', './layouts/*.{ts,vue}', './pages/*.{ts,vue}'],
  },
  shortcuts: {},
  theme: {
    extend: {
      colors: {
        'theme-text': 'var(--theme-text)',
        'theme-text-accent': 'var(--theme-text-accent)',
        'theme-bg': 'var(--theme-bg)',
      },
    },
  },
} as FullConfig);
