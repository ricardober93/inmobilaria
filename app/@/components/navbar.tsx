import { Form, Link } from "@remix-run/react";
import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";

import { useOptionalUser } from "~/utils";

import { Button, buttonVariants } from "./ui/button";

export const Navbar = () => {
  const user = useOptionalUser();

  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <>
      <header className="w-full flex justify-between items-center px-4 py-6">
        <div className="h-10 w-10 aspect-auto">
          <img src="" alt="" />
          <h2 className="font-bold text-md">Logo</h2>
        </div>

        <div className="hidden sm:flex justify-around gap-3  ">
          <Link className={buttonVariants({ variant: "ghost" })} to="/search">
            Buscar Propiedades
          </Link>
          <Link className={buttonVariants({ variant: "ghost" })} to="#">
            Nosotros
          </Link>
          <Link className={buttonVariants({ variant: "ghost" })} to="#">
            contactos
          </Link>

          {user ? (
            <>
              <Link
                className={buttonVariants({ variant: "outline" })}
                to="/admin/properties"
              >
                admin
              </Link>
              <div className="flex-1"></div>
              <Form action="/logout" method="post">
                <button
                  type="submit"
                  className={buttonVariants({ variant: "default" })}
                >
                  Logout
                </button>
              </Form>
            </>
          ) : null}
        </div>

        {/* Mobile Navigation Icon */}
        <Button size={"icon"} onClick={handleNav} className="block  md:hidden">
          {nav ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </Button>

        {/* Mobile Navigation Menu */}
        <ul
          className={` flex flex-col items-start px-4 py-6 gap-3   ${
            nav
              ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r z-10 bg-white border-r-gray-900 ease-in-out duration-100"
              : "ease-in-out w-[60%] duration-100 fixed top-0 bottom-0 left-[-100%]"
          } `}
        >
          {/* Mobile Logo */}
          <Link to={"/"} className="h-10 w-10 aspect-auto">
            <img src="" alt="" />
            <h2 className="font-bold text-md">Logo</h2>
          </Link>

          {/* Mobile Navigation Items */}

          <Link className={buttonVariants({ variant: "ghost" })} to="/search">
            Buscar Propiedades
          </Link>
          <Link className={buttonVariants({ variant: "ghost" })} to="#">
            Nosotros
          </Link>
          <Link className={buttonVariants({ variant: "ghost" })} to="#">
            contactos
          </Link>

          {user ? (
            <>
              <Link
                className={buttonVariants({ variant: "outline" })}
                to="/admin/properties"
              >
                admin
              </Link>
              <div className="flex-1"></div>
              <Form action="/logout" method="post">
                <button
                  type="submit"
                  className={buttonVariants({ variant: "default" })}
                >
                  Logout
                </button>
              </Form>
            </>
          ) : null}
        </ul>
      </header>
    </>
  );
};
