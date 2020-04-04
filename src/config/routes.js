import React from "react";

import Finder from "pages/Finder";
import Library from "pages/Library";

export default [
  {
    label: "Book Finder",
    path: "/",
    component: <Finder />,
  },
  {
    label: "My Library",
    path: "/library",
    component: <Library />,
  },
];
