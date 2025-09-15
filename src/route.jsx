import Signup from "./component/auth/signup";
import App from "./App";
import Login from "./component/auth/login";
import isLoggedIn from "./util/isLoggedIn";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import ResetPassword from "./component/auth/reset-password";
import NewPassPage from "./component/auth/new-pass";

import { createBrowserRouter } from "react-router";

function RouteProtect({ children }) {
  const navigate = useNavigate()
  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/')
    }
  }, [])
  return children;
}

export const router = createBrowserRouter([
  {
    path: '/', Component: App,
  },
  { path: '/signup', Component: Signup },
  { path: '/login', element: <RouteProtect><Login /></RouteProtect> },
  { path: '/resetPassword', Component: ResetPassword },
  { path: '/resetPassword/:token', Component: NewPassPage }
])
