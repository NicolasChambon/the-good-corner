DROP TABLE IF EXISTS AD;
DROP TABLE IF EXISTS CATEGORY;
DROP TABLE IF EXISTS TAG;
DROP TABLE IF EXISTS AD_TAG;

PRAGMA foreign_keys = ON;

CREATE TABLE AD (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    TITLE TEXT,
    DESCRIPTION TEXT,
    AUTHOR TEXT,
    PRICE INT,
    PICTURE_URL TEXT,
    CITY TEXT,
    CREATED_AT DATETIME DEFAULT CURRENT_TIMESTAMP,
    CATEGORY_ID INTEGER NOT NULL,
    FOREIGN KEY (CATEGORY_ID) REFERENCES CATEGORY(ID)
);

CREATE TABLE CATEGORY (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    NAME TEXT
);

CREATE TABLE TAG (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    NAME TEXT
);

CREATE TABLE AD_TAG (
    AD_ID INTEGER,
    TAG_ID INTEGER,
    FOREIGN KEY (AD_ID) REFERENCES AD(ID),
    FOREIGN KEY (TAG_ID) REFERENCES TAG(ID)
);

INSERT INTO CATEGORY (ID, NAME) VALUES (1, 'Autre'), (2, 'Vehicule'), (3, 'Hifi');
INSERT INTO TAG (ID, NAME) VALUES (1, 'Neuf'), (2, 'Soldé');
INSERT INTO AD (ID, TITLE, DESCRIPTION, AUTHOR, PRICE, PICTURE_URL, CITY, CREATED_AT, CATEGORY_ID)
    VALUES
    (1, 'Vélo', 'Vélo en bon état', 'Jean', 50, 'https://www.google.com', 'Paris', '2021-09-01', 1),
    (2, 'Voiture', 'Voiture en bon état', 'Jean', 24, 'https://www.google.com', 'Marseille', '2021-09-01', 2),
    (3, 'Télé', 'Télé en bon état', 'Jean', 100, 'https://www.google.com', 'Paris', '2021-09-01', 3),
    (4, 'Vélo', 'Vélo en bon état', 'Jean', 50, 'https://www.google.com', 'Paris', '2021-09-02', 1),
    (5, 'Voiture', 'Voiture en bon état', 'Jean', 65, 'https://www.google.com', 'Marseille', '2021-09-02', 2),
    (6, 'Télé', 'Télé en bon état', 'Jean', 100, 'https://www.google.com', 'Paris', '2021-09-02', 3),
    (7, 'Vélo', 'Vélo en bon état', 'Jean', 50, 'https://www.google.com', 'Paris', '2021-09-03', 1),
    (8, 'Voiture', 'Voiture en bon état', 'Jean', 5000, 'https://www.google.com', 'Marseille', '2021-09-03', 2),
    (9, 'Télé', 'Télé en bon état', 'Jean', 100, 'https://www.google.com', 'Paris', '2021-09-03', 3);
INSERT INTO AD_TAG (AD_ID, TAG_ID) VALUES (1, 1), (2, 2), (3, 1), (4, 2), (5, 1), (6, 2), (7, 1), (8, 2), (9, 1);

SELECT AD.*, CATEGORY.NAME AS CATEGORY_NAME 
    FROM AD 
    JOIN CATEGORY ON AD.CATEGORY_ID = CATEGORY.ID;

SELECT AD_TAG.*, AD.TITLE, TAG.NAME 
    FROM AD_TAG 
    JOIN AD ON AD_TAG.AD_ID = AD.ID 
    JOIN TAG ON AD_TAG.TAG_ID = TAG.ID;

-- SELECT * FROM AD;

-- SELECT * FROM AD WHERE CITY = 'Marseille';

-- -- drop all ads with price > 40
-- DELETE FROM AD WHERE PRICE > 40;
-- SELECT * FROM AD;

-- -- mettre à jour les annonces du 1er septembre avec un prix à 0
-- UPDATE AD SET PRICE = 0 WHERE strftime('%m', CREATED_AT) = '09' AND strftime('%d', CREATED_AT) = '01';
-- SELECT * FROM AD;

-- -- afficher la moyenne des prix des annonces de paris
-- SELECT AVG(PRICE) FROM AD WHERE CITY = 'Paris';

-- -- afficher la moyenne des prix des annonces par ville
-- SELECT CITY, AVG(PRICE) FROM AD GROUP BY CITY;
