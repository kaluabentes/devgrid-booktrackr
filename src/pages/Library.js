import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Alert } from "react-bootstrap";

import Layout from "templates/Layout";
import PageTitle from "components/PageTitle";
import BookLibraryItem from "components/BookLibraryItem";
import BookGrid from "components/BookGrid";

import StorageService from "services/StorageService";

import getCover from "utils/book/getCover";

export default function Library() {
  const getBooks = () => StorageService.getItems("books");
  const [books, setBooks] = useState(getBooks());
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState({});

  const handleEditClick = (book) => {
    setCurrentBook(book);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleBookSave = () => {
    setModalOpen(false);
    StorageService.editItem("books", currentBook.id, currentBook);
    setBooks(getBooks());
  };

  const handleInputChange = (event) => {
    setCurrentBook({
      ...currentBook,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Layout title="Library">
      <PageTitle>My Library</PageTitle>
      {books.length > 0 ? (
        <BookGrid>
          {books.map((book) => (
            <BookLibraryItem
              key={book.id}
              id={book.id}
              cover={getCover(book.coverId)}
              title={book.title}
              author={book.author}
              onEditClick={() => handleEditClick(book)}
            />
          ))}
        </BookGrid>
      ) : (
        <Alert variant="info">Theres no books added yet.</Alert>
      )}
      <Modal show={isModalOpen} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{currentBook.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Label>Start date</Form.Label>
                <Form.Control
                  type="date"
                  name="startedAt"
                  onChange={handleInputChange}
                  value={currentBook.startedAt}
                />
              </Col>
              <Col>
                <Form.Label>End date</Form.Label>
                <Form.Control
                  type="date"
                  name="endedAt"
                  onChange={handleInputChange}
                  value={currentBook.endedAt}
                />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleBookSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}
