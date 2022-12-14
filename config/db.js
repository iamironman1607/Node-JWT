const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

mongoose.connect("mongodb://localhost:27017/JWT_DB",{useNewUrlParser: true,
useUnifiedTopology: true})
.then((conn)=>{
    console.log("DB Connected");
})
.catch(err=>{
    console.log(err.message);
})

module.exports= mongoose;