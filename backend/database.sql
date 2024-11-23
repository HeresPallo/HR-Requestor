CREATE DATABASE hrrequest;

CREATE TABLE nextofkinsubmission(
 id SERIAL PRIMARY KEY,
 employee_number VARCHAR(7) NOT NULL,
 type VARCHAR(9) NOT NULL,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  relationship VARCHAR(100) NOT NULL,
  date_of_birth DATE NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  image_path VARCHAR(255)
);

CREATE TABLE fibersubmissions(
 id SERIAL PRIMARY KEY,
 employee_name VARCHAR(255) NOT NULL,
 office_address VARCHAR(255) NOT NULL,
  mobile VARCHAR(255) NOT NULL,
  fiber VARCHAR(255) NOT NULL,
  sex VARCHAR(6) NOT NULL,
  identification VARCHAR(255) NOT NULL,
  id_number VARCHAR(20) NOT NULL,
  name_address VARCHAR(255) NOT NULL,
  designation VARCHAR(255) NOT NULL,
  device VARCHAR(255) NOT NULL,
  device_cost VARCHAR(255) NOT NULL,
  deduction VARCHAR(255) NOT NULL,
  declaration BOOLEAN NOT NULL
);

CREATE TABLE phoneclaim(
 id SERIAL PRIMARY KEY,
 employee_name VARCHAR(255) NOT NULL,
 department VARCHAR(255) NOT NULL,
  payment VARCHAR(255) NOT NULL,
  date VARCHAR(255) NOT NULL,
  band VARCHAR(100) NOT NULL
);

CREATE TABLE insurance(
 id SERIAL PRIMARY KEY,
 employer VARCHAR(255) NOT NULL,
 applicant VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  date_of_birth VARCHAR(255) NOT NULL,
  sex VARCHAR(6) NOT NULL,
  mobile VARCHAR(255) NOT NULL,
  dependent VARCHAR(200) NOT NULL,
  dependent_two VARCHAR(200),
  dependent_three VARCHAR(200),
  dependent_four VARCHAR(200),
  d_date VARCHAR(255) NOT NULL,
  declaration BOOLEAN NOT NULL,
  image VARCHAR(255) NOT NULL,
  image_two VARCHAR(255),
  image_three VARCHAR(255),
  image_four VARCHAR(255)
);


CREATE TABLE idcard(
 id SERIAL PRIMARY KEY,
 cardtype VARCHAR(255) NOT NULL,
 department VARCHAR(255) NOT NULL,
  employee_name VARCHAR(255) NOT NULL,
  level VARCHAR(255) NOT NULL,
  location VARCHAR(50) NOT NULL,
  image VARCHAR(255)
);

INSERT INTO phoneclaim (employee_name, department, payment, date, band)
VALUES ('Alimamy Bangura', 'Human Resource', 'Bi-Annual Phone Claim', '16-11-2024','Band 5 (€300) (Managers / Asst. Managers)');