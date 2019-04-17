"use strict";

const fetch = require("node-fetch");

const successHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Cache-Control": "max-age=120"
};

const failureHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Cache-Control": "no-cache, no-store, must-revalidate"
};

module.exports.author = async (event, context) => {
  // Allows clients to fetch /author?name=dferber90 to receive an
  // all packages of that author.
  // I found out about the URL to query from the "npm-stats" package.
  const author = event.queryStringParameters
    ? event.queryStringParameters.name
    : null;

  if (!author)
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "missing-author-name" }),
      headers: failureHeaders
    };

  const packages = await fetch(
    `https://skimdb.npmjs.com/registry/_design/app/_view/byUser?startkey=%22${author}%22&endkey=%22${author}%22`
  )
    .then(response => response.json())
    .then(response => response.rows.map(entry => entry.value));

  return {
    statusCode: 200,
    body: JSON.stringify({ author, packages }),
    headers: successHeaders
  };
};

module.exports.package = async (event, context) => {
  const pkg = event.queryStringParameters
    ? event.queryStringParameters.name
    : null;

  if (!pkg)
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "missing-package-name" }),
      headers: failureHeaders
    };

  const npmResponse = await fetch(
    `https://api.npmjs.org/downloads/range/last-year/${pkg}`
  );

  const npmResponseBody = await npmResponse.json();
  if (npmResponse.status === 200 && Array.isArray(npmResponseBody.downloads)) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        downloads: npmResponseBody.downloads.reduce((accumulator, entry) => {
          accumulator[entry.day] = entry.downloads;
          return accumulator;
        }, {})
      }),
      headers: successHeaders
    };
  }

  return {
    statusCode: npmResponse.status,
    statusText: npmResponse.statusText,
    headers: failureHeaders
  };
};
