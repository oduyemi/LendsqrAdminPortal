import { Users } from "../components/dashboard/Users/Users";
import { OrganizationProvider } from "../context/organization.context";


const UsersPage = () => {
  
  return (
    <OrganizationProvider>
      <Users />
    </OrganizationProvider>
  );
};


export default UsersPage