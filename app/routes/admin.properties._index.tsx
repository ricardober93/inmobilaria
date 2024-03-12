// import type { LoaderFunctionArgs } from "@remix-run/node";
import { Property } from ".prisma/client";
import { GetResult } from "@prisma/client/runtime";
import { Link, json, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "react-router";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/@/components/ui/table";
import { getAllProperty } from "~/models/property.server";
// import { requireUserId } from "~/session.server";

// import { getNoteListItems } from "~/models/note.server";
// import { requireUserId } from "~/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const list = await getAllProperty();
  return json({ list });
};

export default function PropertyPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="w-full flex h-full flex-col">
      <p>
        No note selected. Select a note on the left, or{" "}
        <Link to="new" className="text-blue-500 underline">
          create a new note.
        </Link>
      </p>

      <Table>
        <TableCaption>Lista de Propiedades.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nombre</TableHead>
            <TableHead className="w-[100px]">Imagenes</TableHead>
            <TableHead className="w-[100px]">Descripción</TableHead>
            <TableHead className="">Dirección</TableHead>
            <TableHead className="">Ciudad</TableHead>
            <TableHead className="text-rigth">Precio</TableHead>
            <TableHead className="text-rigth">Cuartos</TableHead>
            <TableHead className="text-rigth">Baños</TableHead>
            <TableHead className="text-rigth">area</TableHead>
            <TableHead className="text-rigth">Estado</TableHead>
            <TableHead className="text-rigth">Tipo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.list.map((item: Property) => (
            <TableRow key={item.id + item.name}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell className="">
                <img
                  className="aspect-square w-12"
                  src={
                    item.images[0]?.url ?? "https://placehold.jp/150x150.png"
                  }
                  alt={item.name}
                />
              </TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.address}</TableCell>
              <TableCell>{item.city}</TableCell>
              <TableCell className="text-right">{item.price}</TableCell>
              <TableCell>{item.bedrooms}</TableCell>
              <TableCell>{item.bathrooms}</TableCell>
              <TableCell>{item.area}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{item.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
