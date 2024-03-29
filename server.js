const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const config = require('config');

// Init express into app variable
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/items/", require("./routes/api/items"));
app.use("/api/users/", require("./routes/api/users"));
app.use("/api/auth/", require("./routes/api/auth"));

// Serve static assets (client's build folder), if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// DB Config
const db = config.get('mongoURI');

// Connect to Mongo DB
mongoose
  .connect(db, { useNewUrlParser: true , useCreateIndex: true})
  .then(() => console.log("MongoDB Connected!"))
  .catch(err => console.log("Error: " + err));

app.listen(port, () => console.log(`Server started on port ${port}`));