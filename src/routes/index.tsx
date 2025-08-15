import { createBrowserRouter } from "react-router";
import Home from "../pages/home";
import Admin from "../pages/admin/admin";
import CurriculumPage from "../pages/admin/curriculum/curriculum";
import RoleManager from "../pages/admin/user/roleManager";
import UserView from "../pages/admin/user/UserView";
import PermissionPage from "../pages/admin/curriculum/permissionPage";
import UserRoleView from "../pages/admin/user/UserRoleView";

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/admin',
    element: <Admin />,
    children: [
      {
        path: "curriculum",
        children: [
          {
            index: true,
            element: <CurriculumPage />,
          },
          {
            path: "curriculum",
            element: <CurriculumPage />,
          },
          {
            path: "permission",
            element: <PermissionPage />,
          },
        ]
      },
      {
        path: "user",
        children: [
          {
            path: "overview",
            element: <UserView />
          },
          {
            path: "role",
            element: <UserRoleView />
          },
          {
            path: "roleManager",
            element: <RoleManager />
          }
        ]
      }
    ],
  },
  {
    path: '*',
    element: <p>There's nothing here: 404!</p>,
  },
]);