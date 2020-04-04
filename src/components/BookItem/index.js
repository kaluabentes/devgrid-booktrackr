import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.css";

const PROP_TYPES = {
  cover: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
};

const DEFAULT_PROPS = {
  cover: "",
  title: "",
  author: "",
};

export default function BookItem({ cover, title, author }) {
  return (
    <article className={styles.container}>
      <img className={styles.cover} src={cover} alt={title} />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.author}>{author}</p>
    </article>
  );
}

BookItem.propTypes = PROP_TYPES;
BookItem.defaultProps = DEFAULT_PROPS;
