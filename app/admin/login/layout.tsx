import { Metadata } from "next";
import { FunctionComponent, ReactNode } from "react";

interface LoginProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Discovery | Dashboard",
};

const Login: FunctionComponent<LoginProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Login;
