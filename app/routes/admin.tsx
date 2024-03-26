import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import { SideBar } from "~/@/components/sidebar";
import { getUserId } from "~/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request);

  if (!userId) return redirect("/login");
  return json({});
};

export default function AdminPage() {
  return (
    <div>
      <SideBar>
        <Outlet />
      </SideBar>
    </div>
  );
}
