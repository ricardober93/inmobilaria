// import type { LoaderFunctionArgs } from "@remix-run/node";
import { Property } from ".prisma/client";
import { GetResult } from "@prisma/client/runtime";
import { Link, json, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "react-router";
import { getAllProperty } from "~/models/property.server";
// import { requireUserId } from "~/session.server";

// import { getNoteListItems } from "~/models/note.server";
// import { requireUserId } from "~/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const list = await getAllProperty();
  return json({ list });
};

export default function PropertyPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="w-full flex h-full flex-col">
      <p>
        No note selected. Select a note on the left, or{" "}
        <Link to="new" className="text-blue-500 underline">
          create a new note.
        </Link>
      </p>

      {data?.list.map((item: GetResult<Property, unknown>) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <p>{item.description}</p>
          <p>{item.price}</p>
          <p>{item.address}</p>
          <p>{item.city}</p>

          <p>{item.bedrooms}</p>
          <p>{item.bathrooms}</p>

          <p>{item.area}</p>
          <p>{item.type}</p>
          <p>{item.status}</p>

          <div className="flex gap-4">
            {item.images.map((image) => (
              <img
                className="aspect-square w-36"
                src={image.url}
                alt={image.id}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
