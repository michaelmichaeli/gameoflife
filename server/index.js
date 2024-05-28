require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const boardRoutes = require("./routes/boardRoutes");
const errorHandler = require("./middleware/errorHandler");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors({ origin: "*" }));

app.use(bodyParser.json());

app.use("/api", boardRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`🚀 ~ app: Server is running on port ${PORT}`);
});
