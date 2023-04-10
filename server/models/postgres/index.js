const db = require('../../db/postgres/postgres.js')

const getReviews = (id, page, count, order) => {
  let sort;
  let offset = (page - 1) * count;
  // let partition = Math.ceil(id/100001);
  // if (partition > 9) {
  //   partition = 10;
  // }

  if (order === 'helpful') {
    sort = 'ORDER BY r.helpfulness DESC';
  } else if (order === 'newest') {
    sort = 'ORDER BY r.date DESC';
  } else {
    sort = 'ORDER BY r.helpfulness DESC, r.date DESC';
  }

  const query = `
  SELECT r.review_id::INT, r.rating, r.summary, r.recommend, NULLIF(r.response, 'null') AS response, r.body, to_timestamp(r.date / 1000) AS date, r.reviewer_name, r.helpfulness,
  COALESCE(p.photos, '[]') AS photos
  FROM reviews r
  LEFT JOIN (
    SELECT review_id, jsonb_agg(
      jsonb_build_object('id', photo_id, 'url', url)
    ) AS photos
    FROM reviews_photos
    WHERE photo_id IS NOT NULL
    GROUP BY review_id
  ) p ON r.review_id = p.review_id
  WHERE r.product_id = ${id} AND r.reported = false
  GROUP BY r.review_id, r.rating, r.summary, r.recommend, r.response, r.body, r.date, r.reviewer_name, r.helpfulness, p.photos
  ${sort}
  LIMIT ${count}
  OFFSET ${offset}
`;
    return db.query(query);
}

const getReviewsMeta = (product_id) => {
  // let partition = Math.ceil(product_id/100001);
  // if (partition > 9) {
  //   partition = 10;
  // }
  const query = `
   SELECT ch.product_id::TEXT,
  json_object_agg((ra.rating)::text, ra.count)::jsonb AS ratings,
  json_object_agg((re.recommend)::text, re.count)::jsonb AS recommended,
  json_object_agg(ch.name, ch.pro)::jsonb AS characteristics
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
SELECT c.product_id AS product_id, c.name AS name,
    json_build_object('id', c.characteristic_id, 'value', AVG(rc.value)::TEXT) AS pro
FROM characteristic_reviews rc
RIGHT OUTER JOIN reviews r ON rc.review_id = r.review_id
JOIN characteristics c ON rc.characteristic_id = c.characteristic_id
WHERE r.product_id = ${product_id}
GROUP BY c.characteristic_id
) AS ch
GROUP BY ch.product_id;
  `;
  return db.query(query);
};

const postForm = (body, date) => {
  let characteristics = JSON.stringify(body.characteristics);
  let photos = body.photos.map((photo) => `'${photo}'` );
  const query = `
    WITH ins1 AS (
      INSERT INTO reviews(product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
      VALUES (${body.product_id}, ${body.rating}, ${date}, '${body.summary}', '${body.body}', ${body.recommend}, false, '${body.name}', '${body.email}', 'null', 0)
      RETURNING review_id
      ), ins2 AS (
        INSERT INTO reviews_photos(review_id, url)
        SELECT t1.review_id, t2.urls
        FROM (
          VALUES ((SELECT review_id FROM ins1), array[${photos}]::text[])
        ) AS t1(review_id, url)
          CROSS JOIN unnest(t1.url) AS t2(urls)
      )
    INSERT INTO characteristic_reviews(characteristic_id, review_id, value)
    SELECT t4.key::INT, t3.review_id, t4.value::INT
      FROM (
        SELECT review_id FROM ins1
      ) AS t3,
      (
        SELECT * FROM json_each_text('${characteristics}')
      ) AS t4;
  `;
  return db.query(query);
}

const updateReviewHelpful = (id) => {
  const query = `
    UPDATE reviews SET helpfulness = helpfulness + 1 WHERE review_id = ${id}
  `;

  return db.query(query);
};

const reportReview = (id) => {
  const query = `
    UPDATE reviews SET reported = true WHERE review_id = ${id}
  `;

  return db.query(query);
};

module.exports = {
  getReviews,
  getReviewsMeta,
  postForm,
  updateReviewHelpful,
  reportReview,
};


// EXPLAIN SELECT r.review_id::INT, r.rating, r.summary, r.recommend, NULLIF(r.response, 'null') AS response, r.body, to_timestamp(r.date / 1000) AS date, r.reviewer_name, r.helpfulness,
// COALESCE(p.photos, '[]') AS photos
// FROM reviews r
// LEFT JOIN (
//   SELECT review_id, jsonb_agg(
//     jsonb_build_object('id', photo_id, 'url', url)
//   ) AS photos
//   FROM reviews_photos
//   WHERE photo_id IS NOT NULL
//   GROUP BY review_id
// ) p ON r.review_id = p.review_id
// WHERE r.product_id = 3745 AND r.reported = false
// GROUP BY r.review_id, r.rating, r.summary, r.recommend, r.response, r.body, r.date, r.reviewer_name, r.helpfulness, p.photos
// ORDER BY r.helpfulness DESC, r.date DESC
// LIMIT 5
// OFFSET 0

// 'WITH ins1 AS (
//   INSERT INTO reviews(product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
//   VALUES (1, 5, 1650867538924, 'test', 'tester', true, false, 'test', 'test@gmail.com', 'null', 0)
//   RETURNING review_id
//   ), ins2 AS (
//   INSERT INTO reviews_photos(review_id, url)
//   SELECT t1.review_id, t2.urls
//   FROM (
//     VALUES ((SELECT review_id FROM ins1), array['testurl', 'testurl2'])
//   ) AS t1(review_id, url)
//     CROSS JOIN unnest(t1.url) AS t2(urls)
//   )
// INSERT INTO characteristic_reviews(characteristic_id, review_id, value)
// SELECT t4.key::INT, t3.review_id, t4.value::INT
//   FROM (
//     SELECT review_id FROM ins1
//   ) AS t3,
//   (
//     SELECT * from json_each_text('{"1": 5,"2": 5,"3": 5,"4": 5}')
//   ) AS t4;
// '

// EXPLAIN SELECT ch.product_id::TEXT,
// json_object_agg((ra.rating)::text, ra.count)::jsonb AS ratings,
// json_object_agg((re.recommend)::text, re.count)::jsonb AS recommended,
// json_object_agg(ch.name, ch.pro)::jsonb AS characteristics
// FROM (
// SELECT rating, COUNT(rating) AS count
// FROM reviews
// WHERE product_id = 3745
// GROUP BY rating
// ) AS ra,
// (
// SELECT recommend, COUNT(recommend) AS count
// FROM reviews
// WHERE product_id = 3745
// GROUP BY recommend
// ) AS re,
// (
// SELECT c.product_id AS product_id, c.name AS name,
//   json_build_object('id', c.characteristic_id, 'value', AVG(rc.value)::TEXT) AS pro
// FROM characteristic_reviews rc
// RIGHT OUTER JOIN reviews r ON rc.review_id = r.review_id
// JOIN characteristics c ON rc.characteristic_id = c.characteristic_id
// WHERE r.product_id = 3745
// GROUP BY c.characteristic_id
// ) AS ch
// GROUP BY ch.product_id;

