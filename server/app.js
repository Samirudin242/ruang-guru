require('dotenv').config();

const express = require("express");
const app = express();
const router = require("./router");
const PORT = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`)
});