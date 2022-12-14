const express=require('express')
const app =express();
const path= require('path');
const bodyParser= require('body-parser');
const conn= require('./config/db');
const ejs= require('ejs');
app.set('view engine', 'ejs');
app.set('views', 'views')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req,res)=>{

    res.render('index')
});
app.get('/smoothies', (req,res)=>{

    res.render('smoothies')
});

conn.connection.on('error', (err)=>{

    console.log("Could not connect to DB", err.message);
})
conn.connection.once('open',()=>{

    app.listen(3000, ()=>{
        console.log("Server up");
    })
})