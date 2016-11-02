var player;
var ctrlq;
var playMinTimeoutId;
var playForTimeoutId;
var pauseMinTimeoutId;
var pauseForTimeoutId;
var gameOn = false;

// Test Songs:  
// faded: https://www.youtube.com/watch?v=60ItHLz5WEA&list=PLFgquLnL59alcyTM2lkWJU34KtfPXQDaX&index=10
// the sound: https://www.youtube.com/watch?v=FSnAllHtG70
// closer: https://www.youtube.com/watch?v=gT-JzR0qn3o
// mr brightside: https://www.youtube.com/watch?v=SrkeWsQZNyU
// woah woah woah: https://www.youtube.com/watch?v=noO8PKZ34wo
// ocean: https://www.youtube.com/watch?v=jdYJf_ybyVo
// 22: https://www.youube.com/watch?v=AgFeZr5ptV8
// soundtrack to my life: https://www.youtube.com/watch?v=ZyDcktys9EU
// Passed Youtube URL, returns ID
function YouTubeGetID(url){
  var ID = '';
  url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if(url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_\-]/i);
    ID = ID[0];
  }
  else {
    ID = url;
  }
    return ID;
}

// Updates Player ID
function UpdateURL() {
player.loadVideoById(YouTubeGetID(document.getElementById('myTextField').value));
	ctrlq.onclick();
	toggleButton(true);
	startTimers(true);
}

// Creates Icon, Manages Game
function onYouTubeIframeAPIReady() {
	ctrlq=document.getElementById("youtube-audio");
  
	var icon=document.createElement("img");
	icon.setAttribute("id","youtube-icon");
	icon.style.cssText="cursor:pointer;cursor:hand";
	ctrlq.appendChild(icon);

	var div=document.createElement("div");	
	div.setAttribute("id","youtube-player");
	ctrlq.appendChild(div);

	var toggleButton=function(play) {
		var img = play ? "pause_btn.png":"play_btn.png";
		icon.setAttribute("src", img);
  }

	ctrlq.onclick = function() {
  	videoId:document.getElementById('myTextField').value; 
    //if (player.getPlayerState() === YT.PlayerState.PLAYING || player.getPlayerState() === YT.PlayerState.BUFFERING ) {
    if (gameOn) {
    	stopTimers();
      toggleButton(false);
      gameOn = false;
    } else {
      playMin();
      toggleButton(true);
      gameOn = true;
    }
  }
  
	player = new YT.Player("youtube-player", {
		height:"0",
		width:"0",
		videoId:document.getElementById('myTextField').value,
		playerVars:{
			autoplay:ctrlq.dataset.autoplay,
			loop:ctrlq.dataset.loop,
		},
		events:{
			'onReady':function(e) {
				player.setPlaybackQuality("small");
			 toggleButton(player.getPlayerState()!==YT.PlayerState.CUED)
       },
			'onStateChange':function(e){
				if(e.data===YT.PlayerState.ENDED) {
        	toggleButton(false);
          stopTimers();
        }
      }
	  }
	})
}

// Minimum amount of time song is played for. Calls PlayFor
function playMin() {
	player.playVideo();
	playMinTimeoutId = setTimeout(function(){playFor()}, 10000);
}

// Random amount of time song plays. Calls PauseMin
function playFor() {
	playTillTimeoutId = setTimeout(function(){pauseMin()}, Math.floor(Math.random() * 20000) + 1);
}

// Minimum amount of time song is pause. Calls PauseFor
function pauseMin() {
	player.pauseVideo();
  pauseMinTimeoutId = setTimeout(function(){pauseFor()}, 3000);
}

// Minimum amount of time song is paused for. Calls PlayMin
function pauseFor() {
	pauseForTimeoutId = setTimeout(function(){playMin()}, Math.floor(Math.random() * 3000) + 1);
}
 
// Stops all timers
function stopTimers() {
	player.pauseVideo();
  	clearTimeout(playMinTimeoutId);
  	clearTimeout(playForTimeoutId);
	clearTimeout(pauseMinTimeoutId);
  	clearTimeout(pauseForTimeoutId);
}