// This is the Cloudflare Worker which is used in Cloudflare to handle the
// "npmstats.org/*" route.

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(req) {
  const res = await fetch(req);

  // Allows clients to fetch https://npmstats.org/-author/dferber90 to receive
  // package of an author.
  // I found out about the URL to query from the "npm-stats" package.
  const match = req.url.match(/npmstats\.org\/-author\/([a-z0-9_\-]+)/i);
  if (match) {
    const author = match[1];
    const packages = await fetch(
      `https://skimdb.npmjs.com/registry/_design/app/_view/byUser?startkey=%22${author}%22&endkey=%22${author}%22`
    )
      .then(response => response.json())
      .then(response => response.rows.map(entry => entry.value));
    return new Response(
      JSON.stringify({
        author,
        packages
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "max-age=120"
        }
      }
    );
  }

  // AWS S3 uses static file hosting, but our requests use dynamic routes
  // This means AWS S3 would return 404 pages, but because we've set index.html to
  // handle 404 pages, the application is served fine.
  // But the status code is still 404, so we need to change it to 200.
  if (
    res.status === 404 &&
    req.method === "GET" &&
    res.headers.get("x-amz-error-code") === "NoSuchKey"
  ) {
    return new Response(res.body, {
      ...res,
      status: 200,
      statusText: "OK"
    });
  }
  return res;
}
