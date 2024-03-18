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
          <span className="text-md text-balance line-clamp-3">
            {item.description}
          </span>
        </CardDescription>
      </CardContent>

      <CardFooter className="flex justify-items-start  items-start sm:justify-between w-full flex-col sm:flex-row gap-5">
        <div className="flex flex-col gap-1">
          <span className="text-sm">Precio</span>
          <span className="text-md font-semibold">
            {formatCurrency(Number(item.price))}
          </span>
        </div>
        <Button>ver detalles de la propiedad</Button>
      </CardFooter>
    </Card>
  );
};
