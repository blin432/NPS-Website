DROP DATABASE IF EXISTS nps_db;
CREATE DATABASE nps_db;
USE nps_db;

CREATE TABLE selections
(
	id int NOT NULL,
	checked BOOLEAN NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO selections (id, checked) VALUES (8, false), (9, false), (10, false), (11, false), (12, false), (13, false), (14, false), (15, false), (16, false), (17, false), (18, false), (19, false), (20, false), (21, false), (22, false), (23, false), (24, false), (25, false), (26, false), (27, false), (28, false), (29, false);

SELECT * FROM selections;