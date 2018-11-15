CREATE TABLE role(
 role_id serial PRIMARY KEY,
 role_name VARCHAR (255) UNIQUE NOT NULL
);

CREATE TABLE account(
  id serial PRIMARY KEY,
  username VARCHAR (50) UNIQUE NOT NULL,
  role_id integer
);

INSERT INTO role (role_name)
VALUES
  ('user'),
  ('practitioner'),
  ('admin');
