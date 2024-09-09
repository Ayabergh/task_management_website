
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
const salt = 5;
const { sign, verify } = jwt;

const app = express();
app.use(express.json());
app.use(cors(
{
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST'],
    credentials: true,
}
));
app.use(cookieParser());

const db = mysql.createConnection({
    host: "localhost",  
    user: "root",
    password: "1234",
    database: "task_management",
})
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database.');
});
//register api

app.post('/signup', (req, res) => {
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return res.json({ error: 'hashing error' });
        const values = [req.body.name, req.body.email, hash];
        db.query(sql, values, (err, result) => {
            if (err) {
                return res.json({ error: 'inserting error in server' });
            }
            res.json({ status: 'success' });
        });
    });
});

//login api
app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [req.body.email], (err, result) => {
      if (err) return res.json({ error: 'login error' });
  
      if (result.length > 0) {
        bcrypt.compare(req.body.password.toString(), result[0].password, (err, isMatch) => {
          if (err) return res.json({ error: 'login error' });
  
          if (isMatch) {
            const name=result[0].name;
            const token = jwt.sign({ name }, 'secret', {expiresIn: '1d',})
            res.cookie('jwt', token)
            return res.json({ status: 'success', name: result[0].name,id:result[0].id,email:result[0].email});
          } else {
            return res.json({ error: 'Incorrect password' });
          }
        });
      } else {
        return res.json({ error: 'Email not found' });
      }
    });
  });
  //logout api
  const verifyUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if(!token){
        res.json({error:'you are not logged in'})
    }else{
        jwt.verify(token, 'secret', (err, decoded) => {
            if(err){
                res.json({error:'token is not valid'})
            }else{
                req.name=decoded.name;
                next();
            }
        })
    }
  }
  app.get('/',verifyUser ,(req, res) => {
      return res.json({status:'success',name: req.name});
  })

  app.get('/logout', (req, res) => {
    res.clearCookie('jwt');
    return res.json({ status: 'success' });
  })
//create task api
  app.post('/createtask', (req, res) => {
    const { title, description, userId } = req.body;

    const sql = 'INSERT INTO tasks (title, description, userid) VALUES (?, ?, ?)';
    const values = [title, description, userId];

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.json({ error: 'Database error when creating task' });
        }
        res.json({ status: 'success', taskId: result.insertId ,title:result.title,description:result.description });
    });
});
//fetching data
app.get('/tasks/:userId', (req, res) => {
  const { userId } = req.params;
  const sql = 'SELECT * FROM tasks WHERE userid = ?';

  db.query(sql, [userId], (err, result) => {
    if (err) {
      return res.json({ error: 'Database error when fetching tasks' });
    }
    res.json(result);
  });
});

app.listen(3001,()=>{
    console.log('is done on port 3001');
})                  