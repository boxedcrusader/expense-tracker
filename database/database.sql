CREATE DATABASE etracker;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    user_password VARCHAR(255)
);

CREATE TABLE categories (
    categorie_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    category_id INTEGER REFERENCES categories(categorie_id),
    amount DECIMAL(10, 2) NOT NULL,
    expense_date DATE NOT NULL
);

INSERT INTO categories (name) VALUES
    ('Groceries'),
    ('Leisure'),
    ('Electronics'),
    ('Utilities'),
    ('Clothing'),
    ('Health'),
    ('Others');


INSERT INTO expenses (user_id, category_id, amount, expense_date) VALUES
    (1, 1, 50.00, '2024-10-01'),  
    (1, 2, 30.00, '2024-10-02'),  
    (1, 3, 200.00, '2024-10-03'), 
    (1, 4, 75.00, '2024-10-04'),   
    (1, 5, 100.00, '2024-10-05'),  
    (1, 6, 60.00, '2024-10-06'),  
    (1, 7, 40.00, '2024-10-07');  
