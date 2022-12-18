// https://windicss.org/guide/configuration.html
import { defineConfig } from 'windicss/helpers';
import type { FullConfig } from 'windicss/types/interfaces';

const windiConfig: FullConfig = {
  attributify: true,
  darkMode: 'class',
  extract: {
    include: ['./*.{ts,vue}', './components/**/*.{ts,vue}', './layouts/**/*.{ts,vue}', './pages/**/*.{ts,vue}'],
  },
  shortcuts: {},
  theme: {
    extend: {
      colors: {
        'theme-text': 'var(--theme-text)',
        'theme-text-subtle': 'var(--theme-text-subtle)',
        'theme-text-accent': 'var(--theme-text-accent)',
        'theme-text-positive': 'var(--theme-text-positive)',
        'theme-text-negative': 'var(--theme-text-negative)',
        'theme-text-info': 'var(--theme-text-info)',
        'theme-text-warning': 'var(--theme-text-warning)',
        'theme-bg': 'var(--theme-bg)',
        'theme-bg-subtle': 'var(--theme-bg-subtle)',
        'theme-bg-accent': 'var(--theme-bg-accent)',
        'theme-border': 'var(--theme-border)',
        'theme-border-subtle': 'var(--theme-border-subtle)',
        'theme-border-accent': 'var(--theme-border-accent)',
      },
    },
  },
};

export default defineConfig(windiConfig);
