const express=require('express')
const app =express();
const path= require('path');
// const bodyParser= require('body-parser');
const conn= require('./config/db');
const cookiesPaerser= require('cookie-parser');

const ejs= require('ejs');
app.set('view engine', 'ejs');
app.set('views', 'views')

app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookiesPaerser());

const authRoutes= require('./routes/authRoutes');
const {verifyAuth, checkUser} = require('./middlewares/authMiddleware');

app.get('*', checkUser )
app.use('/', authRoutes);
app.get('/smoothies', verifyAuth , (req, res, next)=>{
    
    res.render('smoothies');
})

conn.connection.on('error', (err)=>{

    console.log("Could not connect to DB", err.message);
})
conn.connection.once('open',()=>{

    app.listen(3000, ()=>{
        console.log("Server up");
    })
})

// https://www.youtube.com/watch?v=SnoAwLP1a-0&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp

// Youtube Video Completed