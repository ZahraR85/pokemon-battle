import { Outlet } from "react-router-dom";
import ContextProvider from "../context/ContextProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/partials/Footer";
import Header from "../components/partials/Header";

const Layout = () => {
  return (
    <ContextProvider>
      <Header />
      <main className="my-8">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </ContextProvider>
  );
};

export default Layout;
