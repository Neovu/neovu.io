$(document).ready(function() {

    // Refresh Resize Window
    var windowsize = $(window).width();

    $(window).resize(function() {
        if (windowsize != $(window).width()) {
            location.reload();
            return;
        }
    });

    // MESSAGE CONTACT ANIMATION
    $("form textarea").focus(function() {
        $("#formContact form #nome, #formContact form #email")
                .animate({opacity: '1'}, 300);
        $("#formContact form #submit").removeClass("oculto");
        $("#formContact form #olaIcon").addClass("oculto");
        return false;
    });
    $("#contato #map_canvas").click(function() {
        $("#formContact form #nome, #formContact form #email")
                .animate({opacity: '0'}, 300);
        $("#formContact form #submit").addClass("oculto");
        $("#formContact form #olaIcon").removeClass("oculto");
        return false;
    });
    $("#contato #map_canvas").mouseout(function() {
        $("#formContact form #nome, #formContact form #email")
                .animate({opacity: '0'}, 300);
        $("#formContact form #submit").addClass("oculto");
        $("#formContact form #olaIcon").removeClass("oculto");
        return false;
    });

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

    // HOME RESIZE // SERVICO RESIZE // METODOLOGIA RESIZE
    var altura_tela = $(window).height();/*cria variável com valor do altura da janela*/
    $("#home-bg").height(altura_tela),
            $("#servico").height(altura_tela),
            $("#metodologia").height(altura_tela);
    $("#metodologia2").height(altura_tela);/* aplica a variável a altura da div*/
    $(window).resize(function() {
        var altura_tela = $(window).height();
        $("#home-bg").height(altura_tela),
                $("#servico").height(altura_tela),
                $("#metodologia").height(altura_tela);
        $("#metodologia2").height(altura_tela);
    });

    // BLOG MENU ANIMATION
    $('#sidebar a').click(function() {
        var $righty = $("#sidebar");
        $righty.animate({
            right: $righty.css('right') == "-300px" ? "0px" : "-300px"
        });
    });


    // Bind to scroll
    $(window).scroll(function() {
        // Get container scroll position
        var fromTop = $(this).scrollTop() + topMenuHeight;

        // Get id of current scroll item
        var cur = scrollItems.map(function() {
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                    .parent().removeClass("acao")
                    .end().filter("[href=#" + id + "]").parent().addClass("acao");
        }
    });
    //SMOOTH SCROLL//

    // Cache selectors
    var lastId,
            topMenu = $("#menuFixo"),
            topMenuHeight = topMenu.outerHeight() - 1,
            // All list items
            menuItems = topMenu.find("a"),
            // Anchors corresponding to menu items
            scrollItems = menuItems.map(function() {
                var item = $($(this).attr("href"));
                if (item.length) {
                    return item;
                }
            });

    // Bind click handler to menu items
    // so we can get a fancy scroll animatio
    menuItems.click(function(e) {
        var href = $(this).attr("href"),
                offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 1000);
        e.preventDefault();
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
                },
                        function() {
                            $elem.attr({title: savetitle, alt: savealt});
                        });
            });
        };
    })(jQuery);
    $(function() {
        $('a').hideTips();
    });

    // Scroll change menu bar //
    var nav = $('#menuFixo');
    $(window).scroll(function() {
        var value = $(this).scrollTop();
        if (value > 80) {
            nav.css("background", "#333").fadeIn("fast");
            nav.css("top", "0px");
            nav.css("position", "fixed");
            //$("#navigation li p").css("display","none");
        }
        else {
            nav.css("background", "transparent");
            nav.css("top", "80px");
            nav.css("position", "absolute");
            $("#navigation li p").css("display", "block");
        }
    });

    // Fixed Mobile //
    var mobile = $('#metodologia2 ul');
    $(window).scroll(function() {
        var valor = $(this).scrollTop();
        if (valor > 1500) {
            mobile.css("top", "-432px");

        }
        else {
            mobile.css("top", "0px");

        }

    });



    var ajuste = $(window).width();
    var slider = $("#servico article ul");
    $('#servico nav ul li:nth-child(1)').click(function() {
        if (ajuste < 479) {
            slider.animate({right: "300px"}, 300);
        }
        if (ajuste > 959) {
            slider.animate({right: "960px"}, 300);
        }
        return false;
    });




    // Change Case
    var one = $("#caseOne");
    var two = $("#caseTwo");
    var three = $("#caseThree");
    var lista = $('header #cases #navCases ul li');

    $(".caseOne,.caseTwo, .caseThree").click(function() {

        $('html, body').animate({
            scrollTop: $("#home").offset().top
        }, 1000);

    });

    lista.click(function() {
        $(this).toggleClass('white', 500);
        return false;
    });
    $(".btClose img").click(function() {
        $('#caseOne,#caseTwo, #caseThree').removeClass('mostra');
        $('.caseOne,.caseTwo, .caseThree').removeClass('white');
    });
    $(".caseOne").click(function() {
        one.toggleClass("mostra", 500, "swing");
        $('#caseTwo, #caseThree').removeClass('mostra');
        lista.not(this).removeClass('white');
//		$("header #cases #navCases ul li:nth-child(2) a").toggle(
//			function(){
//				$(this).text($(this).attr("title"));
//			},
//			function(){
//				$(this).text("X");
//			}
//		);
        return false;
    });
    $(".caseTwo").click(function() {
        two.toggleClass('mostra', 1000, "swing");
        $('#caseOne, #caseThree').removeClass('mostra');
        lista.not(this).removeClass('white');
        return false;
    });
    $(".caseThree").click(function() {
        three.toggleClass('mostra', 500, "swing");
        $('#caseOne, #caseTwo').removeClass('mostra');
        lista.not(this).removeClass('white');
        return false;
    });
    // Change Text Case
    var link1 = $("header #cases #navCases ul li:nth-child(1) a");
    var link2 = $("header #cases #navCases ul li:nth-child(2) a");
    var link3 = $("header #cases #navCases ul li:nth-child(3) a");
    var link4 = $("header #cases #navCases ul li:nth-child(4) a");

    var title1 = link1.attr("title");
    var title2 = link2.attr("title");
    var title3 = link3.attr("title");
    var title4 = link4.attr("title");

    link1.text(title1);
    link2.text(title2);
    link3.text(title3);
    link4.text(title4);


    // Animate Arrow
    function bounceDownButton() {
        $('#btMore img')
                .animate({bottom: '10px'}, 200)
                .animate({bottom: '30px'}, 200)
                .animate({bottom: '20px'}, 200)
                .animate({bottom: '30px'}, 200);
    }
    setInterval(bounceDownButton, 2000);

    function bounceDownDiv() {
        $('#metodologia #draw h2')
                .animate({bottom: '10px'}, 200)
                .animate({bottom: '30px'}, 200)
                .animate({bottom: '20px'}, 200)
                .animate({bottom: '30px'}, 200);
    }
    setInterval(bounceDownDiv, 5000);


    // SERVICE MENU ANIMATION
    var ajuste = $(window).width();
    var slider = $("#servico article ul");
    $('#servico nav ul li:nth-child(1)').click(function() {
        if (ajuste < 479) {
            slider.animate({right: "300px"}, 300);
        }
        if (ajuste > 959) {
            slider.animate({right: "960px"}, 300);
        }
        return false;
    });
    $('#servico nav ul li:nth-child(2)').click(function() {
        if (ajuste < 479) {
            slider.animate({right: "600px"}, 300);
        }
        if (ajuste > 959) {
            slider.animate({right: "1920px"}, 300);
        }
        return false;
    });
    $('#servico nav ul li:nth-child(3)').click(function() {
        if (ajuste < 479) {
            slider.animate({right: "900px"}, 300);
        }
        if (ajuste > 959) {
            slider.animate({right: "2880px"}, 300);
        }
        return false;

    });
    // MENU SERVICOS
    var lista2 = $("#servico nav ul li");

    $("#servico nav ul li:nth-child(1)").click(function() {
        $('#servico nav ul li:nth-child(1)').addClass('gray');
        lista2.not(this).removeClass('gray');
        return false;
    });
    $("#servico nav ul li:nth-child(2)").click(function() {
        $('#servico nav ul li:nth-child(2)').addClass('gray');
        lista2.not(this).removeClass('gray');
        return false;
    });
    $("#servico nav ul li:nth-child(3)").click(function() {
        $('#servico nav ul li:nth-child(3)').addClass('gray');
        lista2.not(this).removeClass('gray');
        return false;
    });

    // BG-IMG ANIMATION
    $('#metodologia[data-type="background"], header[data-type="background"]').each(function() {
        var $bgobj = $(this); // assigning the object

        $(window).scroll(function() {
            var yPos = -($(window).scrollTop() / $bgobj.data('speed'));

            // Put together our final background position
            var coords = '50% ' + yPos + 'px';

            // Move the background
            $bgobj.css({backgroundPosition: coords});
        });
    });




    //SCROLL EXTERNAL ANCHORS

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
    }
    $('#btMore, #btMore2,#metodologia3 h3 a').smoothScroll();

    // End scroll-------------------------------------------------------------------------

