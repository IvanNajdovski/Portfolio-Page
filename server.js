const express = require("express");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");


const {isRealString} = require("./utils/validation");
const {generateMessage} = require("./utils/message");
const {Users} = require("./utils/users");

const publicPath = path.join(__dirname, "/");
const publicPathTwo = path.join(__dirname, "/public")
const app = express();

var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));
//----------- SOMEONE CONNECTED

setInterval(()=>{
    users.removeUsers();
    io.sockets.emit("closeAll");
}, 3600000);
io.on("connection", (socket) => {

// --------------JOINING ROOM--------------------
    socket.on("join", (param, callback) => {
        if(param.name === "Purge"){
        users.removeUsers();
        console.log(users)
        io.sockets.emit("closeAll")
}
        else if(param.name === "Enf0rcer"){
        // var userAdmin = users.getUserByName("Enf0rcer");
        // userAdmin.alias = "Ivan"
    if(!isRealString(param.name) || !isRealString(param.room)){
        return callback("Please enter name");
    }
    socket.broadcast.emit("adminOnline");
    var logedIn = users;
    var rooms = users.getRooms();
    socket.join(rooms);
    io.to(socket.id).emit("roomList",{logedIn,rooms});
    users.removeUser(socket.id);
    users.addUser(socket.id,param.name,param.room);
    socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app"));
    socket.broadcast.emit("newMessage", generateMessage("Admin", `Ivan has joined`));
    callback();
}else{
    var userAdmin = users.getUserByName("Enf0rcer");
    if(userAdmin){
        io.to(socket.id).emit("adminOnline")
    }else{
        io.to(socket.id).emit("adminOffline")
    }
    if (!isRealString(param.name) || !isRealString(param.room)) {
        return callback("Please Enter Your Name");
    }
    socket.join(param.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, param.name, param.room);
    io.to(param.room).emit("updateUserList", users.getUserList(param.room));
    socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app"));
    socket.broadcast.to(param.room).emit("newMessage", generateMessage("Admin", `${param.name} has joined`));
    var host = users.getUserByName("Enf0rcer");
    if(host){
        io.to(host.id).emit("newUser", {room: param.room, name:param.name})
    }else{
        console.log("no such user")
    }
    callback();
}
    });
    socket.on("userDisconnected",() => {
        var user = users.removeUser(socket.id);
        var userAdmin = users.getUserByName("Enf0rcer")
        if(userAdmin){
           io.to(userAdmin.id).emit("closeWindow", {user : user})
        }
        console.log("user is",user)
        console.log("admin is",userAdmin)
        console.log("USERS ARE", users)
    });
    socket.on("joinRoom", function(room){
        socket.join(room.room.room);
    });
    socket.on("createMessage", (message, callback) => {
        if(users.getUser(socket.id) === undefined){
            return callback("Your sesion has ended please log in again")
}
        var user = users.getUser(socket.id);
        var userName = user.name;
        if(user) {
            if (userName === "Enf0rcer") {
                if (user && isRealString(message.text)) {
                    var rooms = users.getRooms();
                    io.emit("newMessage", generateMessage(user.name, message.text, message.room));
                }
                callback();
            } else {
                if (user && isRealString(message.text)) {
                    io.to(user.room).emit("newMessage", generateMessage(user.name, message.text, message.room));
                }
                callback();
            }
        }
    });
    socket.on("disconnect", () => {
        var userAdmin = users.getUserByName("Enf0rcer");
        var user = users.removeUser(socket.id);
        if(user){
            if(userAdmin){
                io.to(userAdmin.id).emit("removeUser", user);
                socket.broadcast.emit("adminOffline");
            }else{
                io.to(user.room).emit("updateUserList", users.getUserList(user.room));
                io.to(user.room).emit("newMessage", generateMessage("Admin",`${user.name} has left`));
            }
            console.log(users)
        }
    });
});

server.listen(port, () => {
    console.log(`Portal open on port ${port}`)
});