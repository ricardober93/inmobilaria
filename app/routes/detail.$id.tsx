import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { BathIcon, BedSingleIcon, FenceIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Footer } from "~/@/components/Footer";
import { Navbar } from "~/@/components/navbar";
import { Button } from "~/@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/@/components/ui/carousel";
import { Back, MapPinIcon } from "~/@/icons";
import { WhatsAppIcon } from "~/@/icons/WhatsAppIcon";
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
  const navigate = useNavigate();
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

    return () => api.destroy();
  }, [api]);

  const handlerBack = () => {
    navigate("/");
  };

  return (
    <main className="relative container">
      <section className="flex flex-col md:flex-row items-start md:items-center md:justify-between px-8 gap-4 mb-4">
        <div className="flex  flex-col  md:flex-row items-start md:items-center justify-start gap-4">
          <Button onClick={handlerBack} variant="outline">
            <Back className="text-gray-600" />
          </Button>
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

      <div className="grid grid-cols-1   items-center md:items-start gap-2 px-4">
        <section className="w-[90%] mx-auto p-4">
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

        <section
          id="container-info-contact"
          className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-3"
        >
          <section className="flex flex-col gap-2 p-2 md:p-12 border border-slate-100 rounded-lg mb-4 md:col-span-3">
            <div className="flex flex-col gap-1 px-4">
              <span className="text-md text-slate-400"> Descripción:</span>
              <span className="text-md ">{data.property.description}</span>
            </div>

            <div className="flex flex-col gap-1 px-4">
              <span className="text-md text-slate-400">Amenities:</span>
              <span className="text-md ">{data.property.amenities}</span>
            </div>

            <article className="flex flex-col md:flex-row justify-between gap-1 p-4">
              <div className="flex gap-2">
                <span className="flex gap-1 items-center text-md text-slate-400">
                  <FenceIcon className="h-5 w-5" />
                  area:
                </span>
                <span className="text-md ">{data.property.area} m²</span>
              </div>
              <div className="flex gap-2">
                <span className="flex gap-1 items-center  text-md text-slate-400">
                  <BedSingleIcon className="h-5 w-5" />
                  Cuartos:
                </span>
                <span className="text-md ">{data.property.bedrooms}</span>
              </div>
              <div className="flex gap-2">
                <span className="flex gap-1 items-center  text-md text-slate-400">
                  <BathIcon className="h-5 w-5" />
                  Baños:
                </span>
                <span className="text-md ">{data.property.bathrooms}</span>
              </div>
            </article>

            {/* Button WhatsApp */}
          </section>

          <section className="md:col-span-1">
            <Button
              variant={"outline"}
              onClick={() => {
                window.open(
                  `https://wa.me/5219991045457?text=Hola, me interesa la propiedad ${data.property.name}`,
                );
              }}
              className="md:w-full border-2 text-green-500 border-green-500 rounded-lg px-4 hover:bg-green-500 hover:text-white transition-colors duration-300 ease-in-out"
            >
              <WhatsAppIcon className="h-5 w-5 mx-2" />
              Contactar
            </Button>
          </section>
        </section>
      </div>
    </main>
  );
}
