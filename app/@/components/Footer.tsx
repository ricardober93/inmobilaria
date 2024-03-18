import { Link } from "@remix-run/react";

import { FacebookIcon, InstagramIcon } from "../icons";

export const Footer = () => {
  return (
    <section className="w-full p-8 sm:pt-16 flex items-center justify-center bg-slate-50">
      <div className="md:w-2/3 w-full px-4  flex flex-col">
        <div className="w-full text-7xl font-bold">
          <h1 className="w-full md:w-2/3">
            Podemos ayudarte en buscar la propiedad que necesitas
          </h1>
        </div>
        <div className="flex mt-8 flex-col md:flex-row md:justify-between">
          <p className="w-full md:w-2/3 text-gray-400">
            Puedes tener la propiedad que necesitas, en el lugar que necesitas
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex mt-24 mb-12 flex-row justify-between items-center">
            <div className="text-3xl font-bold">Logo</div>
            <Link
              to={"#"}
              className="hidden md:block cursor-pointer text-gray-600 hover: uppercase"
            >
              Contactanos
            </Link>
            <Link
              to="search"
              className="hidden md:block cursor-pointer text-gray-600 hover: uppercase"
            >
              Buscar Propiedades
            </Link>
            <div className="flex flex-row space-x-8 items-center justify-between">
              <Link to="#">
                <FacebookIcon className="h-5 w-5" />
              </Link>
              <Link to="#">
                <InstagramIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <hr className="border-gray-600" />
          <p className="w-full text-center my-12 text-gray-600">
            Copyright © 2020 Ricardo Bermudez
          </p>
        </div>
      </div>
    </section>
  );
};
