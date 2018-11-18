const http = require("http");
const port = 3000;
const registry = require("npm-stats")();
const finalhandler = require("finalhandler");
const Router = require("router");
const router = Router();

router.get("/author/:name", (request, response) => {
  var name = "dferber90";
  var list = registry.user(request.params.name).list((error, packages) => {
    response.setHeader("Content-Type", "application/json");
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Cache-Control", "max-age=300");
    if (error) {
      response.status(400);
      response.end(JSON.stringify({ error: true }));
      return;
    }
    response.end(JSON.stringify({ author: request.params.name, packages }));
  });
});

const server = http.createServer((req, res) => {
  router(req, res, finalhandler(req, res));
});

server.listen(port, err => {
  if (err) {
    return console.log("something bad happened", err);
  }

  console.log(`server is listening on ${port}`);
});
