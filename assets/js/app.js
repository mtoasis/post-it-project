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
var uncensored = false;

$("#uncen_button").on("click",function(){
	if (uncensored){
		uncensored = false;
		$(".xmark").css("display","block")
		$("#uncen_button").css("background-color","green")
	}
	else if (!uncensored){
	uncensored = true;
	console.log(uncensored)
	$("#uncen_button").css("background-color","red")
	$(".xmark").css("display","none")
}
})

connectedRef.on("value", function(snap){

  if (snap.val()) {
  	var count = snap.numChildren();


  	if (count<10){
  		count = "00"+count;
  	}
  	if (count>=10 && count<100){
  		count = "0"+count;
  	}

  	var updating_con = {
  		value: true,
  		timing: false,
  		dateAdded: firebase.database.ServerValue.TIMESTAMP
  	}
    var con = connectionsRef.push(updating_con);




    con.onDisconnect().remove();
}
});

ref.child("connections").on("value", function(snap){

	$("#view_number").text(snap.numChildren()+" people are online");

})



// ref.child("Topic").orderByChild("post").limitToLast(1).on("child_added", function(snap){

// 	var topic = snap.val();

// 	$("#topic_text").text(topic);
// });

// ref.child("connections").on("value",function(snap){

// 	var connection_number = snap.numChildren();

// 	if (connection_number==1 ){ // keep check the connection number and if only 1 is left, start timing function. if not don't run.
		
// 		timing()
// 	}
// })

// ref.child("time_left").on("value",function(snap){ //time display
		
// })

// var topic_array = [
// // "Should abortion be legal?",
// // "Should animals be used for scientific or commercial testing?",
// // "Is sexual orientation determined at birth?",
// // "Is a college education worth it?",
// // "Should the death penalty be allowed?",
// // "Is golf a sport?",
// // "Should marijuana be a medical option?",
// "Should prostitution be legal?"
// ];

$("#topic_text").text("Should people get married?")

function time_now(){
	var current_time = moment().format("hh:mm:ss A");	
		
	$("#timer_display").text(current_time);
}

function prettyDate2(time){
    var date = new Date(parseInt(time));
    var localeSpecificTime = date.toLocaleTimeString();
    console.log( localeSpecificTime.replace(/:\d+ /, ' '));
}

setInterval(time_now,1000)




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


$(document).on("keyup", "#input_text", function(){
	var text_count = $("#input_text").val().length;
	console.log(text_count)
	if (text_count>=80){
		$("#warning").text("You can't type more than 80 characters")
		$()
	}
	else{
		$("#warning").text("Character count: "+text_count)
	}
})



ref.child("Posts").once("value",function(snap){

	index = snap.numChildren();

	snap.forEach(function(childsnap){

	i +=1;

	if (i<10){
		i="00"+i;
	}
	if (i>=10 && i<100){
		i="0"+i;
	}

	var post_text = childsnap.val().text;

	var choice_color = Math.floor(Math.random()*4);
	var choice_rotate = Math.floor(Math.random()*3);

	var post = $('<div id="'+i+'" class="postit '+color_array[choice_color]+' '+rotation_array[choice_rotate]+'">');
	var post_number = "#"+i;
	post.append($('<p class="post_number">'+post_number+'</p>'));
	post.append($('<p class="post_text">'+post_text+'</p>'));
	var button = $('<button class="btn-floating green accent-3 thumb_up"><i class="material-icons">thumb_up</i>');
    post.append(button)
    var button2 = $('<button class="btn-floating red accent-3 thumb_down"><i class="material-icons">thumb_down</i>');
    post.append(button2)
    post.append('<br>')
    var like_text = $('<p class="likes" id="like'+i+'"">++</p>')
    post.append(like_text)
    post.append('<br>')
    var dislike_text = $('<p class="dislikes" id="dislike'+i+'"">--</p>')
	post.append(dislike_text)

	$("#post_area").append(post)
	// like_refresh();
	i=Number(i);

})


var new_index = 0;
ref.child("Posts").on("value",function(snap){
	new_index = snap.numChildren();

})
like_refresh();

ref.child("Posts").limitToLast(1).on("child_added", function(snap){
	
	
	if (new_index>index){

		var post_text = snap.val().text;
		i +=1;	

		if (i<10){
			i="00"+i;
			}

		if (i>=10 && i<100){
				i="0"+i;
			}

		var choice_color = Math.floor(Math.random()*4);
		var choice_rotate = Math.floor(Math.random()*3);

		var post = $('<div id="'+i+'" class="postit '+color_array[choice_color]+' '+rotation_array[choice_rotate]+'">');

		var post_number = "#"+i;
	post.append($('<p class="post_number">'+post_number+'</p>'));
	post.append($('<p class="post_text">'+post_text+'</p>'));
	var button = $('<button class="btn-floating green accent-3 thumb_up"><i class="material-icons">thumb_up</i>');
    post.append(button)
    var button2 = $('<button class="btn-floating red accent-3 thumb_down"><i class="material-icons">thumb_down</i>');
    post.append(button2)
    post.append('<br>')
    var like_text = $('<p class="likes" id="like'+i+'"">++</p>')
    post.append(like_text)
    post.append('<br>')
    var dislike_text = $('<p class="dislikes" id="dislike'+i+'"">--</p>')
	post.append(dislike_text)


		$("#post_area").append(post)
		}
		i=Number(i);	
	})

	})


