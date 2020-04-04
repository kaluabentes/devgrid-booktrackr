import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { FaPlus, FaCheck } from "react-icons/fa";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import BookItem from "components/BookItem";

import styles from "./styles.module.css";

const PROP_TYPES = {
  onEditClick: PropTypes.func,
};

const DEFAULT_PROPS = {
  onEditClick: () => {},
};

export default function BookLibraryItem({ onAddClick, ...bookItemProps }) {
  return (
    <div className={styles.container}>
      <OverlayTrigger
        key={id}
        placement={"bottom"}
        overlay={<Tooltip id={`tooltip-${id}`}>Click to add</Tooltip>}
      >
        <button
          type="button"
          onClick={onAddClick}
          className={classnames(styles.addButton, {
            [styles.addButtonAdded]: isAdded,
          })}
        >
          {isAdded ? <FaCheck /> : <FaPlus />}
        </button>
      </OverlayTrigger>
      <BookItem {...bookItemProps} />
    </div>
  );
}

BookLibraryItem.propTypes = PROP_TYPES;
BookLibraryItem.defaultProps = DEFAULT_PROPS;
