import AdminLayout from "../../components/AdminLayout/AdminLayout";
import UserList from "../../components/AdminLayout/UserList";

export const UserListPage = () => {
  return (
    <div>
      <AdminLayout>
        <UserList />
      </AdminLayout>
    </div>
  );
};