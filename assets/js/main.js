(function($) {
    "use strict";

    /*	Table OF Contents
	==========================

	1-Navigation
	2-Sticky
	3-sliders
	4-Blog layout
	5-Contact
	6-Animations
	7-Google Maps
	8-Statistics Handling

    /*===================
    1-Navigation
    ===================*/

    var leftPos, newWidth, isNavClicked = false,
        $mainNav_animate = $(".navbar-nav");

    $mainNav_animate.append("<li id='XV-lamp'></li>");
    var $animation_tool = $("#XV-lamp");

    $animation_tool
        .width($(".active").width())
        .css("left", $(".active").position().left)
        .data("origLeft", $(".active").position().left)
        .data("origWidth", $animation_tool.width());

    function xv_lava($el, speed) {
        leftPos = $el.position().left;
        newWidth = $el.width();
        $animation_tool.stop().animate({
            left: leftPos,
            width: newWidth,
        }, speed);
    }

    $('.scrollto').click(function () {
        isNavClicked = true;
        $('.navbar-nav li').removeClass('active');
        $(this).parent().addClass('active');
        xv_lava($(this).parent(), 1000);
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 30
        }, 1500, function () {
            isNavClicked = false;
        });
        return false;
    });
	
    $(window).scroll(function () {
        if (!isNavClicked) {
            xv_lava($(".navbar-nav li.active"), 800);
        }
    });

    $('.navbar-nav li').hover(
        function () {
            if (!$(this).parent().hasClass('dropdown-menu')) {
                xv_lava($(this), 400);
            }
        }, function () {
            xv_lava($(".navbar-nav li.active"), 400);
        });


    $('ul.nav li.dropdown').click(
        function () {

            var state = $(this).data('toggleState');
            if (state) {
                $(this).children('ul.dropdown-menu').slideUp();
            } else {
                $(this).children('ul.dropdown-menu').slideDown();
            }
            $(this).data('toggleState', !state);
        });

    /*===================
    2-Sticky
    ===================*/
    $(window).on("resize", function () {
		xv_lava($(".navbar-nav li.active"), 100);
        $("#sticktop").sticky({
            topSpacing: 0
        });
        $(".access-project").sticky({
            topSpacing: $("#sticktop").parent('.sticky-wrapper').height()
        });
    }).resize();

    /*===================
    3- sliders
    ===================*/


    $('.fractionSlide').fractionSlider({
        dimensions: '1920,560',
        responsive: true,
        backgroundAnimation: true,
        slideTransitionSpeed: 1000,
        pager: false,
        startCallback: function () {
            $('.fractionSlide .slide').show();
        }
    });

    $(window).on("resize", function () {

        var ttl_projects;

        $('.clients-wrapper').carouFredSel({
            width: "100%",
			height:75,
            circular: true,
            auto: false,
            scroll: {
                items: 1,
                easing: "linear"

            },
            prev: {
                button: "#client-prev",
                key: "left"
            },
            next: {
                button: "#client-next",
                key: "right"
            },
        });

        $('#folio-row1').flexslider({
            animation: "slide",
            directionNav: false,
            controlNav: false,
            minItems: 1,
            itemWidth: 381,
            slideshow: false,
            start: function (slider) {
                slider.removeClass('loading');
            }

        });

        $('#folio-row2').flexslider({
            animation: "slide",
            directionNav: false,
            controlNav: false,
            minItems: 1,
            itemWidth: 381,
            slideshow: false,
            start: function (slider) {
                slider.removeClass('loading');
            }
        });


        $('#clientsInfo').flexslider({
            animation: "slide",
            directionNav: false,
            controlNav: false,
            slideshow: false,
        });




        $('#video-flex').flexslider({
            animation: "slide",
            directionNav: false,
            controlNav: false,
            slideshowSpeed: 7000,
            direction: "horizontal",
        });


        $('#project-slider').flexslider({
            animation: "slide",
            directionNav: false,
            controlNav: false,
            slideshow: false,
            start: function (slider) {
                ttl_projects = slider.count;
            },
        });



        var $showcase = $('#folio-row1');
        var $showcase2 = $('#folio-row2');

        $('#portfolio-next').click(function () {
            $showcase.flexslider("next");
            $showcase2.flexslider("next");
        });

        $('#portfolio-prev').click(function () {
            $showcase.flexslider("prev");
            $showcase2.flexslider("prev");
        });


        $('#single-slider').flexslider({
            animation: "slide",
            directionNav: false,
            controlNav: true,
        });


        var $detail = $('#project-slider');
        $('.next_p').click(function () {
            $detail.flexslider("next");
        });
        $('.prev_p').click(function () {
            $detail.flexslider("prev");
        });
        $('.first_p').click(function () {
            $('#project-slider').flexslider(0);
        });
        $('.last_p').click(function () {
            $('#project-slider').flexslider(ttl_projects);
        });

        $('.clients-wrapper li').click(function () {
            $('.clients-wrapper li').removeClass('active');
            $(this).addClass('active');
            $('#clientsInfo').flexslider($(this).index());
        });
        /*===================
		4 - Blog layout
		===================*/

        function onImagesLoaded($container, callback) {
            $container.before("<div class='load-img'></div>");
            var $images = $container.find("img");
            var imgCount = $images.length;
            if (!imgCount) {
                $('.load-img').hide();
                callback();
            } else {
                $("img", $container).each(function () {
                    $(this).one("load error", function () {
                        imgCount--;
                        if (imgCount === 0) {
                            $('.load-img').hide();
                            callback();
                        }
                    });
                    if (this.complete) $(this).load();
                });
            }
        }

        onImagesLoaded($(".blog-wrapper"), function () {

            var $bloglayout = $('.blog-wrapper');
            $bloglayout.show();

            $bloglayout.packery({
                itemSelector: '.blog-unit',
                gutter: 0
            });

        });


        var $commentlayout = $('.comment-layout');
        $commentlayout.packery({
            itemSelector: '.comment',
            gutter: 0
        });

        $('a.reply').click(function () {
            $('html, body').animate({
                scrollTop: $($.attr(this, 'href')).offset().top - 150
            }, 1000);
        });

    }).resize();


    /*===================
    5 - Contact
    ===================*/
		
	function IsEmail(email) {
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }
	
	
	 $("#contactform").submit(function () {
        var name = $("#name").val();
        var email = $("#email").val();
        var subject = $("#subject").val();
        var message = $("#message").val();
        var dataString = 'name=' + name + '&email=' + email + '&subject=' + subject + '&message=' + message;

        if(name == '' || !IsEmail(email) || subject == '' || message == '') {
           $('#valid-issue').html('Please Provide Valid Information').show();
        } else {
            $.ajax({
                type: "POST",
                url: "assets/php/submit.php",
                data: dataString,
                success: function () {
                    $('#contactform').hide();
                     $('#valid-issue').html('Your message has been sent,<BR> We will contact you back with in next 24 hours.').show();
                }
            });
        }
        return false;
    });
	

    /*===================
    6 - Animations
    ===================*/


    $('.record').bind('inview', function (event, visible) {
        if (visible === true) {
            if (!$('.record').hasClass('animated')) {
                growRecords();
            }
            $('.record').addClass('fadeInRight animated');
        }
    });


    $('.rotateX360').bind('inview', function (event, visible) {
        if (visible === true) {
            $(this).addClass('normal');
        }
    });

    $('.member').bind('inview', function (event, visible) {
        if (visible === true) {
            $(this).addClass('flipBackEffect');
        }
    });


    $('.project').bind('inview', function (event, visible) {
        if (visible === true) {
            $(this).addClass('flipBackEffect');
        }
    });

    $('.blog-visual').bind('inview', function (event, visible) {
        if (visible === true) {
            $(this).addClass('flipBackEffect');
        }
    });

    $('.animateFromLeft').bind('inview', function (event, visible) {
        if (visible === true) {

            $('.animateFromLeft').addClass('animated slideInLeft');
        }
    });
    $('.animateFromRight').bind('inview', function (event, visible) {
        if (visible === true) {
            $('.animateFromRight').addClass('animated slideInRight');
        }
    });


    /*================================
	7 - Google Maps
	================================*/

    $('.triangle').click(
        function () {
            var state = $(this).data('toggleState');
            if (state) {
                $(this).children('i').removeClass('icon-remove').addClass('icon-map-marker');
                $('.mapHandler').css('height', '0px');

            } else {
                $(this).children('i').addClass('icon-remove').removeClass('icon-map-marker');
                $('.mapHandler').css('height', '550px');
                $('html, body').animate({
                    scrollTop: $($.attr(this, 'href')).offset().top
                }, 500);
                contactemaps(contact_map, mapAddress, mapType, zoomLvl,map_style);
            }
            $(this).data('toggleState', !state);
        });

    var contact_map = 'contact-map',
        mapAddress = $('#contact-map').data('address'),
        mapType = $('#contact-map').data('maptype'),
        zoomLvl = $('#contact-map').data('zoomlvl'),
		map_style=$('#contact-map').data('dark');
		
			

    function contactemaps(selector, address, type, zoom_lvl,map_style) {
        var map = new google.maps.Map(document.getElementById(selector), {
            mapTypeId: google.maps.MapTypeId.type,
            scrollwheel: false,
            draggable: false,
            zoom: zoom_lvl,
			styles:(map_style)? [ {"stylers": [
							{ "hue": "#2A3448" },
							{ "invert_lightness": true },
							{ "lightness": 20 },
							{ "gamma": 0.81 },
							{ "saturation": -50 }
						  ]
					  },{
						  "featureType": "road.local",
						  "elementType": "labels",
						  "stylers": [
							{ "visibility": "off" }
						  ]
					  },{
						  "featureType": "landscape",
						  "stylers": [
							{ "visibility": "simplified" }
						  ]
					  },{
						  "featureType": "poi",
						  "stylers": [
							{ "visibility": "off" }
						  ]
					  },{
						  "featureType": "road",
						  "stylers": [
							{ "saturation": -65 }
						  ]
					  },{
						  "featureType": "water",
						  "stylers": [
							{ "saturation": -50 },
							{ "lightness": -25 }
						  ]
					  },{
						  "featureType": "road",
						  "stylers": [
							{ "gamma": 0.9 }
						  ]
						} 
					  ] : []
        });
        var map_pin = "assets/img/basic/pin.png";
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
                'address': address
            },
            function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    new google.maps.Marker({
                        position: results[0].geometry.location,
                        map: map,
                        icon: map_pin
                    });
                    map.setCenter(results[0].geometry.location);
					
					
					
                }
            });
    }



    /*================================
	8 - Statistics Handling
	================================*/
    function growRecords() {
        $('.records .stat').each(function () {
            var container = $(this);
            var total = container.attr('data-total');
            looper(total, container, 1200);
        });
    }

    function looper(total, target, duration) {
        if (duration) {
            var counter = 1;
            var speed = parseInt(duration / total);
            var interval = setInterval(function () {
                if (counter <= total) {
                    target.html(counter);
                } else {
                    target.html(total);
                    clearInterval(interval);
                }
                counter++;
            }, speed);
        } else {
            target.html(total);
        }
    }



})(jQuery);
