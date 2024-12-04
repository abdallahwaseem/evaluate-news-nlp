var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("dist"));

console.log(__dirname);

// Variables for url and api key

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

// POST Route
app.post("/get_sentiment", async function (req, res) {
  try {
    const data = req.body;
    // console.log(data);
    const formdata = new FormData();
    formdata.append("url", process.env.API_KEY);
    formdata.append("txt", data.url);
    formdata.append("lang", "en"); // 2-letter code, like en es fr ...

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    const response = await fetch(
      "https://api.meaningcloud.com/sentiment-2.1",
      requestOptions
    );
    const value = await response.json();

    res.send({
      status: 200,
      polarity: value["score_tag"],
      subjectivity: value["subjectivity"],
    });
  } catch (error) {
    res.send({
      status: 400,
    });
  }
});

// Designates what port the app will listen to for incoming requests
app.listen(8001, function () {
  console.log("Example app listening on port 8001!");
});
