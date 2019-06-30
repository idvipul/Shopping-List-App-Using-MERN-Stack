const express = require("express");
const cors = require('cors')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const items = require('./routes/api/items');

// Init express into app variable
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(bodyParser.json());
// app.use(cors())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Routes
app.use('/api/items/', items);

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to Mongo DB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected!"))
  .catch(err => console.log("Error: " + err));

app.listen(port, () => console.log(`Server started on port ${port}`));
