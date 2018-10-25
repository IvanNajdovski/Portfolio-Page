class Users {
    constructor () {
        this.users = [];
    }
    addUser (id, name, room){
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser (id){
        var user = this.users.filter(function(val){
            return val.id === id
        })[0];

        if(user){
            this.users = this.users.filter(function(val){
                return val.id !== id
            });
        }
        return user;
    }
    removeUsers (){
        this.users = this.users.filter(function(val){
            return val.name === "Darkshad0w"
        });
        return this.users

    }
    getUserByName (name){
        var user = this.users.filter(function(val){
            return val.name === name
        })[0];
        return user
    }
    getUser (id){
        var user = this.users.filter(function(val){
            return val.id === id
        })[0];
        return user
    }
    getUserList (room) {
        var users =this.users.filter((user)=>{
            return user.room === room;
        });
        var nameArray = users.map((user)=>{
            return user.name
        });
        return nameArray;
    }
    getRooms(){
        var rooms = this.users.map((user)=>{
            return user.room
        });
        return rooms
    }
}
module.exports = {Users};