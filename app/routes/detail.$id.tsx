import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";

import { Navbar } from "~/@/components/navbar";
import { Card, CardContent } from "~/@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/@/components/ui/carousel";
import { MapPinIcon } from "~/@/icons";
import { getProperty } from "~/models/property.server";
import { formatCurrency } from "~/utils/format";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id;

  const property = await getProperty({ propertyId: Number(id) });

  if (property) {
    return json({ property });
  }
};

export default function Detail() {
  const data = useLoaderData<typeof loader>();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <main className="relative">
      <Navbar></Navbar>

      <section className="flex flex-col md:flex-row items-center justify-between px-8 gap-4">
        <div className="flex items-end gap-4">
          <h2 className="text-3xl font-bold">{data.property.name}</h2>
          <div className="flex gap-2">
            <MapPinIcon className="h-5 w-5" />
            <span>
              {data.property.address} | {data.property.city}{" "}
            </span>
          </div>
        </div>

        <div className="flex  flex-col gap-1">
          <span className="text-md text-slate-500">precio:</span>
          <span className="text-2xl font-bold">
            {formatCurrency(Number(data.property.price))}
          </span>
        </div>
      </section>

      <section className="w-[90%] mx-auto p-8 mt-8">
        <Carousel setApi={setApi} className="">
          <CarouselContent className="w-full mx-auto">
            {data.property.images?.map((_, index) => (
              <CarouselItem key={index}>
                <img
                  src={_.url}
                  alt={data.property.name!}
                  className="w-full aspect-video object-cover rounded-xl"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="py-2 text-center text-sm text-muted-foreground">
          Slide {current} of {count}
        </div>
      </section>
    </main>
  );
}
