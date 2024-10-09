import useAuth from "@/hooks/useAuth";
import OrganizerDashboard from "./dashboards/OrganizerDashboard";
import AdminDashboard from "./dashboards/AdminDashboard";

export default function Dashboard() {
  const {userData} = useAuth();
  console.log(userData);

  switch (userData?.Role) {
    case "ADMIN":
      return <AdminDashboard />;
    case "ORGANIZER":
      return <OrganizerDashboard />;
    case "USER":
      return <OrganizerDashboard />;
      //   return <UserDashboard />;
  }
}
