export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#13b6ec",
        "background-light": "#f6f8f8",
        "background-dark": "#101d22",
        "card-light": "#ffffff",
        "card-dark": "#1A262B",
        "text-secondary-light": "#64748b",
        "text-secondary-dark": "#9db2b9",
        "border-dark": "#283539",
        "surface-dark": "#1c2b31",
        "border-error": 'red',
        // "success": "#10B981",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"]
      },
      borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" },
    },
  },
};
