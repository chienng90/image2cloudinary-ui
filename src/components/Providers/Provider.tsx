import { ReactElement, ReactNode } from "react";
import { ProfileProvider } from "./ProfileContext/ProfileContext";
import { AuthenticationProvider } from "./AuthenticationProvider/AuthenticationContext";

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props): ReactElement => {
  return (
    <AuthenticationProvider>
      <ProfileProvider>{children}</ProfileProvider>
    </AuthenticationProvider>
  );
};

export default Providers;
