import { heroui } from "@heroui/react";
export default heroui({
  themes: {
    ggst: {
      extend: "dark",
      colors: {
        background: "#27272a",
        foreground: "#be123c",
        primary: {
          foreground: "#000000",
          DEFAULT: "#be123c",
        },
      },
    },
  },
});
