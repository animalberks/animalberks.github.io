let onomatope = [];
let posx = [];
let posy = [];
let size = [];
let speed = [];
let vid;
let canvas;
let player;
let docid;

function setup() {

  var url = new URL(window.location.href);
  var params = url.searchParams;
  // var docid = params.get('mode');
  if(params.has('docid')){
    docid = params.get('docid');    
  }else{
    docid = 'otter001';
  }
  
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
  player = select("#yt_video");      
  db.collection("animals").doc(docid).get().then((doc) => {
        data = doc.data(); 
        onomatope = data.onomatopoeia;
        for(let i=0;i<onomatope.length;i++){
          posx.push(Math.random()*width);
          posy.push(height*0.1+Math.random()*height*0.7);
          speed.push(Math.random()*8+2);
        }      

        player.attribute('src', `https://www.youtube.com/embed/${data.youtubeid}?loop=1&autoplay=1&mute=1&wmode=transparent&playlist=${data.youtubeid}`);
        player.attribute('width', windowWidth);
        player.attribute('height',windowWidth*0.6);
        player.position(0,0);      
    });
    canvas = createCanvas(windowWidth, windowWidth*0.5);
    canvas.parent('canvas');
    textSize(windowWidth*0.04);    

}

function draw() {
  clear();
  for(let i=0;i<onomatope.length;i++){
    if(posx[i]>-200){
      text(onomatope[i],posx[i],posy[i]);
    }else{
      posx[i] = width+200*Math.random();
      speed[i] = Math.random()*8+2;
    }
    posx[i] -= speed[i];
  }
  canvas.style('z-index','3');
  player.style('z-index','-1');
}