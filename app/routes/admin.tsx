import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import { HeaderAdmin } from "~/@/components/header-admin";
import { SideBar } from "~/@/components/sidebar";
import { getUserId } from "~/session.server";
import { useUser } from "~/utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request);
  if (!userId) return redirect("/login");
  return json({});
};

export default function AdminPage() {
  const user = useUser();
  return (
    <div>
      <HeaderAdmin user={user} />
      <SideBar>
        <Outlet />
      </SideBar>
    </div>
  );
}
