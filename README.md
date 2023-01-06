# Algolia CommerceJS App

👋 Welcome to the world of Vinty Luxury Consignment, an online luxury vintage consignment store created with CommerceJS and React with an Express backend.

Here at Vinty, we pride ourselves in not just offering luxury items, but also a luxurious shopping experience - even on the web! Although the Vinty stylists and curators would love to be available 24/7 to assist shoppers, they are unable to. To help out, we've added a handy chatbot to the Vinty site - powered by `react-chatbot-simple` and Algolia - to help make recommendations based on what customers are looking for.

The application in this repo will allow you to create a simple e-commerce store with chatbot search functionalities, as seen below:

![chatbot](https://user-images.githubusercontent.com/12901850/186823255-01cb05fb-bfc3-462c-a76c-3b0bfa269f52.gif)

## Getting Started

### Prerequisites

To get started, you will need:

1. A store created on CommerceJS
2. An Algolia account with an application created and a `products` index created within that.
3. An ngrok account.
4. This application cloned onto your machine to run it locally.

### Environment Variables

There are two `.env` files in this project. One will be for the Express backend (`server` directory) and one will be for the React frontend (`client` directory).

Add a `.env` file in each directory and use the `.env.example` files in those directories to determine what environment variables to use.

For the `ALGOLIA_API_KEY` in `server`, use the Admin API Key.

### Running the application

To run the application, you'll run `npm install` and then `npm start` in both the `client` and `server` directories of your project at the same time. This will install the required dependencies and then run the frontend and backend code concurrently.

To access the frontend, you'll be on `localhost:3000`. Your backend will be on `localhost:3001`.

### Set up ngrok

You'll need to have an `ngrok` tunnel set up to properly. You can follow the Getting Started guide [here](https://ngrok.com/docs/getting-started) to get it set up. You'll set up an `ngrok` tunnel for the backend (port `3001`). You'll start the tunnel in a new Terminal window while your frontend and backend development servers are still running.

It is highly recommended that you create and auth into your ngrok account before creating your tunnel so that you can keep track of your tunnel status.

### Set up Chec webhook

Once you have `ngrok` set up, you're going to take the web address for your tunnel (ending in `.ngrok.io` under `Forwarding` in your Terminal) and head to your Chec account. You'll go to Developer > Webhooks > Add and select `products.create` and `products.update` under the "Events" dropdown. For the URL, enter your `ngrok` tunnel URL and add `/algolia-webhook` after it. This will call the `/algolia-webhook` endpoint from the Express backend (see `server/index.js` for more information).

Then, make sure you save your webhook and confirm that a test request goes through successfully. Once it goes through with a `200` success code, congrats! 🎉 You can now add in products and have them synced to your Algolia index.

### Update code with ngrok URL
Now that Chec and `ngrok` are set up, the final step is to swap out your `ngrok` tunnel URL in `client/src/components/ChatBot/Search.js` within the `getHits()` fetch request. Make sure that the `/recommendation` endpoint is still appened to the URL (ex: `https://ngrok-url-1234.ngrok.io/recommendation`).

### Add products to CommerceJS store

Now that the webhook is added in, you can now add products to your store. For each product, to align with the app's interface, we recommend entering in a name, description, price, and an image with a generous amount of SEO tags for searchability.
