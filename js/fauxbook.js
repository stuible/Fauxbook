
//////////////////////////////
//							//
//		F A U X B O O K		//
//		by Jxsh Stuible		//
//							//
//////////////////////////////

/*jshint strict:false */

//Array of All posts (I think???)
post.objects = [];

post.prototype.remove = function() {
  for (var i=0; i<post.objects.length; i++) {
    if (post.objects[i] === this) {
      post.objects.splice(i,1);
    }
  }
};

//Global Variable to enable or disable autoplaying video for debugging
var videoAutoplay = true;
var soundFX = true;
var profilePicture;
var userName;
var justUseDefaultPic = true;
var messagesHidden = true;
var currentPost = new post("nullPost", "null", "null", true, "");
var miscPosts = [true, true, false, false];
var messageCount = 1;
var decidedClimax = false;
var decidedEnding = false;
var chosenClimax;
var chosenEnding;
var postTimer;

var cameraSettings;
var img = null;
var image;

var points = 0;

//Class function for posts (object argument is some nonesense hack i'm pulling and should be the same name as the objects variable name)
function post(object, name, discription, truth, file){

	this.true = truth;
	this.name = name;
	this.object = object;
	this.liked = false;
	this.shared = false;
	this.playingBegan = false;
	this.reported = false;
	this.finishedPlaying = false;
  	this.discription = discription;
	this.file = file;
	this.pushed = false;
	this.chosen = false;
	this.reminded = false;
	
	//add object to object array
	post.objects.push(this);
	
	//Button functions
	this.likeButtonPressed = function (){
		
		if(this.true && !this.liked){
			points += 1;
			$('#likeButtonTag' + this.object).before("<div id='plusOne'>+1</div>");
			if(soundFX){
				$("#clickSound")[0].play();
			}
		}
		else if(!this.true && !this.liked){
			points -= 1;
			$('#likeButtonTag' + this.object).before("<div id='minusOne'>-1</div>");
			if(soundFX){
				$("#clickSound")[0].play();
			}
		}	
		
		this.liked = true;
		
		$('#likeButtonTag' + this.object).text("Liked");
	};
	this.shareButtonPressed = function (){
		
		if(this.true && !this.shared){
			points += 3;
			$('#shareButtonTag' + this.object).before("<div id='plusOne'>+3</div>");
			if(soundFX){
				$("#clickSound")[0].play();
			}
		}
		else if(!this.true && !this.shared){
			points -= 3;
			$('#shareButtonTag' + this.object).before("<div id='minusOne'>-3</div>");
			if(soundFX){
				$("#clickSound")[0].play();
			}
		}	
		
		this.shared = true;
		
		$('#shareButtonTag' + this.object).text("Shared");
	};
	this.reportButtonPressed = function (){
		
		if(this.true && !this.reported){
			points -= 3;
			$('#reportButtonTag' + this.object).before("<div id='minusOne'>-3</div>");
			if(soundFX){
				$("#clickSound")[0].play();
			}
		}
		else if(!this.true && !this.reported){
			points += 3;
			$('#reportButtonTag' + this.object).before("<div id='plusOne'>+3</div>");
			if(soundFX){
				$("#clickSound")[0].play();
			}
		}	
		
		this.reported = true;
		
		$("#reportButtonTag" + this.object).text("Reported");
	};
	this.commentButtonPressed = function (){
		this.comment(userName, $("#commentInput" + this.object).val(), 0);
		$("#commentInput" + this.object).val('');
		
	};
	
	//function for pushing posts to the screen
	this.push = function (delay){
		var fileName = this.file;
		var theObject = this.object;
		var title = this.name;
		var description = this.discription;
		var autoplay;
		var videoControls;
		this.playingBegan = true;
		if(videoAutoplay){
			autoplay = "autoplay";
			videoControls = "";
		}
		else {
			autoplay = "";
			videoControls = "controls";
		}
		
		$("html, body").animate({ scrollTop: 0 }, "slow");
		
		//Add the post / spagetticode to the top of the posts
		$('#mainContainer').delay(delay).queue(function (next) {
			
		$("<div id='postContainer' class='container" + theObject +"'><div id='postTitle'>" + title + "</div><div id='postDescription'>" + description + "</div><video class='postVideo' id='postVideo" + theObject + "'" + autoplay + " " + videoControls + "><source src='video/" + fileName + "' type='video/mp4'>Get a Better Browser</video><div id='buttonContainer'><div id='likeContainer' class=''><a href='javascript:void(0)' id='likeButtonTag" + theObject + "' class='likeButton col-xs-12' onclick='" + theObject + ".likeButtonPressed()'>Like</a></div><div id='shareContainer' class=''><a href='javascript:void(0)' id='shareButtonTag" + theObject + "' class='shareButton col-xs-12' onclick='" + theObject + ".shareButtonPressed()'>Share</a></div><div id='reportContainer' class='pull-right'><a href='javascript:void(0)' id='reportButtonTag" + theObject + "' class='reportButton col-xs-12' onclick='" + theObject + ".reportButtonPressed()'>Report</a></div></div><div id='commentsFor" + theObject + "' class='commentContainer'><div class='commentReplyInput'><div class='userProfile'></div><div class='commentNameAndProf'><div class='commentName'>" + userName + "</div><div><textarea name='comments' id='commentInput" + theObject + "'>Leave a comment</textarea></div><a href='javascript:void(0)' id='commentButtonTag" + theObject + "' class='commentButton col-xs-12' onclick='" + theObject + ".commentButtonPressed()'>Comment</a></div></div></div></div>").hide().prependTo(this).slideDown(100);
			
//RE ENABLE TO GET COMMENT THING BACK			
//		var profPic = profilePicture;
//		var $container = $(".userProfile").append(profPic._canvas);
//		var $camera = $("#camera");
//      	var camera_ratio = $camera.innerWidth() / $camera.innerHeight();
//
//      	var height = $container.height();
//		profilePicture._canvas.style.height = "" + height + "px";
//      	profilePicture._canvas.style.width = "" + Math.round(camera_ratio * height) + "px";
//		$("canvas").addClass("ProfPic");
		
		if(!justUseDefaultPic){
			$(".userProfile").append(image);
		}
		else {
			console.log("no prof pic");
		}
		
			
		next();
});
		this.pushed = true;
    };

	this.comment = function(user, message, delay){
		
		var theObject = this.object;
		if (user == userName){
			$('#mainContainer').delay(delay).queue(function (next) {
				$("#commentsFor" + theObject).append("<div style='display:none; opacity:0;' class='commentReplyContainer'><div class='userProfile'><div class='replyCanvas'></div></div><div class='commentNameAndProf'><div class='commentName'>" + user + "</div><div class='commentMessage'>" + message + "</div></div></div>").prependTo("#commentsFor" + theObject);
					$(".commentReplyContainer").slideDown().animate(
					{ opacity: 1 },
					{ queue: false, duration: 'slow' }
					);
				if(soundFX){
					$("#messageSound")[0].play();
				}
				
				if(!justUseDefaultPic){
					$(image).clone().appendTo(".replyCanvas");
				}
				else {
					//alert("i dont think theres a pic");
				}

				next();
				
			});
		}
		else {
			$('#mainContainer').delay(delay).queue(function (next) {
				$("#commentsFor" + theObject).append("<div style='display:none; opacity:0;' class='commentReplyContainer'><div class='commentProfile'><img src='" + user[1] + "' width='auto' height='auto'></div><div class='commentNameAndProf'><div class='commentName'>" + user[0] + "</div><div class='commentMessage'>" + message + "</div></div></div>").prependTo("#commentsFor" + theObject);
					$(".commentReplyContainer").slideDown().animate(
					{ opacity: 1 },
					{ queue: false, duration: 'slow' }
					);
				if(soundFX){
					$("#messageSound")[0].play();
				}
				next();
				});
		}
	};
}

