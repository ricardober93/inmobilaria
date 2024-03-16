import { Input } from "~/@/components/ui/input";

export const Hero = () => {
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
          <Input className="mt-5  rounded-xl p-6" type="search" />
        </div>
      </div>
    </section>
  );
};
