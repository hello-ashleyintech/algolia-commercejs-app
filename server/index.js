const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

/*const express = require("express");
const { resolve } = require("path");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const envFilePath = resolve(__dirname, "./.env");
require("dotenv").config({ path: envFilePath });

const app = express();

//app.use(express.static(process.env.STATIC_DIR));
app.use(bodyParser.json());

/*app.get("/", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

app.post("/webhook", async (req, res) => {
  // Get the query from the Dialogflow request.
  // https://cloud.google.com/dialogflow/es/docs/fulfillment-webhook#webhook_request
  const queryText = req.body.queryResult.queryText;

  // Query the Algolia Answers API.
  // https://www.algolia.com/doc/guides/algolia-ai/answers/#finding-answers-in-your-index
  const headers = {
    "Content-Type": "application/json",
    "X-Algolia-Api-Key": process.env.ALGOLIA_API_KEY,
    "X-Algolia-Application-ID": process.env.ALGOLIA_APP_ID
  };
  const url = `https://${process.env.ALGOLIA_APP_ID}-dsn.algolia.net/1/answers/${process.env.ALGOLIA_INDEX_NAME}/prediction`;
  const data = {
    query: queryText,
    queryLanguages: ["en"],
    attributesForPrediction: ["q", "a"],
    nbHits: 1,
    threshold: 185
  };
  const results = await fetch(url, {
    method: "post",
    body: JSON.stringify(data),
    headers
  }).then((res) => res.json());

  if (results.hits.length === 0) {
    res.send({
      fulfillment_messages: [
        {
          text: {
            text: [
              "Sorry, I do not have an answer to that!",
              "Here are some suggestion of questions:"
            ]
          }
        },
        {
          payload: {
            richContent: [
              [
                {
                  type: "chips",
                  options: [
                    {
                      text: "Are the COVID-19 Vaccines safe?"
                    },
                    {
                      text:
                        "Can my COVID-19 test come back positive if I get vaccinated?"
                    }
                  ]
                }
              ]
            ]
          }
        }
      ]
    });
  } else {
    const hit = results.hits[0];
    let textAnswer;
    if (hit["_answer"]["extractAttribute"] === "a") {
      textAnswer = `...${hit["_answer"]["extract"]}...`.replace(
        new RegExp("<em>|</em>", "g"),
        ""
      );
    } else {
      textAnswer = hit["a"];
    }
    console.log(textAnswer);
    return res.send({
      fulfillment_messages: [
        {
          payload: {
            richContent: [
              [
                {
                  type: "description",
                  text: [textAnswer]
                }
              ]
            ]
          }
        }
      ]
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});*/
