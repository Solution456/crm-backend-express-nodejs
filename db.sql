create TABLE users(
    User_id SERIAL PRIMARY KEY,
    User_password VARCHAR(50) NOT NULL,
    User_Role VARCHAR(50) NOT NULL,
);

create TABLE operators(
    Operator_id SERIAL PRIMARY KEY,
    Operator_Card_Number VARCHAR(50),
    User_id INTEGER
    FOREIGN KEY (User_id) REFERENCES users (User_id)

)

create TABLE customers(
    customer_id SERIAL PRIMARY KEY NOT NULL,
    customer_name VARCHAR(100),
    customer_phone VARCHAR(50),
    customer_address VARCHAR(50),
    User_id INTEGER,
    FOREIGN KEY (User_id) REFERENCES users (User_id)
)

create TABLE orders(
    order_id SERIAL PRIMARY KEY NOT NULL,
    customer_id INTEGER NOT NULL,
    order_date date,
    order_serial VARCHAR(10),
    order_status VARCHAR(15)
)

create TABLE products(
    product_id SERIAL PRIMARY KEY NOT NULL,
    product_name VARCHAR(50),
    product_cost real,
    product_total INTEGER
)

create TABLE selectProducts(
    id SERIAL PRIMARY KEY NOT NULL,
    product_id INTEGER,
    order_id INTEGER,
    FOREIGN KEY (product_id) REFERENCES products (product_id)
    FOREIGN KEY (order_id) REFERENCES orders (order_id)
)