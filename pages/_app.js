import Layout from '../components/layout/layout'
import '../styles/globals.css'

// so basically Layout component is specifiying that we want a header component ON TOP of our MAIN PAGE CONTENT (see <Layout /> code),
// and thats acheived by rendering props.children under the <MainHeader/> component... props.children represents the content in between the Layout tags (<Layout> ... </Layout>),
// in this case, it happens to be ----> <Component {...pageProps} /> component, which IS all the main page content

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
