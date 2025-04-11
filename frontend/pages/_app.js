import { HeroUIProvider } from "@heroui/react";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <HeroUIProvider>
      <Component {...pageProps} />
    </HeroUIProvider>
  );
}
