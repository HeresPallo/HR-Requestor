import express from "express";
import pg from "pg";
import cors from "cors";
import multer from "multer";
import bodyParser from "body-parser";

const app = express();
const port = 5001;


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = new pg.Client({
    user: "postgres",
    password: "1nointrO1",
    host: "localhost",
    port: 5432,
    database: "hrrequest"
  });
  db.connect();

// Image Upload Configuration with Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });

  const upload = multer({ storage: storage });
//ROUTES//

app.post("/nextofkin", upload.single('image'), async(req, res) =>{
    try {
        const { employee_number, nok_type, name, address, relationship, date_of_birth, phone_number} = req.body;
        const image_path = req.file ? req.file.path : null;

 // Check if the employee has already submitted a primary or secondary type
 const existingRecords = await db.query(
    `SELECT * FROM nextofkinsubmissions WHERE employee_number = $1 AND (nok_type = 'Primary' OR nok_type = 'Secondary')`,
    [employee_number]
  );

  // Check if the same type already exists
  const typeExists = existingRecords.rows.find(record => record.nok_type === nok_type);

  if (typeExists) {
    return res.status(400).json({ error: `You have already submitted your ${nok_type} Next of Kin` });
  }

        const newNextOfKin = await db.query("INSERT INTO nextofkinsubmissions (employee_number, nok_type, name, address, relationship, date_of_birth, phone_number,image_path) VALUES ($1, $2, $3, $4, $5, $6, $7,$8) RETURNING *",
             [employee_number, nok_type, name, address, relationship, date_of_birth, phone_number, image_path]);
        res.status(201).json({message:'Next of Kin information added successfully',data: newNextOfKin.rows[0] });
    } catch (err) {
        console.log(err.message);
    }
})



//Get All Next of Kins//
app.get("/nextofkin", async(req, res) =>{
    try {
        const allNextOfKins = await db.query("SELECT * FROM nextofkinsubmissions");
        res.json(allNextOfKins.rows);
    } catch (err) {
        console.log(err.message);
    }
})