function showIntructions(){
	
		$("html, body").animate({ scrollTop: 0 }, "slow");
		
		//Add the post / spagetticode to the top of the posts
		$('#mainContainer').delay(0).queue(function (next) {
			
		$("<div id='postContainer' class='InstructionsContainer'><img id='fakeNewsImage' src='img/How-to-Spot-Fake-News.png' width='100%' height='auto' alt='hints'/></div>").hide().prependTo(this).slideDown(100);
			
		next();
});
		//$(".InstructionsContainer").append($("#fakeNewsImage"));
		//$("#fakeNewsImage").clone().appendTo(".InstructionsContainer");
		//post1();
		intro1();
		
}

function showSignup(){	
	
	$("#mainContainer").append("<div id='postContainer' class='SignupContainer'><div id='WelcomeTitle'>Welcome to Fauxbook</div><div id='WelcomeSubTitle'>tell us a little bit about yourself</div><form onkeypress='return event.keyCode != 13;' id='InfoForm' method='post'><input type='text' id='fullNameInput' placeholder='Name' name='fname' autofocus/></form><div id='camera'><div class='placeholder'> Your browser does not support camera access.<br>We recommend <a href='https://www.google.com/chrome/'target='_blank'>Chrome</a> — modern, secure, fast browser from Google.<br> It's free.</div></div><div id='PicbuttonContainer'><button id='take_snapshots'>Take Profile Picture</button></div><button id='submitProfile'>Submit</button></div>");
	
}

