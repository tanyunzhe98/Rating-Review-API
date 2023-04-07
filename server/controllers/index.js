const models = require('../models/postgres');

const getReviews = (req, res) => { //console.log('in getReviews')
  //console.log('requery',req.query)
  const params = req.query;
  models.getReviews(params, (err, reviews) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(reviews);
    }
  })
};

const updateReviewHelpful = (req, res) => {
  const params = req.body.params;
  //console.log('running')
  models.updateReviewHelpful(params, (err, reviews) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(204).send();
    }
  })
}

const getReviewsMeta = (req, res) => {
  const params = req.query;
  models.getReviewsMeta(params, (err, reviews) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(reviews);
    }
  })
}

const postForm = (req, res) => {
  const params = req.body;
  //console.log('params:',params)
  models.postForm(params,(err, reviews)=> {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send();
    }
  })
}

module.exports = {
  getReviews,
  updateReviewHelpful,
  getReviewsMeta,
  postForm
}