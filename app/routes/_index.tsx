import type { MetaFunction } from "@remix-run/node";

import { Hero } from "~/@/components/ui/hero";
import { Navbar } from "~/@/components/ui/navbar";

export const meta: MetaFunction = () => [{ title: "Remix Notes" }];

export default function Index() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
    </main>
  );
}