function showEnd(){	

	
	if((currentPost.finishedPlaying) && (currentPost.shared || currentPost.liked || currentPost.reported)){
					var endMessage;
	
			if (parseInt(points) > parseInt("6")){
				endMessage = "You did well!  Feel good for a fleeting moment :)";
			}
			else if (parseInt(points) >= parseInt("-1")){
				endMessage = "You tried but could improve, why not play again?";
			}
			else if (parseInt(points) < parseInt("-1")){
				endMessage = "I don't think you quite understood,  Play again or live among the sheep";
			}
	
		
	
		$("html, body").animate({ scrollTop: 0 }, "slow");
		
		//Add the post / spagetticode to the top of the posts
		$('#mainContainer').delay(0).queue(function (next) {
			
		$("<div id='postContainer' class='SignupContainer'><div id='WelcomeTitle'>Thank You Playing!</div><div id='WelcomeSubTitle'>" + endMessage + "</div><button id='tryAgain' onclick='tryAgain()'>Try Again</button><button id='takeSurvey' onclick='visitSurvey()'>Take Survey</button></div>").hide().prependTo(this).slideDown(100);
			
		next();
});	
	}
	else {
		setTimeout(showEnd, 1000);
	}

	
}

//the post objects
var trumpConPost = new post("trumpConPost", "Alien Negotioans Taking Place", "After much debate, nogatiations are done", true, "test/ClimaxPiller.mp4");
var trumpConPost2 = new post("trumpConPost2", "Test Video Two", "This is an example of a video post.  It is set as false news", false, "cnn.mp4");

//Endings
var badEndingPost = new post("badEndingPost", "THE ALIENS HAVE TAKEN OVER", "Humanity is done, and it's all your fault", true, "johndillinger/ConclusionAliensHaveTakenOver.mp4");
var neutralEndingPost = new post("neutralEndingPost", "The Aliens ARE Gone!!!", "And this Isn't a good thing", true, "joshpiller/NeutralEnding.mp4");
var goodEndingPost = new post("goodEndingPost", "Humanity Reaches New Heights", "Congradulations everybody, Earth has never been better", true, "joshpiller/BestEnding.mp4");

//Intros
var introPost1 = new post("introPost1", "Extraterrestrial Life Has Been Found", "It has finally happened", true, "wen/ZoeIntro.mp4");
var introPost2 = new post("introPost2", "Aliens Have Landed on Earth!!!", "Why are they here and what do they want?", true, "joshpiller/AliensHaveLanded.mp4");

//Climaxes
var badClimaxPost = new post("badClimaxPost", "WE ARE FINALLY BUILDING A WALL", "Time to keep these savages out", true, "johndillinger/ClimaxBuildingaWall.mp4");
var notBadClimaxPost = new post("notBadClimaxPost", "Alien Negotiations Have Concluded", "You'll like the results!", true, "joshpiller/ClimaxPositive.mp4");

//Misc Posts
var cattlePost = new post("cattlePost", "Aliens Kill and Devour My Friends Cattle!", "The aliens are savages!", false, "johndillinger/RandomAliensatetheCows.mp4");
var mysteryPost = new post("mysteryPost", "Alien Nogotiations Begin", "Should we be working with the aliens?", true, "joshpiller/NogiatingTerms.mp4");
var shitPost = new post("shitPost", "Save The World With This One Weird Trick", "You won't believe what it is", false, "wen/shit.mp4");
var rainPost = new post("rainPost", "Aliens To Blame For Droughts!", "No rain in Chilliwack for a week", false, "joshpiller/NoRain.mp4");
var drownPost = new post("drownPost", "The Aliens Save a Life!", "Kis was drowning, they came to rescue", true, "joshpiller/Drowning.mp4");
var energyPost = new post("energyPost", "Energetic Help From The Aliens", "Free Energy!", true, "yaz/BCHydro.mp4");
var stealingPost = new post("stealingPost", "Aliens Stealing from Earth?", "Their Using Us!!", false, "yaz/alienteleportation.mp4");
var wallPost = new post("wallPost", "Opinion: The Wall Must be Stopped", "No need for a wall, let's work it out", true, "joshpiller/BuildAWall.mp4");
var killemPost = new post("killemPost", "DON'T TREAD ON HUMANS", "We need to stand up, and fight back!", false, "johndillinger/RandomAliensmightkillus.mp4");


var initaitedMiscPosts = false;
var misc1, misc2, misc3, misc4;


//Runs once the page is loaded enough to function
$("document").ready(function(){
	showSignup();
	
	intro2();
	
	
	if(!initaitedMiscPosts){
		var postTruth = Math.floor(Math.random() * miscPosts.length);
		misc1 = pickRandomPost(miscPosts[postTruth]);
		miscPosts.splice(postTruth, 1);
		
		postTruth = Math.floor(Math.random() * miscPosts.length);
		misc2 = pickRandomPost(miscPosts[postTruth]);
		miscPosts.splice(postTruth, 1);
		
		postTruth = Math.floor(Math.random() * miscPosts.length);
		misc3 = pickRandomPost(miscPosts[postTruth]);
		miscPosts.splice(postTruth, 1);
		
		postTruth = Math.floor(Math.random() * miscPosts.length);
		misc4 = pickRandomPost(miscPosts[postTruth]);
		miscPosts.splice(postTruth, 1);

		initaitedMiscPosts = true;
	}

	misc1; misc2; misc3; misc4;
	
	
	choseClimax();
//	if(chosenClimax != null){
//		chosenClimax();
//	}
	
	choseEnding();
//	if(chosenEnding != null){
//		chosenEnding();
//	}
	
	
	showEnd();
	

	checkVideoPlaying();
	updateScore();
	
	
	//addOtherPosts();
	
});

