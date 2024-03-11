// import type { LoaderFunctionArgs } from "@remix-run/node";
// import { json } from "@remix-run/node";
import { Link } from "@remix-run/react";

// import { getNoteListItems } from "~/models/note.server";
// import { requireUserId } from "~/session.server";

// export const loader = async ({ request }: LoaderFunctionArgs) => {
//   const userId = await requireUserId(request);
//   const noteListItems = await getNoteListItems({ userId });
//   return json({ noteListItems });
// };

export default function PropertyPage() {
  // const data = useLoaderData<typeof loader>();

  return (
    <div className="flex h-full flex-col">
      <p>
        No note selected. Select a note on the left, or{" "}
        <Link to="new" className="text-blue-500 underline">
          create a new note.
        </Link>
      </p>
    </div>
  );
}
