import React, { useEffect, useState } from "react";
import "./Search.css";

function Search(props) {
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  let query = props.steps[1].value;

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  async function getHits() {
    // query and then update component with API response
    // api call to get all completed orders
    setError("");
    let data = {
      query: query,
    };
    // replace URL in fetch with your ngrok tunnel
    // (keep `/recommendation` at the end of the URL)
    fetch(
      "https://ngrok-url-1234.ngrok.io/recommendation",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          setError("An unknown error has occurred. Please try again soon!");
        }
      })
      .catch((err) => {
        setError(err);
      })
      .then((response) => {
        if (!response.body.hits) {
          setIsLoading(false);
          return;
        }

        let hits =
          response.body.hits.length > 2
            ? shuffleArray(response.body.hits)
            : response.body.hits;

        if (hits.length !== 0 && hits.length > 5) {
          hits = hits.slice(0, 5);
        }

        setResults(hits);
      });
  }

  useEffect(() => {
    getHits();
  }, []);

  return (
    <>
      {results.length > 0 && (
        <>
          <ul>
            {results.map((result) => {
              return (
                <li key={result.id}>
                  <div className="result">
                    <img
                      src={result.image.url.replace(/ /g, "%")}
                      width="100"
                      alt="product image"
                    ></img>
                    <h3>{result.name}</h3>
                    <h4>{result.price.formatted}</h4>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
      {!isLoading && (
        <>
          <div className="result">
            <h2>
              So sorry, we couldn't find what you were looking for. Please
              search again!
            </h2>
            <p>
              Examples of search keywords: "Modern", "Vivienne Westwood", "Goth"
            </p>
          </div>
        </>
      )}
      {error && (
        <>
          <div className="result">
            <h2>So sorry, there's been an error.</h2>
            <p>{error}</p>
          </div>
        </>
      )}
    </>
  );
}

export default Search;
