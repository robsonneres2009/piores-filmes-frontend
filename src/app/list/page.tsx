import ListScreen from "@/modules/movies/screens/list";
import { Suspense } from "react";

export default async function List() {
  return (
    <main>
      <Suspense>
        <ListScreen />
      </Suspense>
    </main>
  );
}
