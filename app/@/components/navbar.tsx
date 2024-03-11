import { Link } from "@remix-run/react";

import { buttonVariants } from "./ui/button";

export const Navbar = () => {
  return (
    <header className="w-full flex justify-between items-center px-4 py-6 absolute top-0 z-10">
      <div className="h-10 w-10 aspect-auto">
        <img src="" alt="" />
        <h2 className="font-bold text-md">Logo</h2>
      </div>

      <div className="flex justify-around gap-3">
        <Link className={buttonVariants({ variant: "ghost" })} to="/">
          Propiedades
        </Link>
        <Link className={buttonVariants({ variant: "ghost" })} to="#">
          Nosotros
        </Link>
        <Link className={buttonVariants({ variant: "ghost" })} to="#">
          contactos
        </Link>
      </div>
    </header>
  );
};
