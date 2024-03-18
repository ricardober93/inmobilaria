import { Image, Property } from "@prisma/client";
import { useNavigate } from "@remix-run/react";

import { CardPropety } from "./CardProperty";
import { Button } from "./ui/button";

export interface IRecomendation {
  data: Property[];
}
export const Recomendation = ({ data }: IRecomendation) => {
  const navigate = useNavigate();

  const goToDetail = (id: number) => {
    navigate("/detail/" + id);
  };
  return (
    <section className="w-full p-20">
      <div className="flex flex-col md:flex-row sm:justify-between mb-10 gap-5">
        <h2 className="text-center md:text-left text-2xl font-bold">
          Recomendaciones
        </h2>

        <div className="flex gap-3">
          <Button variant={"outline"}> Casas</Button>
          <Button variant={"outline"}> Apartamentos </Button>
          <Button variant={"outline"}> Fincas </Button>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:auto-rows-min auto-cols-max auto-rows-max ">
        {data?.map((item) => (
          <CardPropety
            key={item.id}
            item={
              item as {
                images: Image[];
              } & Property
            }
            onClick={goToDetail}
          />
        ))}
      </section>
    </section>
  );
};
