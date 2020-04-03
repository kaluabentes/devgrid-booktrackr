import React from "react";

import Search from "pages/Search";
import Library from "pages/Library";

export default [
  {
    label: "Search Book",
    path: "/",
    component: <Search />,
  },
  {
    label: "My Library",
    path: "/library",
    component: <Library />,
  },
];
