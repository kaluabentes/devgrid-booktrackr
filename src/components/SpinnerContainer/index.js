import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.css";

const PROP_TYPES = {
  children: PropTypes.node.isRequired,
};

export default function SpinnerContainer({ children }) {
  return <div className={styles.spinnerContainer}>{children}</div>;
}

SpinnerContainer.propTypes = PROP_TYPES;
