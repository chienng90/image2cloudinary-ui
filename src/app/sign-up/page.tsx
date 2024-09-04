import SignUp from "@/containers/SignUp";
import { Suspense } from "react";

const Page: React.FC = () => (
  <Suspense fallback={<div>Loading ...</div>}>
    <SignUp />
  </Suspense>
);

export default Page;
