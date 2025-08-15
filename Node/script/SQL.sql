CREATE TABLE users
(
    id           SERIAL PRIMARY KEY,
    email        VARCHAR(255) NOT NULL UNIQUE,
    password     VARCHAR(255) NOT NULL,
    role         VARCHAR(255) NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    attributes   JSON,
    meta         JSON,
    created_at   TIMESTAMP    NOT NULL,
    updated_at   TIMESTAMP
);

CREATE TABLE user_otps
(
    id           SERIAL PRIMARY KEY,
    email        VARCHAR(255) NOT NULL,
    otp          VARCHAR(6) NOT NULL,
    expired_at   TIMESTAMP    NOT NULL,
    user_id     INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE categories
(
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    attributes JSON,
    meta       JSON,
    created_at TIMESTAMP    NOT NULL,
    updated_at TIMESTAMP
);

CREATE TABLE products
(
    id          SERIAL PRIMARY KEY,
    category_id INTEGER,
    name        VARCHAR(255)   NOT NULL,
    price       DECIMAL(10, 2) NOT NULL,
    old_price   DECIMAL(10, 2),
    status      VARCHAR(255),
    sku         VARCHAR(255),
    description TEXT,
    quantity    INT DEFAULT 0,
    rating      FLOAT,
    attributes  JSON,
    meta        JSON,
    created_at  TIMESTAMP      NOT NULL,
    updated_at  TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories (id)
);

CREATE TABLE product_carts
(
    id          SERIAL,
    user_id INTEGER,
    product_id  INTEGER,
    quantity INTEGER,
    attributes  JSON,
    meta        JSON,
    created_at  TIMESTAMP      NOT NULL,
    updated_at  TIMESTAMP,
    PRIMARY KEY (user_id, product_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE orders
(
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL,
    status          VARCHAR(255) NOT NULL,
    total_amount    DECIMAL(10, 2) NOT NULL,
    attributes      JSON,
    meta            JSON,
    created_at      TIMESTAMP NOT NULL,
    updated_at      TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE order_items
(
    id          SERIAL PRIMARY KEY,
    order_id    INTEGER NOT NULL,
    product_id  INTEGER NOT NULL,
    quantity    INTEGER NOT NULL,
    price       DECIMAL(10, 2) NOT NULL,
    attributes  JSON,
    meta        JSON,
    created_at  TIMESTAMP NOT NULL,
    updated_at  TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders (id),
    FOREIGN KEY (product_id) REFERENCES products (id)
);
