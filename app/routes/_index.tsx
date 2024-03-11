import type { MetaFunction } from "@remix-run/node";


import { Navbar } from "~/@/components/navbar";
import { Recomendation } from "~/@/components/recomendation";
import { Hero } from "~/@/components/ui/hero";

export const meta: MetaFunction = () => [
  {
    title: "Remix Notes",
    description: "A simple note taking app built with Remix",
    "og:image": "https://remix.run/logo.png",
    "og:type": "website",
    "og:site_name": "Remix Notes",
    "og:title": "Remix Notes",
    "og:description": "A simple note taking app built with Remix",
    "twitter:card": "summary",
    "twitter:site": "@remix_run",
    "twitter:title": "Remix Notes",
    "twitter:description": "A simple note",
    "twitter:image": "https://remix.run/logo.png",
  },
];

export default function Index() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      <Recomendation />
    </main>
  );
}
