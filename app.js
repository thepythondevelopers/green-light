require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");


//Routes
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const matchingAlgoRoutes = require("./routes/matchingAlgo");
const lightRoutes = require("./routes/light");
const chatRoutes = require("./routes/chat");
//Connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true
}).then(()=>{
    console.log('DATA CONNECTED');
}).catch((err)=>{
    console.log(err);
})


const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use('/api',authRoutes);
app.use('/api',profileRoutes);
app.use('/api',matchingAlgoRoutes);
app.use('/api',lightRoutes);
app.use('/api',chatRoutes);
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
});

