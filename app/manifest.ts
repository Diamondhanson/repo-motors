import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Repo Motors",
    short_name: "Repo Motors",
    description:
      "Trust-first marketplace for fairly used and bank-repossessed cars",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1a2b3c",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
