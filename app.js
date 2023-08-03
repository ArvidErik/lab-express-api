const express = require("express");
const data = require("./data.json");

const app = express();

app.use(express.json()); // To parse JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

app.use(express.static('views'))


app.listen(3000, () => {
  console.log("server is running on port 3000...");
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/api/all", (req, res) => {
  res.send(data);
});

app.get("/api/random", (req, res) => {
  let i = Math.floor(Math.random() * 21);

  res.send(data[i]);
});

app.get("/api/:id", (req, res) => {
  const id = req.params.id;
  if (id > 20) {
    res.send("There are only 20 elements");
  }
  const result = data.find((item) => item.id == id);
  res.send(result);
});

app.post("/api/post", (req, res) => {
  const postData = req.body;
  res.send(postData);
});
