import { createBrowserRouter } from "react-router";
import Root from "./pages/Root";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Prospects from "./pages/Prospects";
import Candidates from "./pages/Candidates";
import Professors from "./pages/Professors";
import Rooms from "./pages/Rooms";
import Formations from "./pages/Formations";
import Reservations from "./pages/Reservations";
import Planning from "./pages/Planning";
import Inscriptions from "./pages/Inscriptions";

import CandidateReservations from "./pages/CandidateReservations";
import Attendance from "./pages/Attendance";
import Statistics from "./pages/Statistics";
import Commercials from "./pages/Commercials";
import Payments from "./pages/Payments";
import RoleManagement from "./pages/RoleManagement";
import ProfileManagement from "./pages/ProfileManagement";
import AdminRoles from "./pages/AdminRoles";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Login },
      { path: "dashboard", Component: Dashboard },
      { path: "prospects", Component: Prospects },
      { path: "candidates", Component: Candidates },
      { path: "professors", Component: Professors },
      { path: "rooms", Component: Rooms },
      { path: "formations", Component: Formations },
      { path: "commercials", Component: Commercials },
      { path: "payments", Component: Payments },
      { path: "reservations", Component: Reservations },
      { path: "planning", Component: Planning },
      { path: "inscriptions", Component: Inscriptions },

      { path: "candidate-reservations", Component: CandidateReservations },
      { path: "attendance", Component: Attendance },
      { path: "statistics", Component: Statistics },
      { path: "role-management", Component: RoleManagement },
      { path: "profile-management", Component: ProfileManagement },
      { path: "admin-roles", Component: AdminRoles },
      { path: "settings", Component: Settings },
      { path: "*", Component: NotFound },
    ],
  },
]);