$(".chatTab").click(function() {
	if(messagesHidden){
		$(".chatMessages").css({"display": "inline"});
		$(".chatTab").css({"-webkit-border-radius": "0px", "-moz-border-radius": "0px", "border-radius": "0px"});
		messagesHidden = false;
	}
	else {
		$(".chatMessages").css({"display": "none"});
		$(".chatTab").css({"-webkit-border-top-left-radius": "10px", "-webkit-border-top-right-radius": "10px", "-moz-border-top-left-radius": "10px", "-moz-border-top-right-radius": "10px",  "border-top-left-radius": "10px", "border-top-right-radius": "10px"});
		messagesHidden = true;
	}
});

$("#takeSurvey").click(function() {
	alert("survey");
	window.open('https://goo.gl/forms/0wTr7IFA2ZNuLc7A2', '_blank');
});

$("#tryAgain").click(function() {
	alert("play again");
	location.reload();
});

function visitSurvey(){
	window.open('https://goo.gl/forms/0wTr7IFA2ZNuLc7A2', '_blank');
}

function tryAgain(){
	location.reload();
}


function intro1(){
	introPost1.push(5000);
	currentPost = introPost1;
	introPost1.comment(charlesBolden, "Hi, i am the head of the NASA institution. I confirm the validity of these claims and our satellites have indeed made contact with extraterrestrial aircrafts.", 15000);
	introPost1.comment(summerRosh, "OMG @Charles, I am your biggest fan", 2000);
	introPost1.comment(JenniferLines, "This is insane. I saw fox and CNN covering the same story.", 2000);
	introPost1.comment(summerRosh, "I am the head of SETI and i confirm the claims being made here.", 2000);
	
}

function intro2(){

	if((currentPost.finishedPlaying) && (currentPost.shared || currentPost.liked || currentPost.reported)){
		introPost2.push(5000);
		currentPost = introPost2;
		introPost2.comment(SharonGaetz, "Hi, i am the mayor of chilliwack and i confirm that the aliens have landed in our town.", 20000);
		introPost2.comment(summerRosh, "WE ARE ALL GUNNA DIE", 2000);
		introPost2.comment(SethShostak, "It really is happenning folks.", 2000);
	}
	else if(currentPost.finishedPlaying && !currentPost.shared && !currentPost.liked && !currentPost.reported && !introPost2.reminded){
		sendMessage(jonJones, "Hey, what do you think about the alien thing!????", 25);
		sendMessage(jonJones, "Like, share or report it dude!!!", 1000);
		introPost2.reminded = true;
		setTimeout(intro2, 1000);
	}
	else {
		setTimeout(intro2, 1000);
	}
}

function cattle(){
	cattlePost.chosen = true;
	if((currentPost.finishedPlaying) && (currentPost.shared || currentPost.liked || currentPost.reported)){
		cattlePost.push(5000);
		currentPost = cattlePost;
		cattlePost.comment(jasonMayham, "idk yo, im from chilliwk and every single person i've talked to has said that their cows are safe and have never heard of this guy", 30000);
		cattlePost.comment(rodyPiper, "I'm a farmer and my cows are safe too.", 1000);
		cattlePost.comment(chuckLidell, "THEY'RE TAKING OUR RATTLE, TIME TO FIGHT BACK", 200);
		cattlePost.comment(jonJones, "This is not funny anymore", 1000);
	}
	else {
		setTimeout(cattle, 1000);
	}
}

function mystery(){
	mysteryPost.chosen = true;
	if((currentPost.finishedPlaying) && (currentPost.shared || currentPost.liked || currentPost.reported)){
		mysteryPost.push(5000);
		currentPost = mysteryPost;
		mysteryPost.comment(summerRosh, "This is a step in the right direction.", 30000);
		mysteryPost.comment(charlesOlivera, "I actually saw Chrystia at the Vancouver starbucks this morning and she talked to me about this same thing", 1000);
		mysteryPost.comment(JenniferLines, "I'm not sure I like th sound of us messing with the aliens", 500);
		mysteryPost.comment(jonJones, "I hope the aliens kill her", 1000);
	}
	else {
		setTimeout(mystery, 1000);
	}
}

function shit(){
	shitPost.chosen = true;
	if((currentPost.finishedPlaying) && (currentPost.shared || currentPost.liked || currentPost.reported)){
		shitPost.push(5000);
		currentPost = shitPost;
		shitPost.comment(jasonMayham, "I can’t believe this is being funded by Private African health institutions.", 20000);
		shitPost.comment(rodyPiper, "The African health institutions are obviously in a conflict of interest.", 1000);
		shitPost.comment(jonJones, "The health institutions are going to sell these products and make a lot of money. Do not believe them.", 2000);
		shitPost.comment(connorMcgregor, "This is like MC Donalds funding a study on sugar and saying that their sodas are healthy.", 500);
	}
	else {
		setTimeout(shit, 1000);
	}
}

