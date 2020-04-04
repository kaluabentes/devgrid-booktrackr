import React from "react";

import Layout from "templates/Layout";
import PageTitle from "components/PageTitle";
import BookLibraryItem from "components/BookLibraryItem";
import BookGrid from "components/BookGrid";

import StorageService from "services/StorageService";

import getCover from "utils/book/getCover";
import getAuthor from "utils/book/getAuthor";

export default function Library() {
  return (
    <Layout title="Library">
      <PageTitle>My Library</PageTitle>
    </Layout>
  );
}
