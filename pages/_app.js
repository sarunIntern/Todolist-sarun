import 'bootstrap/dist/css/bootstrap.css'
import "../component/Header.css"
import "../pages/register.css"
import "../pages/login.css"
import "../styles/BG.css"
import "../pages/index.css"
import Header from '../component/Header'
function MyApp({ Component, pageProps }) {
  return (
    <>
    <Header/>
  <Component {...pageProps} />
  </>
  )
}

export default MyApp
