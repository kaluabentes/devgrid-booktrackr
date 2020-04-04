import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.css";

const PROP_TYPES = {
  children: PropTypes.node.isRequired,
};

export default function PageTitle({ children }) {
  return <h2 className={styles.title}>{children}</h2>;
}

PageTitle.propTypes = PROP_TYPES;
