(function( $ ){
    $.fn.SlideShow = function( options ) {  
        var settings = $.extend( {
          'timeout'          : 7000
        }, options);
        return this.each(function() {        
            var slideshow = this;
            $(slideshow).show();
            $(slideshow).find('.slide').not(".active").hide();
            setInterval(function(){
                $(slideshow).find(".slide.active").fadeOut("fast", function(){
                    active = $(slideshow).find(".slide.active");
                    active.removeClass("active");
                    if (active.hasClass("last")){
                        $(slideshow).find(".slide.first").addClass("active").fadeIn("slow");
                    }else{
                        active.next('.slide').addClass("active").fadeIn("slow");
                    }
                })
            }, settings.timeout)
        });
    };
})( jQuery );