// Load IMG LAZY -->
    $("img.lazy").lazyload();
    $("img.lazy").lazyload({threshold: 80});
    $("img.lazy").lazyload({effect: "fadeIn"});

    // End Lazy IMG-------------------------------------------------------------------------

    // Google Maps -->

    var map_canvas = document.getElementById('map_canvas');
    var my_map = null;
    var marker = null;
    google.maps.event.addDomListener(window, 'load', initialize);
    google.maps.event.addListener(my_map, 'tilesloaded', function() {
        map_canvas.style.position = 'static';
        map_canvas.style.background = 'none';
    });
    function initialize() {

        var map_options = {
            center: new google.maps.LatLng(-27.40763, -48.42577),
            zoom: 18,
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
        marker = new google.maps.Marker({
            map: my_map,
            draggable: false,
            //animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(-27.408402, -48.42484),
            icon: 'images/llama.png',
            url: 'https://www.google.com.br/maps/preview/place/Neovu/@-27.4110206,-48.42525,17z/data=!4m2!3m1!1s0x0:0xe2f270b8db1ce3ef'
        });


        google.maps.event.addListener(marker, 'click', neovuLink);


        google.maps.event.addListener(marker, 'mouseout', toggleBounce);

    }
    function neovuLink() {
        url = "https://www.google.com.br/maps/place/Neovu/@-27.4110206,-48.42525,17z/data=!3m1!4b1!4m2!3m1!1s0x95274259b20fc0f1:0xe2f270b8db1ce3ef";
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

    // End Google Maps -----------------------------------------------------

});

