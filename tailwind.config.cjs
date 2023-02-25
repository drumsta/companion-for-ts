/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,astro}"],
  theme: {
    extend: {
      cursor: {
        grab: "grab",
      },
      fontSize: {
        xxs: ".5rem",
      },
      colors: {
        "color-text": "var(--color)",
        "color-text-subtle": "var(--color-subtle)",
        "color-text-accent": "var(--color-accent)",
        "color-bg": "var(--color-bg)",
        "color-bg-subtle": "var(--color-bg-subtle)",
        "color-bg-accent": "var(--color-bg-accent)",
        "color-border": "var(--color-border)",
        "color-border-subtle": "var(--color-border-subtle)",
        "color-border-accent": "var(--color-accent)",
        "color-light": "var(--color-light)",
        "color-dark": "var(--color-dark)",
        "color-primary-dark": "var(--color-primary-dark)",
        "color-primary-light": "var(--color-primary-light)",
        "color-secondary-dark": "var(--color-secondary-dark)",
        "color-secondary-light": "var(--color-secondary-light)",
        "color-positive-dark": "var(--color-positive-dark)",
        "color-positive-light": "var(--color-positive-light)",
        "color-negative-dark": "var(--color-negative-dark)",
        "color-negative-light": "var(--color-negative-light)",
        "color-warning-dark": "var(--color-warning-dark)",
        "color-warning-light": "var(--color-warning-light)",
      },
    },
  },
  plugins: [],
};
