import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Luwei Mail",
		short_name: "Luwei Mail",
		description: "E-mail corporativo da Luwei.",
		id: "/",
		scope: "/",
		start_url: "/inbox",
		display: "standalone",
		background_color: "#0c0a0f",
		theme_color: "#0c0a0f",
		icons: [
			{ src: "/icon-192.png", sizes: "192x192", type: "image/png" },
			{ src: "/icon-512.png", sizes: "512x512", type: "image/png" },
		],
	};
}
