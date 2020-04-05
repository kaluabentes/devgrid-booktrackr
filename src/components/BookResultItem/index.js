import React from "react";
import PropTypes from "prop-types";
import { FaPlus, FaCheck } from "react-icons/fa";

import BookItem from "components/BookItem";
import BookActionButton from "components/BookActionButton";

import styles from "./styles.module.css";

const PROP_TYPES = {
  id: PropTypes.string,
  cover: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  isAdded: PropTypes.bool,
  onAddClick: PropTypes.func,
};

const DEFAULT_PROPS = {
  id: "",
  cover: "",
  title: "",
  author: "",
  isAdded: false,
  onAddClick: () => {},
};

export default function BookResultItem({
  id,
  cover,
  title,
  author,
  isAdded,
  onAddClick,
}) {
  return (
    <div className={styles.container}>
      <BookActionButton
        id={id}
        tooltipText="Click to add"
        onClick={onAddClick}
        type={isAdded ? "success" : "primary"}
        icon={isAdded ? <FaCheck /> : <FaPlus />}
      />
      <BookItem cover={cover} title={title} author={author} />
    </div>
  );
}

BookResultItem.propTypes = PROP_TYPES;
BookResultItem.defaultProps = DEFAULT_PROPS;
