import type { Config } from 'tailwindcss';

// https://tailwindcss.nuxt.dev/tailwind/config/
// https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually
// https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js
export default <Partial<Config>>{
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'theme-text': 'var(--theme-text)',
        'theme-text-accent': 'var(--theme-text-accent)',
        'theme-bg': 'var(--theme-bg)',
      },
    },
  },
};