function rain(){
	rainPost.chosen = true;
	if((currentPost.finishedPlaying) && (currentPost.shared || currentPost.liked || currentPost.reported)){
		rainPost.push(5000);
		currentPost = rainPost;
		rainPost.comment(jonJones, "This is BS, it like literally just rained yesterday, BOX news has no idea wtf they're talking about", 20000);
		rainPost.comment(rondhaRowdy, " I have been living in Chilliwack my whole life. Once in awhile we will have weeks without rain, it's completely normal and this is a non story", 500);
		rainPost.comment(ariannyCeleste, "@Rondha, are you kidding me? It rains at least once or twice a week during the weeks of March and April", 1000);
		
	}
	else {
		setTimeout(rain, 1000);
	}
}

function drown(){
	drownPost.chosen = true;
	if((currentPost.finishedPlaying) && (currentPost.shared || currentPost.liked || currentPost.reported)){
		drownPost.push(5000);
		currentPost = drownPost;
		drownPost.comment(connorMcgregor, "i knew that the Aliens were good people.", 20000);
		drownPost.comment(JenniferLines, "This is crazy news. Everyone is talking about this. I love it. ", 5000);
		drownPost.comment(jonJones, "I am glad that the Aliens have good interest at heart.", 5000);
	}
	else {
		setTimeout(drown, 1000);
	}
}

function energy(){
	energyPost.chosen = true;
	if((currentPost.finishedPlaying) && (currentPost.shared || currentPost.liked || currentPost.reported)){
		energyPost.push(5000);
		currentPost = energyPost;
		energyPost.comment(connorMcgregor, "BC Hydro is making such claims. Interesting.", 20000);
		energyPost.comment(jonJones, "Seems legit, since Bc Hydro is making these claims.", 5000);
		energyPost.comment(JenniferLines, "My dad works for BC Hydro and they are right. The energy levels are much better.", 5000);
		energyPost.comment(rondhaRowdy, "I am glad that the Aliens have good interest at heart.", 5000);
	}
	else {
		setTimeout(energy, 1000);
	}
}

function stealing(){
	stealingPost.chosen = true;
	if((currentPost.finishedPlaying) && (currentPost.shared || currentPost.liked || currentPost.reported)){
		stealingPost.push(5000);
		currentPost = stealingPost;
		stealingPost.comment(randyHarrison, "Hi, I am the deputy minister of natural resources of Canada and i confirm all the claims being made here", 15000);
		stealingPost.comment(rondhaRowdy, "I feel like their just using us for our planet...", 5000);
		stealingPost.comment(ariannyCeleste, "They are totally going to kill us!!!!", 5000);
		stealingPost.comment(summerRosh, "I'm sure they have good intentions guys, we all need to calm down", 5000);
	}
	else {
		setTimeout(stealing, 1000);
	}
}

function wall(){
	wallPost.chosen = true;
	if((currentPost.finishedPlaying) && (currentPost.shared || currentPost.liked || currentPost.reported)){
		wallPost.push(5000);
		currentPost = wallPost;
		wallPost.comment(harryRosen, "I seriously think that we should not build a wall.", 20000);
		wallPost.comment(rondhaRowdy, "We should negotiate with them and try to resolve our issues.", 5000);
		wallPost.comment(ariannyCeleste, "Fuck the Aliens. I say we build a wall and kill them.", 5000);
		wallPost.comment(summerRosh, "You guys are crazy. The aliens are obviously stronger than us. We do not want any conflict.", 5000);
		wallPost.comment(JenniferLines, "Human outnumber the aliens. If we go to war, we can kill them easily.", 5000);
	}
	else {
		setTimeout(wall, 1000);
	}
}

function killem(){
	killemPost.chosen = true;
	if((currentPost.finishedPlaying) && (currentPost.shared || currentPost.liked || currentPost.reported)){
		killemPost.push(5000);
		currentPost = killemPost;
		killemPost.comment(jasonMayham, "OMG. I am seriously going to like and share this. Time to kill the aliens.", 20000);
		killemPost.comment(rodyPiper, "I’m with you man. Let’s kill them.", 4000);
		killemPost.comment(jonJones, "STOP. are you guys crazy. He is over exaggerating.", 3000);
		killemPost.comment(chuckLidell, "You guys need to chill. No one is attacking anyone.", 4000);
		killemPost.comment(summerRosh, "I live in Chilliwak and i think the aliens are gonna attack soon.", 3500);
		killemPost.comment(charlesOlivera, "I’m with you man. Let's do it.", 5000);
	}
	else {
		setTimeout(killem, 1000);
	}
}

function badClimax(){
//	if((currentPost.finishedPlaying) && (currentPost.shared || currentPost.liked || currentPost.reported)){
		badClimaxPost.push(5000);
		currentPost = badClimaxPost;
//	}
//	else {
//		setTimeout(badClimax, 1000);
//	}
}

