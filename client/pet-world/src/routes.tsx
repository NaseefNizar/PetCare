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
import { UnverifiedListPage } from "./pages/Admin/UnverifiedListPage";
import { OtpPage } from "./pages/OtpPage";
import { PartnerAuth } from "./components/PartnerLayout/PartnerAuth";
import { PartnerProfilePage } from "./pages/PartnerPage/PartnerProfilePage";
import { ForgotPasswordPage } from "./pages/User/ForgotPasswordPage";
import { NewPassword } from "./components/NewPassword";
import { PasswordOtp } from "./components/PasswordOtp";
import PartnerLayout from "./components/PartnerLayout/PartnerLayout";
import PartnerKycPage from "./pages/PartnerPage/PartnerKycPage";
import { PartnerDetailsPage } from "./pages/Admin/PartnerDetailsPage";
import { ListVetPage } from "./pages/ListVetPage";
import { DetailPage } from "./pages/DetailPage";
import { PartnerSlotPage } from "./pages/PartnerPage/PartnerSlotPage";
import { PartnerDetailPage } from "./pages/PartnerPage/PartnerDetailPage";
import { PaymentPage } from "./pages/PartnerPage/PaymentPage";
import { PaymentSuccessPage } from "./pages/PaymentSuccessPage";
import { PartnerAppointment } from "./components/PartnerLayout/PartnerAppointment";
import { UserAppointmentPage } from "./pages/User/UserAppointmentPage";
import { ProfileLayout } from "./components/User/ProfileLayout";
import { ProfileLayoutPage } from "./pages/User/ProfileLayoutPage";
import { UserInfoPage } from "./pages/User/UserInfoPage";
import { PetDetailPage } from "./pages/User/PetDetailPage";
// import Videocall from "./components/Videocall/videocall";

export const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<UserSignUpPage />} />
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="/vet/signup" element={<SignUpPage role="Vet" />} />
        <Route path="/groomer/signup" element={<SignUpPage role="Groomer" />} />
        <Route path="/list-vet" element={<ListVetPage />} />
        <Route
          path="/partner-details/:partnerId"
          element={<PartnerDetailPage />}
        />

        <Route path="/otp" element={<OtpPage />} />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="/otpverifypassword" element={<PasswordOtp />} />
        <Route path="/setnewpassword" element={<NewPassword />} />

        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route element={<AdminAuth />}>
          <Route path="/admin/home" element={<AdminHomePage />} />
          <Route path="/admin/users" element={<UserListPage />} />
          <Route path="/admin/partner" element={<PartnerListPage />} />
          <Route
            path="/admin/verify-partners"
            element={<UnverifiedListPage />}
          />
          <Route
            path="/admin/viewdetails/:user_id"
            element={<PartnerDetailsPage />}
          />
        </Route>

        {/* <Route element={<UserAuth />}>
          <Route path="/user/profile" element={<UserProfilePage />} />
          <Route path="/user/appointment" element={<UserAppointmentPage />} />
          <Route path="/appointment-booking" element={<PaymentPage />} />
          <Route path="/success" element={<PaymentSuccessPage />} />
        </Route> */}
        <Route element={<UserAuth />}>
          <Route path="/user" element={<ProfileLayoutPage />}>
            <Route index element={<UserInfoPage />} />
            <Route path="profileinfo" element={<UserInfoPage />} />
            <Route path="appointment" element={<UserAppointmentPage />} />
            <Route path="petdetails" element={<PetDetailPage />} />
            {/* <Route path="videocall" element={<Videocall />} /> */}
          </Route>
          <Route path="/appointment-booking" element={<PaymentPage />} />
          <Route path="/success" element={<PaymentSuccessPage />} />
        </Route>

        <Route path="/partner/signup" element={<PartnerSignUpPage />} />

        {/* <Route element={<PartnerAuth />}>
          <Route path="/partner/home" element={<PartnerHomePage />} />
          <Route path="/partner/profile" element={<PartnerProfilePage />} />
          <Route path="/partner/addslot" element={<PartnerSlotPage />} />
        </Route> */}

        <Route element={<PartnerAuth />}>
          <Route path="/partner" element={<PartnerLayout />}>
            <Route index element={<PartnerHomePage />} />
            <Route path="home" element={<PartnerHomePage />} />
            <Route path="profile" element={<PartnerProfilePage />} />
            <Route path="addslot" element={<PartnerSlotPage />} />
            <Route path="appointments" element={<PartnerAppointment />} />
            <Route path="kyc" element={<PartnerKycPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};
