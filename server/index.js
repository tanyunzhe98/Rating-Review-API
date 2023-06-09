const express = require('express');
const app = express();
const port = 3000;
const path = require("path");
const db = require('./db/postgres/postgres.js');
const controller = require("./controllers");
const bodyParser = require('body-parser');
const apicache = require("apicache");
const cache = apicache.middleware;


app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

app.use(cache("2 minutes"));

app.use((req, res, next) => {
  console.log('serving: ', req.method, req.path, req.query);
  next();
})

app.get("/reviews/", (req, res) => {
  //console.log("running");
  controller.getReviews(req, res);
});

app.put(`/review/:review_id/helpful`, (req, res) => {
  //console.log("running");
  controller.updateReviewHelpful(req, res);
});

app.put(`/review/:review_id/report`, (req, res) => {
  //console.log("running");
  controller.reportReview(req, res);
});

app.get("/reviews/meta", (req, res) => {
  controller.getReviewsMeta(req, res);
});

app.post("/reviews/", (req, res) => {
  controller.postForm(req, res);
});

app.listen(port, () => {console.log(`Server is listening at http://localhost:${port}`);});
