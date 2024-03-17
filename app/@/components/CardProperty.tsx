import { Image, Property } from "@prisma/client";

import { formatCurrency } from "~/utils/format";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface ICardPropety {
  item: {
    images: Image[];
  } & Property;
  onClick: (id: number) => void;
}

export const CardPropety = ({ item, onClick }: ICardPropety) => {
  return (
    <Card
      key={item.id}
      className="card-w mx-auto hover:bg-slate-50"
      onClick={() => onClick(item.id)}
    >
      <CardHeader>
        <img
          className="rounded-md aspect-square w-full h-72"
          src={item?.images[0]?.url ?? "https://via.placeholder.com/150"}
          alt={item.name!}
        />
      </CardHeader>
      <CardContent className="grid gap-4">
        <CardTitle className="text-xl text-ellipsis line-clamp-1 text">
          {item.name!}
        </CardTitle>
        <CardDescription className="flex flex-col gap-3">
          <p className="text-md text-balance line-clamp-3">
            {item.description}
          </p>
        </CardDescription>
      </CardContent>

      <CardFooter className="flex justify-between w-full">
        <div className="flex-flex-col-gap-2">
          <p className="text-sm">Precio</p>
          <p className="text-md font-semibold">
            {formatCurrency(Number(item.price))}
          </p>
        </div>
        <Button>ver Detalles</Button>
      </CardFooter>
    </Card>
  );
};
