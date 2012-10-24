/*
 * Slideshow plugin for jQuery.
 * Use: $('selector').SlideShow({options})
 * Options could be:
 *    - interval:  time interval to change slide. (default: 7000)
 *    - control_panel: list with button names to show:
 *             - prev   : show prev button
 *             - next   : show next button
 *             - pause  : show pause button
 *         (default: ['prev', 'next', 'pause'])
 */
(function( $ ){
    $.fn.SlideShow = function( options ) {  
        var settings = $.extend( {
          'timeout'         : 7000,
          'control_panel'   : ['prev', 'pause', 'next']
        }, options);
        return this.each(function() {        
            var slideshow = $(this);
            slideshow.show();
            slideshow.find('.slide').not(".active").hide();
            var wrapper = slideshow.wrap("<div class='jQSlide-wrapper'>").parent();

            var do_slideshow = function(){
                slideshow.find(".slide.active").fadeOut("fast", function(){
                    var active = $(slideshow).find(".slide.active");
                    active.removeClass("active");
                    if (active.hasClass("last")){
                        slideshow.find(".slide.first").addClass("active").fadeIn("slow");
                    }else{
                        active.next('.slide').addClass("active").fadeIn("slow");
                    }
                });
            };

            var interval_id = setInterval(do_slideshow, settings.timeout);            

            if(settings.control_panel.length>0){
               var cp = wrapper.append("<div class='control-panel'></div>").find('.control-panel');
               for(x in settings.control_panel){
                   var btn = settings.control_panel[x];
                   if(btn=='pause'){
                       cp.append("<div class='button pause'>II</div>").find('.button.pause').click(function(){
                           if(!slideshow.hasClass('paused')){
                               slideshow.addClass('paused');
                               clearInterval(interval_id);
                               this.innerHTML = "&#3;"
                           }else{
                               slideshow.removeClass('paused');
                               interval_id = setInterval(do_slideshow, settings.timeout);
                               this.innerHTML = "II";
                           }
                       });
                   }
               } 
            }
        });
    };
})( jQuery );
