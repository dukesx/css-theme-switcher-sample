module.exports = {
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  important: true,
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-line-clamp"),
  ],
  theme: {
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui"],
      serif: ["ui-serif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
      display: ["Poppins"],
      body: ["Avenir Next Cyr"],
      segoe: ["Segoe UI"],
    },
    lineClamp: {
      1: 1,
      2: 2,
      3: 3,
    },
    screens: {
      xxs: { min: "350px", max: "399px" },
      xs: { min: "400px", max: "639px" },
      sm: { min: "640px", max: "767px" },
      md: { min: "768px", max: "1023px" },
      lg: { min: "1024px", max: "1279px" },
      xl: { min: "1280px", max: "1699px" },
      xxl: { min: "1700px" },
    },
    cursor: {
      auto: "auto",
      default: "default",
      pointer: "pointer",
      wait: "wait",
      text: "text",
      move: "move",
      "not-allowed": "not-allowed",
      crosshair: "crosshair",
      "zoom-in": "zoom-in",
      grab: "grab",
    },
    extend: {
      colors: {
        dark: "#191919",
      },
    },
  },
};
