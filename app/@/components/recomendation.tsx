import { Image, Property } from "@prisma/client";
import { useNavigate } from "@remix-run/react";
import { useState } from "react";

import { CardPropety } from "./CardProperty";
import { Button } from "./ui/button";

export interface IRecomendation {
  data: Property[];
}

export const Recomendation = ({ data }: IRecomendation) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>("House");

  const goToDetail = (id: number) => {
    navigate("/detail/" + id);
  };

  const filterHandler = (type: string) => {
    setFilter(type);
    navigate(`/?type=${type}`, {
      preventScrollReset: true,
      unstable_viewTransition: true,
    });
  };

  return (
    <section className="w-full px-2 py-20 md:px-20">
      <div className="flex flex-col md:flex-row sm:justify-between mb-10 gap-5">
        <h2 className="text-center md:text-left text-2xl font-bold">
          Recomendaciones
        </h2>

        <div className="flex justify-center gap-3">
          <Button
            onClick={() => filterHandler("House")}
            variant={filter === "House" ? "default" : "outline"}
          >
            Casas
          </Button>
          <Button
            onClick={() => filterHandler("Apartament")}
            variant={filter === "Apartament" ? "default" : "outline"}
          >
            {" "}
            Apartamentos{" "}
          </Button>
          <Button
            onClick={() => filterHandler("Villa")}
            variant={filter === "Villa" ? "default" : "outline"}
          >
            {" "}
            Fincas{" "}
          </Button>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:auto-rows-min auto-cols-max auto-rows-max ">
        {data !== null ? (
          data?.map((item) => (
            <CardPropety
              key={item.id}
              item={
                item as {
                  images: Image[];
                } & Property
              }
              onClick={goToDetail}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-96 bg-gray-100 rounded-md p-4 text-3xl">
            <h3>No hay resultados</h3>
          </div>
        )}
      </section>
    </section>
  );
};
