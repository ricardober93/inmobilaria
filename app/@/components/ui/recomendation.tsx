import { Button } from "./button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./card";

export const Recomendation = () => {
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

      <section className="flex justify-center mx-auto p-2 gap-4 flex-wrap">
        {[0, 1, 2, 3].map((item) => (
          <Card key={item} className="card-w hover:bg-slate-50">
            <CardHeader>
              <img
                className="rounded-md aspect-square w-72"
                src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="phot"
              />
            </CardHeader>
            <CardContent>
              <CardTitle>Nombre de la propiedad</CardTitle>
              <CardDescription>$50.000 - $100.000</CardDescription>
            </CardContent>

            <CardFooter className="flex w-full">
              <Button variant="outline" className="w-full">
                ver propiedad
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </section>
  );
};
