//SCROLING FUNCTION
function isScrolledIntoView(a) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = a.offset().top;
    var elemBottom = elemTop + a.outerHeight();

    if (elemBottom > docViewTop && elemTop < docViewBottom) {
        a.addClass("animate");
        var transform = docViewBottom - elemBottom
        a.css("transform",`translateX(${transform/5}px)`)
        a.children("span").css("transform",`translateX(${transform/3 - $(".header__span").innerWidth()}px)`)
        console.log($(window).height());
        if(transform > $(window).height()/3){
            var opacity = ( (($(window).height()/6))/transform);
            var opacityTwo = ( (($(window).height()/2))/transform);
            console.log(opacity)
            a.css("color",`rgba(255,255,255, ${opacity})`)
            a.children("span").css("color",`rgba(174, 174, 174, ${opacityTwo})`)
        }
    } else {
        a.removeClass("animate");
    }

};
function isScrolledIntoViewLeft(a) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = a.offset().top;
    var elemBottom = elemTop + a.outerHeight();

    if (elemTop < docViewBottom) {
        a.addClass("active");
        a.css("transform",`translateX(-${$(this).outerWidth()}px)`)

    } else {
        a.removeClass("active");

    }

};
function isScrolledIntoViewRight(a) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = a.offset().top;
    var elemBottom = elemTop + a.outerHeight();

    if (elemTop < docViewBottom) {
        a.addClass("active");
        a.css("transform",`translateX(${$(this).outerWidth()}px)`)

    } else {
        a.removeClass("active");

    }

};
function isScrolledIntoViewVanila(a) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = a.offset().top;
    var elemBottom = elemTop + a.outerHeight();

    if (elemTop < docViewBottom) {
        a.addClass("active");


    } else {
        a.removeClass("active");

    }

};



