var socket = io();

function scrollToBottom() {
    var messages = $("#messages");
    var newMessage = messages.children("li:last-child");
    var clientHeight = messages.prop("clientHeight");
    var scrollTop = messages.prop("scrollTop");
    var scrollHight = messages.prop("scrollHeight");
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight()
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHight) {
        messages.scrollTop(scrollHight + newMessageHeight);
    }
}
// --------------------- SOCKET CONNECTED--------------------------
$(".button__join").on("click",function(e){
    e.preventDefault();
    var random = Math.floor(Math.random()*1000);
    var nameTextbox = $("#chat__input")
    if(nameTextbox.val() !== "Enf0rcer"){
        history.pushState({}, null, `?name=${nameTextbox.val()}&room=${random}`);
        var chat = $(`<div class="chat" id="${random}">
<div class="close">
        <button class="close">X</button>
</div>
        <div class="chat__sidebar">
            <p class="admin"></p>
            <div class="users"></div>
        </div>
        <div class="chat__main">
            <ol  class="chat__messages messages"></ol>
            <div class="chat__footer">
                <form action="" class="message-form">
                    <input class="chat__text__input" name="message" type="text" placeholder="Message" autofocus autocomplete="off"/>
                    <button class="button__text-chat">Send</button>
                </form>
            </div>
        </div>
    </div>`)
        $(".chat__box").append(chat);
        var param = $.deparam(window.location.search);
        socket.emit("join", param, function (err) {
            if (err) {
                alert(err);
                window.location.href = "/"
            } else {
                console.log("no err");
            }
        });
    }else{
        history.pushState({}, null, `?name=${nameTextbox.val()}&room=100`);
        var param = $.deparam(window.location.search);
        socket.emit("join", param, function (err) {
            if (err) {
                alert(err);
                window.location.href = "/"
            } else {
                console.log("no err")
                ;
            }
        });
    }
    });
socket.on("newUser", function(room){
    socket.emit("joinRoom",{room:room})
    var chat = $(`<div class="chat" id="${room.room}">
        <!--<div class="close">-->
        <!--<button class="close">X</button>-->
<!--</div>-->
        <div class="chat__sidebar">
            <p class="admin"></p>
            <div class="users">
            <ol>
                <li>${room.name}</li>
            </ol>
                </div>
        </div>
        <div class="chat__main">
            <ol  class="chat__messages messages"></ol>
            <div class="chat__footer">
                <form action="" class="message-form">
                    <input class="chat__text__input" name="message" type="text" placeholder="Message" autofocus autocomplete="off"/>
                    <button class="button__text-chat">Send</button>
                </form>
            </div>
        </div>
    </div>`)
    $(".chat__box").append(chat);
});
socket.on("roomList", function(rooms){
    for(let item of rooms.logedIn.users){
        var chat = $(`<div class="chat" id="${item.room}">
        <!--<div class="close">-->
        <!--<button class="close">X</button>-->
<!--</div>-->
        <div class="chat__sidebar">
            <p class="admin"></p>
            <div class="adminLight"></div>
            <div class="users">
                <ol>
                <li>${item.name}</li>
            </ol>
        </div>
        </div>
        <div class="chat__main">
            <ol  class="chat__messages messages"></ol>
            <div class="chat__footer">
                <form action="" class="message-form">
                    <input class="chat__text__input" name="message" type="text" placeholder="Message" autofocus autocomplete="off"/>
                    <button class="button__text-chat">Send</button>
                </form>
            </div>
        </div>
    </div>`)
        $(".chat__box").append(chat);
    }
});
socket.on("adminOnline", function(){
    $(".admin").text("Ivan is online");
     var adminLight = $(".adminLight");
     adminLight.addClass("online");
    if(adminLight.hasClass("offline")){
        adminLight.removeClass("offline");
    }
});
socket.on("adminOffline", function(){
    $(".admin").text("Ivan is offline");
});
socket.on("removeUser", function(user){
    $(`#${user.room}`).remove();
 });
socket.on("updateUserList", function (users) {
    var ol = $("<ol></ol>");
    users.forEach(function (user) {
        ol.append($("<li></li>").text(user));

    });
    $(".users").html(ol);
});
socket.on("closeWindow", function(user){
    console.log(user)
   alert(`${user.user.name} has disconnected`);
   $(`#${user.user.room}`).remove();
});
// --------------------------USEFULL FOR NO RELOAD PAGE---------------------
//history.pushState({}, null, "goHome");
// ----------------SOCKET DISCONNECTED----------------------------------
socket.on("disconnect", function () {
    console.log("Disconnected form server");
});
// ----------------------------SOCKET RECIVED MESSAGE--------------------------------
socket.on("newMessage", function (message) {
    console.log(message);
//------------------------------- MUSTACHE RENDERING ---------------------------------------------
    var chat = $(`#${message.room}`).find(".messages");
    var formatedTime = moment(message.createdAt).format("h:mm a");
    var template = $(".message-template").html();
    if(message.from === "Enf0rcer"){
        var html = Mustache.render(template, {
            text: message.text,
            from: "Ivan",
            createdAt: formatedTime
        });
    }else {
        var html = Mustache.render(template, {
            text: message.text,
            from: message.from,
            createdAt: formatedTime
        });
    }
    chat.append(html)
    //$(".messages").append(html);
    scrollToBottom();
});
// ---------------------- INPUT FUNCTIONALITY ------------------------------------
$(document).on("click",".button__text-chat", function (e,event) {
    e.preventDefault();
    var room = $(this).closest("div.chat")
    var messageTextbox = $(this).prev();
    socket.emit("createMessage", {
        text: messageTextbox.val(),
        room: room.attr("id")
    }, function () {
        messageTextbox.val("")
    });
});
$(document).on("click",".close", function (e,event) {
   $(this).parent(".chat").remove();
   socket.emit("userDisconnected")
});




