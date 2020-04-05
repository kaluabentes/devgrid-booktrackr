import React from "react";

import Finder from "pages/Finder";
import Library from "pages/Library";
import Report from "pages/Report";

export default [
  {
    label: "Finder",
    path: "/",
    component: <Finder />,
  },
  {
    label: "Library",
    path: "/library",
    component: <Library />,
  },
  {
    label: "Report",
    path: "/report",
    component: <Report />,
  },
];
