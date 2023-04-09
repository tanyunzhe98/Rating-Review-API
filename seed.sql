
\c sdc;

COPY products FROM '/Users/yunzhetan/Downloads/product.csv' DELIMITER ',' CSV HEADER;

COPY reviews FROM '/Users/yunzhetan/Downloads/reviews.csv' DELIMITER ',' CSV HEADER;

COPY characteristics FROM '/Users/yunzhetan/Downloads/characteristics.csv' DELIMITER ',' CSV HEADER;

COPY characteristic_reviews
FROM '/Users/yunzhetan/Downloads/characteristic_reviews.csv'
DELIMITER ',' CSV HEADER;

COPY reviews_photos
FROM '/Users/yunzhetan/Downloads/reviews_photos.csv'
DELIMITER ',' CSV HEADER;

SELECT setval('reviews_review_id_seq', (SELECT max(review_id) FROM reviews));
SELECT setval('reviews_photos_photo_id_seq', (SELECT max(photo_id) FROM reviews_photos));
SELECT setval('characteristic_reviews_id_seq', (SELECT max(id) FROM characteristic_reviews));