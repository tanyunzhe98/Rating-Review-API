
DROP DATABASE IF EXISTS sdc;

CREATE DATABASE sdc;

\c sdc;

CREATE TABLE IF NOT EXISTS products (
  product_id BIGSERIAL NOT NULL PRIMARY KEY,
  name TEXT,
  slogan TEXT,
  description TEXT,
  category TEXT,
  default_price INT
);

CREATE TABLE IF NOT EXISTS reviews (
  review_id BIGSERIAL NOT NULL PRIMARY KEY,
  product_id INT REFERENCES products(product_id),
  rating INT NOT NULL,
  date BIGINT NOT NULL,
  summary TEXT NOT NULL,
  body TEXT NOT NULL,
  recommend BOOLEAN NOT NULL,
  reported BOOLEAN NOT NULL,
  reviewer_name VARCHAR(100) NOT NULL,
  reviewer_email TEXT NOT NULL,
  response TEXT NOT NULL,
  helpfulness INT NOT NULL
);

-- CREATE TABLE IF NOT EXISTS photos (
--   photo_id BIGSERIAL NOT NULL PRIMARY KEY,
--   style INT NOT NULL,
--   url TEXT NOT NULL,
--   thumbnail TEXT NOT NULL
-- );

CREATE TABLE IF NOT EXISTS characteristics (
  characteristic_id BIGSERIAL NOT NULL PRIMARY KEY,
  product_id INT NOT NULL REFERENCES products(product_id),
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS reviews_photos (
  photo_id BIGSERIAL NOT NULL PRIMARY KEY,
  review_id INT NOT NULL REFERENCES reviews(review_id),
  url TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS characteristic_reviews (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  characteristic_id INT NOT NULL REFERENCES characteristics(characteristic_id),
  review_id INT NOT NULL REFERENCES reviews(review_id),
  value INT NOT NULL
);

CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_reviews_reported ON reviews(reported);
CREATE INDEX idx_characteristics_product_id ON characteristics(product_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_characteristic_reviews_review_id ON characteristic_reviews(review_id);
CREATE INDEX idx_characteristic_reviews_characteristic_id ON characteristic_reviews(characteristic_id);
CREATE INDEX idx_characteristics_characteristic_id ON characteristics(characteristic_id);
CREATE INDEX idx_reviews_recommend ON reviews(recommend);
CREATE INDEX idx_review_userId ON reviews(review_id);
CREATE INDEX idx_photo_reviewId ON reviews_photos(review_id);
CREATE INDEX idx_photo_photo_id ON reviews_photos(photo_id);
CREATE INDEX idx_reviews_date ON reviews(date);
CREATE INDEX idx_reviews_helpfulness ON reviews(helpfulness);

