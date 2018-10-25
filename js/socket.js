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
//var numbers = 0;

$(".button__join").on("click",function(e){
    e.preventDefault();
    var random = Math.floor(Math.random()*1000);
    var nameTextbox = $("#chat__input")
    if(nameTextbox.val() !== "Enf0rcer"){

        history.pushState({}, null, `?name=${nameTextbox.val()}&room=${random}`);
        var chat = $(`<div class="chat" id="${random}">
        <div class="chat__sidebar">
            <h3>People</h3>
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
                console.log("no err")
                ;
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
        <div class="chat__sidebar">
            <h3>People</h3>
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
        <div class="chat__sidebar">
            <h3>People</h3>
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
    console.log("rooms avalible are",rooms)
})
// socket.on("connect", function () {
//
//     var param = $.deparam(window.location.search);
//     socket.emit("join", param, function (err) {
//         if (err) {
//             alert(err);
//             window.location.href = "/"
//         } else {
//             console.log("no err")
//             ;
//         }
//     });
//
// });
socket.on("updateUserList", function (users) {
    var ol = $("<ol></ol>");
    users.forEach(function (user) {
        ol.append($("<li></li>").text(user));

    });
    $(".users").html(ol);
});
// --------------------------USEFULL FOR NO RELOAD PAGE---------------------
//history.pushState({}, null, "goHome");
// ----------------SOCKET DISCONNECTED----------------------------------
socket.on("disconnect", function () {
    console.log("Disconnected form server");
});
// ----------------------------SOCKET RECIVED MESSAGE--------------------------------
socket.on("newMessage", function (message) {
//------------------------------- MUSTACHE RENDERING ---------------------------------------------

    var chat = $(`#${message.room}`).find(".messages");

    var formatedTime = moment(message.createdAt).format("h:mm a");
    var template = $(".message-template").html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formatedTime
    });
    chat.append(html)
    //$(".messages").append(html);
    scrollToBottom();
//----------------------------- TEMPLATE STRING RENDERING ________________________
    // console.log("new massage", message);
    // var li = $("<li></li>");
    // li.text(`${message.from} ${formatedTime }: ${message.text}`);
    // $("#messages").append(li)
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



///////------------CHANGED FOR ONE USER TO GET ALL -----------------------
// $(document).on("click",".button__text-chat", function (e,event) {
//     e.preventDefault();
//     var messageTextbox = $(this).prev();
//     console.log($(this).prev().val())
//     //console.log(messageTextbox)
//
//     socket.emit("createMessage", {
//         text: messageTextbox.val()
//     }, function () {
//         messageTextbox.val("")
//     });
// });



//------------------How it was from the tutorial-----------------
// $(".button__text-chat").on("click", function (e) {
//     e.preventDefault();
//     var messageTextbox = $(".chat__text__input");
//     console.log(messageTextbox.val())
//     socket.emit("createMessage", {
//         text: messageTextbox.val()
//     }, function () {
//         messageTextbox.val("")
//     });
// });