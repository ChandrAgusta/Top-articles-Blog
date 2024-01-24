import React, { useState, useEffect } from "react";
import { getTopHeadlines } from "../../API/services";
import CountrySelector from "./selectCountry";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../style/home.css";

function Article() {
  const [news, setNews] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articles = await getTopHeadlines(selectedCountry);
        setNews(articles);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedCountry]);

  const handleCountryChange = (newCountry) => {
    setSelectedCountry(newCountry);
  };

  const formattedDate = new Date().toLocaleDateString(selectedCountry, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "UTC",
  });

  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-body-tertiary"
        fixed="top"
      >
        <Container>
          <Navbar.Brand href="#home">CA Trends</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Navbar.Text>
                <CountrySelector onSelectCountry={handleCountryChange} />
              </Navbar.Text>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="konten">
        <h1>Top Headlines</h1>
        <ul>
          {news.map((article, index) => (
            <li key={index}>
              <h2>
                {article.title} ({article.author})
              </h2>
              <p>{formattedDate}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

export default Article;
