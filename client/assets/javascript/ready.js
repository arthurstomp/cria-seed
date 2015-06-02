

$(document).ready(function () {
    $('.right').click(function () {
        var position = $('.container').position();
        var r=position.left-$(window).width()
        $('.container').animate({
            'left': ''+r+'px'
        });
    });

    $('.left').click(function () {
        var position = $('.container').position();
        var l=position.left+$(window).width()
        if(l<=0)
        {
            $('.container').animate({
                'left': ''+l+'px'
            });
        }
    });
});





//Here we are getting the number of the divs with class contentContainer inside the div container
var length = $('div .container').children('div .contentContainer').length;
//Here we are setting the % width depending on the number of the child divs
$(".container").width(length*100 +'%');