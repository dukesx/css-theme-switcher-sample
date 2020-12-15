import "styles/index.scss";
import React, { useState } from "react";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import useDarkMode from "use-dark-mode";
import { createStore, StoreProvider } from "easy-peasy";
import { Global } from "../store/global";
import "remixicon/fonts/remixicon.css";
import { Provider } from "next-auth/client";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import "lib/plugins/embeds/style.css";
import "lib/plugins/unsplash/style.css";
import "styles/custom.scss";

const themes = {
  dark: `/dark-theme.css`,
  light: `/light-theme.css`,
};

const store = createStore(Global);
function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const { value } = useDarkMode(false, {
    classNameDark: "dark",
  });
  const [dark, setDark] = useState(value);

  return (
    <>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <StoreProvider store={store}>
        <ApolloProvider client={apolloClient}>
          <ThemeSwitcherProvider
            themeMap={themes}
            defaultTheme={dark ? "dark" : "light"}
          >
            <Provider session={pageProps.session}>
              <Component {...pageProps} />
            </Provider>
          </ThemeSwitcherProvider>
        </ApolloProvider>
      </StoreProvider>
    </>
  );
}

export default MyApp;
