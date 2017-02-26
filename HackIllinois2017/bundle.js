(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var gmail;
//const StanfordCoreNLPClient = require('corenlp-client');
//const client = new StanfordCoreNLPClient("http://dontfowl.me", "tokenize,ssplit,pos,parse,depparse");


function refresh(f) {
  if( (/in/.test(document.readyState)) || (typeof Gmail === undefined) ) {
    setTimeout('refresh(' + f + ')', 10);
  } else {
    f();
  }
}


var main = function(){
  // NOTE: Always use the latest version of gmail.js from
  // https://github.com/KartikTalwar/gmail.js
  gmail = new Gmail();
  console.log('Hello,', gmail.get.user_email());
  gmail.observe.on('compose', function(compose, type){
  	console.log("compose obj:", compose);
  	console.log("message text on compose:", document.querySelector('div[aria-label="Message Body"]'));
  	var body = document.querySelector('div[aria-label="Message Body"]');

    var typingTimer;
    var doneTypingInterval = 1000;
    var $input = $('div[aria-label="Message Body"]');
  	$input.on('keyup', function(){
      clearTimeout(typingTimer);
      typingTimer = setTimeout(doneTyping, doneTypingInterval);
  	});

    $input.on('keydown', function(){
      clearTimeout(typingTimer);
    })

    function doneTyping() {
      body = document.querySelector('div[aria-label="Message Body"]');
      console.log("body:", body.innerText);
      highlightSexism(body);
      // client.annotate("the quick brown fox jumped over the lazy dog")
      //   .then(result => console.log(JSON.stringify(result, null, 2)));
    }
  });

}

main(); 
//refresh(main);

var offensivePhrases = [
  "ugly woman",
  "ugly girl",
  "ugly pig",
  "ugly bitch",
  "ugly cunt",
  "ugly slob",
  "ugly witch",
  "ugly tease",
  "ugly broad",
  "ugly slut",
  "ugly whore",
  "ugly daughter",
  "ugly mother",
  "ugly sister",
  "ugly cousin",
  "ugly aunt",
  "ugly virgin",
  "ugly cunt",
  "fat woman",
  "fat girl",
  "fat pig",
  "fat bitch",
  "fat girl",
  "fat slob",
  "fat witch",
  "fat tease",
  "fat broad",
  "fat slut",
  "fat whore",
  "fat daughter",
  "fat mother",
  "fat sister",
  "fat cousin",
  "fat aunt",
  "fat virgin",
  "fat cunt",
  "dumb woman",
  "dumb girl",
  "dumb pig",
  "dumb bitch",
  "dumb girl",
  "dumb slob",
  "dumb witch",
  "dumb tease",
  "dumb broad",
  "dumb slut",
  "dumb whore",
  "dumb daughter",
  "dumb mother",
  "dumb sister",
  "dumb cousin",
  "dumb aunt",
  "dumb virgin",
  "dumb cunt",
  "stupid woman",
  "stupid girl",
  "stupid pig",
  "stupid bitch",
  "stupid girl",
  "stupid slob",
  "stupid witch",
  "stupid tease",
  "stupid broad",
  "stupid slut",
  "stupid whore",
  "stupid daughter",
  "stupid mother",
  "stupid sister",
  "stupid cousin",
  "stupid aunt",
  "stupid virgin",
  "stupid cunt",
  "shut up woman",
  "shut up girl",
  "shut up pig",
  "shut up bitch",
  "shut up girl",
  "shut up slob",
  "shut up witch",
  "shut up tease",
  "shut up broad",
  "shut up slut",
  "shut up whore",
  "shut up daughter",
  "shut up mother",
  "shut up sister",
  "shut up cousin",
  "shut up aunt",
  "shut up virgin",
  "shut up cunt",
  "kill woman",
  "kill girl",
  "kill pig",
  "kill bitch",
  "kill girl",
  "kill slob",
  "kill witch",
  "kill tease",
  "kill broad",
  "kill slut",
  "kill whore",
  "kill daughter",
  "kill mother",
  "kill sister",
  "kill cousin",
  "kill aunt",
  "kill virgin",
  "kill cunt",
  "kill yourself woman",
  "kill yourself girl",
  "kill yourself pig",
  "kill yourself bitch",
  "kill yourself girl",
  "kill yourself slob",
  "kill yourself witch",
  "kill yourself tease",
  "kill yourself broad",
  "kill yourself slut",
  "kill yourself whore",
  "kill yourself daughter",
  "kill yourself mother",
  "kill yourself sister",
  "kill yourself cousin",
  "kill yourself aunt",
  "kill yourself virgin",
  "kill yourself cunt",
  "fake woman",
  "fake girl",
  "fake pig",
  "fake bitch",
  "fake girl",
  "fake slob",
  "fake witch",
  "fake tease",
  "fake broad",
  "fake slut",
  "fake whore",
  "fake daughter",
  "fake mother",
  "fake sister",
  "fake cousin",
  "fake aunt",
  "fake virgin",
  "fake cunt",
  "stay in your place",
  "be coy",
  "shut up",
  "you tease",
  "eye candy",
  "Feminazi",
  "daddy's girl",
  "suck dick",
  "give head",
  "owe me",
  "abortion is",
  "abortion should be",
  "aborto",
  "boobs",
  "breasts",
  "tits",
  "jugs",
  "ass",
  "booty",
  "thick ass",
  "kill yourself",
  "should wear make up",
  "not wearing make up",
  "ugly without make up",
  "need makeup",
  "butterface",
  "strip",
  "ho",
  "good girl",
  "suck my dick",
  "deserve rape",
  "bad girl",
  "rape is good",
  "what were you wearing?"
];

function highlightSexism(message) {
  for(var x = 0; x < offensivePhrases.length(); x++){
    if(message.innerText.indexOf(offensivePhrases[x]) !== 1) {
      var rgxp = new RegExp(offensivePhrases[x], 'g');
      var repl = '<span style="color:#FFFF00;">' + offensivePhrases[x] + '</span>';
      message.innerHTML = message.innerText.replace(rgxp, repl);
    }
  }
}

},{}]},{},[1]);
