import React from "react";
import PropTypes from "prop-types";
import { FaEdit } from "react-icons/fa";

import BookItem from "components/BookItem";
import BookActionButton from "components/BookActionButton";

import styles from "./styles.module.css";

const PROP_TYPES = {
  id: PropTypes.string,
  cover: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  onEditClick: PropTypes.func,
};

const DEFAULT_PROPS = {
  id: "",
  cover: "",
  title: "",
  author: "",
  onEditClick: () => {},
};

export default function BookResultItem({
  id,
  cover,
  title,
  author,
  onEditClick,
}) {
  return (
    <div className={styles.container}>
      <BookActionButton
        id={id}
        tooltipText="Edit tracking info"
        onClick={onEditClick}
        type="primary"
        icon={<FaEdit />}
      />
      <BookItem cover={cover} title={title} author={author} />
    </div>
  );
}

BookResultItem.propTypes = PROP_TYPES;
BookResultItem.defaultProps = DEFAULT_PROPS;
