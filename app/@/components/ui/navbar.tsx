import { Link } from "@remix-run/react";

import { buttonVariants } from "./button";

export const Navbar = () => {
  return (
    <header className="flex justify-between items-center px-4 py-6">
      <div className="h-10 w-10 aspect-auto">
        <img src="" alt="" />
        <h2 className="font-bold text-md">Logo</h2>
      </div>

      <div className="flex justify-around gap-3">
        <Link className={buttonVariants({ variant: "outline" })} to="/">
          Propiedades
        </Link>
        <Link className={buttonVariants({ variant: "outline" })} to="#">
          Nosotros
        </Link>
        <Link className={buttonVariants({ variant: "outline" })} to="#">
          contactos
        </Link>
      </div>
    </header>
  );
};
