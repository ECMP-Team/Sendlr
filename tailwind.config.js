/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-space": "#FFFFFF",
        "dark-secondary": "#F5F7FA",
        "cyber-blue": "#2541B2",
        "text-primary": "#03256C",
        "text-secondary": "#1768AC",
        "accent-light": "#06BEE1",
        "accent-dark": "#03256C",
      },
      fontFamily: {
        "geist-sans": ["var(--font-geist-sans)", "sans-serif"],
        "geist-mono": ["var(--font-geist-mono)", "monospace"],
      },
      animation: {
        "glow-pulse": "glow-pulse 2s infinite",
        "progress-wave": "progress-wave 2s linear infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 5px #2541B2" },
          "50%": { boxShadow: "0 0 20px #2541B2" },
        },
        "progress-wave": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
