(function() {
  'use strict';

  $(document).ready(function () {
      console.log('document ready assign click');
      console.log($('.right'));
      $('.right').click(function () {
          console.log("right click");
          var position = $('.container').position(),
              r = position.left-$(window).width();
          $('.container').animate({
              'left': ''+r+'px'
          });
      });

      $('.left').click(function () {
          console.log("left click");
          var position = $('.container').position(),
              l=position.left+$(window).width();
          if(l<=0)
          {
              $('.container').animate({
                  'left': ''+l+'px'
              });
          }
      });
  });

  $(document).ready(function(){
    //Here we are getting the number of the divs with class contentContainer inside the div container
    var length = $('div .container').children('div .contentContainer').length;
    //Here we are setting the % width depending on the number of the child divs
    $(".container").width(length*100 +'%');
    console.log("ready");
  });
}());
