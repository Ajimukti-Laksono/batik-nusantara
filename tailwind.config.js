/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // ✨ ELEGANT BROWN - WARNA UTAMA
        primary: {
          DEFAULT: "#684F33", // Coklat elegant utama
          dark: "#4D3A26", // Untuk hover/active
          light: "#8B6B4F", // Untuk aksen terang
        },

        // ✨ SECONDARY - GOLD WARM
        secondary: {
          DEFAULT: "#D4A574",
          dark: "#B8935E",
          light: "#E8C9A8",
        },

        accent: "#C9944A",
        gold: "#DAB88F",

        // ✨ BATIK COLOR PALETTE
        batik: {
          cream: "#FDF8F3",
          beige: "#F0E6DC",
          brown: "#684F33",
          dark: "#3D2E1F", // Untuk footer
          sand: "#E6D5C3",
          mocha: "#8D6E4F",
        },

        bronze: {
          light: "#CD9F6B",
          DEFAULT: "#B8935E",
          dark: "#8B6F47",
        },

        // ✨ WARNA RAMADAN & DISKON
        ramadan: {
          teal: "#0F5959",
          gold: "#C7A03B",
          cream: "#FFF8E7",
          sand: "#F5E6D3",
          wine: "#7A3E3E",
          emerald: "#2D5A4B",
        },

        // ✨ WARNA DISKON
        discount: {
          red: "#B45C4C",
          gold: "#DAA520",
          burgundy: "#6F2C3C",
          coral: "#E67A5A",
        },

        // ✨ WARNA SUPPORT
        support: {
          green: "#2E5C4E",
          teal: "#3A7B6B",
          mint: "#E8F3F1",
          sage: "#7C9A8F",
          cream: "#FFF9F0",
        },

        response: {
          fast: "#2E5C4E",
          medium: "#7C9A8F",
          highlight: "#DAA520",
        },

        hours: {
          bg: "#FCF8F3",
          border: "#EADBC6",
          text: "#4A5C4C",
        },

        badge: {
          email: "#2E5C4E",
          whatsapp: "#25D366",
          satisfaction: "#B68B40",
        },
      },

      fontFamily: {
        playfair: ['"Playfair Display"', "serif"],
        poppins: ["Poppins", "sans-serif"],
      },

      backgroundImage: {
        "batik-gradient": "linear-gradient(135deg, var(--tw-gradient-stops))",
        "batik-gradient-r":
          "linear-gradient(to right, var(--tw-gradient-stops))",
        "batik-radial":
          "radial-gradient(circle at center, var(--tw-gradient-stops))",
        "warm-gradient":
          "linear-gradient(120deg, #3D2E1F 0%, #684F33 50%, #D4A574 100%)",
        "ramadan-gradient": "linear-gradient(135deg, #0F5959 0%, #2D5A4B 100%)",
        "discount-gradient":
          "linear-gradient(145deg, #B45C4C 0%, #6F2C3C 100%)",
        "support-gradient": "linear-gradient(135deg, #2E5C4E 0%, #3A7B6B 100%)",
      },

      animation: {
        "fade-in": "fadeIn 0.6s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-left": "slideLeft 0.8s ease-out",
        float: "float 3s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 3s infinite",
        shimmer: "shimmer 2s infinite linear",
        "spin-slow": "spin 3s linear infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        "pulse-gold": "pulse-gold 2s ease-in-out infinite",
        "float-discount": "float-discount 3s ease-in-out infinite",
        shine: "shine 3s infinite linear",
        "ping-slow": "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
        "batik-float": "batik-float 60s linear infinite",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideLeft: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(104, 79, 51, 0.3)" },
          "100%": { boxShadow: "0 0 20px rgba(104, 79, 51, 0.6)" },
        },
        "pulse-gold": {
          "0%, 100%": {
            opacity: 1,
            boxShadow: "0 0 5px rgba(199, 160, 59, 0.3)",
          },
          "50%": {
            opacity: 0.9,
            boxShadow: "0 0 20px rgba(199, 160, 59, 0.6)",
          },
        },
        "float-discount": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shine: {
          "0%": { backgroundPosition: "-100px" },
          "100%": { backgroundPosition: "200px" },
        },
        "batik-float": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "60px 60px" },
        },
      },

      screens: {
        xs: "475px",
        "3xl": "1920px",
      },
    },
  },
  plugins: [],
};
