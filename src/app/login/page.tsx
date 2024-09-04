import Login from "@/containers/Login";
import { Suspense } from "react";

const Page: React.FC = () => (
  <Suspense fallback={<div>Loading ...</div>}>
    <Login />
  </Suspense>
);

export default Page;