//Get a Next of Kin//
app.get("/nextofkin/:id", async(req, res) =>{
    try {
        const { id } = req.params;
        const nextOfKin = await db.query("SELECT * FROM nextofkinsubmissions WHERE id = $1", [id]);

        res.json(nextOfKin.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
})

//Update a Next of Kin//
// app.put("/nextofkin/:id", async(req, res) =>{
//     try {
//         const { id } = req.params;
//         const {employee_number, nok_type, name, address, relationship, date_of_birth, phone_number, image_path} = req.body;
//         const updateNextOfKin = await db.query("UPDATE nextofkinsubmissions SET name = $1, address = $2, relationship = $3, date_of_birth = $4, phone_number = $5, image_path = $6 WHERE id = $7 RETURNING *", [employee_number, nok_type, name, address, relationship, date_of_birth, phone_number, image_path, id]);

//         res.json("Next of Kin updated");
//     } catch (err) {
//         console.log(err.message);
//     }
// })

//Get All Fiber Submissions//
app.get("/fiber", async(req, res) =>{
    try {
        const allFiberSubmissions = await db.query("SELECT * FROM fibersubmissions");
        res.json(allFiberSubmissions.rows);
    } catch (err) {
        console.log(err.message);
    }
})

//Submit Fiber Form//
app.post("/fiber", async(req,res) => {
    try {
        const { employee_name, office_address, mobile, fiber, sex, identification, id_number, name_address, designation, device, device_cost, deduction, declaration, email} = req.body;
        const newFiberSubmission = await db.query("INSERT INTO fibersubmissions (employee_name, office_address, mobile, fiber, sex, identification, id_number, name_address, designation, device, device_cost, deduction, declaration,email) VALUES ($1, $2, $3, $4, $5, $6, $7,$8, $9, $10, $11, $12, $13,$14) RETURNING *",
            [employee_name, office_address, mobile, fiber, sex, identification, id_number, name_address, designation, device, device_cost, deduction, declaration,email]);
            res.status(201).json({message:'Fiber submission successful',data: newFiberSubmission.rows[0] });
    } catch (err) {
        console.log(err.message);
    }
    })

    //Get All Phone Claim Submissions//
app.get("/phoneclaim", async(req, res) =>{
    try {
        const allPhoneClaims = await db.query("SELECT * FROM phoneclaim");
        res.json(allPhoneClaims.rows);
    } catch (err) {
        console.log(err.message);
    }
})

//Submit Phone Claim//
app.post("/phoneclaim", async(req,res) => {
    try {
        const { employee_name, department, payment, date, band} = req.body;
        const newPhoneClaim = await db.query("INSERT INTO phoneclaim (employee_name, department, payment, date, band) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [employee_name, department, payment, date, band]);
            res.status(201).json({message:'Phone Claim submission successful',data: newPhoneClaim.rows[0] });
    } catch (err) {
        console.log(err.message);
    }
    })

//Get All Insurance Submissions//
app.get("/insurance", async(req, res) =>{
    try {
        const allInsurance = await db.query("SELECT * FROM insurance");
        res.json(allInsurance.rows);
    } catch (err) {
        console.log(err.message);
    }
})

//Submit Insurance//
app.post("/insurance", upload.single('image'), async(req,res) => {
    try {
        const {employer, applicant, address, date_of_birth, sex, mobile, dependent, d_date, declaration} = req.body;
        const image = req.file ? req.file.path : null;
        const newInsurance = await db.query("INSERT INTO insurance (employer, applicant, address, date_of_birth, sex, mobile, dependent, d_date, declaration, image) VALUES ($1, $2, $3, $4, $5, $6, $7,$8, $9, $10) RETURNING *",
            [employer, applicant, address, date_of_birth, sex, mobile, dependent, d_date, declaration, image]);
            res.status(201).json({message:'Insurance submission successful',data: newInsurance.rows[0] });
    } catch (err) {
        console.log(err.message);
    }
    })


//Get All ID Card Submissions//
app.get("/idcard", async(req, res) =>{
    try {
        const allIDCards = await db.query("SELECT * FROM idcard");
        res.json(allIDCards.rows);
    } catch (err) {
        console.log(err.message);
    }
})

//Submit ID Card//
app.post("/idcard", upload.single('image'), async(req,res) => {
    try {
        const {cardtype, department, employee_name, level, location} = req.body;
        const image = req.file ? req.file.path : null;
        const newInsurance = await db.query("INSERT INTO idcard (cardtype, department, employee_name, level, location, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [cardtype, department, employee_name, level, location, image]);
            res.status(201).json({message:'ID Card submission successful',data: newInsurance.rows[0] });
    } catch (err) {
        console.log(err.message);
    }
    })

//Get All Submissions//
app.get("/totalrequests", async(req, res) =>{
    try {
        const query = `
          SELECT 
    (SELECT COUNT(*) FROM nextofkinsubmissions) AS next_of_kin_count,
    (SELECT COUNT(*) FROM phoneclaim) AS phone_claim_count,
    (SELECT COUNT(*) FROM insurance) AS insurance_count,
    (SELECT COUNT(*) FROM fibersubmissions) AS fiber_count,
    (SELECT COUNT(*) FROM idcard) AS id_cards_count,
    (
        (SELECT COUNT(*) FROM nextofkinsubmissions) +
        (SELECT COUNT(*) FROM phoneclaim) +
        (SELECT COUNT(*) FROM insurance) +
        (SELECT COUNT(*) FROM fibersubmissions) +
        (SELECT COUNT(*) FROM idcard) 
    ) AS total_requests;
        `;
        const result = await db.query(query);
        res.json(result.rows[0]); // Send the result as JSON
      } catch (error) {
        console.error('Error fetching total requests:', error);
        res.status(500).send('Internal Server Error');
      }
})

//Get Submission Dates//
app.get("/requestdates", async(req, res) =>{
    try {
        const query = `
          SELECT 'nextofkinsubmissions' AS requestdates, MAX(created_at) AS last_request_date FROM nextofkinsubmissions
UNION ALL
SELECT 'phoneclaim', MAX(created_at) FROM phoneclaim
UNION ALL
SELECT 'insurance', MAX(created_at) FROM insurance
UNION ALL
SELECT 'fibersubmissions', MAX(created_at) FROM fibersubmissions
UNION ALL
SELECT 'idcard', MAX(created_at) FROM idcard;

        `;
        const { rows } = await db.query(query);
        res.status(200).json(rows);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching last request dates' });
      }
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });