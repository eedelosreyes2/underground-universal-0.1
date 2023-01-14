import { UserProvider } from '@auth0/nextjs-auth0';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../lib/apollo';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import '../styles/globals.css';
// import { ModalProvider } from '../src/ModalContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {/* <ModalProvider> */}
          <Component {...pageProps} />
          {/* </ModalProvider> */}
        </ThemeProvider>
      </ApolloProvider>
    </UserProvider>
  );
}

export default MyApp;
