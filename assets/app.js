

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB-oSIp-lGKykAVqmMtMKPJ52XPpBHAijQ",
    authDomain: "post-it-c9bc7.firebaseapp.com",
    databaseURL: "https://post-it-c9bc7.firebaseio.com",
    projectId: "post-it-c9bc7",
    storageBucket: "post-it-c9bc7.appspot.com",
    messagingSenderId: "314587791240"
  };
  firebase.initializeApp(config);

var database = firebase.database();
var ref = database.ref();

var topics = ["topic1", "topic2"];

ref.child("Topic").update(topics);

ref.child("Topic").limitToLast(1).on("child_added", function(snap){

	// var index = snap.numChildren();
	var topic = snap.val();
	// console.log(topic)
	$("#topic_text").text(topic);
});

ref.child("time_left").on("value",function(snap){
	var time_left = snap.val();
	// console.log(time_left)
	// var time_left = 1000;
	 setInterval(time_decrease, 1000);
	 
	 function time_decrease(){

	 time_left -=1;

	 if (time_left==0){
	 		time_left=1200;
	 	}

	 var time_update = {time_left : time_left}
	 // 	// console.log(time_left)
		ref.update(time_update);
		$("#timer_display").text("Time Left: "+time_left)
	 }


})

// function timer(){
	
// 	var time_left = 30;
// }


// function timer_converter (t) {

//     var minutes = Math.floor(t / 60);
//     var seconds = t - (minutes * 60);

//     if (seconds < 10) {
//       seconds = "0" + seconds;
//     }

//     if (minutes === 0) {
//       minutes = "00";
//     }
//     else if (minutes < 10) {
//       minutes = "0" + minutes;
//     }

//     return minutes + ":" + seconds;
//   }



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