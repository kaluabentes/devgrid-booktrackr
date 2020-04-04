import React, { useState } from "react";
import { Form, Alert, Pagination, InputGroup, Button } from "react-bootstrap";
import { BeatLoader } from "react-spinners";

import Layout from "templates/Layout";
import PageTitle from "components/PageTitle";
import SpinnerContainer from "components/SpinnerContainer";
import BookGrid from "components/BookGrid";
import BookItem from "components/BookItem";

import ApiService from "services/ApiService";
import StorageService from "services/StorageService";

const SERVER_ERROR =
  "Sorry. There seems to be a problem with what you were just looking at.";

const PLACEHOLDER_PATH =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSqPB7HMDJjWT2u24S_3RLfMriDu2zGGBtr1idPSc_BwhXiCMyI&usqp=CAU";

export default function Search() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState(undefined);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [page, setPage] = useState(1);
  const booksIds = StorageService.getItems("books").map((book) => book.id);
  const [storedIds, setStoredIds] = useState(booksIds);

  const getComputedResults = (items) => {
    return items.map((item) => ({
      ...item,
      isAdded: storedIds.includes(item.key),
    }));
  };

  const getCover = (id) => {
    if (!id || id === -1) {
      return PLACEHOLDER_PATH;
    }

    return `http://covers.openlibrary.org/b/id/${id}-M.jpg`;
  };

  const getAuthor = (author) =>
    Array.isArray(author) ? author.join(", ") : "";

  const searchBooks = async (pageNumber) => {
    setLoading(true);

    try {
      const response = await ApiService.search(search, pageNumber);

      window.scrollTo(0, 0);
      setResults(response);
      setLoading(false);
    } catch (error) {
      console.log("ERROR", error);
      setError(SERVER_ERROR);
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    const {
      target: { value },
    } = event;

    setError(undefined);
    setSearch(value);
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchBooks();
    }
  };

  const handlePaginationItemClick = (event, number) => {
    event.preventDefault();

    setPage(number);
    searchBooks(number);
  };

  const handleAddBookClick = (book) => {
    setStoredIds([...storedIds, book.key]);
    StorageService.addItem("books", {
      id: book.key,
      title: book.title,
      author: getAuthor(book.author),
      cover: getCover(book.cover_i),
      startedAt: undefined,
      endedAt: undefined,
    });
  };

  const renderPaginationItems = () => {
    return Array(Math.ceil(results.numFound / 100))
      .fill(undefined)
      .map((_, index) => {
        const number = index + 1;

        return (
          <Pagination.Item
            onClick={(event) => handlePaginationItemClick(event, number)}
            key={number}
            active={number === page}
          >
            {number}
          </Pagination.Item>
        );
      });
  };

  const renderContent = () => {
    if (error) {
      return <Alert variant="danger">{error}</Alert>;
    }

    return (
      results && (
        <>
          <p>{results.numFound} found</p>
          <BookGrid>
            {getComputedResults(results.docs).map((book) => (
              <BookItem
                isAdded={book.isAdded}
                key={book.key}
                id={book.key}
                cover={getCover(book.cover_i)}
                title={book.title}
                author={getAuthor(book.author)}
                onAddClick={() => handleAddBookClick(book)}
              />
            ))}
          </BookGrid>
          <SpinnerContainer>
            <Pagination>{renderPaginationItems()}</Pagination>
          </SpinnerContainer>
        </>
      )
    );
  };

  return (
    <Layout title="Search">
      <PageTitle>Book Finder</PageTitle>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Whats is the book you are looking for?</Form.Label>
          <InputGroup>
            <Form.Control
              size="lg"
              type="text"
              placeholder="Ex.: The Lord of the Rings"
              onChange={handleSearchChange}
              onKeyPress={handleSearchKeyPress}
              value={search}
            />
            <InputGroup.Append>
              <Button
                type="button"
                variant="success"
                onClick={() => searchBooks()}
              >
                Search
              </Button>
            </InputGroup.Append>
          </InputGroup>
          <Form.Text className="text-muted">Powered by OpenLibrary</Form.Text>
        </Form.Group>
      </Form>
      {isLoading ? (
        <SpinnerContainer>
          <BeatLoader size={12} color="#007BFE" />
        </SpinnerContainer>
      ) : (
        renderContent()
      )}
    </Layout>
  );
}
