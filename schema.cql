DROP KEYSPACE IF EXISTS sdc;
CREATE KEYSPACE sdc WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor' : 1 };

USE sdc;

//one product to many reviews

CREATE TABLE IF NOT EXISTS reviews (
  product_id int,
  review_id int,
  rating int,
  summary text,
  recommend boolean,
  response text,
  body text,
  date int,
  reviewer_name text,
  reviewer_email text,
  helpfulness int,
  reported boolean,
  photos map<int, text>,
  characteristics map<int, int>,
  PRIMARY KEY (review_id)
)