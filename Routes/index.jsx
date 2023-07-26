import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import HomeLayout from "../layouts/HomeLayout";
import ProfileLayout from "../layouts/ProfileLayout";
import AboutLayout from "../layouts/AboutLayout";
//import StoryLayout from "../layouts/StoryLayout";
import StoryboyLayout from "../layouts/StoryboyLayout";
import StorygirlLayout from "../layouts/StorygirlLayout";
import StoryComponent from "../components/StoryComponent";
import Term from "../components/Term";
import Privacy from "../components/Privacy";
import Disclaimer from "../components/Disclaimer";


export const router = createBrowserRouter([


  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <HomeLayout />,
  },
  {
    path: "/profile",
    element: <ProfileLayout />,
  },
 
  {
    path: "/About",
    element: <AboutLayout />,
  },
  {
    path: "/Story",
    element: <StoryComponent />,
  },
  {
    path: "/profile",
    element: <StoryboyLayout />,
  },
  {
    path: "/Storygirl",
    element: <StorygirlLayout />,
  },
  {
    path: "/Term",
    element: <Term />,
  },
  {
    path: "/Privacy",
    element: <Privacy />,
  },

  {
    path: "/Disclaimer",
    element: <Disclaimer />,
  },

]); 