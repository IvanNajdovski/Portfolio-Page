//SCROLING FUNCTION
function isScrolledIntoView(a) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = a.offset().top;
    var elemBottom = elemTop + a.outerHeight();
    if (elemBottom > docViewTop && elemTop < docViewBottom) {
        a.addClass("animate");
        var transform = docViewBottom - elemBottom
        a.css("transform", `translateX(${transform / 5}px)`)
        a.children("span").css("transform", `translateX(${transform / 3 - $(".header__span").innerWidth()}px)`)

        if (transform > $(window).height() / 3) {
            var opacity = ((($(window).height() / 6)) / transform);
            var opacityTwo = ((($(window).height() / 2)) / transform);

            a.css("color", `rgba(255,255,255, ${opacity})`)
            a.children("span").css("color", `rgba(174, 174, 174, ${opacityTwo})`)
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
    if (elemTop < docViewBottom - 400) {
        a.addClass("active");
        a.css("transform", `translateX(-${$(this).outerWidth() + 500}px)`)
    } else {
        a.removeClass("active");
    }
};

function isScrolledIntoViewRight(a) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = a.offset().top;
    var elemBottom = elemTop + a.outerHeight();

    if (elemTop < docViewBottom - 400) {
        a.addClass("active");
        a.css("transform", `translateX(${$(this).outerWidth()}px)`)
    } else {
        a.removeClass("active");
    }
};

function isScrolledIntoViewVanila(a) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = a.offset().top;
    var elemBottom = elemTop + a.outerHeight();
    if (elemBottom > docViewTop && elemTop < docViewBottom) {
        a.addClass("active");
    }else{
        a.removeClass("active")
    }
};

