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

ALTER TABLE perdiem ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE perdiem
RENAME COLUMN totalAmount to amountTotal;

-- different alter
ALTER TABLE perdiem
ALTER COLUMN totalDays INT;

status VARCHAR(50) DEFAULT 'pending',

ALTER TABLE absence
DROP COLUMN status;

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

CREATE TABLE perdiem(
 id SERIAL PRIMARY KEY,
 employee_name VARCHAR(255) NOT NULL,
 department VARCHAR(255) NOT NULL,
  depart_date VARCHAR(255) NOT NULL,
  return_date VARCHAR(255) NOT NULL,
  purpose VARCHAR(255) NOT NULL,
  level VARCHAR(255) NOT NULL,
  filing_date VARCHAR(200) NOT NULL,
  travel_names VARCHAR(200),
  purpose_two VARCHAR(200),
  mode VARCHAR(200),
  route_from VARCHAR(255) NOT NULL,
  est_depart VARCHAR(255) NOT NULL,
  route_via VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  est_arrival VARCHAR(255) NOT NULL,
  mobile VARCHAR(255) NOT NULL,
  return_names VARCHAR(255) NOT NULL,
  est_depart2 VARCHAR(255) NOT NULL,
  est_arrival2 VARCHAR(255) NOT NULL,
  sign_date VARCHAR(255) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending'
);

CREATE VIEW total_requests_view AS
SELECT 
    id,
    'Per Diem' AS perdiem,
    created_at,
    status -- Add the new column here
FROM perdiem
UNION ALL
    SELECT 
        id,
        'Next of Kin' AS nextofkin,
        created_at,
        status -- Assume 'status' is in your `nextofkinsubmissions` table
    FROM nextofkinsubmissions
    UNION ALL
    SELECT 
        id,
        'Absence' AS absence,
        created_at,
        status -- Assume 'status' is in your `nextofkinsubmissions` table
    FROM absence
    UNION ALL
    SELECT 
        id,
        'Phone Claim' AS phoneclaim,
        created_at,
        status -- Assume 'status' is in your `phoneclaimsubmissions` table
    FROM phoneclaim
    UNION ALL
    SELECT 
        id,
        'Insurance' AS insurance,
        created_at,
        status -- Assume 'status' is in your `insurancesubmissions` table
    FROM insurance
    UNION ALL
    SELECT 
        id,
        'ID Card' AS form_name,
        created_at,
        status -- Assume 'status' is in your `idcardsubmissions` table
    FROM idcard
	UNION ALL
	SELECT 
    id,
    'Fiber' AS fiber,
    created_at,
    status -- Add the new column here
FROM fibersubmissions
combined_requests
ORDER BY created_at DESC;


CREATE TABLE absence(
 id SERIAL PRIMARY KEY,
 employee_name VARCHAR(255) NOT NULL,
  employee_number VARCHAR(255) NOT NULL,
  department VARCHAR(255) NOT NULL,
  start_date VARCHAR(255) NOT NULL,
  end_date VARCHAR(255) NOT NULL,
  absence VARCHAR(255) NOT NULL
);