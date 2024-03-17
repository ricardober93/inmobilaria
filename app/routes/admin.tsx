import { Outlet } from "@remix-run/react";

import { HeaderAdmin } from "~/@/components/header-admin";
import { SideBar } from "~/@/components/sidebar";

export default function AdminPage() {
  return (
    <div>
      <HeaderAdmin />
      <SideBar>
        <Outlet />
      </SideBar>
    </div>
  );
}