function notBadClimax(){
//	if((currentPost.finishedPlaying) && (currentPost.shared || currentPost.liked || currentPost.reported)){
		notBadClimaxPost.push(5000);
		currentPost = notBadClimaxPost;
//	}
//	else {
//		setTimeout(notBadClimax, 1000);
//	}
}

function badEnding(){
//	if((currentPost.finishedPlaying) && (currentPost.shared || currentPost.liked || currentPost.reported)){
		badEndingPost.push(5000);
		currentPost = badEndingPost;
//	}
//	else {
//		setTimeout(badEnding, 1000);
//	}
}

function neutralEnding(){
//	if((currentPost.finishedPlaying) && (currentPost.shared || currentPost.liked || currentPost.reported)){
		neutralEndingPost.push(5000);
		currentPost = neutralEndingPost;
//	}
//	else {
//		setTimeout(neutralEnding, 1000);
//	}
}

function goodEnding(){
//	if((currentPost.finishedPlaying) && (currentPost.shared || currentPost.liked || currentPost.reported)){
		goodEndingPost.push(5000);
		currentPost = goodEndingPost;
//	}
//	else {
//		setTimeout(goodEnding, 1000);
//	}
}

function choseClimax(){
	if((currentPost.finishedPlaying) && (currentPost.shared || currentPost.liked || currentPost.reported)){
		if(!decidedClimax){
			if (parseInt(points) > parseInt("-6")){
				decidedClimax = true;
				
				//chosenClimax = notBadClimax();
				notBadClimax();
			}
			else {
				decidedClimax = true;
				//
				//chosenClimax = badClimax();
				badClimax();
			}
		}
	}
	else {
		setTimeout(choseClimax, 1000);
	}

}

function choseEnding(){
	if((currentPost.finishedPlaying) && (currentPost.shared || currentPost.liked || currentPost.reported)){
		//if(!decidedEnding && decidedClimax){
			if (parseInt(points) > parseInt("6")){
				console.log("good ending");
				decidedEnding = true;
				//chosenEnding = goodEnding();
				goodEnding();
				
			}
			else if (parseInt(points) > parseInt("-1")){
				console.log("okay ending");
				decidedEnding = true;
				//chosenEnding = neutralEnding();
				neutralEnding();
				
			}
			else if (parseInt(points) < parseInt("-5")){
				console.log("bad ending");
				decidedEnding = true;
				//chosenEnding = badEnding();
				badEnding();
				
			}
		//}
	}
	else {
		console.log("not time for ending yet");
		setTimeout(choseEnding, 1000);
	}

}

function sendMessage(user, message, delay){
//				$(".chatMessages").delay(delay).append("<div style='' class='messageReplyContainer'><div class='messageProfile'><img src='" + user[1] + "' width='auto' height='auto'></div><div class='messageNameAndProf'><div class='messageName'>" + user[0] + "</div><div class='messageMessage'>" + message + "</div></div></div>");
//				$(".chatTab").text("Chat " + "(" + messageCount + ")");
//				messageCount++;
//	
//					$(".chatMessages").css({"display": "inline"});
//					$(".chatTab").css({"-webkit-border-radius": "0px", "-moz-border-radius": "0px", "border-radius": "0px"});
//					messagesHidden = false;
//	
//				if(soundFX){
//					$("#messageSound")[0].play();
//				}
	
	$('#mainContainer').delay(delay).queue(function (next) {
				$(".chatMessages").append("<div style='' class='messageReplyContainer'><div class='messageProfile'><img src='" + user[1] + "' width='auto' height='auto'></div><div class='messageNameAndProf'><div class='messageName'>" + user[0] + "</div><div class='messageMessage'>" + message + "</div></div></div>");
				$(".chatTab").text("Chat " + "(" + messageCount + ")");
				messageCount++;
	
					$(".chatMessages").css({"display": "inline"});
					$(".chatTab").css({"-webkit-border-radius": "0px", "-moz-border-radius": "0px", "border-radius": "0px"});
					messagesHidden = false;
	
				if(soundFX){
					$("#messageSound")[0].play();
				}
		
				next();
				
			});
}


function pickRandomPost(postType){
	if(postType == true){
		var randomnumber = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
		
		switch(randomnumber) {
			case 1:
				if(mysteryPost.chosen){
					pickRandomPost(true);
				}
				else {
					return mystery();
				}
				
			break;
			case 2:
				if(drownPost.chosen){
					pickRandomPost(true);
				}
				else {
					return drown();
				}
			break;
			case 3:
				if(energyPost.chosen){
					pickRandomPost(true);
				}
				else {
					return energy();
				}
			break;
			case 4:
				if(wallPost.chosen){
					pickRandomPost(true);
				}
				else {
					return wall();
				}
		}
		
	}
	else {
		var randomnumber1 = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
		
		switch(randomnumber1) {
			case 1:
				if(cattlePost.chosen){
					pickRandomPost(false);
				}
				else {
					return cattle();
				}
			break;
			case 2:
				if(shitPost.chosen){
					pickRandomPost(false);
				}
				else {
					return shit();
				}
			break;
			case 3:
				if(rainPost.chosen){
					pickRandomPost(false);
				}
				else {
					return rain();
				}
			break;
			case 4:
				if(stealingPost.chosen){
					pickRandomPost(false);
				}
				else {
					return stealing();
				}
			break;
			case 5:
				if(killemPost.chosen){
					pickRandomPost(false);
				}
				else {
					return killem();
				}
		}
		
	}
}

