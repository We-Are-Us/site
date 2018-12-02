CREATE TABLE role
(
  role_id serial PRIMARY KEY,
  role_name VARCHAR (255) UNIQUE NOT NULL
);

CREATE TABLE account
(
  id serial PRIMARY KEY,
  username VARCHAR (50) UNIQUE NOT NULL,
  role_id integer
);

INSERT INTO role
  (role_name)
VALUES
  ('user'),
  ('practitioner'),
  ('admin');

CREATE TABLE practitioner
(
  practitioner_id serial PRIMARY KEY,
  account_id integer NOT NULL,
  practice_name VARCHAR (50),
  email VARCHAR(100) NOT NULL,
  phone_number VARCHAR(30) NOT NULL,
  plan_id VARCHAR(50) NOT NULL,
  stripe_id VARCHAR(100),
  auth0_id VARCHAR(100),
  mailchimp_id VARCHAR(100)
);

ALTER TABLE "practitioner"
ADD COLUMN first_name VARCHAR
(50) NOT NULL;

ALTER TABLE "practitioner"
ADD COLUMN last_name VARCHAR
(50) NOT NULL;

