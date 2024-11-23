
import AllRouting from "./components/AllRouting";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Admin/Sidebar"; // Import Sidebar
import { useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();

  // Define admin routes where the Sidebar should appear
  const adminRoutes = [
    "/admin",
    "/admin/overview",
    "/admin/nextofkin",
    "/admin/phoneclaim",
    "/admin/medicalinsurance",
    "/admin/fiber",
    "/admin/idcards",
  ];

  // Check if the current route is an admin route
  const isAdminRoute = adminRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <div className="flex">
      {/* Render Sidebar for admin routes */}
      {isAdminRoute && (
        <div className="">
          <Sidebar />
        </div>
      )}

      {/* Main Content */}
      <div className={`flex-1 ${isAdminRoute ? "" : ""}`}>
        {/* Render Navbar for non-admin routes */}
        {!isAdminRoute && (
          <div className="w-full top-0 left-0">
            <Navbar />
          </div>
        )}
        <main>
          <AllRouting />
        </main>
      </div>
    </div>
  );
};

export default App;
