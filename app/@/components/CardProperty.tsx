import { Image, Property } from "@prisma/client";

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
        <CardTitle className="text-ellipsis text">{item.name!}</CardTitle>
        <CardDescription className="text-md">$ {item.price!}</CardDescription>
      </CardContent>

      <CardFooter className="flex justify-end w-full"></CardFooter>
    </Card>
  );
};
