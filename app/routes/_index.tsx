import { Property } from "@prisma/client";
import { json, LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Footer } from "~/@/components/Footer";
import { Navbar } from "~/@/components/navbar";
import { Recomendation } from "~/@/components/recomendation";
import { Hero } from "~/@/components/ui/hero";
import { getSixProperty } from "~/models/property.server";

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

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  const type = url.searchParams.get("type") || "House";


  const data = await getSixProperty({ type });


  return json({ data });
};

export default function Index() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      <Recomendation data={data as Property[]} />
      <Footer />
    </main>
  );
}
