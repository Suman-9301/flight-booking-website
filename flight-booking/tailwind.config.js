module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      colors: {
        primary: "#003366",  // Navy Blue
        secondary: "#ffa500", // Coral (New Accent Color)
        accent: "#00B0FF",  // Sky Blue
        background: "#F1F5F9", // Light Gray
        textDark: "#1E293B",  // Dark Gray
        textLight: "#FFFFFF", // White
        
      },
    },
  },
  plugins: [],
};
