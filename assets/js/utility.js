var MODULES = MODULES || {};
MODULES.Utility = {};

MODULES.Utility.HeaderMenu = (function ($) {
    
        var info = "Header Menu";
        var _self = this;
        function init() {
            buildCache();
            eventListener();
        }
    
        function buildCache() {
            _self.$header = $(".main-nav-list .main-nav-list-item");
            _self.$menu = $(".main-dropdown");
            _self.$submenuleft = $(".main-dropdown .secondary-area-item");
        }
    
        function eventListener() {
            _self.$header.hover(openMenu, closeMenu);

        }
    
        function openMenu(_el) {
            var sabmenu = $(this).find(".main-dropdown");
            sabmenu.addClass("active");
            sabmenu.find($submenuleft).hover(openSubmenu, closeSubmenu);
            $(".main-dropdown .secondary-area-item:first-child").addClass('active');
            $(".main-dropdown .tertiary-wrap:first-child").addClass('active');

        }
    
        function closeMenu(_el) {
            var sabmenu = $(this).find(".main-dropdown");
            sabmenu.removeClass("active");

        }

        function openSubmenu(_el) {
            var sabmenuLeft = $(this);
            var leftAttr = sabmenuLeft.attr("data-submenu-id");
            var submenuRight = $('.tertiary-wrap[data-submenu-id="'+leftAttr+'"]');
            submenuRight.addClass('active');
            sabmenuLeft.addClass("active");

        }

        function closeSubmenu(_el) {
            var sabmenuLeft = $(this);
            var leftAttr = sabmenuLeft.attr("data-submenu-id");
            var submenuRight = $('.tertiary-wrap[data-submenu-id="'+leftAttr+'"]');
            submenuRight.removeClass('active');
            sabmenuLeft.removeClass("active");
        }

        return init;
    
})(jQuery);


MODULES.Utility.OwlCarousel = (function ($) {

    var info = "Carousel";
    var _self = this;

    function init() {
        buildCache();
        owlInit();
    }

    function buildCache() {
        _self.owlTopSlider = $('.top-slider')
        _self.owlTopBannerSlider = $('.top-banner-slider')
        _self.owlOfferSlider = $('.offer-slider')
        _self.owlImageSlider = $('.image-slider')
    }

    function owlInit() {
        _self.owlTopSlider.each(function () {
            $(this).owlCarousel({
                loop: true,
                items: 1,
                autoplay: true,
                autoplayTimeout: 3000,
            });

        })
        _self.owlTopBannerSlider.each(function () {
            $(this).owlCarousel({
                loop: true,
                nav: true,
                items: 1,
                autoplay: false,
                navText:["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"],
                dotsData: true
            });
            $('.owl-dot').click(function () {
                owl.trigger('to.owl.carousel', [$(this).index(), 300]);
              });
        })
        _self.owlOfferSlider.each(function () {
            $(this).owlCarousel({
                loop: true,
                nav: true,
                items: 5,
                slideBy: 5,
                autoplay: false,
                loop: false,
                autoplayTimeout: 1000,
                navText:["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"],
            });
        })
        _self.owlImageSlider.each(function () {
            $(this).owlCarousel({
                loop: true,
                nav: true,
                items: 1,
                autoplay: false,
                loop: false,
                autoplayTimeout: 1000,
                navText:["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"],
            });
        })
    }

    function eventListener() { }

    return init;

})(jQuery);

