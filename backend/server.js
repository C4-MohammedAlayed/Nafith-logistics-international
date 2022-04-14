const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db/db");

const app = express();
const PORT = 5000;

// Import Routers
const rolesRouter =require("./routes/roles")

app.use(cors());
app.use(express.json());

// Routes Middleware
app.use("/roles",rolesRouter)



app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});


