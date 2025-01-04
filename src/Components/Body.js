import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Browser from "./Browser";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/broser",
      element: <Browser />,
    },
  ]);
  return (
    <div className=''>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
