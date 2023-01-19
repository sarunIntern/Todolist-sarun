import 'bootstrap/dist/css/bootstrap.css'
import "../styles/Loading.css"
import "../components/Header.css"
import "../pages/register.css"
import "../pages/login.css"
import "../styles/BG.css"
import "../pages/index.css"
import "../pages/admin/Admindashboard.css"
import "../pages/verifycation/Loadingpage.css"
import "../pages/user/usertodolist.css"
import "react-datepicker/dist/react-datepicker.css";
import Header from '../components/Header'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header/>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
