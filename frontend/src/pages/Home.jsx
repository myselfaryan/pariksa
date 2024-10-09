import Navbar from "../components/Navbar/Navbar";
import Dashboard from "./Dashboard";
import AdminDashboard from "./dashboards/AdminDashboard";
import OrganizerDashboard from "./dashboards/OrganizerDashboard";

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
    <Dashboard />
    </div>
  );
  /*
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <main className="bg-body-bg text-main-white h-full">
        <h1 className="flex items-center justify-center pt-10 text-4xl">
          Home Page
        </h1>
        <p className="pt-6 px-20">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel est
          mollis, volutpat tortor consectetur, maximus eros. Cras volutpat
          tincidunt sapien ut vehicula. Quisque eu aliquet justo. Phasellus vel
          sapien sit amet diam ultricies faucibus. Praesent purus augue, rhoncus
          eget nulla sed, accumsan ullamcorper nulla. Mauris sit amet egestas
          neque.
        </p>
      </main>
    </div>
  );
  */
}
