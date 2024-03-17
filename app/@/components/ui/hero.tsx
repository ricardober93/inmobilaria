import { useNavigate } from "@remix-run/react";
import { useState } from "react";

import { Button } from "./button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

export const Hero = () => {
  const navigate = useNavigate();
  const [search, SetSearch] = useState<string>("");

  const handlerSearch = () => {
    if (search === "") {
      return;
    }
    navigate(`/search?search=${search}`);
  };

  return (
    <section className="relative min-h-screen">
      <div className="absolute inset-0 bg-gray-500 opacity-70">
        <img
          className="w-full h-full object-cover bg-center bg-no-repeat"
          src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center  p-5 md:p-0">
        <div className="grid gap-3 justify-items-center">
          <h1 className="text-4xl font-bold text-white text-center">
            Encuentra el lugar de tus sueños facilmente
          </h1>
          <p className="text-lg text-white">
            Todos los luagres que quieres ver, estan aqui
          </p>

          <section className="flex flex-col sm:flex-row  justify-center items-center justify-items-center gap-5 p-5">
            <Select
              onValueChange={(value: string) => {
                SetSearch(value);
              }}
              name="search"
            >
              <SelectTrigger className="w-[350px] p-6">
                <SelectValue placeholder="Que lugar quieres Buscar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="House">Casa</SelectItem>
                <SelectItem value="Apartament">Apartament</SelectItem>
                <SelectItem value="Villa">Villa</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={handlerSearch}
              className="w-full sm:w-fit rounded-xl p-6"
            >
              Buscar
            </Button>
          </section>
        </div>
      </div>
    </section>
  );
};
