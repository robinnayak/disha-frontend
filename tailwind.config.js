// tailwind.config.js
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // boxShadow: {
      //   accent: "0 0 10px 5px #3498DB", // Adjust this for a glow effect
      // },
      colors: {
        "primary": "#2C3E50", // Dark blue, ideal for primary elements like headers, navbars, or main actions
        "primary-on-dark": "#FFFFFF", // White for text on dark backgrounds, ensuring high contrast and readability
        "secondary": "#273746", // Purple as a secondary color for highlights or secondary actions, providing a calm and distinct feel
        "accent": "#3498DB", // Blue for accents, links, or interactive elements, offering a sense of trust and interaction
        "background": "#ECF0F1", // Soft light gray, providing a neutral and modern look for the background
        "darker": "#273746", // Charcoal for dark borders, shadows, or footer backgrounds, maintaining depth without harshness
        "secondary-text": "#273746", // Muted gray for secondary text, such as subtitles or less prominent information
        "success-text": "#2ECC71", // Green for success messages or positive feedback, ensuring clarity and positivity
        "warning-text": "#E67E22", // Orange for warnings, offering a clear indication without the intensity of red
        "info-text": "#3498DB", // Blue for informational messages, keeping consistency with accent colors
      },
    },
  },
  plugins: [],
};
