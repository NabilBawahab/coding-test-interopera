import { HeroUIProvider, ToastProvider } from "@heroui/react";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <HeroUIProvider>
      <ToastProvider />
      <Component {...pageProps} />
    </HeroUIProvider>
  );
}