$("#submit_button").on("click",function(){

	$("#bottom_nav_show").attr("disabled","disabled")
	$("#submit_button").attr("disabled","disabled")

	var input_text = $("#input_text").val().trim();

	var index;
	ref.child("Posts").once("value", function(snap){
	var index = 1+snap.numChildren();


	if (index<10){
	index = String("00"+index);
	console.log("index is :"+index)
	console.log(typeof index)
}

if (index>=10 && index<100){
	index = String("0"+index);
	console.log("index is :"+index)
	console.log(typeof index)
}
	var posting = {
		text: input_text,
		like: 0,
		dislike: 0,
		index: index
	}

	ref.child("Posts").child("post"+index).update(posting);
	$("#input_text").val("");
})
})



function xmark(){
	ref.child("Posts").once("value",function(snap){
		var index = snap.numChildren();
		var i=0;
			snap.forEach(function(childsnap){

			if (!uncensored){

			// 	for (var i=0;i<index;i++){


			if (i<9){
				var target = "#00"+Number(i+1);
				}
			else if(i>=9 && i<99) {
				var target = "#0"+Number(i+1);
			}
			else {
				var target = "#"+Number(i+1);
			}
		
				var dislikes = childsnap.val().dislike

				if (dislikes>7){
					// console.log("working")
					console.log(target)
					// $(target).css("display","block")

				var x_mark_img = $('<img class="xmark" src="assets/images/xmark.png">');

				$(target).append(x_mark_img)			

				}

			i +=1;
		}

		})
			})
		}

function like_refresh(){
	xmark()
	console.log("refreshing likes")
	ref.on("value",function(){
	ref.child("Posts").on("value",function(snap){


		var index = snap.numChildren();
		var array_like = [];
		var array_dislike = [];
		// var dislikes
		snap.forEach(function(childsnap){


			var likes = childsnap.val().like;
			var dislikes = childsnap.val().dislike;

			array_like.push(likes);
			array_dislike.push(dislikes);
		})
			for (var i=0;i<index;i++){

			if (i<9){
				var target = "#like00"+Number(i+1);
				var target2 = "#dislike00"+Number(i+1);
				}
			else if(i>=9 && i<99) {
				var target = "#like0"+Number(i+1);
				var target2 = "#dislike0"+Number(i+1);
			}
			else {
				var target = "#like"+Number(i+1);
				var target2 = "#dislike"+Number(i+1);
			}

			$(target).text("Like: "+ array_like[i])
			$(target2).text("Dislike: "+array_dislike[i])
		}


			// console.log(array_like.length)

});
})
}

setInterval(like_refresh,3000)



