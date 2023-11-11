import AdminDashboard from "../../components/AdminLayout/AdminDashboard";
import AdminLayout from "../../components/AdminLayout/AdminLayout";
// import { AdminDashboard } from "../../components/AdminLayout/AdminDashboard";

export const AdminHomePage = () => {
  return (
    <div>
      <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
    </div>
  );
};
