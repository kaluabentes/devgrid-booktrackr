import React from "react";
import PropTypes from "prop-types";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import classnames from "classnames";

import styles from "./styles.module.css";

const TYPE = {
  primary: styles.primary,
  success: styles.success,
};

const PROP_TYPES = {
  id: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  tooltipText: PropTypes.string,
  type: PropTypes.string,
};

const DEFAULT_PROPS = {
  id: "",
  onClick: () => {},
  icon: "",
  tooltipText: "",
  type: TYPE.primary,
};

export default function BookActionButton({
  id,
  onClick,
  icon,
  tooltipText,
  type,
}) {
  return (
    <OverlayTrigger
      key={id}
      placement={"bottom"}
      overlay={<Tooltip id={`tooltip-${id}`}>{tooltipText}</Tooltip>}
    >
      <button
        type="button"
        onClick={onClick}
        className={classnames(styles.button, TYPE[type])}
      >
        {icon}
      </button>
    </OverlayTrigger>
  );
}

BookActionButton.propTypes = PROP_TYPES;
BookActionButton.defaultProps = DEFAULT_PROPS;
