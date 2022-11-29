require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const socketIO = require('socket.io');
const http = require('http');
let server = http.createServer(app)
//let io = socketIO(server)
app.set('view engine', 'ejs');

/*const server = require('http').createServer();
const io = require('socket.io')(server);*/

//const socket = require("socket.io");

/*server.listen(3000, () => {
  console.log('listening on *:3000');
});*/
/*io.on('connection', client => {
   
  client.on('event', data => {  });
  client.on('disconnect', () => {  });
});*/

/*io.on('connection', (socket) => {
   console.log("Hello");
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('notification', (msg) => {
    io.emit('notification', msg);
  });
  socket.on('job', (msg) => {
    io.emit('job', msg);
  });
  
});*/

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
    useCreateIndex : true,
    useFindAndModify : false
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
/*server = app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
});*/

app.get('/', (req, res)=>{
 
  // The render method takes the name of the HTML
  // page to be rendered as input
  // This page should be in the views folder
  // in the root directory.
  res.render('home');
   
  });

server.listen(port);
// io.on('connection', (socket)=>{
//   console.log('New user connected');
// });
/*server.listen(3000, () => {
  console.log('listening on *:3000');
});*/

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});
io.on("connection", function (socket) {
  console.log("Made socket connection");
});


/*io.on("connection", function (socket) {
  console.log("Made socket connection");

  socket.on("new user", function (data) {
    //socket.userId = data;
    //activeUsers.add(data);
    //io.emit("new user", [...activeUsers]);
    io.emit("new user", 'fdf');
  });

  socket.on("disconnect", () => {
  //  activeUsers.delete(socket.userId);
    io.emit("user disconnected", 'Delected');
  });
});*/