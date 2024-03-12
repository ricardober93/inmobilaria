import type { ActionFunctionArgs } from "@remix-run/node";
import {
  json,
  redirect,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { Form, useFetcher, useNavigate } from "@remix-run/react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

import { Button } from "~/@/components/ui/button";
import { Input } from "~/@/components/ui/input";
import { Label } from "~/@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/@/components/ui/select";
import { Textarea } from "~/@/components/ui/textarea";
import { createProperty } from "~/models/property.server";
import uploadImageToCloudinary from "~/utils/upload-image-cloudinaty";

//import { requireUserId } from "~/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const uploadHandler = unstable_composeUploadHandlers(
    // our custom upload handler
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
    // fallback to memory for everything else
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

  return redirect(`/admin/properties`);
};
export default function NewNotePage() {
  const fetcher = useFetcher();
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const areaRef = useRef<HTMLInputElement>(null);
  const bedroomsRef = useRef<HTMLInputElement>(null);
  const imagesRef = useRef<HTMLInputElement>(null);

  const [selectedUrls, setSelectedUrls] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from([...selectedUrls, e.target.files![0]]);
    setSelectedUrls(files);
  };

  useEffect(() => {
    if (!selectedUrls) {
      setPreview([]);
      return;
    }

    selectedUrls.forEach((file) => {
      const objectUrl = URL.createObjectURL(file);
      setPreview([...preview, objectUrl]);
    });

    return () => preview?.forEach((file) => URL.revokeObjectURL(file));
  }, [selectedUrls]);

  // useEffect(() => {
  //   if (actionData?.errors?.name) {
  //     nameRef.current?.focus();
  //   } else if (actionData?.errors?.description) {
  //     descriptionRef.current?.focus();
  //   } else if (actionData?.errors?.address) {
  //     addressRef.current?.focus();
  //   } else if (actionData?.errors?.city) {
  //     cityRef.current?.focus();
  //   }
  // }, [actionData]);

  const handleFilesUpload = async (event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData();

    selectedUrls.forEach((file) => {
      formData.append("images", file);
    });

    formData.append("name", event?.target["name"].value as string);
    formData.append("description", event.target["description"].value);
    formData.append("address", event.target["address"].value);
    formData.append("city", event.target["city"].value);
    formData.append("type", event.target["type"].value);
    formData.append("price", event.target["price"].value);
    formData.append("area", event.target["area"].value);
    formData.append("bedrooms", event.target["bedrooms"].value);
    formData.append("bathrooms", event.target["bathrooms"].value);
    formData.append("amenities", event.target["amenities"].value);
    formData.append("status", event.target["status"].value);

    fetcher.submit(formData, {
      method: "post",
      encType: "multipart/form-data",
      action: "/admin/properties/create",
      navigate: true,
      unstable_viewTransition: true,
    });
  };

  return (
    <Form
      onSubmit={(e) => handleFilesUpload(e)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        width: "100%",
        height: "100%",
      }}
    >
      <div className="flex w-full flex-col gap-1">
        <Label>Nombre:</Label>
        <Input ref={nameRef} name="name" />
      </div>

      <div className="flex w-full flex-col gap-1">
        <Label>Descripción:</Label>
        <Textarea ref={descriptionRef} name="description" rows={3} />

        {/* {actionData?.errors?.description ? (
          <div className="pt-1 text-red-700" id="body-error">
            {actionData.errors.description}
          </div>
        ) : null} */}
      </div>

      <div className="flex w-full flex-col gap-1">
        <Label>Dirección:</Label>
        <Input ref={addressRef} name="address" />

        {/* {actionData?.errors?.address ? (
          <div className="pt-1 text-red-700" id="body-error">
            {actionData.errors.address}
          </div>
        ) : null} */}
      </div>

      <div className="flex w-full flex-col gap-1">
        <Label>Ciudad:</Label>
        <Input ref={cityRef} name="city" />

        {/* {actionData?.errors?.city ? (
          <div className="pt-1 text-red-700" id="body-error">
            {actionData.errors.city}
          </div>
        ) : null} */}
      </div>

      <div className="flex w-full flex-col gap-1">
        <Label>Tipo:</Label>
        <Select name="type">
          <SelectTrigger className="w-[280px]">
            <SelectValue ref={typeRef} placeholder="Selecciona una tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="House">Casa</SelectItem>
            <SelectItem value="Apartament">Apartament</SelectItem>
            <SelectItem value="Villa">Villa</SelectItem>
          </SelectContent>
        </Select>

        {/* {actionData?.errors?.type ? (
          <div className="pt-1 text-red-700" id="body-error">
            {actionData.errors.type}
          </div>
        ) : null} */}
      </div>

      <div className="flex w-full flex-col gap-1">
        <Label>Estado:</Label>
        <Select name="status">
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Selecciona una tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="FOR_RENT"> En alquiler</SelectItem>
            <SelectItem value="RENTED">Alquilada</SelectItem>
            <SelectItem value="FOR_SALE">En venta</SelectItem>
            <SelectItem value="SOLD">Vendida</SelectItem>
          </SelectContent>
        </Select>

        {/* {actionData?.errors?.type ? (
          <div className="pt-1 text-red-700" id="body-error">
            {actionData.errors.type}
          </div>
        ) : null} */}
      </div>

      <section className="flex w-full gap-3">
        <div className="flex w-full flex-col gap-1">
          <Label>precio:</Label>
          <Input ref={priceRef} type="number" name="price" />

          {/* {actionData?.errors?.price ? (
            <div className="pt-1 text-red-700" id="body-error">
              {actionData.errors.price}
            </div>
          ) : null} */}
        </div>

        <div className="flex w-full flex-col gap-1">
          <Label>area:</Label>
          <Input ref={areaRef} type="number" name="area" />

          {/* {actionData?.errors?.area ? (
            <div className="pt-1 text-red-700" id="body-error">
              {actionData.errors.area}
            </div>
          ) : null} */}
        </div>

        <div className="flex w-full flex-col gap-1">
          <Label>Cuartos:</Label>
          <Input ref={bedroomsRef} type="number" name="bedrooms" />
        </div>

        <div className="flex w-full flex-col gap-1">
          <Label>Baños:</Label>
          <Input type="number" name="bathrooms" />
        </div>
      </section>

      <div className="flex w-full flex-col gap-1">
        <Label>amenities:</Label>
        <Input name="amenities" />
      </div>

      <div className="flex w-full flex-col gap-1">
        <Label>Imagenes:</Label>

        <div className="flex gap-3">
          {preview.map((file, index) => (
            <img
              className="aspect-square w-16"
              key={index}
              src={file}
              srcSet={file}
              alt={file}
            />
          ))}
        </div>

        <Input
          ref={imagesRef}
          onChange={handleFileChange}
          name="images"
          type="file"
          multiple
          accept="image/*"
        />
      </div>

      <div className="text-left">
        <Button type="submit">Save</Button>
      </div>
    </Form>
  );
}
