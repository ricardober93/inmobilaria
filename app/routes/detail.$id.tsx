import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getProperty } from "~/models/property.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id;

  const property = await getProperty({ propertyId: Number(id) });

  if (property) {
    return json({ property });
  }
};

export default function Detail() {
  const data = useLoaderData<typeof loader>();
  return <main className="relative min-h-screen">{data.property.name}</main>;
}
