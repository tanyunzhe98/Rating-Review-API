const db = require('../../db/postgres/postgres.js')

const getReviews = (obj) => {
  //console.log(obj)
  var product_id = obj['product_id'];
  var offset = ((obj['page'] || 1) - 1) * (obj['count'] || 5);
  var order =  obj['sort'];
  var count = obj['count'] || 5;
  let sort;

  if (order === 'helpful') {
    sort = 'ORDER BY r.helpfulness DESC';
  } else if (order === 'newest') {
    sort = 'ORDER BY r.date DESC';
  } else {
    sort = 'ORDER BY r.helpfulness DESC, r.date DESC';
  }

  //console.log(product_id)
  //console.log(offset)
  //console.log(count)
  //console.log(sort)

  const query = `
    SELECT r.review_id, r.rating, r.summary, r.recommend, NULLIF(r.response, 'null') AS response, r.body, to_timestamp(r.date / 1000) AS date, r.reviewer_name, r.helpfulness,
    COALESCE(json_agg(
      json_build_object('id', p.photo_id, 'url', p.url)
    ) FILTER (WHERE p.photo_id IS NOT NULL), '[]') AS photos
    FROM reviews_photos p
    RIGHT OUTER JOIN reviews r
    ON r.review_id = p.review_id
    WHERE r.product_id = ${product_id} AND r.reported = false
    GROUP BY r.review_id
    ${sort}
    LIMIT ${count}
    OFFSET ${offset}
    `;
    return db.query(query)
}

const getReviewsMeta = (product_id) => {
  const query = `
    SELECT ch.product_id::TEXT, json_object_agg(ra.rating, ra.count) AS ratings, json_object_agg(re.recommend, re.count) AS recommended, json_object_agg(ch.name, ch.pro) AS characteristics
    FROM (
      SELECT rating, COUNT(rating) AS count
      FROM reviews
      WHERE product_id = ${product_id}
      GROUP BY rating
      ) AS ra,
      (
        SELECT recommend, COUNT(recommend) AS count
        FROM reviews
        WHERE product_id = ${product_id}
        GROUP BY recommend
      ) AS re,
      (
        SELECT c.product_id AS product_id, c.name AS name, json_build_object('id', c.characteristic_id, 'value', AVG(rc.value)::TEXT) AS pro
        FROM characteristic_reviews rc
        RIGHT OUTER JOIN reviews r
        ON rc.review_id = r.review_id
        JOIN characteristics c
        ON rc.characteristic_id = c.characteristic_id
        WHERE r.product_id = ${product_id}
        GROUP BY c.characteristic_id
      ) AS ch
      GROUP BY ch.product_id
  `;
  return db.query(query);
};

const addReview = (body, date) => {

  const query = `

  `;

  return db.query(query);
}

const markHelpful = (id) => {
  const query = `

  `;

  return db.query(query);
};

const reportReview = (id) => {
  const query = `
  `;

  return db.query(query);
};

module.exports = {
  getReviews,
  getReviewsMeta,
  addReview,
  markHelpful,
  reportReview,
};



