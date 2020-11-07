CREATE TABLE users(
  id uuid PRIMARY KEY,
  email VARCHAR (128) UNIQUE NOT NULL,
  password VARCHAR (128) UNIQUE NOT NULL,
  firstname VARCHAR (32) UNIQUE NOT NULL,
  lastname VARCHAR (64) UNIQUE NOT NULL
);

CREATE TABLE accounts(
  id uuid PRIMARY KEY,
  owner uuid NOT NULL,
  number VARCHAR(32),
  label VARCHAR(32) NOT NULL,
  CONSTRAINT accounts_owner_fkey FOREIGN KEY (owner)
    REFERENCES users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
);

CREATE TABLE expenses(
  id uuid PRIMARY KEY,
  account uuid NOT NULL,
  member uuid NOT NULL,
  amount_unit INTEGER NOT NULL,
  amount_fractional INTEGER NOT NULL,
  performed_on DATE NOT NULL,
  maingroup VARCHAR(32) NOT NULL,
  subgroup VARCHAR(32) NOT NULL,
  label VARCHAR(64) DEFAULT NULL,
  tags VARCHAR(128) DEFAULT NULL,
  CONSTRAINT expenses_account_fkey FOREIGN KEY (account)
    REFERENCES accounts (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE,
  CONSTRAINT expenses_member_fkey FOREIGN KEY (member)
      REFERENCES users (id) MATCH SIMPLE
      ON UPDATE NO ACTION
      ON DELETE CASCADE
);
