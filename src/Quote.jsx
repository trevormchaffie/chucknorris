import React, { useState, useEffect } from "react";

const Quote = () => {
  const [quote, setQuote] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch("https://api.chucknorris.io/jokes/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  };

  const fetchQuote = () => {
    if (!selectedCategory) {
      return;
    }

    fetch(
      `https://api.chucknorris.io/jokes/random?category=${selectedCategory}`
    )
      .then((response) => response.json())
      .then((data) => setQuote(data.value))
      .catch((error) => console.error("Error fetching quote:", error));
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div>
      <select onChange={handleCategoryChange}>
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <br />
      <br />
      <button onClick={fetchQuote}>Get Quote</button>
      <br />
      <br />
      {quote && <p>{quote}</p>}
    </div>
  );
};

export default Quote;
