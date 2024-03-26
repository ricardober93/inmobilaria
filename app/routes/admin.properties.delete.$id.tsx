import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

import { deleteProperty } from "~/models/property.server";

export const action = async ({ params }: ActionFunctionArgs) => {
  const id = params.id;

  if (!id) {
    return json({
      message: "No hay id",
      success: false,
    });
  }

  deleteProperty({
    propertyId: Number(id),
  });

  return json({
    message: "Property deleted",
    success: true,
  });
};
