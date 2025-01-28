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
import IssueLicense from "./entities/IssueLicense.jsx";
import RenewLicenseApprove from "./entities/RenewLicenseApprove.jsx";
import RegisterCarApprove from "./entities/RegisterCarApprove.jsx";
import IssueLicenseApprove from "./entities/IssueLicenseApprove.jsx";

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
        <Route path="/approve-register-car" element={<RegisterCarApprove />} />
        <Route path="/request-register-car" element={<RegisterCar />} />
        <Route path="/request-renew-license" element={<RenewLicense />} />
        <Route
          path="/approve-renew-license"
          element={<RenewLicenseApprove />}
        />
        <Route path="/request-issue-license" element={<IssueLicense />} />
        <Route
          path="/approve-issue-license"
          element={<IssueLicenseApprove />}
        />
      </Routes>
    </UserProvider>
  </BrowserRouter>
);
