// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [
    require("tailwindcss-radix"),
    plugin(function ({ addVariant }) {
      addVariant("selected", "&.is-selected");
      addVariant("group-selected", ":merge(.group.is-selected) &");
      addVariant("group-selected-hover", ":merge(.group.is-selected):hover &");
    }),
  ],
  theme: {
    fontFamily: {
      sans: ["Heebo", "sans-serif"],
    },
    extend: {
      colors: {
        "primary-yellow": "#FDEC35",
        "primary-yellow-lighter": "#FBF48D",
        "primary-yellow-darker": "#F0DD04",
        "gray-dark": "#272727",
        "gray-dark-700": "#1E1E1E",
        primary: {
          50: "#fffdeb",
          100: "#fef9c0",
          200: "#fef6a2",
          300: "#fef278",
          400: "#fdf05d",
          500: "#fdec35",
          600: "#e6d730",
          700: "#b4a826",
          800: "#8b821d",
          900: "#6a6316",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "login-background-image": "url('../images/map.png')",
        "login-background-image-dark": "url('../images/map-dark.png')",
      },
      boxShadow: {
        header:
          "0px 41px 36px rgba(0, 0, 0, 0.04), 0px 17.1288px 15.0399px rgba(0, 0, 0, 0.0287542), 0px 9.15789px 8.04107px rgba(0, 0, 0, 0.0238443), 0px 5.13384px 4.50776px rgba(0, 0, 0, 0.02), 0px 2.72654px 2.39404px rgba(0, 0, 0, 0.0161557), 0px 1.13458px 0.996212px rgba(0, 0, 0, 0.0112458)",
        "header-dark":
          "0px 41px 36px rgba(0, 0, 0, 0.23), 0px 17.1288px 15.0399px rgba(0, 0, 0, 0.165337), 0px 9.15789px 8.04107px rgba(0, 0, 0, 0.137105), 0px 5.13384px 4.50776px rgba(0, 0, 0, 0.115), 0px 2.72654px 2.39404px rgba(0, 0, 0, 0.0928953), 0px 1.13458px 0.996212px rgba(0, 0, 0, 0.0646635)",
        smooth:
          "0px 138px 80px rgba(0, 0, 0, 0.08), 0px 57.6531px 33.4221px rgba(0, 0, 0, 0.0575083), 0px 30.8241px 17.869px rgba(0, 0, 0, 0.0476886), 0px 17.2797px 10.0172px rgba(0, 0, 0, 0.04), 0px 9.17714px 5.32008px rgba(0, 0, 0, 0.0323114), 0px 3.81881px 2.21381px rgba(0, 0, 0, 0.0224916)",
        "smooth-dark":
          "0px 100px 80px rgba(0, 0, 0, 0.27), 0px 41.7776px 33.4221px rgba(0, 0, 0, 0.194091), 0px 22.3363px 17.869px rgba(0, 0, 0, 0.160949), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.135), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.109051), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0759093)",
      },
    },
  },
};
