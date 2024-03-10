import { Input } from "~/@/components/ui/input";

export const Hero = () => {
  return (
    <section className="relative min-h-screen">
      <div className="absolute inset-0 bg-gray-500 opacity-70">
        <img
          className="w-full h-full object-cover"
          src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">
            Encuentra el lugar de tus sueños facilmente
          </h1>
          <p className="text-lg text-white">
            Todos los luagres que quieres ver, estan aqui
          </p>
          <Input className="mt-5 " type="search" />
        </div>
      </div>
    </section>
  );
};
