import React, { useState } from "react";
import { Tabs, Tab, Container } from "react-bootstrap";

export default function Index() {
  const [activeTabKey, setActiveTabKey] = useState("all");

  const handleTabSelect = key => {
    setActiveTabKey(key);
  };

  return (
    <Container>
      <Tabs activeKey={activeTabKey} onSelect={handleTabSelect}>
        <Tab eventKey="all" title="All">
          All
        </Tab>
        <Tab eventKey="completed" title="Completed">
          Completed
        </Tab>
      </Tabs>
    </Container>
  );
}
