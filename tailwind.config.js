/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // ✨ ELEGANT GREEN - WARNA UTAMA
        primary: {
          DEFAULT: "#0B301D", // Deep Forest Green
          dark: "#082415", // Untuk hover/active
          light: "#144229", // Emerald Green (Aksen)
        },

        // ✨ SECONDARY - LUXURY GOLD
        secondary: {
          DEFAULT: "#D4AF37", // Classic Metallic Gold
          dark: "#7A6B39", // Dark Gold / Olive Tint
          light: "#C5A059", // Warm Gold
        },

        accent: "#D4AF37",
        gold: "#C5A059",

        // ✨ BATIK COLOR PALETTE
        batik: {
          cream: "#FAF8F6",
          beige: "#F2EBE1",
          brown: "#0B301D", // Deep Forest Green instead of brown
          dark: "#082415", // Footer
          sand: "#E5DDD5",
          mocha: "#D4AF37", // Gold instead of mocha
        },

        bronze: {
          light: "#E8D8A3",
          DEFAULT: "#C5A059",
          dark: "#4A4523",
        },

        // ✨ WARNA RAMADAN & DISKON
        ramadan: {
          teal: "#0B301D",
          gold: "#D4AF37",
          cream: "#FAF8F6",
          sand: "#F2EBE1",
          wine: "#7A6B39",
          emerald: "#144229",
        },

        // ✨ WARNA DISKON
        discount: {
          red: "#C84B31",
          gold: "#D4AF37",
          burgundy: "#7A6B39",
          coral: "#144229",
        },

        // ✨ WARNA SUPPORT
        support: {
          green: "#0B301D",
          teal: "#144229",
          mint: "#F2F9F5",
          sage: "#4A4523",
          cream: "#FAF8F6",
        },

        response: {
          fast: "#144229",
          medium: "#D4AF37",
          highlight: "#C5A059",
        },

        hours: {
          bg: "#FAF8F6",
          border: "#E5DDD5",
          text: "#0B301D",
        },

        badge: {
          email: "#144229",
          whatsapp: "#25D366",
          satisfaction: "#D4AF37",
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
          "linear-gradient(120deg, #082415 0%, #0B301D 50%, #D4AF37 100%)",
        "ramadan-gradient": "linear-gradient(135deg, #0B301D 0%, #144229 100%)",
        "discount-gradient":
          "linear-gradient(145deg, #C84B31 0%, #7A6B39 100%)",
        "support-gradient": "linear-gradient(135deg, #0B301D 0%, #144229 100%)",
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
