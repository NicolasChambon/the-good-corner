DROP TABLE IF EXISTS AD;

CREATE TABLE AD (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    TITLE TEXT,
    DESCRIPTION TEXT,
    AUTHOR TEXT,
    PRICE INT,
    PICTURE_URL TEXT,
    CITY TEXT,
    CREATED_AT DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO AD (ID, TITLE, DESCRIPTION, AUTHOR, PRICE, PICTURE_URL, CITY, CREATED_AT) 
    VALUES (1, 'Vélo rouge', 'Vélo en mauvais état mais pas cher', 'Toto Mobile', 100, 'https://via.placeholder.com/150', 'Lyon', '2021-01-01'),
           (2, 'Vélo bleu', 'Vélo en bon état', 'Papou', 16, 'https://via.placeholder.com/150', 'Sallanches', '2021-01-02'),
           (3, 'Vélo vert', 'Vélo en très bon état', 'Toto Mobile', 300, 'https://via.placeholder.com/150', 'Marseille', '2022-01-03'),
           (4, 'Vélo jaune', 'Vélo neuf', 'Papou', 2, 'https://via.placeholder.com/150', 'Bordeaux', '2020-01-04'),
           (5, 'Voiture orange', 'Voiture en très bon état', 'Bob Mercer', 500, 'https://via.placeholder.com/150', 'Limoges', '2021-01-05'),
           (6, 'Vélo violet', 'Vélo en très bon état', 'Papou', 10, 'https://via.placeholder.com/150', 'Paris', '2023-01-06'),
           (7, 'Vélo rose', 'Vélo en très bon état', 'Bob Mercer', 700, 'https://via.placeholder.com/150', 'Lyon', '2021-01-07'),
           (8, 'Vélo noir', 'Vélo en très bon état', 'Papou', 800, 'https://via.placeholder.com/150', 'Paris', '2021-01-08'),
           (9, 'Vélo blanc', 'Vélo en très bon état', 'Toto Mobile', 900, 'https://via.placeholder.com/150', 'Lille', '2021-01-09'),
           (10, 'Vélo marron', 'Vélo en très bon état', 'Papou', 1000, 'https://via.placeholder.com/150', 'Lille', '2021-01-10'),
           (11, 'Vélo gris', 'Vélo en très bon état', 'Bob Mercer', 1100, 'https://via.placeholder.com/150', 'Lyon', '2021-01-11'),
           (12, 'Chaussure rouge', 'Chaussure en très bon état', 'Papou', 1200, 'https://via.placeholder.com/150', 'Paris', '2021-01-12'),
           (13, 'Vélo bleu', 'Vélo en très bon état', 'Bob Mercer', 1300, 'https://via.placeholder.com/150', 'Marseille', '2021-10-01'),
           (14, 'Vélo vert', 'Vélo en très bon état', 'Papou', 39, 'https://via.placeholder.com/150', 'Bordeaux', '2021-10-01'),
           (15, 'Vélo jaune', 'Vélo en très bon état', 'Bob Mercer', 1500, 'https://via.placeholder.com/150', 'Paris', '2021-01-15'),
           (16, 'Voiture orange', 'Voiture en très bon état', 'Papou', 23, 'https://via.placeholder.com/150', 'Marseille', '2021-01-16'),
           (17, 'Vélo violet', 'Vélo en très bon état', 'Ouioui', 233, 'https://via.placeholder.com/150', 'Lyon', '2021-01-17'),
           (18, 'Vélo rose', 'Vélo en très bon état', 'Papou', 1800, 'https://via.placeholder.com/150', 'Paris', '2021-01-18'),
           (19, 'Vélo noir', 'Vélo en très bon état', 'Ouioui', 1900, 'https://via.placeholder.com/150', 'Lille', '2021-01-19'),
           (20, 'Casserole blanc', 'Casserole en très bon état', 'Papou', 10, 'https://via.placeholder.com/150', 'Lille', '2023-10-01');

SELECT * FROM AD;

SELECT * FROM AD WHERE CITY = 'Marseille';

-- drop all ads with price > 40
DELETE FROM AD WHERE PRICE > 40;
SELECT * FROM AD;

-- mettre à jour les annonces du 1er septembre avec un prix à 0
UPDATE AD SET PRICE = 0 WHERE strftime('%m', CREATED_AT) = '09' AND strftime('%d', CREATED_AT) = '01';
SELECT * FROM AD;

-- afficher la moyenne des prix des annonces de paris
SELECT AVG(PRICE) FROM AD WHERE CITY = 'Paris';

-- afficher la moyenne des prix des annonces par ville
SELECT CITY, AVG(PRICE) FROM AD GROUP BY CITY;
