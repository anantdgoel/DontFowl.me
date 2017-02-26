# DontFowl.me [![Travis branch](https://img.shields.io/travis/rust-lang/rust/master.svg)]() [![AUR](https://img.shields.io/badge/License-GPL----3-green.svg)]() [![bitHound](https://img.shields.io/bithound/dependencies/github/rexxars/sse-channel.svg)]() [![CocoaPods](https://img.shields.io/cocoapods/metrics/doc-percent/AFNetworking.svg)]()
DontFowl.me is a public API designed to help developers detect sexism or sexual harrasment in any written text.

DontFowl.me is a unique apporach to NLP using a custom model instead of n-gram or bag of words apporach. Our NLP uses a lexical feature extraction to achieve **lowest** false negatives or false positives rates. This is because our lexical feature approach uses a dependance tree to relate every part of speech to every other part of speech without limits (unline n-words where n is the limit).

Here is a small sample of DontFowl.me's power

![](http://i.giphy.com/gGkeFv2E278Fa.gif)

Here is comparison of our Lexical approach to other common apporaches

![](http://imgur.com/lf9kYyL.png)

DontFowl.me can also be used as a more general NLP library to do parts-of-speech tagging and finding dependcies between those parts-of-speech.

## Usage
#### RESTful API
**Warning**: Our lexical model in only available through go scripts, not the API. The API only has Parts of speech and depedency trees.

Our dedicated servers are hosted at www.dontfowl.me and can be queried using a HTTP POST request. Our `golang` scripts query our servers for you. 

In case you want to query them youselves, the following methods work:

`wget --post-data [TEXT TO ANAYLSE] 'dontfowl.me/?properties={"annotators":"tokenize,ssplit,pos,depparse, parse","outputFormat":"json"}' -O -`

or if you prefer cURL

`curl --data [TEXT TO ANALYSE] 'http://dontfowl.me/?properties={%22annotators%22%3A%22tokenize%2Cssplit%2Cpos%22%2C%22outputFormat%22%3A%22json%22}' -o -`

Just replace [TEXT TO ANALYSE] with your own Strings.

#### Go scripts
In the root directory of this git repository, run the following

`go build` and `go install`

`cd ../src`

`nlp [TEXT TO ANALYSE]`

## Why is it called 'DontFowl.me'?
The insipration for this project came from a need to reduce sexism in workplaces, espcially after we read on what Susan Fowler had to put up with at Uber. We decided to automate detection of sexism at workplaces to keep people accountable, especially in day-to-day communications such as email exchanges. Our love for puns naturally lead to the name 'Dont Fowl' :wink:.

## [Contributors] (CONTRIBUTORS.md)
1. Anant Goel
2. Danish Arsalan


## Contributing to this project
We love contributors. We are open source and every contribution helps. Please read [CONTRIBUTE.md](CONTRIBUTE.md) for how to contribute to our project.

## Licensing
This project is protected under GNU General Public License 3.

Copyright (C) 2007 Free Software Foundation, Inc. http://fsf.org/ Everyone is permitted to copy and distribute verbatim copies of this license document, but changing it is not allowed.

Please read [License.md](LICENSE.md)

## Roadmap
* Port to other languages
* Improve effeciency (currently we are at O(n^3))
* Add more training data to better detect sexism
* Implement a more robust API with more endpoints
* Create exhaustive documentation
* Publish a paper to explain how this LSF model works and why it is better than n-words for syntactical NLP
* Write tests

## Thanks
Stanford CoreNLP servers released under GNU-GPL-3

Manning, Christopher D., Mihai Surdeanu, John Bauer, Jenny Finkel, Steven J. Bethard, and David McClosky. 2014. The Stanford CoreNLP Natural Language Processing Toolkit In Proceedings of the 52nd Annual Meeting of the Association for Computational Linguistics: System Demonstrations, pp. 55-60. 
