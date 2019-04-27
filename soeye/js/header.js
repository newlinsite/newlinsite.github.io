$(function(){
    scroll();

    $(window).on('scroll resize', function(){
        var scrollHeight = 60,
            last = $("body").height()-$(window).height()-100,
            last2 = $("body").height()-$(window).height()-40,
            $header      = $('#header');
            $goTop      = $('#goTop');
        if($(window).scrollTop() > scrollHeight) {
            $header.addClass('mini');
        } else {
            $header.removeClass('mini');
        };
        if($(window).scrollTop() > scrollHeight) {
            $goTop.removeClass('hideden');
        } else {
            $goTop.addClass('hideden');
        };
        if($(window).scrollTop() > last) {
            $goTop.addClass('stop');
        } else {
            $goTop.removeClass('stop');
        };
        if($(window).scrollTop() > last) {
            $(".sidebar").addClass('stop');
        } else {
            $(".sidebar").removeClass('stop');
        };
    })
});


// header hover
$(document).ready(function(){
    // list 01
    $(".hover01 .a").hover(function(){
        $(".hover01 .card_hover_remove").removeClass('card_hovering');
        $(".hover01 .card_hover_0_ta").addClass('card_hovering');
        },function(){
        $(".hover01 .card_hover_0_ta").removeClass('card_hovering');
    });
    $(".hover01 .pull-down").hover(function(){
        $(".hover01 .card_hover_0_ta").addClass('card_hovering');
        },function(){
        $(".hover01 .card_hover_remove").removeClass('card_hovering');
    });
    
    $(".hover01 .card_hover_1").hover(function(){
        $(".hover01 .card_hover_remove").removeClass('card_hovering');
        $(".hover01 .card_hover_1_ta").addClass('card_hovering');
        },function(){
    });
    $(".hover01 .card_hover_2").hover(function(){
        $(".hover01 .card_hover_remove").removeClass('card_hovering');
        $(".hover01 .card_hover_2_ta").addClass('card_hovering');
        },function(){
    });
    $(".hover01 .card_hover_3").hover(function(){
        $(".hover01 .card_hover_remove").removeClass('card_hovering');
        $(".hover01 .card_hover_3_ta").addClass('card_hovering');
        },function(){
    });
    $(".hover01 .card_hover_4").hover(function(){
        $(".hover01 .card_hover_remove").removeClass('card_hovering');
        $(".hover01 .card_hover_4_ta").addClass('card_hovering');
        },function(){
    });
    $(".hover01 .card_hover_5").hover(function(){
        $(".hover01 .card_hover_remove").removeClass('card_hovering');
        $(".hover01 .card_hover_5_ta").addClass('card_hovering');
        },function(){
    });
    $(".hover01 .card_hover_6").hover(function(){
        $(".hover01 .card_hover_remove").removeClass('card_hovering');
        $(".hover01 .card_hover_6_ta").addClass('card_hovering');
        },function(){
        
    });
    // list 02
    $(".hover02 .a").hover(function(){
        $(".hover02 .card_hover_remove").removeClass('card_hovering');
        $(".hover02 .card_hover_0_ta").addClass('card_hovering');
        },function(){
        $(".hover02 .card_hover_0_ta").removeClass('card_hovering');
    });
    $(".hover02 .pull-down").hover(function(){
        $(".hover02 .card_hover_0_ta").addClass('card_hovering');
        },function(){
        $(".hover02 .card_hover_remove").removeClass('card_hovering');
    });
    
    $(".hover02 .card_hover_1").hover(function(){
        $(".hover02 .card_hover_remove").removeClass('card_hovering');
        $(".hover02 .card_hover_1_ta").addClass('card_hovering');
        },function(){
    });
    $(".hover02 .card_hover_2").hover(function(){
        $(".hover02 .card_hover_remove").removeClass('card_hovering');
        $(".hover02 .card_hover_2_ta").addClass('card_hovering');
        },function(){
    });
    $(".hover02 .card_hover_3").hover(function(){
        $(".hover02 .card_hover_remove").removeClass('card_hovering');
        $(".hover02 .card_hover_3_ta").addClass('card_hovering');
        },function(){
    });
    // list 03
    $(".hover03 .a").hover(function(){
        $(".hover03 .card_hover_remove").removeClass('card_hovering');
        $(".hover03 .card_hover_0_ta").addClass('card_hovering');
        },function(){
        $(".hover03 .card_hover_0_ta").removeClass('card_hovering');
    });
    $(".hover03 .pull-down").hover(function(){
        $(".hover03 .card_hover_0_ta").addClass('card_hovering');
        },function(){
        $(".hover03 .card_hover_remove").removeClass('card_hovering');
    });
    
    $(".hover03 .card_hover_1").hover(function(){
        $(".hover03 .card_hover_remove").removeClass('card_hovering');
        $(".hover03 .card_hover_1_ta").addClass('card_hovering');
        },function(){
    });
    $(".hover03 .card_hover_2").hover(function(){
        $(".hover03 .card_hover_remove").removeClass('card_hovering');
        $(".hover03 .card_hover_2_ta").addClass('card_hovering');
        },function(){
    });
    $(".hover03 .card_hover_3").hover(function(){
        $(".hover03 .card_hover_remove").removeClass('card_hovering');
        $(".hover03 .card_hover_3_ta").addClass('card_hovering');
        },function(){
    });
    // list 04
    $(".hover04 .a").hover(function(){
        $(".hover04 .card_hover_remove").removeClass('card_hovering');
        $(".hover04 .card_hover_0_ta").addClass('card_hovering');
        },function(){
        $(".hover04 .card_hover_0_ta").removeClass('card_hovering');
    });
    $(".hover04 .pull-down").hover(function(){
        $(".hover04 .card_hover_0_ta").addClass('card_hovering');
        },function(){
        $(".hover04 .card_hover_remove").removeClass('card_hovering');
    });
    
    $(".hover04 .card_hover_1").hover(function(){
        $(".hover04 .card_hover_remove").removeClass('card_hovering');
        $(".hover04 .card_hover_1_ta").addClass('card_hovering');
        },function(){
    });
    $(".hover04 .card_hover_2").hover(function(){
        $(".hover04 .card_hover_remove").removeClass('card_hovering');
        $(".hover04 .card_hover_2_ta").addClass('card_hovering');
        },function(){
    });
    $(".hover04 .card_hover_3").hover(function(){
        $(".hover04 .card_hover_remove").removeClass('card_hovering');
        $(".hover04 .card_hover_3_ta").addClass('card_hovering');
        },function(){
    });
    // list 04
    $(".hover05 .a").hover(function(){
        $(".hover05 .card_hover_remove").removeClass('card_hovering');
        $(".hover05 .card_hover_0_ta").addClass('card_hovering');
        },function(){
        $(".hover05 .card_hover_0_ta").removeClass('card_hovering');
    });
    $(".hover05 .pull-down").hover(function(){
        $(".hover05 .card_hover_0_ta").addClass('card_hovering');
        },function(){
        $(".hover05 .card_hover_remove").removeClass('card_hovering');
    });
    
    $(".hover05 .card_hover_1").hover(function(){
        $(".hover05 .card_hover_remove").removeClass('card_hovering');
        $(".hover05 .card_hover_1_ta").addClass('card_hovering');
        },function(){
    });
    $(".hover05 .card_hover_2").hover(function(){
        $(".hover05 .card_hover_remove").removeClass('card_hovering');
        $(".hover05 .card_hover_2_ta").addClass('card_hovering');
        },function(){
    });
    $(".hover05 .card_hover_3").hover(function(){
        $(".hover05 .card_hover_remove").removeClass('card_hovering');
        $(".hover05 .card_hover_3_ta").addClass('card_hovering');
        },function(){
    });
    $(".hover05 .card_hover_4").hover(function(){
        $(".hover05 .card_hover_remove").removeClass('card_hovering');
        $(".hover05 .card_hover_4_ta").addClass('card_hovering');
        },function(){
    });
    $(".hover05 .card_hover_5").hover(function(){
        $(".hover05 .card_hover_remove").removeClass('card_hovering');
        $(".hover05 .card_hover_5_ta").addClass('card_hovering');
        },function(){
    });
    $(".hover05 .card_hover_6").hover(function(){
        $(".hover05 .card_hover_remove").removeClass('card_hovering');
        $(".hover05 .card_hover_6_ta").addClass('card_hovering');
        },function(){
    });


    });



