import type { ActionFunctionArgs } from "@remix-run/node";
import {
  json,
  redirect,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";

import { createProperty } from "~/models/property.server";
import uploadImageToCloudinary from "~/utils/upload-image-cloudinaty";

export const action = async ({ request }: ActionFunctionArgs) => {
  const uploadHandler = unstable_composeUploadHandlers(
    async ({ name, contentType, data }) => {
      if (contentType !== "image/jpeg" && contentType !== "image/png") {
        return undefined;
      }
      if (name !== "images") {
        return undefined;
      }
      const uploadedImage = await uploadImageToCloudinary(data);
      return uploadedImage.secure_url;
    },
    unstable_createMemoryUploadHandler(),
  );

  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler,
  );
  const name = formData.get("name");
  const description = formData.get("description");
  const address = formData.get("address");
  const city = formData.get("city");
  const type = formData.get("type");
  const price = formData.get("price");
  const area = formData.get("area");
  const bedrooms = formData.get("bedrooms");
  const bathrooms = formData.get("bathrooms");
  const amenities = formData.get("amenities");
  const status = formData.get("status");
  const images = formData.getAll("images");

  console.log({
    name,
    description,
    address,
    city,
    type,
    price,
    area,
    bedrooms,
    bathrooms,
    amenities,
    status,
    images,
  });

  if (typeof name !== "string" || name.length === 0) {
    return json(
      {
        errors: {
          description: null,
          name: "Title is required",
          address: null,
          city: null,
          type: null,
          price: null,
          area: null,
          bedrooms: null,
          bathrooms: null,
        },
      },
      { status: 400 },
    );
  }

  if (typeof description !== "string" || description.length === 0) {
    return json(
      {
        errors: {
          description: "description is required",
          name: null,
          address: null,
          city: null,
          type: null,
          price: null,
          area: null,
          bedrooms: null,
          bathrooms: null,
        },
      },
      { status: 400 },
    );
  }

  if (typeof address !== "string" || address.length === 0) {
    return json(
      {
        errors: {
          description: null,
          name: null,
          address: "address is required",
          city: null,
          type: null,
          price: null,
          area: null,
          bedrooms: null,
          bathrooms: null,
        },
      },
      { status: 400 },
    );
  }

  if (typeof city !== "string" || city.length === 0) {
    return json(
      {
        errors: {
          description: null,
          name: null,
          address: null,
          city: "city is required",
          type: null,
          price: null,
          area: null,
          bedrooms: null,
          bathrooms: null,
        },
      },
      { status: 400 },
    );
  }

  if (typeof type !== "string" || type.length === 0) {
    return json(
      {
        errors: {
          description: null,
          name: null,
          address: null,
          city: null,
          type: "type is required",
          price: null,
          area: null,
          bedrooms: null,
          bathrooms: null,
        },
      },
      { status: 400 },
    );
  }

  if (typeof price !== "string") {
    return json(
      {
        errors: {
          description: null,
          name: null,
          address: null,
          city: null,
          type: null,
          price: "price is required",
          area: null,
          bedrooms: null,
          bathrooms: null,
        },
      },
      { status: 400 },
    );
  }

  if (typeof area !== "string") {
    return json(
      {
        errors: {
          description: null,
          name: null,
          address: null,
          city: null,
          type: null,
          price: null,
          area: "area is required",
          bedrooms: null,
          bathrooms: null,
        },
      },
      { status: 400 },
    );
  }

  await createProperty({
    name,
    description,
    address,
    city,
    type,
    price: Number(price),
    area: Number(area),
    bedrooms: Number(bedrooms),
    bathrooms: Number(bathrooms),
    amenities: amenities?.toString() || "",
    status: status?.toString() || "FOR_RENT",
    images: images.map((image) => {
      return {
        url: image.toString(),
      };
    }),
  });

    return json({
      ok: true,
      menssage: "Property created successfully",
    });
};
