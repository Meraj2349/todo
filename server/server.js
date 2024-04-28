const PORT = process.env.PORT || 3000;
const express = require("express");
const db = require("./database");
const taskRouter = require("./routes");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", taskRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});