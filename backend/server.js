const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db/db");

const app = express();
const PORT = 5000;

// Import Routers


app.use(cors());
app.use(express.json());

// Routes Middleware




app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});


