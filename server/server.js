const express = require('express');
const mysql  = require('mysql2');
const dotenv = require('dotenv');
const multer =  require('multer');
const cors = require('cors')
// const bodyParser =  require('body-parser')



const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password : "yobadagne2nd",
    database : "fitness"
});
//create table
let sql = "CREATE TABLE IF NOT EXISTS users (ID INT NOT NULL AUTO_INCREMENT, email VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL, password VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL, type VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL, active TINYINT default 1, PRIMARY KEY(ID))";

db.query(sql, (err, data)=>{
    if (err) { console.log(err)}
    //else (console.log(data))
})

// initialize the server

const app = express();
dotenv.config();
app.use(cors({ origin: '*' }));
 app.use(express.json())
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
// app.use(bodyParser.json())

const storage = multer.diskStorage({
    destination: './upload_images',
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });

  const upload = multer({ storage });
  app.get('/',(req,res)=>{
    res.json({"msg":"started"})
})

app.post('/upload', upload.single('image'), (req,res) =>{
    const image = req.file;

  if (image) {
    res.send('Image uploaded successfully.');
  } else {
    res.send('Image upload failed.');
  }
})

app.post('/adduser', (req,res)=>{
    console.log(req.body)
    const {email, password, type} = req.body;
    
    
    const sql = "INSERT INTO users (email, password, type) VALUES (?,?,?)";

    db.query(sql,[email,password,type], (err, data)=>{
        if (err) console.log(err)
        else {console.log(data)}
    })
})

app.listen(3001)
// intialize database connection

// const db = mysql.createConnection({
//     host : 'localhost',
//     user: 'root',
//     password: process.env.password,
//     database : 'fitness'
// })
// db.connect( (err)=>{
//     if (err) console.log(err)
//     else {
//         const sql = "CREATE TABLE IF NOT EXISTS users (ID INT NOT NULL AUTO_INCREMENT, email VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL, password VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL, type VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL, active TINYINT default 1, PRIMARY KEY(ID))";
        
//         db.query(sql, (err, data)=>{
//             if (err) { console.log(err)}
//             else (console.log(data))
//         })
//     }
// })

