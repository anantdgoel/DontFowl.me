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
    var doneTypingInterval = 2000;
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
      console.log("body:", body);
      highlightSexism(body);
      // client.annotate("the quick brown fox jumped over the lazy dog")
      //   .then(result => console.log(JSON.stringify(result, null, 2)));
    }
  });
}

refresh(main);

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
  " aborto ",
  " boobs ",
  " breasts ",
  " tits ",
  " jugs ",
  " ass ",
  " booty ",
  "thick ass",
  "kill yourself",
  "should wear make up",
  "not wearing make up",
  "ugly without make up",
  "need makeup",
  " butterface ",
  " strip ",
  " hoe ",
  "good girl",
  "suck my dick",
  "deserve rape",
  "bad girl",
  "rape is good",
  "what were you wearing?"
];

function setCaretPosition(elemId, caretPos) {
    var elem = document.getElementById(elemId);

    if(elem != null) {
        if(elem.createTextRange) {
            var range = elem.createTextRange();
            range.move('character', caretPos);
            range.select();
        }
        else {
            if(elem.selectionStart) {
                elem.focus();
                elem.setSelectionRange(caretPos, caretPos);
            }
            else
                elem.focus();
        }
    }
}

function getCaretCharacterOffsetWithin(element) {
    var caretOffset = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != "undefined") {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
            var range = win.getSelection().getRangeAt(0);
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            caretOffset = preCaretRange.toString().length;
        }
    } else if ( (sel = doc.selection) && sel.type != "Control") {
        var textRange = sel.createRange();
        var preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
}

function highlightSexism(message) {
  var caretPos = getCaretCharacterOffsetWithin(message);
  console.log(caretPos);
  for(var x = 0; x < offensivePhrases.length; x++){
    if(message.innerText.indexOf(offensivePhrases[x]) !== 1) {
      var rgxp = new RegExp(offensivePhrases[x], 'g');
      var repl = '<span style="color:RED;">' + offensivePhrases[x] + '</span>';
      message.innerHTML = message.innerHTML.replace(rgxp, repl);
      message.focus();
      message.selectionStart = caretPos;
      message.selectionEnd = caretPos;
      //setCaretPosition(message, caretPos);
    }
  }
  
}
