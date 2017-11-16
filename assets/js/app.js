
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

var connectedRef = firebase.database().ref(".info/connected");
var connectionsRef = database.ref("/connections");

connectedRef.on("value", function(snap){
  if (snap.val()) {
    var con = connectionsRef.push(true);
    con.onDisconnect().remove();
  }
});

ref.child("Topic").limitToLast(1).on("child_added", function(snap){

	var topic = snap.val();

	$("#topic_text").text(topic);
});

ref.child("connections").on("value",function(snap){

	var connection_number = snap.numChildren();

	if (connection_number==1 ){ // keep check the connection number and if only 1 is left, start timing function. if not don't run.
		timing()
	}
})

ref.child("time_left").on("value",function(snap){ //time display
	$("#timer_display").text(snap.val());	
})


function timing(){ //time decreasing function

ref.child("time_left").on("value",function(snap){
	
	var time_left = snap.val();

	 setInterval(time_decrease, 1000);	 

	 function time_decrease(){

	 time_left -=1;

	 if (time_left==0){
	 		time_left=1200;
	 	}

	 var time_update = {time_left : time_left}

	ref.update(time_update);
	 }	  	
})
}

var i=0;
var index = 0;

var color_array = ["gradient_purple","gradient_yellow","gradient_green","gradient_orange"];
var rotation_array = ["rotate-left","rotate-right",""];



ref.child("Posts").once("value",function(snap){

	index = snap.numChildren();
	console.log("index: "+index)
	

	snap.forEach(function(childsnap){
	i +=1;

	var post_text = childsnap.val().text;

	var choice_color = Math.floor(Math.random()*4);
	var choice_rotate = Math.floor(Math.random()*3);

	var post = $('<div id="'+i+'" class="postit '+color_array[choice_color]+' '+rotation_array[choice_rotate]+'">');
	post.append($('<p>'+post_text+'</p>'));
	var button = $('<button class="thumb_up">Like</button>');
	post.append(button)
	var button2 = $('<button class="thumb_down">Dislike</button>');
	post.append(button2)

	$("#post_area").append(post)

})

var new_index = 0;
ref.child("Posts").on("value",function(snap){
	new_index = snap.numChildren();
	console.log("new_index: "+new_index)
})

ref.child("Posts").limitToLast(1).on("child_added", function(snap){
	
	
	if (new_index>index){

		var post_text = snap.val().text;
		i +=1;	

		var choice_color = Math.floor(Math.random()*4);
		var choice_rotate = Math.floor(Math.random()*3);

		var post = $('<div id="'+i+'" class="postit '+color_array[choice_color]+' '+rotation_array[choice_rotate]+'">');

		post.append($('<p>'+post_text+'</p>'));
		var button = $('<button class="thumb_up">Like</button>');
		post.append(button)
		var button2 = $('<button class="thumb_down">Dislike</button>');
		post.append(button2)

		$("#post_area").append(post)
		}	
	})

	})



$("#submit_button").on("click",function(){

	var input_text = $("#input_text").val().trim();

	var posting = {
		text: input_text,
		like: 0,
		dislike: 0
	}
	var index;
	ref.child("Posts").on("value", function(snap){
		index = 1+snap.numChildren();
	})

	ref.child("Posts").child("post"+index).update(posting);
	$("#input_text").val("");
})


$(document).on("click",".thumb_up", function(){
	var id = $(this).parent().attr("id");
	// console.log(id);
	var like;	
	ref.child("Posts").child("post"+id).on("value", function(snap){
		like = snap.val().like;
	})
	like +=1;
	var updating = {like: like};

	ref.child("Posts").child("post"+id).update(updating);
})

$(document).on("click",".thumb_down", function(){
	var id = $(this).parent().attr("id");
	var dislike;	
	ref.child("Posts").child("post"+id).on("value", function(snap){
		dislike = snap.val().dislike;
	})
	dislike +=1;
	var updating = {dislike: dislike};

	ref.child("Posts").child("post"+id).update(updating);
})



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