DROP TABLE IF EXISTS token CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;


CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(50) UNIQUE NOT NULL ,
    password VARCHAR(255) NOT NULL,
    initial_balance DECIMAL(19,4),
    current_balance DECIMAL(19,4),
    currency VARCHAR(3) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE transactions (
    transaction_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    reference VARCHAR(255),
    category VARCHAR(255),
    amount DECIMAL(19,4) NOT NULL,
    PRIMARY KEY (transaction_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
)