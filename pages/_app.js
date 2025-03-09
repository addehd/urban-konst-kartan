import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  // use layout if page has one, otherwise use component directly
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(<Component {...pageProps} />);
}

export default MyApp