$(document).on("click",".thumb_up", function(){
	var id = $(this).parent().attr("id");
	$(this).attr({"disabled": "disabled"})
	var like;	
	ref.child("Posts").child("post"+id).on("value", function(snap){
		like = snap.val().like;
	})
	like +=1;
	var updating = {like: like};

	ref.child("Posts").child("post"+id).update(updating);
})

$(document).on("click",".thumb_down", function(){
	$(this).attr({"disabled": "disabled"})
	var id = $(this).parent().attr("id");
	var dislike;	
	ref.child("Posts").child("post"+id).on("value", function(snap){
		dislike = snap.val().dislike;
	})
	dislike +=1;
	var updating = {dislike: dislike};

	ref.child("Posts").child("post"+id).update(updating);
})


$("#order_by_like").on("click",function(){
	$("#post_area").empty();

	ref.child("Posts").orderByChild("like").on("child_added",function(snap){
		console.log(snap.val())
		var index = snap.numChildren();

	var post_text = snap.val().text;

	var choice_color = Math.floor(Math.random()*4);
	var choice_rotate = Math.floor(Math.random()*3);
	var i = snap.val().index;

	var post = $('<div id="'+i+'" class="postit '+color_array[choice_color]+' '+rotation_array[choice_rotate]+'">');
	var post_number = "#"+i;
	post.append($('<p class="post_number">'+post_number+'</p>'));
	post.append($('<p class="post_text">'+post_text+'</p>'));
	var button = $('<button class="btn-floating green accent-3 thumb_up"><i class="material-icons">thumb_up</i>');
    post.append(button)
    var button2 = $('<button class="btn-floating red accent-3 thumb_down"><i class="material-icons">thumb_down</i>');
    post.append(button2)
    post.append('<br>')
    var like_text = $('<p class="likes" id="like'+i+'"">++</p>')
    post.append(like_text)
    post.append('<br>')
    var dislike_text = $('<p class="dislikes" id="dislike'+i+'"">--</p>')
	post.append(dislike_text)

	$("#post_area").prepend(post)
	like_refresh();

})

	})

$("#order_by_dislike").on("click",function(){
	$("#post_area").empty();

	ref.child("Posts").orderByChild("dislike").on("child_added",function(snap){
		console.log(snap.val())
		var index = snap.numChildren();

	var post_text = snap.val().text;

	var choice_color = Math.floor(Math.random()*4);
	var choice_rotate = Math.floor(Math.random()*3);
	var i = snap.val().index;

	var post = $('<div id="'+i+'" class="postit '+color_array[choice_color]+' '+rotation_array[choice_rotate]+'">');
	var post_number = "#"+i;
	post.append($('<p class="post_number">'+post_number+'</p>'));
	post.append($('<p class="post_text">'+post_text+'</p>'));
	var button = $('<button class="btn-floating green accent-3 thumb_up"><i class="material-icons">thumb_up</i>');
    post.append(button)
    var button2 = $('<button class="btn-floating red accent-3 thumb_down"><i class="material-icons">thumb_down</i>');
    post.append(button2)
    post.append('<br>')
    var like_text = $('<p class="likes" id="like'+i+'"">++</p>')
    post.append(like_text)
    post.append('<br>')
    var dislike_text = $('<p class="dislikes" id="dislike'+i+'"">--</p>')
	post.append(dislike_text)

	$("#post_area").prepend(post)

	like_refresh();

})

	})

$("#order_by_date").on("click",function(){
	$("#post_area").empty();
	ref.child("Posts").once("value",function(snap){	
	// index = snap.numChildren();
	var i=0;
	snap.forEach(function(childsnap){

	i +=1;

	if (i<10){
		i="00"+i;
	}
	if (i>=10 && i<100){
		i="0"+i;
	}

	var post_text = childsnap.val().text;

	var choice_color = Math.floor(Math.random()*4);
	var choice_rotate = Math.floor(Math.random()*3);

	var post = $('<div id="'+i+'" class="postit '+color_array[choice_color]+' '+rotation_array[choice_rotate]+'">');
	var post_number = "#"+i;
	post.append($('<p class="post_number">'+post_number+'</p>'));
	post.append($('<p class="post_text">'+post_text+'</p>'));
	var button = $('<button class="btn-floating green accent-3 thumb_up"><i class="material-icons">thumb_up</i>');
    post.append(button)
    var button2 = $('<button class="btn-floating red accent-3 thumb_down"><i class="material-icons">thumb_down</i>');
    post.append(button2)
    post.append('<br>')
    var like_text = $('<p class="likes" id="like'+i+'"">++</p>')
    post.append(like_text)
    post.append('<br>')
    var dislike_text = $('<p class="dislikes" id="dislike'+i+'"">--</p>')
	post.append(dislike_text)
	i=Number(i);

	$("#post_area").append(post)
	like_refresh();

})
})
})





