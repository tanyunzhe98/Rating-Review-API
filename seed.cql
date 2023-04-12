
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