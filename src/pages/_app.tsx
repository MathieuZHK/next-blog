import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "../core/context/AuthContext";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}
