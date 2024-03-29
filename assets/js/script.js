var currentPlaylist = [];
var shufflePlaylist = [];
var tempPlaylist = [];
var audioElement;
var mouseDown = false;//tracks if mouse is currently clicked down or not to drag
var currentIndex = 0;
var repeat = false;
var shuffle = false;
var userLoggedIn;

function openPage(url) {

  if(url.indexOf("?")== -1) {
    url = url + "?";
  }
  var encodedUrl = encodeURI(url + "&userLoggedIn=" + userLoggedIn);
  $("#mainContent").load(encodedUrl);
  $("body").scrollTop(0);
  history.pushState(null, null, url);
}

function playFirstSong() {
  setTrack(tempPlaylist[0], tempPlaylist, true);
}

function formatTime(seconds) {
  var time = Math.round(seconds);
  var minutes = Math.floor(time/60);
  var seconds = time - (minutes * 60);

  var extraZero = (seconds < 10) ? "0" : "";//conditional statement of if else
  return minutes + ":" + extraZero + seconds;
}

function updateTimeProgressBar(audio) {//pass in audio object parameter
  $(".progressTime.current").text(formatTime(audio.currentTime));
  $(".progressTime.remaining").text(formatTime(audio.duration - audio.currentTime));

  var progress = audio.currentTime / audio.duration * 100;
  $(".playBackBar .progress").css("width", progress + "%");
}

function updateVolumeProgressBar(audio) {
  var volume = audio.volume * 100;
  $(".volumeBar .progress").css("width", volume + "%");
}

function Audio() {
  this.currentlyPlaying;
  this.audio = document.createElement('audio');//given a value, html element

  this.audio.addEventListener("ended", function() {
    nextSong();
  })

  this.audio.addEventListener("canplay", function() {
    var duration = formatTime(this.duration);
    $(".progressTime.remaining").text(duration);
  });

  this.audio.addEventListener("timeupdate", function() {
    if(this.duration) {
      updateTimeProgressBar(this);
    }
  });

  this.audio.addEventListener("volumechange", function() {
    updateVolumeProgressBar(this);
  });

  this.setTrack = function(track) {
    this.currentlyPlaying = track;
    this.audio.src = track.path;
  }

  this.play = function() {
    this.audio.play();
  }

  this.pause = function() {
    this.audio.pause();
  }

  this.setTime = function(seconds) {
    this.audio.currentTime = seconds;
  }
}
