'use strict';
/* 16-4 first ask*/
/*var url = 'http://api.icndb.com/jokes/random';
var paragraph = document.getElementById('joke');

var button = document.getElementById('get-joke');
button.addEventListener('click', function(){
  getJoke();
});

function getJoke() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.addEventListener('load', function(){
    var response = JSON.parse(xhr.response);
    paragraph.innerHTML = response.value.joke;
  });
  xhr.send();
}
document.addEventListener('DOMContentLoaded', getJoke()); */

/* 16-5 fetch API */
var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

function getQuote() {
    fetch(quoteUrl, { cache: "no-store" })
        .then(function(resp) {
            return resp.json();
        })
        .then(createTweet);
}

function createTweet(input) {
    var data = input[0]; // object returned by fetch function

    var dataElement = document.createElement('div');
    dataElement.innerHTML = data.content; // value of content key in object data, in this case string
    var quoteText = dataElement.innerText.trim();
    var quoteAuthor = data.title; // value of title key
    var quoteLink = data.link // my addition 

    if (!quoteAuthor.length) {
        quoteAuthor = "Unknown author";
    }

    var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor + " Link: " + quoteLink;

    if (tweetText.length > 140) {
        getQuote();
    } else {
        var tweet = tweetLink + encodeURIComponent(tweetText);
        document.querySelector('.quote').innerText = quoteText;
        document.querySelector('.author').innerText = "Author: " + quoteAuthor;
        document.querySelector('.link').innerHTML = "Link: " + quoteLink;
        document.querySelector('.tweet').setAttribute('href', tweet);
    }
    console.log(input[0]);
}

document.addEventListener('DOMContentLoaded', function() {
    getQuote();
    document.querySelector('.trigger').addEventListener('click', function() {
        getQuote();
    });
});