$('.fixed_bottom').hide();
$('.fixed_right').hide();

//POST-IT BOTTOM REVEAL
$(".close-button").click(function(){
  $('.fixed_bottom').hide();
});

// $("#post_button").click(function(){
//   $('.fixed_bottom').show();
// });

//LEADER BOARD SLIDE OUT
$('#leaderboard_slide_out').click(function() {
  $('.fixed_right').hide();
});

$("#leaderboard_show").click(function(){
  $('.fixed_right').show();
});

//MODAL SUBMIT POP-UP
$('.modal').modal();
//LEADERBOARD SLIDE-OUT
$('.button-collapse').sideNav({
    menuWidth: 300,
    closeOnClick: true,
    edge: 'right'
});

// $("#post_button").on("click", function(){

// 	var back_div = $('<div class="back_div">');
// 	var body = $(".outer");
// 	body.append(back_div)

// })


// //zhong part


// // begin of upload image
// // -------------------------------------------------------------------
//    function previewFile(){
//        var preview = document.querySelector('img'); //selects the query named img
//        var file    = document.querySelector('input[type=file]').files[0]; //sames as here
//        var reader  = new FileReader();
//        reader.onloadend = function () {
//            preview.src = reader.result;
//        }
//        if (file) {
//            reader.readAsDataURL(file); //reads the data as a URL
//        } else {
//            preview.src = "";
//        }
//   }
//   previewFile();  //calls the function named previewFile()
// // -------------------------------------------------------------------
// // end of upload image


// // begin of get modal
// // -------------------------------------------------------------------
//  var modal = document.getElementById('myModal');
// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");
// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];
// // When the user clicks the button, open the modal 
// btn.onclick = function() {
//     modal.style.display = "block";
// }
// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//     modal.style.display = "none";
// }
// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }// -------------------------------------------------------------------
// // end of get modal


// $(document).ready(function(){
// //hide div
// $("#display").hide()

// // get element
// var uploader = document.getElementById("uploader");
// var fileButton = document.getElementById("fileButton");
// var text_input = "";

// // listen for file selection
// fileButton.addEventListener("change",function(e){
//     var file = e.target.files[0];
//   //create a storage
//   var storageRef = firebase.storage().ref("user_gifs/"+file.name);
//   //upload file
//   var task = storageRef.put(file);
//   //update progress bar
//   task.on("state_changed",
//     function progress(snapshot){
//       var percentage = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
//       uploader.value = percentage;
//     },
//     function error(err){
//     },
//     function complete(){
//       // Upload completed successfully, now we can get the download URL

// var postKey = firebase.database().ref('Posts/').push().key;
// var downloadURL = task.snapshot.downloadURL;
   
// //click function
//    $("#submit").on("click",function(){
//    event.preventDefault();
//   text_input = $("#text_input").val().trim();
//   var updates = {};
//   var postData = {
//     url: downloadURL,
//     caption:text_input
//       };
//   updates['/Posts/'+postKey] = postData;
//   firebase.database().ref().update(updates);
//   console.log(downloadURL);
//   console.log(text_input);

//   var displayDiv;
//   var imgDiv = '<img src="'+downloadURL+'" width="300px">';
//   var textDiv = '<p>'+text_input+'</p>'
//   displayDiv = '<div>' + imgDiv + textDiv+'</div>'
//   $("#display").show();
//   $("#display").html(displayDiv);

//   })
// })
// })
// })
