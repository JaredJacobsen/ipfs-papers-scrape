// log("yo");
var host = process.env.HOST || "127.0.0.1";
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 9999;

var cors_proxy = require("cors-anywhere");
cors_proxy
  .createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ["origin", "x-requested-with"],
    removeHeaders: ["cookie", "cookie2"],
  })
  .listen(port, host, function () {
    log("Running CORS Anywhere on " + host + ":" + port);
  });
