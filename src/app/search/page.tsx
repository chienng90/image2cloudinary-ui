import Search from "@/containers/Search";
import { Suspense } from "react";

const Page: React.FC = () => (
  <Suspense fallback={<div>Loading ...</div>}>
    <Search />
  </Suspense>
);

export default Page;