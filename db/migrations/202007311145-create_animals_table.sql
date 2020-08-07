CREATE TABLE IF NOT EXISTS animals (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cuteness INT NOT NULL,
    species VARCHAR(255),
    location TEXT
);