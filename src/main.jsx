import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import GroupContextCom from "./components/Context/GroupContex.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
     <GroupContextCom>
     <App />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
     </GroupContextCom>
    </BrowserRouter>
  </StrictMode>
);