function updateScore(){
    $('#pointsDiv').text(" | points: " + points);
    setTimeout(updateScore, 2000);
	console.log("updated score");
}

function videoFinished(inputPost){
	//console.log("#postVideo" + inputPost.object);
	var video = $("#postVideo" + inputPost.object).get(0);
	//console.log(video);
	if(video != null){
		if (video.currentTime === video.duration){
			//console.log("VID FINISHED");
			return true;
		} 
		else {
			//console.log("VID NOT FINISHED");
			return false;
		}
	
	}
}

function checkVideoPlaying(){
	//console.log(post.objects.length);
	for (var i = 0; i < post.objects.length; i++) { 
		if(videoFinished(post.objects[i])){
			post.objects[i].finishedPlaying = true;
			console.log(post.objects[i].name + "is finished playing");
		}
	}
	
	setTimeout(checkVideoPlaying, 500);
}

function setProfilePic() {
	 img = document.getElementById('picture');

}

//Declare and define NPCs
////Syntax is: "Name", "Profile Image"
var testPerson1 = ["Test Person", "img/testProf.jpg"];
var bestPerson1 = ["Best Person", "img/bestProf.jpg"];

var jasonMayham = ["Jason Mayham", "img/JasonMAYHAM.jpg"];
var rodyPiper = ["Rody Piper", "img/RodyPiper.jpg"];
var jonJones = ["Jon Jones", "img/JonJones.jpg"];
var chuckLidell = ["Chuck Lidell", "img/testProf.jpg"];
var summerRosh = ["Summer Rosh", "img/SummerRosh.jpg"];
var charlesOlivera = ["Charles Olivera", "img/testProf.jpg"];
var charlesBolden = ["Charles Bowden", "img/CharlesBolden.jpg"];
var JenniferLines = ["Jennifer Lines", "img/JenniferLines.jpg"];
var SethShostak = ["Seth Shostak", "img/SethShostak.jpg"];
var SharonGaetz = ["Sharon Gaetz", "img/SharonGaetz.jpg"];
var rondhaRowdy = ["Rondha Rowdy", "img/RondhaRowsy.jpg"];
var ariannyCeleste = ["Arianny Celeste", "img/Ariannyceleste.jpg"];
var connorMcgregor = ["Connor Mcgregor", "img/conorMcgregor.jpg"];
var harryRosen = ["Harry Rosen", "img/HarryRosen.jpg"];
var randyHarrison = ["Rany Harrison", "img/RanyHarrison.jpg"];

var getProfileCanvas = function(element, DivTo) {
		$(DivTo).empty();
		$(DivTo).append(element);
		
		var $container = $(DivTo).append(element);
		var $camera = cameraSettings;
      	var camera_ratio = $camera.innerWidth() / $camera.innerHeight();

      	var height = $container.height();
      	element.style.height = "" + height + "px";
      	element.style.width = "" + Math.round(camera_ratio * height) + "px";
	};

var setProfImage = function(element) {
      $(element).data("profilePicture", this).addClass("item");

      var $container = $(".userProfile").append(element);
      var $camera = $("#camera");
      var camera_ratio = $camera.innerWidth() / $camera.innerHeight();

      var height = $container.height();
      element.style.height = "" + height + "px";
      element.style.width = "" + Math.round(camera_ratio * height) + "px";

    };


