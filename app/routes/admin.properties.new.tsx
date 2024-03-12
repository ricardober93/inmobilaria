import { Form, useFetcher, useNavigate } from "@remix-run/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";

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

//import { requireUserId } from "~/session.server";

export default function NewNotePage() {
  const fetcher = useFetcher<any>();
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const priceRef = useRef<HTMLInputElement>(null);
  const areaRef = useRef<HTMLInputElement>(null);
  const bedroomsRef = useRef<HTMLInputElement>(null);
  const bathroomsRef = useRef<HTMLInputElement>(null);
  const amenitiesRef = useRef<HTMLInputElement>(null);
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

  useEffect(() => {
    if (fetcher?.data?.errors?.name) {
      nameRef.current?.focus();
    } else if (fetcher?.data?.errors?.description) {
      descriptionRef.current?.focus();
    } else if (fetcher?.data?.errors?.address) {
      addressRef.current?.focus();
    } else if (fetcher?.data?.errors?.city) {
      cityRef.current?.focus();
    }
  }, [fetcher]);

  const handleFilesUpload = async () => {
    const formData = new FormData();

    selectedUrls.forEach((file) => {
      formData.append("images", file);
    });

    formData.append("name", nameRef.current?.value ?? "");
    formData.append("description", descriptionRef.current?.value ?? "");
    formData.append("address", addressRef.current?.value ?? "");
    formData.append("city", cityRef.current?.value ?? "");
    formData.append("type", type);
    formData.append("price", priceRef.current?.value ?? "");
    formData.append("area", areaRef.current?.value ?? "");
    formData.append("bedrooms", bedroomsRef.current?.value ?? "");
    formData.append("bathrooms", bathroomsRef.current?.value ?? "");
    formData.append("amenities", amenitiesRef.current?.value ?? "");
    formData.append("status", status);

    fetcher.submit(formData, {
      method: "post",
      encType: "multipart/form-data",
      action: "/admin/properties/create",
    });
  };

  useEffect(() => {
    console.log(fetcher);

    if (fetcher.data?.ok) {
      navigate("/admin/properties");
    }

    return () => {
      // with cleanup when you unmount
    };
  }, [navigate, fetcher]);

  return (
    <Form
      onSubmit={handleFilesUpload}
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
        <Input
          ref={nameRef}
          name="name"
          aria-invalid={fetcher?.data?.errors?.name ? true : undefined}
          aria-errormessage={
            fetcher?.data?.errors?.name ? "title-error" : undefined
          }
        />
        {fetcher?.data?.errors?.name ? (
          <div className="pt-1 text-red-700" id="body-error">
            {fetcher?.data?.errors.name}
          </div>
        ) : null}
      </div>

      <div className="flex w-full flex-col gap-1">
        <Label>Descripción:</Label>
        <Textarea ref={descriptionRef} name="description" rows={3} />

        {fetcher?.data?.errors?.description ? (
          <div className="pt-1 text-red-700" id="body-error">
            {fetcher?.data?.errors?.description}
          </div>
        ) : null}
      </div>

      <div className="flex w-full flex-col gap-1">
        <Label>Dirección:</Label>
        <Input ref={addressRef} name="address" />

        {fetcher?.data?.errors?.address ? (
          <div className="pt-1 text-red-700" id="body-error">
            {fetcher?.data?.errors?.address}
          </div>
        ) : null}
      </div>

      <div className="flex w-full flex-col gap-1">
        <Label>Ciudad:</Label>
        <Input ref={cityRef} name="city" />

        {fetcher?.data?.errors?.city ? (
          <div className="pt-1 text-red-700" id="body-error">
            {fetcher?.data?.errors?.city}
          </div>
        ) : null}
      </div>

      <div className="flex w-full flex-col gap-1">
        <Label>Tipo:</Label>
        <Select
          onValueChange={(value: string) => {
            setType(value);
          }}
          name="type"
        >
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Selecciona una tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="House">Casa</SelectItem>
            <SelectItem value="Apartament">Apartament</SelectItem>
            <SelectItem value="Villa">Villa</SelectItem>
          </SelectContent>
        </Select>

        {fetcher?.data?.errors?.type ? (
          <div className="pt-1 text-red-700" id="body-error">
            {fetcher?.data?.errors?.type}
          </div>
        ) : null}
      </div>

      <div className="flex w-full flex-col gap-1">
        <Label>Estado:</Label>
        <Select
          onValueChange={(value: string) => {
            setStatus(value);
          }}
          name="status"
        >
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

        {fetcher?.data?.errors?.status ? (
          <div className="pt-1 text-red-700" id="body-error">
            {fetcher?.data?.errors?.status}
          </div>
        ) : null}
      </div>

      <section className="flex w-full gap-3">
        <div className="flex w-full flex-col gap-1">
          <Label>precio:</Label>
          <Input ref={priceRef} type="number" name="price" />

          {fetcher?.data?.errors?.price ? (
            <div className="pt-1 text-red-700" id="body-error">
              {fetcher?.data?.errors?.price}
            </div>
          ) : null}
        </div>

        <div className="flex w-full flex-col gap-1">
          <Label>area:</Label>
          <Input ref={areaRef} type="number" name="area" />

          {fetcher?.data?.errors?.area ? (
            <div className="pt-1 text-red-700" id="body-error">
              {fetcher?.data?.errors?.area}
            </div>
          ) : null}
        </div>

        <div className="flex w-full flex-col gap-1">
          <Label>Cuartos:</Label>
          <Input ref={bedroomsRef} type="number" name="bedrooms" />
        </div>

        <div className="flex w-full flex-col gap-1">
          <Label>Baños:</Label>
          <Input ref={bathroomsRef} type="number" name="bathrooms" />
        </div>
      </section>

      <div className="flex w-full flex-col gap-1">
        <Label>amenities:</Label>
        <Input name="amenities" ref={amenitiesRef} />
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
