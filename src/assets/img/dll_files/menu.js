(function ($) {
    "use strict";
    $(document).ready(function(){
        var $menu = $('.nav-menu');
        $menu.find('ul.sub-menu > li').each(function(){
            var $submenu = $(this).find('>ul');
            if($submenu.length == 1){
                $(this).hover(function(){
                    if($submenu.offset().left + $submenu.width() > $(window).width()){
                        $submenu.addClass('back');
                    }else if($submenu.offset().left < 0){
                        $submenu.addClass('back');
                    }
                }, function(){
                    $submenu.removeClass('back');
                });
            }
        });
        /* Menu drop down*/
        $('.nav-menu li.menu-item-has-children').append('<span class="cs-menu-toggle"><i class="icon icon-arrows-right"></i></span>');
        $('.cs-menu-toggle').click(function(){
            $(this).prev().toggleClass('submenu-open');
        });
        /* Page Fixed Menu */
        $('.header-fixed-page').parents('body').addClass('remove-margin-top');
        $('#cshero-header.no-sticky').parents('body').addClass('remove-margin-top');

        /* Onepage Dropdown Menu */
        $('.page-has-onepage ul#menu-main-menu').on('click', 'a', function (e) {
            $('#cshero-menu-mobile').click();
        });
    });

    /* Side Menu */
    if ($('#haswell-menu-trigger').length) {
        var sliding_content = $('.haswell-content-side-wrap'),
            sliding_nav = $('.sidemenu-wrap'),
            sliding_header = $('.header-side-wrap');


        $('#haswell-menu-trigger').on('click', function(e) {
            e.preventDefault();

            if ($(this).hasClass('is-clicked')) {
                $(this).removeClass('is-clicked');
                sliding_content.removeClass('lateral-menu-is-open');
                sliding_nav.removeClass('lateral-menu-is-open');
                sliding_header.removeClass('lateral-menu-is-open');
            } else {
                $(this).addClass('is-clicked');
                sliding_content.addClass('lateral-menu-is-open');
                sliding_nav.addClass('lateral-menu-is-open');
                sliding_header.addClass('lateral-menu-is-open');
            }
        });
    }
    /* dropdown side menu */
    $('.sidemenu-wrap .menu-item-has-children, #menu-w_leftmenu .menu-item-has-children').children('a').click(function(e){
        e.preventDefault();
        $(this).toggleClass("submenu-open").next(".sub-menu").slideToggle(200).addClass('sub-menu-open').end().parent(".menu-item-has-children").siblings(".menu-item-has-children").children("a").removeClass("submenu-open").next(".sub-menu").removeClass('sub-menu-open').slideUp(200);
    });
        
    /* Full screen menu */
    if ($('#haswell-fullscreen-trigger').length) {
        var fw_nav = $('.fullscreen-menu-wrap');

        $('#haswell-fullscreen-trigger').on('click', function(e) {
            e.preventDefault();

            if ($(this).hasClass('is-clicked')) {
                $(this).removeClass('is-clicked');
                fw_nav.removeClass('is-visible');
            } else {
                $(this).addClass('is-clicked');
                fw_nav.addClass('is-visible');
            }
        });
    }

})(jQuery);
