import { Image, Property } from "@prisma/client";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useState } from "react";

import { CardPropety } from "~/@/components/CardProperty";
import { Footer } from "~/@/components/Footer";
import { Navbar } from "~/@/components/navbar";
import { Button } from "~/@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/@/components/ui/select";
import { Apartament, Back } from "~/@/icons";
import { searchProperty } from "~/models/property.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("search") ?? "";

  if (searchQuery.length === 0) {
    return json({ property: null });
  }

  const property = await searchProperty({ search: searchQuery });
  return json({ property });
};

export default function SearchPage() {
  const navigate = useNavigate();
  const data = useLoaderData<typeof loader>();

  const [type, setType] = useState<string>();

  const handlerBack = () => {
    navigate("/");
  };

  const handlerSearch = () => {
    navigate(`/search?search=${type}`);
  };

  const goToDetail = (id: number) => {
    navigate("/detail/" + id);
  };

  return (
    <main className="bg-white">
      <Navbar />
      <div className="flex gap-4 px-12">
        <Button onClick={handlerBack} variant="outline">
          <Back className="text-gray-600" />
        </Button>
        <h1 className="text-3xl font-bold">Search</h1>
      </div>

      <section className=" my-10 flex flex-col sm:flex-row items-center gap-2 px-12">
        <Select
          onValueChange={(value: string) => {
            setType(value);
          }}
          name="search"
        >
          <SelectTrigger className="p-6">
            <Apartament className="text-gray-600" />
            <SelectValue placeholder="Que tipo Buscar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="House">Casa</SelectItem>
            <SelectItem value="Apartament">Apartament</SelectItem>
            <SelectItem value="Villa">Villa</SelectItem>
          </SelectContent>
        </Select>

        <Button className="p-6" onClick={handlerSearch}>
          Buscar
        </Button>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:auto-rows-min auto-cols-max auto-rows-max p-16">
        {data?.property ? (
          data.property?.map((item) => {
            return (
              <CardPropety
                key={item.id}
                item={
                  item as {
                    images: Image[];
                  } & Property
                }
                onClick={goToDetail}
              />
            );
          })
        ) : (
          <section>
            <h1>No hay resultados</h1>
          </section>
        )}
      </section>
      <Footer />
    </main>
  );
}
