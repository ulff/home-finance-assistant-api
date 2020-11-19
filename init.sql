CREATE TABLE users(
  id UUID PRIMARY KEY,
  email VARCHAR (128) UNIQUE NOT NULL,
  firstname VARCHAR (32) NOT NULL,
  lastname VARCHAR (64) NOT NULL
);

CREATE TABLE accounts(
  id UUID PRIMARY KEY,
  owner UUID NOT NULL,
  number VARCHAR(32),
  label VARCHAR(32) NOT NULL,
  CONSTRAINT accounts_owner_fkey FOREIGN KEY (owner)
    REFERENCES users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
);

CREATE TABLE expenses(
  id UUID PRIMARY KEY,
  account UUID NOT NULL,
  member UUID NOT NULL,
  amount_unit INTEGER NOT NULL,
  amount_fractional INTEGER NOT NULL,
  performed_on DATE NOT NULL,
  saved_on DATE NOT NULL,
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
