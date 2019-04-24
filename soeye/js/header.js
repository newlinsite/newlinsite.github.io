$(function(){
    scroll();

    $(window).on('scroll resize', function(){
        var scrollHeight = 60,
            last = $("body").height()-$(window).height()-200,
            $header      = $('#header');
            $goTop      = $('#goTop');
        if($(window).scrollTop() > scrollHeight) {
            $header.addClass('mini');
        } else {
            $header.removeClass('mini');
        };
        if($(window).scrollTop() > last) {
            $goTop.addClass('hideden');
        } else {
            $goTop.removeClass('hideden');
        }
    })
});

		// header hover

$(document).ready(function(){
    $(".a").hover(function(){
        $(".card_hover_remove").removeClass('card_hovering');
        },function(){
        $(".card_hover_1_ta").removeClass('');
    });
    $(".card_hover_1").hover(function(){
        $(".card_hover_remove").removeClass('card_hovering');
        $(".card_hover_1_ta").addClass('card_hovering');
        },function(){
        $(".card_hover_1_ta").removeClass('');
    });
    $(".card_hover_2").hover(function(){
        $(".card_hover_remove").removeClass('card_hovering');
        $(".card_hover_2_ta").addClass('card_hovering');
        },function(){
        $(".card_hover_2_ta").removeClass('');
    });
    $(".card_hover_3").hover(function(){
        $(".card_hover_remove").removeClass('card_hovering');
        $(".card_hover_3_ta").addClass('card_hovering');
        },function(){
        $(".card_hover_3_ta").removeClass('');
    });
    $(".card_hover_4").hover(function(){
        $(".card_hover_remove").removeClass('card_hovering');
        $(".card_hover_4_ta").addClass('card_hovering');
        },function(){
        $(".card_hover_4_ta").removeClass('');
    });
    $(".card_hover_5").hover(function(){
        $(".card_hover_remove").removeClass('card_hovering');
        $(".card_hover_5_ta").addClass('card_hovering');
        },function(){
        $(".card_hover_5_ta").removeClass('');
    });
    $(".card_hover_6").hover(function(){
        $(".card_hover_remove").removeClass('card_hovering');
        $(".card_hover_6_ta").addClass('card_hovering');
        },function(){
        $(".card_hover_6_ta").removeClass('');
    });
    });



