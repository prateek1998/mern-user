require("dotenv").config();
var express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  chalk = require("chalk"),
  cors = require("cors"),
  helmet = require("helmet"),
  compress = require("compression"),
  config = require("./config"),
  bodyParser = require("body-parser");
  ApiRoutes = require("./routes");

// Normal express config middlewares
app.use(require("morgan")("dev"));
app.use(bodyParser.json());
app.use(compress());
// secure apps by setting various HTTP headers
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));

// enable CORS - Cross Origin Resource Sharing
app.use(
  cors({
    origin: [
      "http://localhost:3000", "https://lead.nebulaholdings.co"
    ],
    credentials: true,
  })
);

// Custom api routes
app.use("/", ApiRoutes);

/** connect to MongoDB datastore */
mongoose.connect(config.DB.uri,{}).then(() => {
  console.log(chalk.green.bold("Server successfully connected with MongoDB!"));
  app.listen(config.PORT, function () {
    console.log("Listening on port " + config.PORT);
    mongoose.set("debug", config.DB.debug);
  });
});
