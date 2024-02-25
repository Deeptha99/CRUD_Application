const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET","PUT","DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000*60*60*24 // 24 hours in milliseconds
    }
}))


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employee"
})

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO signup(`username`,`email`, `password`) VALUES (?)";
    const values = [
        req.body.username,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM signup WHERE `email`= ? AND `password`=?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        if (data.length > 0) {
            req.session.username = data[0].username;
            return res.json({Login: true})
        }
        else {
            return res.json({Login: false});
        }
    })
})

app.get('/home', (req,res) =>{
    if(req.session.username){
        return res.json({valid: true, username: req.session.username})
    }
    else{
        return res.json({valid: false})
    }
})

app.post('/logout', (req,res) =>{
    req.session.destroy((err) =>{
        if(err){
            console.error('Error destroying session:', err);
            res.status(500).json({success: false, error: "Internal Server Error"});
        }
        else{
            res.clearCookie('connect.sid');
            res.json({success: true, message:'Logout successful'});
        }
    })
})

//CRUD Application
//Create a Table
app.get('/table', (req,res) =>{
    const sql = "SELECT * FROM products";
    db.query(sql,(err,result) =>{
        if(err){
            return res.json({Message: "Error inside server"});
        }
        else{
            return res.json(result);
        }
    })
})

//ADD  to the table
app.post('/products', (req,res)=>{
    const sql = "INSERT INTO products(`product_name`, `price`, `address`) VALUES (?)";
    const values =[
        req.body.product_name,
        req.body.price,
        req.body.address
    ]
    db.query(sql, [values], (err,result) =>{
        if(err){
            return res.json(err);
        }
        else{
            return res.json(result);
        }
    })
})

//VIEW
app.get('/view/:id', (req, res) => {
    const sql = "SELECT * FROM products WHERE id = ?";
    const id = req.params.id;
    
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        } else {
            return res.status(200).json(result);
        }
    });
});

//UPDATE
app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE products SET `product_name`=?, `price`=?, `address`=? WHERE id=?";
    db.query(sql, [req.body.product_name, req.body.price, req.body.address, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        } else {
            return res.status(200).json(result);
        }
    });
});

//DELETE
app.delete('/delete/:id', (req,res) =>{
    const sql = "DELETE FROM products WHERE id=?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        } else {
            return res.status(200).json(result);
        }
    });
})

app.listen(8081, () => {
    console.log("Server is running");
})