$(".nav").hide();

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
        //if($(window).width() > 400) {
            var top = e.pageY;
            var left = e.pageX;
            $(".cursor-small").css("top", `${top}px`);
            $(".cursor-small").css("left", `${left}px`);
            $(".cursor").css("left", `${left - 15}px`);
            $(".cursor").css("top", `${top - 15}px`);
      //  }
    })
    // $(window).on("scroll touchstart",function(){
    //     if($(window).width() <400){
    //         cursor
    //     }
    // })
    var interval;
    var radius = 20;
    $(window).on("mousedown touchstart", function (e) {
        $(".loading-text").addClass("active");
        $(".circle-fill").addClass("active");
        interval = setInterval(function () {
            radius = radius + 10;
            $(".curcle").attr("r", `${radius}`);
        }, 20);

    });

    $(document).on("mouseup touchend", function () {
        if (radius > 300) {
            $("body").css("overflow", "visible");
            $(".nav").show();
            clearInterval(interval);
            $(".loading").css("display", "none");
            // $(".cursor-small").css("display", "block");
            // $(".cursor").css("display", "block");
            setTimeout(function () {
                $(".top__box").addClass("active");
            }, 2000);
            setTimeout(function () {
                var delay = 0;
                $(".boxpanel").each(function () {
                    delay = delay + .15
                    $(this).css("transition-delay", `${delay}s`);
                    $(this).addClass("active");
                });
                $(".boxpanelPrime").addClass("active");
            }, 4000);
            interval = setInterval(function () {
                radius = radius + 10;
                $(".curcle").attr("r", `${radius}`);
            }, 4);
            setTimeout(function () {
                clearInterval(interval);
                $(".pic").css("display", "none");
                $(".top").addClass("active");
                $(".nav").addClass("active");
            }, 500);
        } else {
            clearInterval(interval)
            $(".loading-text").removeClass("active");
            $(".circle-fill").removeClass("active");
            radius = 75;
            $(".curcle").attr("r", `${radius}`);
        }
    });
    $(document).one("mouseup", function () {
        if (radius > 300) {
            setTimeout(function () {
                clearInterval(interval);
                $("html, body").animate({scrollTop: 0});
                $("body").css("overflow", "visible");
            }, 500);
        }
    });
    $(".nav__box-content-list, .top__navbar__list__item").on("mouseover", function () {
        $(".cursor").addClass("expand");
        $(".cursor-small").addClass("hidden");
    });
    $(".nav__box-content-list, .top__navbar__list__item").on("mouseleave", function () {
        $(".cursor-small").removeClass("hidden");
        $(".cursor").removeClass("expand");
    });
    $(".nav__box__menu").on("mouseover", function () {
        $(".cursor-small").addClass("hidden");
        $(".cursor").addClass("expand");
    });
    $(".nav__box__menu").on("mouseleave", function () {
        $(".cursor-small").removeClass("hidden");
        $(".cursor").removeClass("expand");
    });

    // ------------------------MENU ANIMATION ---------------------------


    $("span").on("mouseover", function (e) {
        $(this).addClass("active");
    });
    $("span").on("mouseleave", function (e) {
        $(this).removeClass("active");
    });

    // ------------------MENU FUNCTION -----------------------
    $(".nav__box__menu").on("click", function () {

        if ($(".top__navbar").hasClass("active")) {
            $(".nav__box__menu__button").removeClass("active");
            $(".top__navbar").addClass("close");
            setTimeout(function () {
                $(".top__navbar").removeClass("close");
                $(".top__navbar").removeClass("active");
            }, 200);
        } else {
            $(".nav__box__menu__button").addClass("active");
            $(".top__navbar").addClass("active");
        }
    });


    // ----------------------PROJECT LIST ANIMATION ------------------------
    $(".list__number").on("click", function () {
        if ($(".projects__content__photos__desktop").hasClass("active")) {
            $(".projects__content__photos__desktop").removeClass("active");
            $(".projects__content__photos__mobile").removeClass("active");
        }
        $(".line").each(function () {
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
            }
        });
        var index = $(this).index()
        $(this).next().addClass("active");
        var index = ($(this).index() / 2) + 1
        if (index === 1) {
            $(".project__name").text("Weather Forecast");
            $(".project__details").text("Page is using three API to collect Weather, Geolocation and Photos data and is giving the user information for the weather of the given location. The application is using Axios NodeJs library to call the API's and EJS for template rendering. Also favorite location is best done with database but for investigating the localStorage sistem we used localStorage instead.");
            $(".button__link__page").each(function () {
                $(this).attr("href", "https://polar-brook-39410.herokuapp.com/?fbclid=IwAR335aD-nWzY7ArmomXoIKfqp1p29uyX5f2b3rd0_leiVDfSBqi-WHxSy64");
            });
            $(".button__link__git").each(function () {
                $(this).attr("href", "https://github.com/IvanNajdovski/Weather_Forecast");
            });
        } else if (index === 2) {
            $(".project__name").text("Burke - Movie Site");
            $(".project__details").text("'Burke' Website has very good animations and very good wellcome screen, we used alot of animations and Javascript to tie them all together. SVG logo was one of thigs learned while making this site wich gives us a very good perspective and imagination about what else can be done with SVG.");
            $(".button__link__page").each(function () {
                $(this).attr("href", "https://pacific-plains-38690.herokuapp.com/?fbclid=IwAR0E8Vnksjz5HCpYETW0BXSdTJwyKGfoqyePSObCCu3-I-GipxiRiNlfMmo");
            });
            $(".button__link__git").each(function () {
                $(this).attr("href", "https://github.com/IvanNajdovski/Tenk");
            });
        } else if (index === 3) {
            $(".project__name").text("Build In Amsterdam");
            $(".project__details").text("Portfolio page where bunch of projects and rendered side by side. Horisontal scroll was a bit challenging but gives a great UX experience. Site renderes different data for different project and use of different number of projects gives the same result.")
            $(".button__link__page").each(function () {
                $(this).attr("href", "https://quiet-tor-76718.herokuapp.com/?fbclid=IwAR2nxdAa8l3eONUjFMlJa-Rc1bkN3AlNJX80FXyJeVkpzSrlzXWB7Xq06Y8");
            });
            $(".button__link__git").each(function () {
                $(this).attr("href", "https://github.com/IvanNajdovski/Amsterdam__Page");
            });
        } else if (index === 4) {
            $(".project__name").text("Localised");
            $(".project__details").text("WebPage for Company that makes web-pages, tons of great effects and animations that gives this site very modern look and great UX design, fully responsive witch gives all users great experience. Work with sudo elements poved very fruitful");
            $(".button__link__page").each(function () {
                $(this).attr("href", "https://afternoon-chamber-39013.herokuapp.com/?fbclid=IwAR3d53esQRSMB6wFcUousEwCgDKxwkRyieAecsa73gAFFSYWuKztGxqpXjc");
            });
            $(".button__link__git").each(function () {
                $(this).attr("href", "https://github.com/IvanNajdovski/localised");
            });
        } else if (index === 5) {
            $(".project__name").text("Charlie Paris Watch-Shop");
            $(".project__details").text("Shopping page for watch Company where we made data sistem to mimic the database usage where the user gets the same item when redirected to another page, for this feature we used URL params to pass variables and arrays in order to render the right data to the pages. Loads of animations and sudo elements working with Javascript that give us a taste of what Javascript can do and it can do everything we want.");
            $(".button__link__page").each(function () {
                $(this).attr("href", "https://murmuring-caverns-57916.herokuapp.com/?fbclid=IwAR0E8Vnksjz5HCpYETW0BXSdTJwyKGfoqyePSObCCu3-I-GipxiRiNlfMmo");
            });
            $(".button__link__git").each(function () {
                $(this).attr("href", "https://github.com/IvanNajdovski/test-test");
            });
        } else if (index === 6) {
            $(".project__name").text("My Portfolio Page");
            $(".project__details").text("My portfolio page where i connected my projects and provided great UX experience, implemented some cool effects and animation. The most challenging was building the Chat feature where you can talk to me directly via web-sockets, im using sockets-IO to emit events forward and back from the server and client... there meaby some bugs in error handling but ive tested it and it works just fine go on try it. just couldnt import on remote server but on Heroku works nice");
            $(".button__link__page").each(function () {
                $(this).attr("href", "https://quiet-beyond-43532.herokuapp.com");
            });
            $(".button__link__git").each(function () {
                $(this).attr("href", "https://github.com/IvanNajdovski/Portfolio-Page");
            });
        }

        setTimeout(function () {
            $(".projects__content__photos__desktop").children("img").attr("src", `img/project__${index}/desktop.jpg`);
            $(".projects__content__photos__mobile").children("img").attr("src", `img/project__${index}/mobile.jpg`);
            $(".projects__content__photos__desktop").addClass("active");
            $(".projects__content__photos__mobile").addClass("active");
        }, 500);

    });
    //--------------------PROJECT PHOTOS ROTATION--------------------
    $(".projects__content__photos").on("mousemove", function (e) {
        var offsetX;
        var offsetY;
        var x = e.pageX;
        var y = e.pageY;
        var top = $(".projects__content__photos").offset().top;
        var left = $(".projects__content__photos").offset().left;
        offsetX = (x - (left + ($(".projects__content__photos").outerWidth() / 2))) / 50;
        offsetY = (y - (top + ($(".projects__content__photos").outerHeight() / 2))) / 30;


        $(".projects__content__photos").css("translation", "transform .5s");
        $(".projects__content__photos").css("transform", ` translateY(-100px) rotateX(${offsetY}deg) rotateY(${offsetX}deg)`);
        $(".projects__content__photos-wrapper").css("transform", `rotateX(${offsetY}deg) rotateY(${offsetX}deg)`);

    });
    var count;
    var counter = 0
    $(".skill").on("mouseover", function () {
        $(this).children("div").children("img").addClass("active");
        $(this).find(".under").addClass("active");
    });
    $(".skill").one("mouseover", function () {
        var percent = $(this).find(".under");
        if (percent.attr("aria-label")) {
            setTimeout(function () {
                var count = setInterval(function () {
                    counter++
                    percent.text(counter + "%");
                    if (counter >= Number(percent.attr("aria-label"))) {
                        clearInterval(count);
                    }
                }, 25);
            }, 300);
        }

    });

    $(".skill").on("mouseleave", function () {
        $(this).children("div").children("img").removeClass("active");
        $(this).find(".under").removeClass("active");
        counter = 0
        clearInterval(count);
    });


    var delay = 0;
    $(window).on("resize scroll", function () {
        $(".form__animation__left").each(function () {
            isScrolledIntoViewLeft($(this));
        });
        $(".form__animation__right").each(function () {
            isScrolledIntoViewRight($(this));
        });
        $(".projects__box__header").each(function () {
            isScrolledIntoView($(this));
        });
        $(".form__box__form").children().each(function () {
            isScrolledIntoViewVanila($(this));
        });

    });
    $(window).one("resize scroll", function () {
        $(".form__box__form").children().each(function () {
            delay = delay + .2;

            $(this).css("transition-delay", `${delay}s`);
        })
    });

    // -----------------LINK ANIMATION ----------------
    $(".navbar__link").on("click", function (e) {
        if (this.hash !== "") {
            e.preventDefault();
            var hash = this.hash
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 1000, function () {
                window.location.hash = hash;
            });
        }
    });

    $(".chat__label").on("click", function(){
        $(".chat__label").siblings().toggleClass("active");
        //$(".chat__label").siblings("button").addClass("active");
    });

    //----------------------SVG ICON MOVE---------------------
    // $(window).on("scroll", function(){
    //     var size = $(document).height() - $(window).height();
    //     var scroll = $(window).scrollTop() ;
    //     var percent = 100-(((size - scroll) / size) *100)
    //     console.log(percent)
    //     if(scroll > 300){
    //         if(scroll === size){
    //             $(".logo").css("top",`100%`)
    //             $(".logo").css("left",`50%`)
    //         }else {
    //             $(".logo").css("top", `${percent}%`)
    //             $(".logo").css("left", `3rem`)
    //         }
    //     }
    //
    // })

    // ---------------------CHAT ANIMATION{


});





