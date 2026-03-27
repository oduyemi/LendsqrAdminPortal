import { UserDetails } from "../components/dashboard/UserDetails/UserDetails";
import { OrganizationProvider } from "../context/organization.context";


const UserDetailsPage = () => {
  
  return (
    <OrganizationProvider>
      <UserDetails />
    </OrganizationProvider>
  );
};


export default UserDetailsPage