$(document).ready(function () {
    setTimeout(function () {
        $(".logo").addClass("active");
    }, 1000);

    setTimeout(function () {
        $(".logo__colorGroup").addClass("active");
    }, 15000)
    $('.pic').mousemove(function (event) {
        event.preventDefault();
        var upX = event.clientX;
        var upY = event.clientY;
        var mask = $('#mask1 circle')[0];
        mask.setAttribute("cy", (upY - 5) + 'px');
        mask.setAttribute("cx", upX + 'px');
    });

    $(window).on("mousemove", function (e) {
        // var top = e.pageY - ($(".cursor").outerHeight() / 2)
        // var topSmall = e.pageY - ($(".cursor-small").outerHeight() / 2)
        // var left = e.pageX - ($(".cursor").outerWidth() / 2)
        // var leftSmall = e.pageX - ($(".cursor-small").outerWidth() / 2)
        var top = e.pageY;
        var left = e.pageX;
        // $(".cursor").css("transform", `matrix(1,0,0,1,${left},${top})`)
        // $(".cursor-small").css("transform", `matrix(1,0,0,1,${leftSmall},${topSmall})`)
        $(".cursor-small").css("top", `${top}px`);
        $(".cursor-small").css("left", `${left}px`)
        $(".cursor").css("left", `${left - 15}px`)
        $(".cursor").css("top", `${top - 15}px`)
    })
    var interval;
    var radius = 20;
    $(window).on("mousedown", function (e) {

        $(".loading-text").addClass("active");
        $(".circle-fill").addClass("active");
        interval = setInterval(function () {
            radius = radius + 5;
            $(".curcle").attr("r", `${radius}`);

        }, 20)


    })
    $(document).on("mouseup", function () {
        if (radius > 300) {
            clearInterval(interval)
            $(".loading").css("display", "none");

            $(".cursor-small").css("display", "block");
            $(".cursor").css("display", "block");

            interval = setInterval(function () {
                radius = radius + 10;
                $(".curcle").attr("r", `${radius}`);

            }, 4);
            setTimeout(function () {
                clearInterval(interval);
                $(".pic").css("display","none");
                $(".top").addClass("active");
                $(".nav").addClass("active");
            },1500);

        } else {
            clearInterval(interval)
            $(".loading-text").removeClass("active");
            $(".circle-fill").removeClass("active");

            radius = 75;
            $(".curcle").attr("r", `${radius}`);
        }

    });
    $(".nav__box-content-list, .top__navbar__list__item").on("mouseover", function () {
        $(".cursor").addClass("expand")
        $(".cursor-small").addClass("hidden")

    });
    $(".nav__box-content-list, .top__navbar__list__item").on("mouseleave", function () {
        $(".cursor-small").removeClass("hidden")
        $(".cursor").removeClass("expand")
    });
    $(".nav__box__menu").on("mouseover", function () {
        $(".cursor-small").addClass("hidden")
        $(".cursor").addClass("expand")
    });
    $(".nav__box__menu").on("mouseleave", function () {
        $(".cursor-small").removeClass("hidden")
        $(".cursor").removeClass("expand")
    });

    // ------------------------MENU ANIMATION ---------------------------
    $(".nav__box__menu").on("click", function () {

    });
    setTimeout(function(){
        $(".top__box").addClass("active")
    },2000)
    setTimeout(function(){
        var delay = 0;
        $(".boxpanel").each(function () {
            delay = delay + .15
            $(this).css("transition-delay", `${delay}s`)
            $(this).addClass("active")
        })
        $(".boxpanelPrime").addClass("active")
    },4000)

    $("span").on("mouseover", function(e){
        $(this).addClass("active")
    });
    $("span").on("mouseleave", function(e){
        $(this).removeClass("active")
    });

    // ------------------MENU FUNCTION -----------------------
    $(".nav__box__menu").on("click",function(){

        if($(".top__navbar").hasClass("active")){
            $(".nav__box__menu__button").removeClass("active");
            $(".top__navbar").addClass("close");
            setTimeout(function(){
                $(".top__navbar").removeClass("close");
                $(".top__navbar").removeClass("active");
            },200)
        }else {
            $(".nav__box__menu__button").addClass("active");
            $(".top__navbar").addClass("active");
        }
    });
    // $(window).one("resize scroll", function(){
    //     if($(window).scrollTop() > 100){
    //         console.log("scrolled")
    //         $(".boxpanel").each(function () {
    //             $(this).removeClass("active")
    //         })
    //
    //             var delay = 0;
    //
    //             $(".boxpanel").each(function () {
    //                 delay = delay + .15
    //                 $(this).css("transition-delay", `${delay}s`)
    //                 $(this).addClass("active")
    //             })
    //             $(".boxpanelPrime").addClass("active")
    //
    //     }
    // })

    // ----------------------PROJECT LIST ANIMATION ------------------------
    $(".list__number").on("click", function(){
        console.log($(this).index())
        if($(".projects__content__photos__desktop").hasClass("active")){
            $(".projects__content__photos__desktop").removeClass("active");
            $(".projects__content__photos__mobile").removeClass("active")
        }

        $(".line").each(function(){
            if($(this).hasClass("active")){
                $(this).removeClass("active")
            }
        })
        var index = $(this).index()
        $(this).next().addClass("active")
        var index = ($(this).index()/2) +1
        if(index === 1){
            $(".project__name").text("Weather Forecast");
            $(".project__details").text("Page is using three API to collect Weather, Geolocation and Photos data and is giving the user information for the weather of the given location. The application is using Axios NodeJs library to call the API's and EJS for template rendering. Also favorite location is best done with database but for investigating the localStorage sistem we used localStorage instead.");
        }else if(index === 2){
            $(".project__name").text("Burke - Movie Site");
            $(".project__details").text("'Burke' Website has very good animations and very good wellcome screen, we used alot of animations and Javascript to tie them all together. SVG logo was one of thigs learned while making this site wich gives us a very good perspective and imagination about what else can be done with SVG.");
        }else if(index === 3){
            $(".project__name").text("Build In Amsterdam");
            $(".project__details").text("Portfolio page where bunch of projects and rendered side by side. Horisontal scroll was a bit challenging but gives a great UX experience. Site renderes different data for different project and use of different number of projects gives the same result.")
        }else if(index === 4){
            $(".project__name").text("Localised");
            $(".project__details").text("WebPage for Company that makes web-pages, tons of great effects and animations that gives this site very modern look and great UX design, fully responsive witch gives all users great experience. Work with sudo elements poved very fruitful");
        }else if(index === 5){
            $(".project__name").text("Charlie Paris Watch-Shop");
            $(".project__details").text("Shopping page for watch Company where we made data sistem to mimic the database usage where the user gets the same item when redirected to another page, for this feature we used URL params to pass variables and arrays in order to render the right data to the pages. Loads of animations and sudo elements working with Javascript that give us a taste of what Javascript can do and it can do everything we want.");
        }

        setTimeout(function(){
            $(".projects__content__photos__desktop").children("img").attr("src",`img/project__${index}/desktop.jpg`);
            $(".projects__content__photos__mobile").children("img").attr("src",`img/project__${index}/mobile.jpg`);
            $(".projects__content__photos__desktop").addClass("active");
            $(".projects__content__photos__mobile").addClass("active");
        },500)
        // console.log(index)
        // $(".line").index(0).addClass("active");
    });
    //--------------------PROJECT PHOTOS ROTATION--------------------
    $(".projects__content__photos").on("mousemove",function(e){
        var offsetX;
        var offsetY;
        var x = e.pageX;
        var y = e.pageY;
        var top = $(".projects__content__photos").offset().top;
        var left = $(".projects__content__photos").offset().left;
        offsetX = (x - (left + ($(".projects__content__photos").outerWidth()/2)))/50;
        offsetY = (y - (top + ($(".projects__content__photos").outerHeight()/2)))/30;
        console.log("top is",offsetY,"left is", offsetX)


        $(".projects__content__photos").css("translation","transform .5s")
        $(".projects__content__photos").css("transform",` translateY(-100px) rotateX(${offsetY}deg) rotateY(${offsetX}deg)`);
        $(".projects__content__photos-wrapper").css("transform",`rotateX(${offsetY}deg) rotateY(${offsetX}deg)`);

    });
    var count;
    var counter = 0
    $(".skill").on("mouseover", function() {
        $(this).children("div").children("img").addClass("active");
        $(this).find(".under").addClass("active");
    });
    $(".skill").on("mouseover", function(){
        var percent = $(this).find(".under");
        if(percent.attr("aria-label")){
            setTimeout(function(){


            var count = setInterval(function(){
                counter++
                percent.text(counter + "%")
                if(counter >= Number(percent.attr("aria-label"))){
                    clearInterval(count)
                }
            },25)
            },300)
        }

    });

    $(".skill").on("mouseleave", function(){
        $(this).children("div").children("img").removeClass("active");
        $(this).find(".under").removeClass("active");
        counter = 0
        clearInterval(count)
    });



    $(window).on("resize scroll", function(){

        $(".form__animation__left").each(function(){
            isScrolledIntoViewLeft($(this))
        });
        $(".form__animation__right").each(function(){
            isScrolledIntoViewRight($(this))
        });
        $(".projects__box__header").each(function(){
            isScrolledIntoView($(this))
        });
    })



})





