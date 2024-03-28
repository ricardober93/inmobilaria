import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

import { deleteProperty } from "~/models/property.server";

export const action = ({ params }: ActionFunctionArgs) => {
  const id = params.id;

  if (!id) {
    return json({
      message: "No hay id",
      ok: false,
    });
  }

  deleteProperty({
    propertyId: Number(id),
  });

  return json({
    message: "Property deleted",
    ok: true,
  });
};
