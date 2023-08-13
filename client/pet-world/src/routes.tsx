import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { PartnerSignUpPage } from "./pages/PartnerSignUpPage";
import { UserSignUpPage } from "./pages/User/UserSignUpPage";
import { AdminHomePage } from "./pages/Admin/AdminHomePage";
import { AdminLoginPage } from "./pages/Admin/AdminLoginPage";
import { AdminAuth } from "./components/AdminLayout/AdminAuth";
import { UserLoginPage } from "./pages/User/UserLoginPage";
import { UserAuth } from "./components/User/UserAuth";
import { SignUpPage } from "./pages/Vet/SignUpPage";
import { PartnerHomePage } from "./pages/PartnerPage/HomePage";
import { UserProfilePage } from "./pages/User/UserProfilePage";
import { UserListPage } from "./pages/Admin/UserListPage";
import { PartnerListPage } from "./pages/Admin/PartnerListPage";
// import { AdminDashboard } from "./pages/Admin/AdminDashboard";

export const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<UserSignUpPage />} />
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="/partner/signup" element={<PartnerSignUpPage />} />
        <Route path="/vet/signup" element={<SignUpPage role='Vet' />} />
        <Route path="/groomer/signup" element={<SignUpPage role='Groomer' />} />
        <Route path="/vet/home" element={<PartnerHomePage />} />


        <Route path="/user/profile" element={<UserProfilePage />}/>

        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route element={<AdminAuth />}>
          <Route path="/admin/home" element={<AdminHomePage />} />
          <Route path="/admin/users" element={<UserListPage />} />
          <Route path="/admin/partner" element={<PartnerListPage />} />
        </Route>
        <Route element={<UserAuth />}>

        </Route>
      </Routes>
    </div>
  );
};
