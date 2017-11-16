$('.fixed_bottom').hide();
$('.fixed_right').hide();

//POST-IT BOTTOM REVEAL
$(".close-button").click(function(){
  $('.fixed_bottom').hide();
});

$("#bottom_nav_show").click(function(){
  $('.fixed_bottom').show();
});

//LEADER BOARD SLIDE OUT
$('#leaderboard_slide_out').click(function() {
  $('.fixed_right').hide();
});

$("#leaderboard_show").click(function(){
  $('.fixed_right').show();
});