$(function() {
  if (window.JpegCamera) {
    var camera; // Initialized at the end
	var cameraActive = true;
	  
    var take_snapshots = function(count) {
      var snapshot = camera.capture();
	  profilePicture = camera.capture();

      if (JpegCamera.canvas_supported()) {
        //snapshot.get_canvas(add_snapshot);
		  snapshot.get_canvas(update_profile);
		  //userProfCanvas = snapshot.get_canvas();

      }
      else {
        // <canvas> is not supported in this browser. We'll use anonymous
        // graphic instead.
        var image = document.createElement("img");
        image.src = "no_canvas_photo.jpg";
        setTimeout(function() {add_snapshot.call(snapshot, image);}, 1);
      }

      if (count > 1) {
        setTimeout(function() {take_snapshots(count - 1);}, 500);
      }
    };
	
	var update_profile = function(element) {
		$("#camera").empty();
		$("#camera").append(element);
		
		image = new Image();
		image.id = "profileImage";
		image.src = element.toDataURL();
		
		var $container = $("#camera").append(element);
		var $camera = $("#camera");
		cameraSettings = $camera;
      	var camera_ratio = $camera.innerWidth() / $camera.innerHeight();
		
		

      	var height = $container.height();
      	element.style.height = "" + height + "px";
      	element.style.width = "" + Math.round(camera_ratio * height) + "px";
	};

    var add_snapshot = function(element) {
      $(element).data("snapshot", this).addClass("item");

      var $container = $("#profilePicSnap").append(element);
      var $camera = $("#camera");
      var camera_ratio = $camera.innerWidth() / $camera.innerHeight();

      var height = $container.height();
      element.style.height = "" + height + "px";
      element.style.width = "" + Math.round(camera_ratio * height) + "px";

      var scroll = $container[0].scrollWidth - $container.innerWidth();

      $container.animate({
        scrollLeft: scroll
      }, 200);
    };

    var select_snapshot = function () {
      $(".item").removeClass("selected");
      var snapshot = $(this).addClass("selected").data("snapshot");
      $("#discard_snapshot, #upload_snapshot, #api_url").show();
      snapshot.show();
      $("#show_stream").show();
    };

    var clear_upload_data = function() {
      $("#upload_status, #upload_result").html("");
    };

    var upload_snapshot = function() {
      var api_url = $("#api_url").val();

      if (!api_url.length) {
        $("#upload_status").html("Please provide URL for the upload");
        return;
      }

      clear_upload_data();
      $("#loader").show();
      $("#upload_snapshot").prop("disabled", true);

      var snapshot = $(".item.selected").data("snapshot");
      snapshot.upload({api_url: api_url}).done(upload_done).fail(upload_fail);
    };

    var upload_done = function(response) {
      $("#upload_snapshot").prop("disabled", false);
      $("#loader").hide();
      $("#upload_status").html("Upload successful");
      $("#upload_result").html(response);
    };

    var upload_fail = function(code, error, response) {
      $("#upload_snapshot").prop("disabled", false);
      $("#loader").hide();
      $("#upload_status").html(
        "Upload failed with status " + code + " (" + error + ")");
      $("#upload_result").html(response);
    };

    var discard_snapshot = function() {
      var element = $(".item.selected").removeClass("item selected");

      var next = element.nextAll(".item").first();

      if (!next.size()) {
        next = element.prevAll(".item").first();
      }

      if (next.size()) {
        next.addClass("selected");
        next.data("snapshot").show();
      }
      else {
        hide_snapshot_controls();
      }

      element.data("snapshot").discard();

      element.hide("slow", function() {$(this).remove();});
    };

    var show_stream = function() {
      $(this).hide();
      $(".item").removeClass("selected");
      hide_snapshot_controls();
      clear_upload_data();
      camera.show_stream();
    };

    var hide_snapshot_controls = function() {
      $("#discard_snapshot, #upload_snapshot, #api_url").hide();
      $("#upload_result, #upload_status").html("");
      $("#show_stream").hide();
    };

    $("#take_snapshots").click(function(){
		if(cameraActive){
			
		navigator.getUserMedia (
			// constraints
		   	{
			  video: true
			},

			// successCallback
		   	function(localMediaStream) {
			  	take_snapshots(1);
				cameraActive = false;
				$("#take_snapshots").text('Retake Photo');
		   	},

		   	// errorCallback
		   	function(err) {
			console.log("The following error occured: " + err);
		   	}

			);
			
//			take_snapshots(1);
//			cameraActive = false;
//			$("#take_snapshots").text('Retake Photo');
		}
		else {
			//$("#camera").empty();
			//alert("empty camera DIV");
			camera = new JpegCamera("#camera", options).ready(function(info) {
			});
			$("#take_snapshots").text('Take Profile Picture');
			cameraActive = true;
		}
		
		//$(this).attr('id', 'retake_button');
		//$("#take_snapshots").prev("#take_snapshots").attr("take_snapshots","retake_button");
	});
	  
    $("#snapshots").on("click", ".item", select_snapshot);
    $("#upload_snapshot").click(upload_snapshot);
    $("#discard_snapshot").click(discard_snapshot);
    $("#show_stream").click(show_stream);
	$("#submitProfile").click(function(){
		if($.trim($('#fullNameInput').val()) == ''){
      		alert('At least humor us and make up a name!');
   		}
		else {
		userName = $("#fullNameInput").val();
		//alert(userName);
		$(".SignupContainer").fadeOut(1000, "swing");
		cameraActive = false;
			navigator.getUserMedia (
			// constraints
		   	{
			  video: true
			},

			// successCallback
		   	function(localMediaStream) {
				justUseDefaultPic = false;
		   	},

		   	// errorCallback
		   	function(err) {
			console.log("The following error occured: " + err);
		   	}

			);
		showIntructions();
		}
 	});

    var options = {
      shutter_ogg_url: "jpeg_camera/shutter.ogg",
      shutter_mp3_url: "jpeg_camera/shutter.mp3",
      swf_url: "jpeg_camera/jpeg_camera.swf"
    };

    camera = new JpegCamera("#camera", options).ready(function(info) {
      $("#take_snapshots").show();

    });
  }
});
