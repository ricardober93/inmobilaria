import { NavLink } from "@remix-run/react";

import { buttonVariants } from "./ui/button";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "./ui/resizable";

export const SideBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-screen rounded-lg"
    >
      <ResizablePanel className="min-w-24  hidden sm:block" defaultSize={20}>
        <div className="flex h-full  py-6">
          <NavLink
            className={({ isActive }) =>
              `${buttonVariants({
                variant: "ghost",
              })} sm:flex  text-xl w-full hidden rounded-lg    ${
                isActive ? "bg-slate-50" : " "
              }`
            }
            to="properties"
          >
            Propiedades
          </NavLink>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel className="w-full" defaultSize={85}>
        <div className="flex w-full h-full p-6">{children}</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
