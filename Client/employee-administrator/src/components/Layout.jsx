import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar at the top */}
      <Navbar />

      {/* Main content grows to fill space */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>

      {/* Footer always at the bottom */}
      <Footer />
    </div>
  );
}
