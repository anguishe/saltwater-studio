import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Saltwater Studio",
    short_name: "Saltwater",
    description:
      "A web design studio for service businesses that refuse to look like everyone else.",
    start_url: "/",
    display: "standalone",
    background_color: "#05161B",
    theme_color: "#05161B",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
