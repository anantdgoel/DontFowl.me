# DontFowl.me [![Travis branch](https://img.shields.io/travis/rust-lang/rust/master.svg)]() [![AUR](https://img.shields.io/badge/License-GPL----3-green.svg)]() [![bitHound](https://img.shields.io/bithound/dependencies/github/rexxars/sse-channel.svg)]() [![CocoaPods](https://img.shields.io/cocoapods/metrics/doc-percent/AFNetworking.svg)]()
DontFowl.me is a public API designed to help developers detect sexism or sexual harrasment in any written text.

DontFowl.me is a unique apporach to NLP using a custom model instead of n-gram or bag of words apporach. Our NLP uses a lexical feature extraction to achieve **lowest** false negatives or false positives rates. This is because our lexical feature approach uses a dependance tree to relate every part of speech to every other part of speech without limits (unline n-words where n is the limit).

Here is a small sample of DontFowl.me's power

![](http://i.giphy.com/gGkeFv2E278Fa.gif)

Here is comparison of our Lexical approach to other common apporaches

![](http://imgur.com/a/ytrrw

DontFowl.me can also be used as a more general NLP library to do parts-of-speech tagging and finding dependcies between those parts-of-speech.

## Why is it called 'DontFowl.me'?
The insipration for this project came from a need to reduce sexism in workplaces, espcially after we read on what Susan Fowler had to put up with at Uber. We decided to automate detection of sexism at workplaces to keep people accountable, especially in day-to-day communications such as email exchanges. Our love for puns naturally lead to the name 'Dont Fowl' :wink:.
