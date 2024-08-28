import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import ErrorPage from "../pages/ErrorPage";
import ControlPanelStructure from "../layouts/ControlPanelStructure";
import ControlPanelHomeView from "../pages/ControlPanelViews/ControlPanelHomeView";
import SignUpPage from "../pages/SignUpPage";
import ControlPanelProfileView from "../pages/ControlPanelViews/ControlPanelProfileView";
import ControlPanelStaffView from "../pages/ControlPanelViews/ControlPanelStaffView";
import ControlPanelGenerateAccountView from "../pages/ControlPanelViews/ControlPanelGenerateAccountView";
import ControlPanelEnrollOrganizationView from "../pages/ControlPanelViews/ControlPanelEnrollOrganizationView";
import ControlPanelGenerateStaffView from "../pages/ControlPanelViews/ControlPanelGenerateStaffView";
import ControlPanelGenerateDivisionView from "../pages/ControlPanelViews/ControlPanelGenerateDivisionView";
import ControlPanelGeneratePositionView from "../pages/ControlPanelViews/ControlPanelGeneratePositionView";
import ControlPanelStaffAssignmentView from "../pages/ControlPanelViews/ControlPanelStaffAssignmentView";
import ControlPanelGenerateAbsenceRequestView from "../pages/ControlPanelViews/ControlPanelGenerateAbsenceRequestView";
import ControlPanelHandleAbsenceRequestsView from "../pages/ControlPanelViews/ControlPanelHandleAbsenceRequestsView";
import ControlPanelOrganizeActivityView from "../pages/ControlPanelViews/ControlPanelOrganizeActivityView";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <ControlPanelStructure />,
    children: [
      {
        path: "/dashboard",
        element: <ControlPanelHomeView />,
      },
      {
        path: "/dashboard/profile",
        element: <ControlPanelProfileView />,
      },
      {
        path: "/dashboard/employees",
        element: <ControlPanelStaffView />,
      },
      {
        path: "/dashboard/createuser",
        element: <ControlPanelGenerateAccountView />,
      },
      {
        path: "/dashboard/registercompany",
        element: <ControlPanelEnrollOrganizationView />,
      },
      {
        path: "/dashboard/createemployee",
        element: <ControlPanelGenerateStaffView />,
      },
      {
        path: "/dashboard/createdepartment",
        element: <ControlPanelGenerateDivisionView />,
      },
      {
        path: "/dashboard/createjob",
        element: <ControlPanelGeneratePositionView />,
      },
      {
        path: "/dashboard/userempassign",
        element: <ControlPanelStaffAssignmentView />,
      },
      {
        path: "/dashboard/createleaverequest",
        element: <ControlPanelGenerateAbsenceRequestView />,
      },
      {
        path: "/dashboard/manageleaverequests",
        element: <ControlPanelHandleAbsenceRequestsView />,
      },
      {
        path: "/dashboard/createevent",
        element: <ControlPanelOrganizeActivityView />,
      },
    ],
  },
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
