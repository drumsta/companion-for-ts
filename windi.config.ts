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
      cursor: {
        grab: 'grab',
      },
      colors: {
        'theme-text': 'var(--theme-text)',
        'theme-text-subtle': 'var(--theme-text-subtle)',
        'theme-text-accent': 'var(--theme-text-accent)',

        'theme-bg': 'var(--theme-bg)',
        'theme-bg-subtle': 'var(--theme-bg-subtle)',
        'theme-bg-accent': 'var(--theme-bg-accent)',

        'theme-border': 'var(--theme-border)',
        'theme-border-subtle': 'var(--theme-border-subtle)',
        'theme-border-accent': 'var(--theme-border-accent)',

        'theme-primary': 'var(--theme-primary)',
        'theme-secondary': 'var(--theme-secondary)',
        'theme-accent': 'var(--theme-accent)',
        'theme-positive': 'var(--theme-positive)',
        'theme-negative': 'var(--theme-negative)',
        'theme-info': 'var(--theme-info)',
        'theme-warning': 'var(--theme-warning)',
        'theme-light': 'var(--theme-light)',
        'theme-dark': 'var(--theme-dark)',
      },
    },
  },
};

export default defineConfig(windiConfig);
