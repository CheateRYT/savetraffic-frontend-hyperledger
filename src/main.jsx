import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Main.jsx";
import Entities from "./entities/Entities.jsx";
import IssueFine from "./entities/IssueFine.jsx";
import PayFine from "./entities/PayFine.jsx";
import Profile from "./entities/Profile.jsx";
import RegisterCar from "./entities/RegisterCar.jsx";
import RenewLicense from "./entities/RenewLicense.jsx";
import { UserProvider } from "./context/UserProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="*" element={<App />} />
        <Route path="/entities" element={<Entities />} />
        <Route path="/main" element={<Main />} />
        <Route path="/issue-fine" element={<IssueFine />} />
        <Route path="/pay-fine" element={<PayFine />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register-car" element={<RegisterCar />} />
        <Route path="/renew-license" element={<RenewLicense />} />
      </Routes>
    </UserProvider>
  </BrowserRouter>
);
