function onContactShowAnimation() {
    // $("#formContact form #nome, #formContact form #email").animate({opacity: '1'}, 300);
    // $("#formContact form #submit").removeClass("oculto");
    // $("#formContact form #olaIcon").addClass("oculto");
}

function onContactHideAnimation() {
    // $("#formContact form #nome, #formContact form #email").animate({opacity: '0'}, 300);
    // $("#formContact form #submit").addClass("oculto");
    // $("#formContact form #olaIcon").removeClass("oculto");
}

// HOME RESIZE // SERVICO RESIZE // METODOLOGIA RESIZE 
function onAdjustWindowHeigth(h) {
    $("#homePage").height(h);
    $("#servico").height(h);
    $("#metodologia").height(h);
    $("#contato").height(h*0.3);
//    $("#metodologia2").height(h*0.15+h);
    $("#labContent").height(h);
    // Os projetos dentro da home page
    $("#homePage > section:nth-child(2)").height(h);
    $("#homePage > section:nth-child(3)").height(h);
    $("#homePage > section:nth-child(4)").height(h);
}

function onGoogleMapsParafernalia() {
    var map_canvas = document.getElementById('map_canvas');
    var my_map = null;
    var marker = null;
    var map_options = {
        center: new google.maps.LatLng(-27.58796, -48.52221),
        zoom: 17,
        zoomControl: false,
        scaleControl: false,
        disableDefaultUI: true,
        //panControl: false,
        draggable: false,
        scrollwheel: false,
        disableDoubleClickZoom: false,
        styles: [
            {featureType: "all", stylers: [{"saturation": -100}, {"gamma": 0.76}, {"lightness": -32}]}
        ],
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    my_map = new google.maps.Map(map_canvas, map_options);
    google.maps.event.addDomListener(window, 'load', initialize);

    function initialize() {
        google.maps.event.addListener(my_map, 'tilesloaded', function() {
            map_canvas.style.position = 'static';
            map_canvas.style.background = 'none';
        });

        marker = new google.maps.Marker({
            map: my_map,
            draggable: false,
            //animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(-27.5888754, -48.5206298),
            icon: 'images/llama.png',
            url: 'https://www.google.com.br/maps/place/Neovu/@-27.5888754,-48.5206298,1530m/data=!3m1!1e3!4m2!3m1!1s0x95274259b20fc0f1:0xe2f270b8db1ce3ef'
        });
        google.maps.event.addListener(marker, 'click', neovuLink);
        google.maps.event.addListener(marker, 'mouseout', toggleBounce);


    }
    function neovuLink() {
        url = "https://www.google.com.br/maps/place/Neovu/@-27.5888754,-48.5206298,1530m/data=!3m1!1e3!4m2!3m1!1s0x95274259b20fc0f1:0xe2f270b8db1ce3ef";
        window.open(url, '_blank');
        //window.location='https://www.google.com.br/maps/place/Neovu/@-27.4110206,-48.42525,17z/data=!3m1!4b1!4m2!3m1!1s0x95274259b20fc0f1:0xe2f270b8db1ce3ef','_blank';
    }
    function toggleBounce() {
        if (marker.getAnimation() != null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }
}

function onLazyDog() {
    $("img.lazy, li.lazy").lazyload();
    $("img.lazy, li.lazy").lazyload({threshold: 80});
    $("img.lazy, li.lazy").lazyload({effect: "fadeIn"});

}

$(document).ready(function() {

    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    onAdjustWindowHeigth(windowHeight);
    $(window).resize(function() {
        // onAdjustWindowHeigth(windowHeight); //nao precisa porque no evento resize ele vai carregar novamente a pagina
        if (windowWidth != $(window).width()) {
            location.reload();
            return;
        }
    });

    // MESSAGE CONTACT ANIMATION
    $("form textarea").focus(onContactShowAnimation);
    $("form textarea").click(onContactShowAnimation);
    $("#contato #map_canvas").click(onContactHideAnimation);
    $("#contato #map_canvas").mouseout(onContactHideAnimation);

    // Placeholder Fix IE
    $('[placeholder]').focus(function() {
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
            input.val('');
            input.removeClass('placeholder');
        }
    }).blur(function() {
        var input = $(this);
        if (input.val() == '' || input.val() == input.attr('placeholder')) {
            input.addClass('placeholder');
            input.val(input.attr('placeholder'));
        }
    }).blur();

    // BLOG MENU ANIMATION
    $('#sidebar').click(function() {
        $(this).animate({
            right: $(this).css('right') == "-300px" ? "0px" : "-300px"
        });
    });



    // Tooltip Hidden // 
    (function($) {
        $.fn.hideTips = function() {
            return this.each(function() {
                var $elem = $(this);
                var savealt = $elem.attr('alt');
                var savetitle = $elem.attr('title');
                $elem.hover(function() {
                    $elem.removeAttr('title').removeAttr('alt');
                }, function() {
                    $elem.attr({title: savetitle, alt: savealt});
                });
            });
        };
    })(jQuery);
    $(function() {
        $('a').hideTips();
    });


    $("#slideModileUl").on("touchstart click", function(e) {
        $('#slideModileUl li:first-child').fadeOut("slow", function() {
            $(this).next('li').fadeIn("slow").end().appendTo('#slideModileUl');
        });
    });




    //Menu Fixo: Scroll
    var lastId;
    var menuFixo = $("header");
    var topMenuHeight = menuFixo.outerHeight() - 1;
    var menuItems = menuFixo.find("a");
    var scrollItems = menuItems.map(function() {
        var item = $($(this).attr("href"));
        if (item.length) {
            return item;
        }
    });
    menuItems.click(function(e) {
        e.preventDefault();
        var href = $(this).attr("href");
        var offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 1000);

    });
    
    $(window).scroll(function() {
        //variavel semi-global
        var hScrollTop = $(this).scrollTop();

        //Menu Fixo:SpyScroll
        var fromTop = hScrollTop + topMenuHeight;
        var cur = scrollItems.map(function() {
            if ($(this).offset().top < fromTop)
                return this;
        });
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";
        if (lastId !== id) {
            lastId = id;
            menuItems.parent().removeClass("acao").end().filter("[href=#" + id + "]").parent().addClass("acao");
        }

        $('header > section > nav li.last a').click(function() {
            windows.open('http://www.neovu.com.br/neovu/lab.html', '_blank');
        });

        //Menu Fixo: barra cinza
        if (hScrollTop > 80) {
            menuFixo.css("background", "#333").fadeIn("fast");
            menuFixo.css("top", "0px");
            menuFixo.css("position", "fixed");
        }
        else {
            menuFixo.css("background", "transparent");
            menuFixo.css("top", "80px");
            menuFixo.css("position", "absolute");
            $("#navigation li p").css("display", "block");
        }
        
         $('#slideModileUl li:first-child').fadeOut("slow", function() {
            $(this).next('li').fadeIn("slow").end().appendTo('#slideModileUl');
        });
    });

    $(".scrollToTop").click(function() {
        $('html, body').animate({
            scrollTop: $("#home").offset().top
        }, 1000);
    });


    // Change Case 
    var listaHomePage = $('#homePage #cases #navCases ul li');
    var listaLink = $('#homePage #cases #navCases ul li a');
    listaHomePage.click(function() {
        $(this).toggleClass('white', 500);
        return false;
    });
    $(".btClose").click(function() {
        $('#homePage > section:nth-child(2),#homePage > section:nth-child(3), #homePage > section:nth-child(4)').addClass('oculto');
        $('.caseOne,.caseTwo, .caseThree').removeClass('white');
    });
    $(".caseOne").click(function() {
        $("#homePage > section:nth-child(2)").toggleClass("oculto", 500, "swing");
        $('#homePage > section:nth-child(3), #homePage > section:nth-child(4)').addClass('oculto');
        listaHomePage.not(this).removeClass('white');
        return false;
    });
    $(".caseTwo").click(function() {
        $("#homePage > section:nth-child(3)").toggleClass('oculto', 1000, "swing");
        $('#homePage > section:nth-child(2), #homePage > section:nth-child(4)').addClass('oculto');
        listaHomePage.not(this).removeClass('white');
        return false;
    });
    $(".caseThree").click(function() {
        $("#homePage > section:nth-child(4)").toggleClass('oculto', 500, "swing");
        $('#homePage > section:nth-child(2), #homePage > section:nth-child(3)').addClass('oculto');
        listaHomePage.not(this).removeClass('white');
        return false;
    });
    $(".sobre").click(function() {
        $('#homePage > section:nth-child(2), #homePage > section:nth-child(3),#homePage > section:nth-child(4)').addClass('oculto');
        listaHomePage.not(this).removeClass('white');
        return false;
    });

    var link1 = $("#homePage #cases #navCases ul li:nth-child(1) a");
    var link2 = $("#homePage #cases #navCases ul li:nth-child(2) a");
    var link3 = $("#homePage #cases #navCases ul li:nth-child(3) a");
    var link4 = $("#homePage #cases #navCases ul li:nth-child(4) a");
    var title1 = link1.attr("title");
    var title2 = link2.attr("title");
    var title3 = link3.attr("title");
    var title4 = link4.attr("title");
    link1.text(title1);
    link2.text(title2);
    link3.text(title3);
    link4.text(title4);

    //    Animate Arrow
    // function bounceDownButton() {
    //     $('#btMore img')
    //             .animate({bottom: '10px'}, 100)
    //             .animate({bottom: '30px'}, 200)
    //             .animate({bottom: '20px'}, 300)
    //             .animate({bottom: '30px'}, 200)
    //             .animate({bottom: '20px'}, 300);
    // }
    // setInterval(bounceDownButton, 2000);


    var sliderService = $("#servico article ul");
    $('#servico nav ul li:nth-child(1)').click(function() {
        if (windowWidth < 479) {
            sliderService.animate({right: "300px"}, 300);
        }
        if (windowWidth > 960) {
            sliderService.animate({right: "960px"}, 300);
        }
        if (windowWidth > 768 && windowWidth < 959) {
            sliderService.animate({right: "771px"}, 300);
        }
        return false;
    });
    $('#servico nav ul li:nth-child(2)').click(function() {
        if (windowWidth < 479) {
            sliderService.animate({right: "600px"}, 300);
        }
        if (windowWidth > 960) {
            sliderService.animate({right: "1920px"}, 300);
        }
        if (windowWidth > 768 && windowWidth < 959) {
            sliderService.animate({right: "1538px"}, 300);
        }
        return false;
    });
    $('#servico nav ul li:nth-child(3)').click(function() {
        if (windowWidth < 479) {
            sliderService.animate({right: "900px"}, 300);
        }
        if (windowWidth > 960) {
            sliderService.animate({right: "2880px"}, 300);
        }
        if (windowWidth > 768 && windowWidth < 959) {
            sliderService.animate({right: "2304px"}, 300);
        }
        return false;

    });
    // MENU SERVICOS
    var listaService = $("#servico nav ul li");
    $("#servico nav ul li:nth-child(1)").click(function() {
        $('#servico nav ul li:nth-child(1)').addClass('gray');

        listaService.not(this).removeClass('gray');
        return false;
    });
    $("#servico nav ul li:nth-child(2)").click(function() {
        $('#servico nav ul li:nth-child(2)').addClass('gray');
        listaService.not(this).removeClass('gray');
        return false;
    });
    $("#servico nav ul li:nth-child(3)").click(function() {
        $('#servico nav ul li:nth-child(3)').addClass('gray');
        listaService.not(this).removeClass('gray');
        return false;
    });


    // BG-IMG ANIMATION
    $('#homePage[data-type="background"],#labContent[data-type="background"]').each(function() {
        var $bgobj = $(this);
        $(window).scroll(function() {
            var yPos = -($(window).scrollTop() / $bgobj.data('speed'));
            var coords = '50% ' + yPos + 'px';
            $bgobj.css({backgroundPosition: coords});
        });
    });

    //  SCROLL EXTERNAL ANCHORS 
    jQuery.fn.smoothScroll = function() {
        $(this).each(function() {
            var node = $(this);
            $(node).click(function(e) {
                var anchor = $(this).attr('href');
                anchor = anchor.split("#");
                anchor = anchor[1];
                var t = 0;
                var found = false;
                var tName = 'a[name=' + anchor + ']';
                var tId = '#' + anchor;
                if (!!$(tName).length) {
                    t = $(tName).offset().top - 54;
                    if ($(tName).text() == "") {
                        t = $(tName).parent().offset().top - 54;
                    }
                    found = true;
                } else if (!!$(tId).length) {
                    t = $(tId).offset().top - 54;
                    found = true;
                }
                if (found) {
                    $("body, html").animate({scrollTop: t}, 1000);
                }
                e.preventDefault();
            });
        });
        var lAnchor = location.hash;
        if (lAnchor.length > 0) {
            lAnchor = lAnchor.split("#");
            lAnchor = lAnchor[1];
            if (lAnchor.length > 0) {
                $("body, html").scrollTop(0);
                var lt = 0;
                var lfound = false;
                var ltName = 'a[name=' + lAnchor + ']';
                var ltId = '#' + lAnchor;
                if (!!$(ltName).length) {
                    lt = $(ltName).offset().top - 54;
                    if ($(ltName).text() == "") {
                        lt = $(ltName).parent().offset().top - 54;
                    }
                    lfound = true;
                } else if (!!$(ltId).length) {
                    lt = $(ltId).offset().top - 54;
                    lfound = true;
                }
                if (lfound) {
                    $("body, html").animate({scrollTop: lt}, 1000);
                }
            }
        }
    };
    $('a[href="#metodologia2"],a[href="#sobre"], #sobre h3 a').smoothScroll();
    // End scroll-------------------------------------------------------------------------

    onLazyDog();
    onGoogleMapsParafernalia();

});

