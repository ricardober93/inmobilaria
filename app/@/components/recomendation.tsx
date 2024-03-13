import { Image, Property } from "@prisma/client";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface IRecomendation {
  data: Property[] & {
    images: Image[];
  };
}
export const Recomendation = ({ data }: IRecomendation) => {
  return (
    <section className="w-full p-20">
      <div className="flex  cloumn sm:row sm:justify-between mb-10">
        <h2 className="text-2xl font-bold">Recomendaciones</h2>

        <div className="flex gap-3">
          <Button variant={"outline"}> Casas</Button>
          <Button variant={"outline"}> Apartamentos </Button>
          <Button variant={"outline"}> Fincas </Button>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:auto-rows-min auto-cols-max auto-rows-max ">
        {data?.map((item) => (
          <Card key={item.id} className="card-w mx-auto hover:bg-slate-50">
            <CardHeader>
              <img
                className="rounded-md aspect-square w-72"
                src={item?.images[0]?.url ?? "https://via.placeholder.com/150"}
                alt={item.name!}
              />
            </CardHeader>
            <CardContent>
              <CardTitle>{item.name!}</CardTitle>
              <CardDescription>{item.price!}</CardDescription>
            </CardContent>

            <CardFooter className="flex justify-end w-full">
              <Button variant="outline" className="w-fit text-right">
                ver propiedad
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </section>
  );
};
