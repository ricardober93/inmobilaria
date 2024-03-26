import { Image, Property } from "@prisma/client";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useState } from "react";

import { CardPropety } from "~/@/components/CardProperty";
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
  const searchQuery = url.searchParams.get("search") ?? "House";
  const skip = Number(url.searchParams.get("skip")) || 0;
  const take = Number(url.searchParams.get("take")) || 10;

  if (searchQuery.length === 0) {
    return json({ property: null, count: 0, skip, take });
  }

  const { property, count } = await searchProperty({
    search: searchQuery,
    skip,
    take,
  });
  return json({ property, count, skip, take });
};

export default function SearchPage() {
  const navigate = useNavigate();
  const { property, count, skip, take } = useLoaderData<typeof loader>();

  const [type, setType] = useState<string>();

  const handlerBack = () => {
    navigate("/");
  };

  const handlerSearch = () => {
    navigate(`/search?search=${type}`, {
      preventScrollReset: true,
      unstable_viewTransition: true,
    });
  };

  const goToDetail = (id: number) => {
    navigate("/detail/" + id);
  };

  const previousPage = () => {
    if (skip === 0) return;
    navigate(`/search?search=${type}&skip=${skip - take}&take=${take}`);
  };

  const nextPage = () => {
    if (skip + take >= count) return;
    navigate(`/search?search=${type}&skip=${skip + take}&take=${take}`);
  };

  return (
    <main className="bg-white">
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
        {property?.length === 0 ? (
          <div>
            <h3 className="text-3xl">No hay resultados</h3>
          </div>
        ) : null}

        {property ? (
          property?.map((item) => {
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
          <div>
            <h3 className="text-3xl">No hay resultados</h3>
          </div>
        )}
      </section>

      {/* pagination */}
      <div className="flex justify-center items-center gap-3 py-6">
        <Button
          disabled={skip === 0}
          onClick={previousPage}
          variant={"outline"}
        >
          Previous
        </Button>
        <Button onClick={nextPage} variant={"outline"}>
          Next
        </Button>
      </div>
    </main>
  );
}
