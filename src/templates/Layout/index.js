import React from "react";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";

import routes from "config/routes";
import { TITLE } from "config/app";

import Header from "components/Header";

import styles from "./styles.module.css";

const PROP_TYPES = {
  children: PropTypes.node.isRequried,
  title: PropTypes.string,
};

const DEFAULT_PROPS = {
  title: "",
};

export default function Layout({ title, children }) {
  let history = useHistory();

  const handleNavItemClick = (path) => {
    history.push(path);
  };

  return (
    <>
      <Helmet>
        <title>{title ? `${title} - ${TITLE}` : TITLE}</title>
      </Helmet>
      <Header
        title={TITLE}
        navItems={routes}
        onNavItemClick={handleNavItemClick}
      />
      <main className={styles.main}>
        <Container>{children}</Container>
      </main>
    </>
  );
}

Layout.propTypes = PROP_TYPES;
Layout.defaultProps = DEFAULT_PROPS;
