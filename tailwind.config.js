module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        dropzone: {
          "100%": { transform: "rotateZ(360deg)" },
        },
      },
      animation: {
        dropzone: "dropzone 2s linear infinite ",
      },
      colors: {
        primary: {
          // https://coolors.co/909db6-748095-586274-3c4453-202631
          100: "#909DB6",
          200: "#748095",
          300: "#586274",
          400: "#3C4453",
          500: "#202631",
        },
        secondary: {
          // https://coolors.co/052e41-053348-0354a3-0074fd-85befe
          100: "#85BEFE",
          200: "#0074FD",
          300: "#0354A3",
          400: "#053348",
          500: "#052E41",
        },
      },
    },
  },
  plugins: [],
};
