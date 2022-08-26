const express = require("express");
const algoliaSearch = require("algoliasearch");
require("dotenv").config();
var bodyParser = require("body-parser");
var cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();

// configure the app to use bodyParser()
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// This webhook was based off of https://github.com/chec/algolia-integration
app.post("/algolia-webhook", async function (req, res) {
  if (!process.env.ALGOLIA_APP_ID || !process.env.ALGOLIA_API_KEY) {
    res.send({
      statusCode: 503,
      body: "Either the application ID or admin API key is undefined, please check your configuration.",
    });
  }
  // Establish index names, falling back to defaults
  const products_index = "products";
  const categories_index = "categories";

  // Initialize Algolia client
  const client = algoliaSearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_API_KEY
  );

  // Integrations are run by events, usually from a webhook. The event that triggered this action is available within
  // the body of the request
  let result;
  switch (req.body.event) {
    case "products.create":
    case "products.update":
      // Create/update product in index
      result = await saveProduct(client, products_index, req.body.payload);
      return res.send({
        statusCode: req.body.event === "products.create" ? 201 : 200,
        body: JSON.stringify({
          objectID: result.objectID,
          taskID: result.taskID,
        }),
      });
  }

  return res.send({
    statusCode: 200,
    body: "Nothing happened, might be an unwanted webhook event...",
  });

  /**
   * Saves something to Algolia with the client
   *
   * @param {algoliasearch} client
   * @param {string} indexName
   * @param {object} payload
   */
  function saveObject(client, indexName, payload) {
    return client.initIndex(indexName).saveObject(payload);
  }

  /**
   * Saves a product to Algolia with the client
   *
   * @param {algoliasearch} client
   * @param {string} indexName
   * @param {object} product
   */
  function saveProduct(client, indexName, product) {
    const payload = {
      objectID: product.id, // Only field required by Algolia
      id: product.id,
      name: product.name,
      description: product.description,
      permalink: product.permalink,
      sku: product.sku,
      inventory: product.inventory,
      price: product.price,
      assets: product.assets,
      image: product.image,
      seo: product.seo,
      sort_order: product.sort_order,
      extra_fields: product.extra_fields,
      attributes: product.attributes,
      categories: product.categories,
      related_products: product.related_products,
      meta: product.meta,
      active: product.active,
      created: product.created,
      updated: product.updated,
    };

    product.attributes &&
      product.attributes.map(({ id, name, value, meta }) => {
        payload[`attribute_${name}`] = {
          name,
          id,
          value,
          meta,
        };
      });

    return saveObject(client, indexName, payload);
  }
});

app.post("/recommendation", async function (req, res) {
  if (!process.env.ALGOLIA_APP_ID || !process.env.ALGOLIA_API_KEY) {
    res.send({
      statusCode: 503,
      body: "Either the application ID or admin API key is undefined, please check your configuration.",
    });
  }

  // Query text sent from FE
  const queryText = req.body.query;

  const client = algoliaSearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_API_KEY
  );

  const index = client.initIndex("products");

  const results = await index.search(queryText);

  if (results.hits.length === 0) {
    res.send({
      statusCode: 200,
      body: "We couldn't find anything. Try again with a new search!",
    });
  } else {
    const hits = results.hits;
    res.send({ statusCode: 200, body: { hits: hits } });
  }
});