MODULES.Utility.BrandMenu = (function ($) {
    
    var info = "Brand Area";
    var _self = this;
    function init() {
        buildCache();
        eventListener();
    }

    function buildCache() {
        _self.$tabTitle = $("#brand-tabs-nav li");
        _self.$tabTitleTwo = $("#brand-tabs-nav-two li");
        _self.$tabContent = $("#tabs-content .brand-tabs-content");
        _self.$tabContentTwo = $("#tabs-content-two .brand-tabs-content");
    }

    function fetchBrandData(){
        fetch('/assets/data/data.json')
        .then(response => response.json())
        .then(data => {
            var tabTitle = '',
                tabContent = '';
            $.each(data, function(index, value){
                var id = index+1;
                tabTitle += '<li>'+
                '<a href="#tab'+id+'" class="seg-brand-wrapper" title="" data-title="'+value.brandName+'" data-order="'+id+'"><span>'+value.brandName+'</span>'+
                '<img class="sm-hidden-img" loading="lazy" src="'+value.brandLogo+'" width="60" height="60">'+
                '</a>'+
                '</li>';
            })
            $('#brand-tabs-nav').html(tabTitle);

            $.each(data, function(index, value){
                var id = index+1;
                    
                tabContent += '<div id="'+id+'" class="brand-tabs-content">'+
                '<div class="brand-tabs-content-banner">'+
                '<a href="'+value.brandUrl+'">'+
                '<img class="seg-brand-image" loading="lazy" src="'+value.brandImage+'" alt="'+value.brandName+'">'+
                '</a></div>'+
                '<div class="brand-tabs-content-product">';
                $.each(value.products, function(index, value){
                    var discount = 100 - (value.price*100/value.oldPrice);
                    discount.toFixed(2);
                    if(value.oldPrice){
                        var discount = '<span class="seg-prod-discount">'+discount.toFixed(0)+'%</span>'
                        var oldPrice = '<div class="seg-old-price">'+value.oldPrice+' TL</div>';
                        var price = '<div class="seg-regular-price">'+value.price+' TL</div>';
                    }else{
                        var discount = '<span class=""></span>'
                        var oldPrice = '';
                        var price = '<div class="seg-regular-price different">'+value.price+' TL</div>';
                    }
                    tabContent += '<div class="seg-rec-product">'+
                    '<a class="no-click" href="'+value.url+'" target="_self" title="'+value.brand+'">'+
                    '<span class="seg-product-images">'+
                    discount+
                    '<img src="'+value.image+'" loading="lazy" title="'+value.productName+'">'+
                    '</span>'+
                    '<div class="seg-prod-content">'+
                    '<span class="seg-product-title">'+value.name+'</span>'+
                    '<span class="seg-price-box">'+
                    price+
                    oldPrice+
                    '<div class="seg-price-discount-empty"></div>'+
                    '</span>'+
                    '<div class="seg-view-prod"><button class="seg-view-prod-button">Sepete Ekle</button></div>'+
                    '</div>'+
                    '</a>'+
                    '</div>';
                });
                tabContent += '</div>'+
                '</div>';
            });
            $('#tabs-content').html(tabContent);
        })
    }
    fetchBrandData();

    function eventListener() {
        _self.$tabTitle.on('mouseenter', openTab);
        _self.$tabTitleTwo.on('mouseenter', openTabTwo);
        $('#brand-tabs-nav li:first-child').addClass('active');
        $('#brand-tabs-nav li:first-child a').addClass('active');
        $('#brand-tabs-nav-two li:first-child').addClass('active');
        $('#brand-tabs-nav-two li:first-child a').addClass('active');
        $tabContent.hide();
        $('.brand-tabs-content:first-child').addClass('active');
    }

    function openTab(_el){
        var list = $(this);
        $tabTitle.removeClass('active');
        $tabTitle.find('a').removeClass('active');
        list.addClass('active');
        list.find('a').addClass('active');
        $tabContent.removeClass('active');
        $tabContent.hide();

        var activeTab = list.find('a').attr('data-order');
        $('#'+activeTab).fadeIn();
        $('#'+activeTab).addClass('active');
        $('#tabs-content .brand-tabs-content[id='+activeTab+']').addClass('active');
        return false;
    }
    function openTabTwo(_el){
        var list = $(this);
        $tabTitleTwo.removeClass('active');
        $tabTitleTwo.find('a').removeClass('active');
        list.addClass('active');
        list.find('a').addClass('active');
        $tabContentTwo.hide();

        var activeTab = $(this).find('a').attr('data-order');
        $('#'+activeTab).fadeIn();
        return false;
    }


    return init;

})(jQuery);
MODULES.Utility.EventListeners = (function ($) {
    
    var info = "All Events";
    var _self = this;
    function init() {
        eventListener();
    }
    function eventListener() {
        var modalBtn = $('.hidden-modal'),
            backToTop = $('#back-to-top'),
            noClick = $('.no-click'),
            addBasketBtn = $('.seg-view-prod-button');

        modalBtn.trigger('click');

        $(window).scroll(function(){
            if ($(this).scrollTop() > 250) {
                $(backToTop).addClass('shown');
            } else {
                $(backToTop).removeClass('shown');
            }
        }); 

        $(backToTop).click(function(){
            $("html, body").animate({ scrollTop: 0 }, 500);
            return false;
        });

        noClick.on('click', function(e){
            e.preventDefault();
        });

        $(addBasketBtn).on('click', function(){
            var popup = '';
            popup += '<div class="popup-container">'+
            '<div class="icon">'+
            '<img loading="lazy" src="assets/img/icons/delivered.svg" alt="Sepet">'+
            '</div>'+
            '<div class="popup-content">'+
            '<span class="popup-content-title">Ürün sepete eklendi.</span>'+
            '<a href="#">Sepete Git</a>'+
            '</div>'+
            '</div>';
            $('body').append(popup);
            setTimeout(function(){
                $('.popup-container').fadeOut();
            }, 5000);

            $('.popup-container').on('click', function(){
                $('.popup-container').fadeOut();
            });
        });


    }
    return init;

})(jQuery);

$(function () {
    $(window).on('load', function(){
        MODULES.Utility.HeaderMenu();
        MODULES.Utility.BrandMenu();
        MODULES.Utility.OwlCarousel();
        MODULES.Utility.EventListeners();
    })
})