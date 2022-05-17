let onomatope = [];
let posx = [];
let posy = [];
let size = [];
let speed = [];
let vid;
let canvas;
let player_tag;
let docid;
let player;


function setup() {

  const firebaseConfig = {
    apiKey: "AIzaSyBiaSA2Arc_xsuIC_wu-C4yIYAMl7Pa9v4",
    authDomain: "onozoo-e2881.firebaseapp.com",
    projectId: "onozoo-e2881",
    storageBucket: "onozoo-e2881.appspot.com",
    messagingSenderId: "405504156987",
    appId: "1:405504156987:web:6e1ff59440c21f1f85831e",
    measurementId: "G-2NNGTWJC9L"
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();
  player_tag = select("#player");
  db.collection("animals").doc(docid).get().then((doc) => {
    data = doc.data();
    onomatope = data.onomatopoeia;
    for (let i = 0; i < onomatope.length; i++) {
      posx.push(Math.random() * width);
      posy.push(height * 0.1 + Math.random() * height * 0.7);
      speed.push(Math.random() * 4 + 2);
    }

    player.loadVideoById({
      'videoId': data.youtubeid
    });
    player_tag.attribute('width', windowWidth);
    player_tag.attribute('height', windowWidth * 0.6);
    player_tag.position(0, 0);
  });

  canvas = createCanvas(windowWidth, windowWidth * 0.5);
  canvas.parent('canvas');
  textSize(windowWidth * 0.04);

}

function draw() {
  clear();
  for (let i = 0; i < onomatope.length; i++) {
    if (posx[i] > -200) {
      text(onomatope[i], posx[i], posy[i]);
    } else {
      posx[i] = width + 200 * Math.random();
      speed[i] = Math.random() * 4 + 2;
    }
    posx[i] -= speed[i];
  }
  canvas.style('z-index', '3');
  player_tag.style('z-index', '-1');
}


var url = new URL(window.location.href);
var params = url.searchParams;
if (params.has('docid')) {
  docid = params.get('docid');
} else {
  docid = 'otter001';
}

//IFrame Player APIの読み込み
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//YouTube playerの埋め込み
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    width: window.innerWidth, //プレーヤーの幅
    height: window.innerWidth * 0.6, //プレーヤーの高さ
    videoId: "-B-9dkIPP6s", //YouTubeのID
    events: {
      'onReady': onPlayerReady
    },
    playerVars: {
      autoplay: 1
    },
  });
}


function onPlayerReady(event) {
  event.target.mute();
  event.target.playVideo();
}
