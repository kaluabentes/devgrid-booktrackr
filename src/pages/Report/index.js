import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

import Layout from "templates/Layout";
import PageTitle from "components/PageTitle";
import ReportChart from "components/ReportChart";

import StorageService from "services/StorageService";
import ReportService from "services/ReportService";

import styles from "./styles.module.css";

export default function Report() {
  const initialYear = new Date().getFullYear();
  const books = StorageService.getItems("books");
  const [data, setData] = useState(
    ReportService.setYear(initialYear).getMonthlySummary(books)
  );
  const [year, setYear] = useState(initialYear);
  const [monthlyAverage, setMonthlyAverage] = useState(
    ReportService.setYear(initialYear).getMonthlyAverage(books)
  );

  const applySelectedYear = () => {
    const average = ReportService.setYear(year).getMonthlyAverage(books);
    const summary = ReportService.setYear(year).getMonthlySummary(books);

    setMonthlyAverage(average);
    setData(summary);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      applySelectedYear();
    }
  };

  const handlerYearChange = (event) => {
    setYear(event.target.value);
  };

  return (
    <Layout title="Report">
      <PageTitle>Report</PageTitle>
      {books.length > 0 ? (
        <>
          <div className={styles.formGrid}>
            <div className={styles.controlCol}>
              <Form.Label>Year</Form.Label>
              <Form.Control
                value={year}
                onChange={handlerYearChange}
                onKeyPress={handleKeyPress}
              />
            </div>
            <div>
              <Button onClick={applySelectedYear}>Apply</Button>
            </div>
          </div>
          <br />
          {!isNaN(monthlyAverage) ? (
            <>
              <p>
                <strong>Monthly Average:</strong> {monthlyAverage}
              </p>
              <br />
              <ReportChart data={data} />
            </>
          ) : (
            <Alert variant="info">Theres no book data to use for report</Alert>
          )}
        </>
      ) : (
        <Alert variant="info">Theres no book data to use for report</Alert>
      )}
    </Layout>
  );
}
