import GlobalLayout from "@/components/global-layout";
import store from "@/store";
import GlobalStyle from "@/styles/GlobalStyle";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactNode } from "react";
import { Provider } from "react-redux";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};

export default function App({
  Component,
  pageProps,
}: AppProps & { Component: NextPageWithLayout }) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
  return (
    <Provider store={store}>
      <GlobalStyle />
      <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>
    </Provider>
  );
}
