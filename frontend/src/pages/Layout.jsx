import { Outlet } from "react-router-dom";
import ContextProvider from "../context/ContextProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <ContextProvider>
      <header>header</header>
      <main>
        <Outlet />
      </main>
      <footer>footer</footer>
      <ToastContainer />
    </ContextProvider>
  );
};

export default Layout;
