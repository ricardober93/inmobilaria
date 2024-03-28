import { LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  Link,
  json,
  useFetcher,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import { TrashIcon } from "lucide-react";
import { useMemo } from "react";
import toast from "react-hot-toast";

import { Button, buttonVariants } from "~/@/components/ui/button";
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

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const skip = Number(url.searchParams.get("skip")) || 0;
  const take = Number(url.searchParams.get("take")) || 10;

  const data = await getAllProperty({
    skip,
    take,
  });
  return json({ data, skip, take });
};

export default function PropertyPage() {
  const fetcher = useFetcher<{
    message: string;
    ok: boolean;
  }>();
  const navigate = useNavigate();
  const { data, skip, take } = useLoaderData<typeof loader>();

  const previousPage = () => {
    if (skip === 0) return;
    navigate(`/admin/properties?skip=${skip - take}&take=${take}`);
  };

  const nextPage = () => {
    if (skip + take >= data.count) return;
    navigate(`/admin/properties?skip=${skip + take}&take=${take}`);
  };
  const handleDelete = async (id: number) => {
    fetcher.submit(
      {},
      {
        method: "post",
        action: `/admin/properties/delete/${id}`,
      },
    );
  };

  const notify = () =>
    toast.success("Se ha e  liminado la propiedad exitosamente!");

  useMemo(() => {
    if (fetcher.data?.ok) {
      notify();
    }
  }, [fetcher]);

  return (
    <div className="w-full flex h-full flex-col">
      <div className="mt-5 py-5 px-3 flex justify-end items-center">
        <Link to="new" className={buttonVariants({ variant: "default" })}>
          Crear una propiedad
        </Link>
      </div>

      <Table>
        <TableCaption>Lista de Propiedades. Total : {data.count}</TableCaption>
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
          {data?.products?.map((item) => (
            <TableRow key={item.id + item.name!}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell className="">
                <img
                  className="aspect-square w-12"
                  src={
                    item.images[0]?.url ?? "https://placehold.jp/150x150.png"
                  }
                  alt={item.name!}
                />
              </TableCell>
              <TableCell className="line-clamp-2">{item.description}</TableCell>
              <TableCell>{item.address}</TableCell>
              <TableCell>{item.city}</TableCell>
              <TableCell className="text-right">{item.price}</TableCell>
              <TableCell>{item.bedrooms}</TableCell>
              <TableCell>{item.bathrooms}</TableCell>
              <TableCell>{item.area}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>
                <Form onSubmit={() => handleDelete(item.id)}>
                  <Button
                    disabled={fetcher.state === "loading"}
                    variant={"destructive"}
                    size={"icon"}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </Button>
                </Form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* pagination */}
      <div className="flex justify-center items-center gap-3">
        <Button onClick={previousPage} variant={"outline"}>
          Previous
        </Button>
        <Button onClick={nextPage} variant={"outline"}>
          Next
        </Button>
      </div>
    </div>
  );
}
