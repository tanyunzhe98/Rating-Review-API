const models = require('../models/postgres');

const getReviews = (req, res) => { //console.log('in getReviews')
  //console.log('requery',req.query)
  const params = req.query;
  const reviews = {};
  let page = req.query.page || 1;
  var count = Number(params['count']) || 5;
  var order =  params['sort']||'helpful';
  var product_id = params['product_id'];
  models.getReviews(product_id, page, count, order)
  .then((results) => {
    reviews.product = req.query.product_id;
    reviews.page = Number(page);
    reviews.count = count;
    reviews.results = results.rows;
    //console.log(reviews);
  })
  .then(() => res.status(200).send(reviews))
  .catch((err) => res.status(404).send(err));
};

const updateReviewHelpful =  (req, res) => {
  //const params = req.body.params;
  //console.log('running')
  // console.log('body',req.body.params);
  // console.log('params',req.params.review_id);
  models.updateReviewHelpful(req.body.params.review_id)
  .then((results) => res.status(204).send('UPDATED'))
  .catch((err) => res.status(404).send(err));
};

const getReviewsMeta = (req, res) => {
  const params = req.query;
  models.getReviewsMeta(params.product_id)
  .then((results) => res.status(200).send(results.rows[0]))
  .catch((err) => res.status(404).send(err));
};

const postForm = (req, res) => {
  let date = new Date().getTime();
  const params = req.body;
  console.log('params:',params)
  models.postForm(params,date)
  .then((results) => res.status(201).send('CREATED'))
  .catch((err) => res.status(404).send(err));
};

const reportReview = (req, res) => {
  //const params = req.body.params;
  //console.log('params:',params)
  models.reportReview(req.body.params.review_id)
  .then((results) => res.status(204).send('REPORTED'))
  .catch((err) => res.status(404).send(err));
};

module.exports = {
  getReviews,
  updateReviewHelpful,
  getReviewsMeta,
  postForm,
  reportReview
}