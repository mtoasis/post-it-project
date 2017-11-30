
var _0xc9a1=["\x41\x49\x7A\x61\x53\x79\x42\x2D\x6F\x53\x49\x70\x2D\x6C\x47\x4B\x79\x6B\x41\x56\x71\x6D\x4D\x74\x4D\x4B\x50\x4A\x35\x32\x58\x50\x70\x42\x48\x41\x69\x6A\x51","\x70\x6F\x73\x74\x2D\x69\x74\x2D\x63\x39\x62\x63\x37\x2E\x66\x69\x72\x65\x62\x61\x73\x65\x61\x70\x70\x2E\x63\x6F\x6D","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x70\x6F\x73\x74\x2D\x69\x74\x2D\x63\x39\x62\x63\x37\x2E\x66\x69\x72\x65\x62\x61\x73\x65\x69\x6F\x2E\x63\x6F\x6D","\x70\x6F\x73\x74\x2D\x69\x74\x2D\x63\x39\x62\x63\x37","\x70\x6F\x73\x74\x2D\x69\x74\x2D\x63\x39\x62\x63\x37\x2E\x61\x70\x70\x73\x70\x6F\x74\x2E\x63\x6F\x6D","\x33\x31\x34\x35\x38\x37\x37\x39\x31\x32\x34\x30"];var config={apiKey:_0xc9a1[0],authDomain:_0xc9a1[1],databaseURL:_0xc9a1[2],projectId:_0xc9a1[3],storageBucket:_0xc9a1[4],messagingSenderId:_0xc9a1[5]}
firebase.initializeApp(config);

var database = firebase.database();
var ref = database.ref();
var connectedRef = firebase.database().ref(".info/connected");
var connectionsRef = database.ref("/connections");
var uncensored = false;

$("#uncen_button").on("click",function(){
	if (uncensored){
		uncensored = false;
		$("#uncen_button").text("Uncensored");
		$(".xmark").css("display","block");
		$("#uncen_button").css("background-color","green")
	}
	else if (!uncensored){
	uncensored = true;
	console.log(uncensored)
	$("#uncen_button").text("Censored");
	$("#uncen_button").css("background-color","red")
	$(".xmark").css("display","none")
}
})

function next_topic(){
	// for (var i=0; i<5; i++){
	ref.child("Topic").once("value",function(snap){
		var i=0;

		snap.forEach(function(childsnap){
			var topic = childsnap.val().topic
			console.log(topic)
			var id = "#topic_"+i;
			console.log(id)
			$(id).text(topic);
			i+=1
		})
	})
}


next_topic();

// var iii=0;

// $("#push_topic").on("click", function pushing_topic(){
// 	var topic_array =
// ["Is TESLA going to be a bigger company than Apple in the next 20 years?",
// "Is sexual orientation determined at birth?",
// "Is a college education worth of money?",
// "Should abortion be legal?",
// "Should Trump build his wall?"];

// 		var topic = 
// 		{topic:topic_array[iii],
// 		like: 0,
// 		dislike: 0};
// 		ref.child("Topic").child(iii).update(topic)
// 		 iii+=1;

// });

$(document).on("click",".topic_like", function(){
	var var_id = $(this).attr("id");
	$(this).attr({"disabled": "disabled"})
	var like;
	var id=0;

	if(var_id == "topic_0_like"){
		id=0;
	}
	else if (var_id =="topic_1_like"){
		id=1;
	}
	else if (var_id =="topic_2_like"){
		id=2;
	}
	else if (var_id =="topic_3_like"){
		id=3;
	}
	else if (var_id =="topic_4_like"){
		id=4;
	}
	console.log(id)

	ref.child("Topic").child(id).on("value", function(snap){
		like = snap.val().like;
	})
	like +=1;
	console.log(like)
	var updating = {like: like};

	ref.child("Topic").child(id).update(updating);
})

$(document).on("click",".topic_dislike", function(){
	var var_id = $(this).attr("id");
	console.log(var_id)
	$(this).attr({"disabled": "disabled"})
	var dislike;
	var id=0;

	if(var_id == "topic_0_dislike"){
		id=0;
	}
	else if (var_id =="topic_1_dislike"){
		id=1;
	}
	else if (var_id =="topic_2_dislike"){
		id=2;
	}
	else if (var_id =="topic_3_dislike"){
		id=3;
	}
	else if (var_id =="topic_4_dislike"){
		id=4;
	}
	console.log(id)

	ref.child("Topic").child(id).on("value", function(snap){
		dislike = snap.val().dislike;
	})
	dislike +=1;
	console.log(dislike)
	var updating = {dislike: dislike};

	ref.child("Topic").child(id).update(updating);
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



$("#topic_text").text("Should we have net neutrality?")

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
var rotation_array = ["rotate_left","rotate_right",""];


$(document).on("keyup", "#input_text", function(){
	var text_count = $("#input_text").val().length;
	console.log(text_count)
	if (text_count>=128){
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
					// console.log(target)
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
	// console.log("refreshing likes")
	ref.on("value",function(){
		ref.child("Topic").on("value",function(snap){
			var index = snap.numChildren();
			var array_like=[];
			var array_dislike=[];

			snap.forEach(function(childsnap){
				var likes = childsnap.val().like;
				var dislikes = childsnap.val().dislike;

				array_like.push(likes);
				array_dislike.push(dislikes);
			})
			for (var i=0; i<5; i++){
				var target = "#like_"+i;
				var target2 = "#dislike_"+i;
				$(target).text(array_like[i]);
				$(target2).text(array_dislike[i]);				
			}
		})
	})

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
