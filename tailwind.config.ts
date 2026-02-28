export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "text-primary": "#13b6ec",
        "text-gray-200": "#64748b",
        "text-gray-100": "#9db2b9",
        "text-light": "#f6f8f8",
        "background-light": "#f6f8f8",
        "background-dark": "#101d22",
        "background-dark-2": "#283539",
        "background-gray": "#64748b",
        "background-primary": "#13b6ec",
        "border-dark": "#283539",
        "border-gray": "#9db2b9",
        "border-primary": "#13b6ec",
        placeholder: "#9db2b9",
        hover: "#24505b",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 2s linear infinite",
        "pulse-fast": "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        loadingBar: "loadingBar 1.5s ease-in-out infinite",
        fadeIn: "fadeIn 0.25s ease-out forwards",
      },
      keyframes: {
        loadingBar: {
          "0%": { transform: "translateX(-100%)" },
          "50%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(100%)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
};
